#!/usr/bin/env bash

# -----------------------------
# Configuration
# -----------------------------
REPEAT_COUNT=8
BATCH_SIZE=4
cli="./src/index.ts"

# -----------------------------
# Step 0: Parse the argument
# -----------------------------
MODE="$1"

if [[ "$MODE" == "base" ]]; then
  # "base" mode
  fromChain="ethereum-testnet-sepolia-base-1"
  toChain="ethereum-testnet-holesky"
  router="0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93"
  lbtcToken="0x107Fc7d90484534704dD2A9e24c7BD45DB4dD1B5"
  usdcToken="0x036CbD53842c5426634e7929541eC2318f3dCF7e"
  token=$lbtcToken
  RESULTS_FILE="lbtc-base-eth.json"
else
  # Default or "eth" mode
  fromChain="ethereum-testnet-holesky"
  toChain="ethereum-testnet-sepolia-base-1"
  sepoliaRouter="0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59"
  holeskyRouter="0xb9531b46fE8808fB3659e39704953c2B1112DD43"
  router=$holeskyRouter
  lbtcToken="0x38A13AB20D15ffbE5A7312d2336EF1552580a4E2"
  usdcToken="0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"
  token=$lbtcToken
  RESULTS_FILE="lbtc-eth-base.json"
fi

echo "=============================="
echo "Script Mode:       $MODE"
echo "From Chain:        $fromChain"
echo "To Chain:          $toChain"
echo "Router:            $router"
echo "Token:             $token"
echo "Results File:      $RESULTS_FILE"
echo "Transactions:      $REPEAT_COUNT"
echo "=============================="
echo

# -----------------------------
# Helper Function: Add an array of transactions to RESULTS_FILE
# -----------------------------
add_transactions() {
  local newItems="$1"  # This is a JSON array of objects

  # Read current JSON file contents
  local existingJson
  existingJson=$(jq '.' "$RESULTS_FILE" 2>/dev/null)

  # If for some reason file was corrupted or empty, bail out
  if [[ -z "$existingJson" || "$existingJson" == "null" ]]; then
    echo "Error: Cannot read valid JSON from $RESULTS_FILE"
    exit 1
  fi

  # Append the new items (which is an array) to the .transactions array
  local updatedJson
  updatedJson=$(echo "$existingJson" \
    | jq --argjson arr "$newItems" '.transactions += $arr')

  # Write back to RESULTS_FILE
  echo "$updatedJson" > "$RESULTS_FILE"
}

# -----------------------------
# Step 1: If RESULTS_FILE doesn't exist, create it with an empty array
# -----------------------------
if [ ! -f "$RESULTS_FILE" ]; then
  echo "File '$RESULTS_FILE' does not exist. Creating it now..."

  current_timestamp=$(date +%s)

  # Create a minimal JSON structure:
  # {
  #   "generated_at": 1234567890,
  #   "transactions": []
  # }
  jq -n --arg t "$current_timestamp" '
    {
      "generated_at": ($t | tonumber),
      "transactions": []
    }
  ' > "$RESULTS_FILE"

  echo "Created '$RESULTS_FILE' with empty 'transactions' array."

  # -----------------------------
  # Step 2: Generate new transactions if needed
  # -----------------------------
  echo "Running up to $REPEAT_COUNT transactions (and updating JSON file after each)."
  
  # Define the SEND command (with --format batch, --times, etc.)
  SEND_COMMAND="$cli send \
    $fromChain \
    $router \
    $toChain \
    --transfer-tokens $token=0.000001 \
    --allow-out-of-order-exec \
    --format batch \
    --times $BATCH_SIZE"

  for ((i = 1; i <= REPEAT_COUNT; i++)); do
    echo "=== Execution #$i ==="
  
    #
    # The command now outputs multiple JSON objects in "batch" format.
    # We slurp them all into an array with 'jq -s'.
    #
    # Then we map each item of that array to { id, tx }
    # (assuming each object has fields .message.messageId and .tx.hash).
    #
    res=$(
      eval "$SEND_COMMAND" \
      | jq -s '.'
    )
  
    # Now "res" is something like:
    # [
    #   {"id": "...", "tx": "..."},
    #   {"id": "...", "tx": "..."},
    #   ...
    # ]
  
    # Check if the parsed result is valid (non-empty, not null)
    if [[ -n "$res" && "$res" != "null" && "$res" != "[]" ]]; then
      echo "Appending transactions from execution #$i"
      echo "res: $res"
      # Immediately update the JSON file (append this array)
      add_transactions "$res"
      sleep 1m
    else
      echo "No valid JSON found in execution #$i"
    fi
  done
fi

# Double-check file still exists
if [ ! -f "$RESULTS_FILE" ]; then
  echo "Error: '$RESULTS_FILE' could not be created. Exiting..."
  exit 1
fi

# -----------------------------
# Step 3: Show how much time has passed since generation + check statuses
# -----------------------------
echo
echo "Reading results from '$RESULTS_FILE'..."

# # 1) Find how many seconds have passed since 'generated_at'
# generated_at=$(jq '.generated_at' "$RESULTS_FILE" 2>/dev/null)
# if [[ -n "$generated_at" && "$generated_at" != "null" ]]; then
#   now=$(date +%s)
#   passed=$(( now - generated_at ))
#   echo "It has been $passed second(s) since the script generated '$RESULTS_FILE'."
# else
#   echo "Could not read 'generated_at' from '$RESULTS_FILE'."
# fi

  echo
  echo "=== Checking messages ==="
# 2) Loop over each transaction object in 'transactions'
countSuccess=0
countFailure=0
countPending=0
jq -c '.transactions[]' "$RESULTS_FILE" | while IFS= read -r line; do
  msgId=$(echo "$line" | jq -r '.id')
  txHash=$(echo "$line" | jq -r '.tx')

  # Call 'show' command for each txHash
  showOutput=$($cli show "$txHash" --format batch 2>/dev/null | jq -s '.[-1]')
  state=$(echo "$showOutput" | jq '.state')
  exec_duration=$(echo "$showOutput" | jq '.duration')

  # Decide status
  if [ "$state" -eq 2 ] 2>/dev/null; then
    passed=$(( now - receipt_timestamp ))
    echo "Message ID $msgId -> Success (state=2), exec_duration=$exec_duration"
    countSuccess=$((countSuccess+1))
  elif [ "$state" -eq 3 ] 2>/dev/null; then
    passed=$(( now - receipt_timestamp ))
    echo "Message ID $msgId -> Failure (state=3), exec_duration=$exec_duration"
    countFailure=$((countFailure+1))
  else
    echo "Message ID $msgId -> Pending or Unknown (state=$state)"
    countPending=$((countPending+1))
  fi
done
# Finally, echo the totals:
echo "===== Summary ====="
echo "Total Success: $countSuccess"
echo "Total Failure: $countFailure"
echo "Total Pending: $countPending"
echo "=================="
