#!/usr/bin/env python3

import sys
import json
import requests
from web3 import Web3

# -------------------------
# Configuration
# -------------------------
CHAIN_CONFIG = {
    "eth": {
        "json_file": "lbtc-eth-base.json",
        "rpc_url": "https://rpcs.main.stage.cldev.sh/ethereum/holesky",
    },
    "base": {
        "json_file": "lbtc-base-eth.json",
        "rpc_url": "https://rpcs.main.stage.cldev.sh/base/sepolia",
    },
}

# Replace with your actual topic hash that you want to filter on
TARGET_TOPIC_HASH = "3dd5691de087c885ef5f0feb7e9c8ed26050e56a6b34e73274bd8818af4ec5a9"

API_ENDPOINT = "https://gastald-testnet.prod.lombard.finance/api/bridge/v1/deposits/getByHash"

# How many messageHashes to send per request
BATCH_SIZE = 20

def main():
    # Check command line args
    if len(sys.argv) < 2:
        print("Usage: ./script.py <chain>")
        print("  where <chain> is one of:", list(CHAIN_CONFIG.keys()))
        sys.exit(1)

    chain_arg = sys.argv[1].lower()
    if chain_arg not in CHAIN_CONFIG:
        print(f"Invalid chain '{chain_arg}'. Must be one of:", list(CHAIN_CONFIG.keys()))
        sys.exit(1)

    # Determine which JSON file to load and which RPC URL to use
    json_file = CHAIN_CONFIG[chain_arg]["json_file"]
    web3_provider_url = CHAIN_CONFIG[chain_arg]["rpc_url"]

    # Load the JSON data
    try:
        with open(json_file, "r") as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error reading {json_file}: {e}")
        sys.exit(1)

    # Initialize Web3
    w3 = Web3(Web3.HTTPProvider(web3_provider_url))
    if not w3.is_connected():
        print(f"Could not connect to Web3 provider at {web3_provider_url}")
        sys.exit(1)

    transactions = data.get("transactions", [])
    if not transactions:
        print(f"No transactions found in {json_file}")
        sys.exit(0)

    print(f"Found {len(transactions)} transactions in {json_file}")

    # Collect all message hashes in a list
    all_message_hashes = []

    for tx_info in transactions:
        tx_hash = tx_info.get("tx")

        if not tx_hash:
            # If there's no tx field in the JSON object, skip it
            continue

        # Fetch the transaction receipt
        try:
            receipt = w3.eth.get_transaction_receipt(tx_hash)
        except Exception as e:
            print(f"Could not retrieve receipt for tx {tx_hash}: {e}")
            continue

        # Iterate through logs in this receipt
        for log in receipt.logs:
            # The first topic (topics[0]) is the event signature topic
            if len(log.topics) > 0 and log.topics[0].hex().lower() == TARGET_TOPIC_HASH.lower():
                if len(log.topics) < 4:
                    # If we don't have 4 topics, there's no topic3 to retrieve
                    continue
                message_hash = log.topics[3].hex()
                all_message_hashes.append((f"0x{message_hash}", f"{tx_hash}"))

    # Now we have a list of all message hashes. Let's send them in batches of BATCH_SIZE.
    total_hashes = len(all_message_hashes)
    print(f"Found {total_hashes} matching messageHashes.")

    for i in range(0, total_hashes, BATCH_SIZE):
        hashToId = dict(all_message_hashes)
        batch = all_message_hashes[i : i + BATCH_SIZE]
        payload = {
            "messageHash": [hash for hash, tx_hash in batch]
        }

        # Make a POST request with JSON payload
        try:
            response = requests.post(
                API_ENDPOINT,
                headers={"Content-Type": "application/json"},
                json=payload,
                timeout=30
            )

            if response.status_code == 200:
                # Example response structure (assuming "attestations" is an array):
                # {
                #   "attestations": [
                #       { "message_hash": "...", "status": "..." },
                #       ...
                #   ]
                # }
                data = response.json()
                attestations = data.get("attestations", [])
                # Each item in 'attestations' should correspond to a messageHash
                # If the server returns them in the same order as provided, we can map them:
                for idx, attestation in enumerate(attestations):
                    # The "status" might be inside each object
                    msg_hash = attestation.get("message_hash")
                    status = attestation.get("status")
                    print(f"{hashToId[msg_hash]} - {msg_hash}: {status}")
            else:
                print(f"Request failed with status {response.status_code}: {response.text}")
                print(f"Payload was: {payload}")

        except Exception as e:
            print(f"Error making API request for batch starting at index {i}: {e}")


if __name__ == "__main__":
    main()
