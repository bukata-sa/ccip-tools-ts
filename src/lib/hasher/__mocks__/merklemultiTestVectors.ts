// For reference test data, see https://github.com/smartcontractkit/ccip/blob/ccip-develop/core/services/ocr2/plugins/ccip/merklemulti/fixtures/merkle_multi_proof_test_vector.go
interface TestVector {
  ProofLeaves: string[]
  ProofHashes: string[]
  ProofFlags: boolean[]
  AllLeafs: string[]
  ExpectedRoot: string
}

export const testVectors: TestVector[] = [
  {
    ProofLeaves: [
      '0x82c6612178aec035e331a9ae7d9ae1a456b84aa887e67e62443afa74000ec385',
      '0x207fc4b038934fc11c627eb9ec716dac3fb174a072c4ff793bd5378d8ef7d643',
      '0x031aefba034634db84b98e17ec94d483d74fa2d6af502af79c62d91ac26218d3',
      '0x207becb742c6e283eb23188f90c5b73f9ea2bd6ae64bfee6defc609849c85519',
      '0x723e60a9ad2f168208aa4bfc8b9fedb1a46ee906d63bd5adba2082da4a9f5a4f',
    ],
    ProofHashes: [
      '0x780970daab403799d8a1014149440b1b6ad98ffd75731ad8062f4f5783981fe9',
      '0xd47016662a53cbce0abfa351027b3d04b79993bcdc3fb422f59789a67725a64c',
      '0x6076805adbd96cc499b1dac3c5e19dd4bf5d560892379533e5c029bd94727b6d',
    ],
    ProofFlags: [true, true, false, true, false, true, false],
    AllLeafs: [
      '0x82c6612178aec035e331a9ae7d9ae1a456b84aa887e67e62443afa74000ec385',
      '0x207fc4b038934fc11c627eb9ec716dac3fb174a072c4ff793bd5378d8ef7d643',
      '0x031aefba034634db84b98e17ec94d483d74fa2d6af502af79c62d91ac26218d3',
      '0x207becb742c6e283eb23188f90c5b73f9ea2bd6ae64bfee6defc609849c85519',
      '0x723e60a9ad2f168208aa4bfc8b9fedb1a46ee906d63bd5adba2082da4a9f5a4f',
      '0x780970daab403799d8a1014149440b1b6ad98ffd75731ad8062f4f5783981fe9',
      '0x9ba690f2f210adc663f753a4d20b81a71049095a2c5da4482670ec07f0ac7cca',
      '0x3f60c299c612d0eec7df764e822a3e7ccaba4e2d6fb340acf55eb211897e316a',
      '0x7884380782e3a6f35b65241080a24617ba56fc3486b6ebdf27c088d8e90211c0',
      '0xe56af56983e06223a0248685d2d866f6fd636b856159347c8952dcd38d339bce',
    ],
    ExpectedRoot: '0xcd92df41b37185db7c3fe8b4b91ba25e6328cf0b0b6e4a3c2117f68fb1d8820e',
  },
  {
    ProofLeaves: [
      '0xa20c0244af79697a4ef4e2378c9d5d14cbd49ddab3427b12594c7cfa67a7f240',
      '0x3de96afb24ce2ac45a5595aa13d1a5163ae0b3c94cef6b2dc306b5966f32dfa5',
      '0xacadf7b4d13cd57c5d25f1d27be39b656347fe8f8e0de8db9c76d979dff57736',
      '0xc21c26a709802fe1ae52a9cd8ad94d15bf142ded26314339cd87a13e5b468165',
      '0x55f6df03562738c9a6437cd9ad221c52b76906a175ae96188cff60e0a2a59933',
      '0x2dbbe66452e43fec839dc65d5945aad6433d410c65863eaf1d876e1e0b06343c',
      '0x8beab00297b94bf079fcd5893b0a33ebf6b0ce862cd06be07c87d3c63e1c4acf',
      '0xcabdd3ad25daeb1e0541042f2ea4cd177f54e67aa4a2c697acd4bb682e94de59',
      '0x7e01d497203685e99e34df33d55465c66b2253fa1630ee2fe5c4997968e4a6fa',
      '0x1a03d013f1e2fa9cc04f89c7528ac3216e3e096a1185d7247304e97c59f9661f',
    ],
    ProofHashes: [
      '0xde96f24fcf9ddd20c803dc9c5fba7c478a5598a08a0faa5f032c65823b8e26a3',
      '0xe1303cffc3958a6b93e2dc04caf21f200ff5aa5be090c5013f37804b91488bc2',
      '0x90d80c76bccb44a91f4e16604976163aaa39e9a1588b0b24b33a61f1d4ba7bb5',
      '0x012a299b25539d513c8677ecf37968774e9e4b045e79737f48defd350224cdfd',
      '0x420a36c5a73f87d8fb98e70c48d0d6f9dd83f50b7b91416a6f5f91fac4db800f',
      '0x5857d8d1b56abcd7f863cedd3c3f8677256f54d675be61f05efa45d6495fc30a',
      '0xbf176d20166fdeb72593ff97efec1ce6244af41ca46cf0bc902d19d50c446f7b',
      '0xa9221608e4380250a1815fb308632bce99f611a673d2e17fc617123fdc6afcd2',
      '0xbd14f3366c73186314f182027217d0f70eba55817561de9e9a1f2c78bf5cbead',
      '0x2f9aa48c0c9f82aaac65d7a9374a52d9dc138ed100a5809ede57e70697f48b56',
      '0x2ae60afa54271cb421c12e4441c2dac0a25f25c9433a6d07cb32419e993fe344',
      '0xc765c091680f0434b74c44507b932e5c80f6e995a975a275e5b130af1de1064c',
      '0x59d2d6e0c4a5d07b169dbcdfa39dad7aea7b7783a814399f4f44c4a36b6336d3',
      '0xdd14d1387d10740187d71ad9500475399559c0922dbe2576882e61f1edd84692',
      '0x5412b8395509935406811ab3da43ab80be7acd8ffb5f398ab70f056ff3740f46',
      '0xeadab258ae7d779ce5f10fbb1bb0273116b8eccbf738ed878db570de78bed1e4',
      '0x6133aa40e6db75373b7cfc79e6f8b8ce80e441e6c1f98b85a593464dda3cf9c0',
      '0x5418948467112660639b932af9b1b212e40d71b24326b4606679d168a765af4f',
      '0x44f618505355c7e4e7c0f81d6bb15d2ec9cf9b366f9e1dc37db52745486e6b0f',
      '0xa410ee174a66a4d64f3c000b93efe15b5b1f3e39e962af2580fcd30bce07d039',
      '0x09c3eb05ac9552022a45c00d01a47cd56f95f94afdd4402299dba1291a17f976',
      '0x0e780f6acd081b07320a55208fa3e1d884e2e95cb13d1c98c74b7e853372c813',
      '0x2b60e8c21f78ef22fa4297f28f1d8c747181edfc465121b39c16be97d4fb8a04',
      '0xf24da95060a8598c06e9dfb3926e1a8c8bd8ec2c65be10e69323442840724888',
      '0x7e220fc095bcd2b0f5ef134d9620d89f6d7a1e8719ce8893bb9aff15e847578f',
      '0xcfe9e475c4bd32f1e36b2cc65a959c403c59979ff914fb629a64385b0c680a71',
      '0x25237fb8d1bfdc01ca5363ec3166a2b40789e38d5adcc8627801da683d2e1d76',
      '0x42647949fed0250139c01212d739d8c83d2852589ebc892d3490ae52e411432c',
      '0x34397a30930e6dd4fb5af48084afc5cfbe02c18dd9544b3faff4e2e90bf00cb9',
      '0xa028f33226adc3d1cb72b19eb6808dab9190b25066a45cacb5dfe5d640e57cf2',
      '0x7cff66ba47a05f932d06d168c294266dcb0d3943a4f2a4a75c860b9fd6e53092',
      '0x5ca1b32f1dbfadd83205882be5eb76f34c49e834726f5239905a0e70d0a5e0eb',
      '0x1b4b087a89e4eca6cdd237210932559dc8fd167d5f4f2d9acb13264e1e305479',
    ],
    ProofFlags: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      false,
      true,
    ],
    AllLeafs: [
      '0xa20c0244af79697a4ef4e2378c9d5d14cbd49ddab3427b12594c7cfa67a7f240',
      '0xde96f24fcf9ddd20c803dc9c5fba7c478a5598a08a0faa5f032c65823b8e26a3',
      '0x39f4dc61268f46171b8de12f7a6ca8bb23bf22a93c0ea9261839f3f71d4faff2',
      '0x28cfd52f539346ebb78513bd50f49f168d470a9df2e79cc0717ee1b4c38d8000',
      '0x9d81ac1c6681890a3e7eb39ab160b8ac6b043a85eefcee7b8e1dc96cdafe30d4',
      '0x00a62c7cc312e686af5d38ee8ee840cf9c5af8aaf0ffd043fa07ab51eed93c07',
      '0xf30b19ab58c830e963a9d98a9da7c1e996bcb93e257a43a80b918c83a4ebfcf8',
      '0xb56d5abbaf0e0b0474be94bbdbd0b38d1b0ded40d7aa175a81f167b57e8da56b',
      '0xe1303cffc3958a6b93e2dc04caf21f200ff5aa5be090c5013f37804b91488bc2',
      '0x3de96afb24ce2ac45a5595aa13d1a5163ae0b3c94cef6b2dc306b5966f32dfa5',
      '0x7d33bf9770c433524777f1bd0b8f1dd1a08d1d3a9e19805bef7ec5502278400d',
      '0x37ed540dddd8f74fe60bf6d02ed4efd33e49e56ee653276c4dae79759b5d9ae2',
      '0xb9ff06c0ff563a9f7e3c02ea8f9c75ed208de5dc624ddc63349c8d6120c3a3f2',
      '0x59392dae1aab1d8d70a0d178d1cd54b986a16bc9a3aea5ab867b20fe3c6f33c5',
      '0xf4e67ebcf3b010ec305d301ffd80ab41343e1277496feba6d5ef5d738c541399',
      '0x9ea3975ba3e7f0a89433ee09d537aab932d8fcda3067a1345abb604d9278b5c9',
      '0xbd6c4b9f11345ccbf09087e55ddfa728e9524bb46a0658fa4b68db948394ecc0',
      '0x6e4344f1d613636012786e00c406dd451a9b2e98ef7d9f465020007ff25ffaf1',
      '0xacadf7b4d13cd57c5d25f1d27be39b656347fe8f8e0de8db9c76d979dff57736',
      '0x90d80c76bccb44a91f4e16604976163aaa39e9a1588b0b24b33a61f1d4ba7bb5',
      '0x27ec94ed8110a675dd62b32f6d650e25c8f6a96a06c45f222d2ed898ed84d265',
      '0xee968e0469fb013c73fc3e6deb5f0574827c4472b73564d2fbe4ca9141aeeaa3',
      '0xc10c07051c594af50af1f10db471861ed8492dcbf2e27ad9a2c32c241da58a70',
      '0x583f022d5146e0b43585de916bfaaafec3d5b1009ed07f48e41bfec5d74bd40c',
      '0x37ff2a0b5604f8da4ca5e4df1afc3443a04ebaf53957303c8528c5a56ef7cc2c',
      '0xf67752adc69c6b07c9c364ff4e73e82bf69897d9b987f0f3f343263190437afb',
      '0x012a299b25539d513c8677ecf37968774e9e4b045e79737f48defd350224cdfd',
      '0xc21c26a709802fe1ae52a9cd8ad94d15bf142ded26314339cd87a13e5b468165',
      '0x3918aa13e33227a56131e30e24e8fa19a5a0f7963f42187ccd439aa1822abb1d',
      '0xd708ebc0282092f2833fcd2617644293eeff2205b0f4326f4e0e5d114cf8963a',
      '0xb757201ce72f4cb62673e341b4937b504dacbd33069f3e9cd8d615cb725299d5',
      '0xb83d65e66e5e9aa649298e72072a348d438f1ecd17fbdc372ca20fd8e2f9a0d4',
      '0x3caaef7bd402ab190c2d5f8f1b4537d1379dcd72c1f2242ad42ab33f5f6eef4f',
      '0x91794bb11e40b0f9c193faecad5ed20cb592bb680f26f1a80261b68ef4e2a428',
      '0xb7b647c4619a2cfcca0899276b59a127de823768b80040caa0413cd46d561303',
      '0x6e47bf594d386f48b7a68b8d300ef92ee42acbe438c6b2d728b7f12e475381a6',
      '0x55f6df03562738c9a6437cd9ad221c52b76906a175ae96188cff60e0a2a59933',
      '0x420a36c5a73f87d8fb98e70c48d0d6f9dd83f50b7b91416a6f5f91fac4db800f',
      '0xf5032107c473cca01685d4a61fb170cc5d41ba06cb4e42accb83c1938b59e32a',
      '0xf01540ccc96763aebc049b45bf77dda25065bc8e3458c63c712cce8ffe3d7ff8',
      '0x5d1d98f1b2317888ab218bab69e4edba2e6c0ea0ae7241a979f79f018dbaec61',
      '0x1606cbdd493727b2a31e2e4611b338e7e50d5c5dc78a5f13722139b7f8b4d641',
      '0xecbd3f113a1e26a575afaf21b6bd5e4d3740c454ea439311652931416b35817b',
      '0x0b44cdd086979b9f970456fb764e835287a3632f472d34dac3a0e2a835dbcb38',
      '0x5857d8d1b56abcd7f863cedd3c3f8677256f54d675be61f05efa45d6495fc30a',
      '0x2dbbe66452e43fec839dc65d5945aad6433d410c65863eaf1d876e1e0b06343c',
      '0x2984e63a379fbc5f9bd0b6c1f169684f349fc8ac3d6478c6326f4621f3cc546d',
      '0x836a62f1b511448d53add9dc2d90bafb55e5dce2338220d8d6350de7a50aaa78',
      '0x097528db67e37b0258cf620c9bc79a75fc6dc57398d91454f4d6f295266b7f42',
      '0xbde967257db5cbd1f17f1f83f6b9c27cd5d1b52d2ad83da44562a0923384203f',
      '0x8988c350b93a7579aabe9166d25991bfcd2f3e7cae2661f2193704125004b4c3',
      '0x7ecad5eef4197f0053adfb2484b0bf8b86ba14a42a664cf6502b9b5abfe4de4e',
      '0x0d53b1381977161a86344600b256976991c0f3f71a23f47128540bb608b5747e',
      '0x50598623e144b1093deef0cba52da289b6498423e7d4e787105c95cb8dbd61f2',
      '0x8beab00297b94bf079fcd5893b0a33ebf6b0ce862cd06be07c87d3c63e1c4acf',
      '0xbf176d20166fdeb72593ff97efec1ce6244af41ca46cf0bc902d19d50c446f7b',
      '0x9ea1a36d479f6fc813330faa612507d703509201a35bfca924da979cbe446795',
      '0x9d57d2bd51d95e4b664ccf5b6f488ca4ac292ca06154d4fd2e8b2419736d1bd9',
      '0x9dcd6f4aca4a18b368ef0d1b414042c870dd4474dd05e5d20beb5a2208f089f3',
      '0x9c781799fa7afdfeef6aade197215eaefdae867de2a9ba760c82680b69c5d3ac',
      '0x1178d580f83f56070416f4010f921c16fd0a349f9ac4b293f4c406bf04d4ed56',
      '0xe41b4039c728703d0990c891a27780980a76e2ac66689ab02ed354dce09c93c6',
      '0xa9221608e4380250a1815fb308632bce99f611a673d2e17fc617123fdc6afcd2',
      '0xcabdd3ad25daeb1e0541042f2ea4cd177f54e67aa4a2c697acd4bb682e94de59',
      '0x90477e09cbe64959062402ef59b476a63e8c0abe6db83789dc1815c04b577008',
      '0x44e8d1d2d387a53b1459fc2d580ed839dd33d85549853045c31f3b3fa1599ed0',
      '0x430f4670f1440bfd7e00a7e4760b941976b1a2caffb34ed62b527c4de59d4ed1',
      '0x5e1f65972b2e448e2fda593dc2a5f48977b946232032769342aa5fdfbd6a438e',
      '0xb036752be791643a5a6bd4ab00b8104d77a593cfb9c1112daed7c802ff4dd2f2',
      '0xdcf7198944789f7b9efd33d87a79678f5e69d6002bbe97dc1e7c9f39914cadd5',
      '0x43059d6be8221e70daf0c8b5aa6be79b0d38d159eef911abf8e2df2ee9fe71ee',
      '0xac42db8558daaf3e97ae1c9b8db3043ada086e1d553a367359ca46c82f0d00e0',
      '0x7e01d497203685e99e34df33d55465c66b2253fa1630ee2fe5c4997968e4a6fa',
      '0xbd14f3366c73186314f182027217d0f70eba55817561de9e9a1f2c78bf5cbead',
      '0x360efc8ed414c79827d7d08b238bba6826ef40376b2bb8238bab7e6f41ee8d74',
      '0x9a0310c18e8e854b8cdca8f4d4acffc3ab25ad4b01f766dede09a0f2a9276004',
      '0x05dc58315c6c1f14dc8c18fc8e5927c64099165235ef3ee8bcb63a75e8d3ece9',
      '0x94f2b91eb2d3ee554b4f137cda3ee53d48233c1677e7d8a87812baf8c204365c',
      '0x0dbf6f2468e8ba303ed619d4785bed45dc79e8f02ed75c742183bdb2e4d11f50',
      '0x70db678805975880030fe8c7e6a628e14922acb5d89c0661e177018386382631',
      '0x2f9aa48c0c9f82aaac65d7a9374a52d9dc138ed100a5809ede57e70697f48b56',
      '0x1a03d013f1e2fa9cc04f89c7528ac3216e3e096a1185d7247304e97c59f9661f',
      '0x34af4321f98b7550df7f711ad9a1c01d16c7c659fd0cd39f2309cbda25a19dbf',
      '0x8f3fda64b1517f7baafe945011792a4bb5e2fd2b4468b621e4e22e74aa461810',
      '0x49187054aeb539e1424f7bef222fa8c3137a6b0511b0e82dab50f04e8f92ea30',
      '0x92712640b456bc3794d5cf1b8b641ee6a350ccdd93bf77c9f79f7e13c4e04928',
      '0xc2505473b44aae8c5aa2fb89b34646bcfb01e86602985acc19c7e4e35c3a2acc',
      '0xb5f0f7fa974f432e4b48356a62f8289dc8dc7634c4a750b73098f5d622b8928b',
      '0x3464e3e5ee1f1b955aa78f3f7776122fe522f2de14903f05ec19464150b39ab5',
      '0x08e630d2eb3bc0c9afe47632460a02d8207b6957da55ba52859c99b2903a4c69',
      '0xf8cf2709ebc3a13a789ba0581eeedae68f9d822d65ee11cae99820fe3898799d',
      '0x59134d36fc3a568a0ba4e303178d29b05eb65ea3ab2b566161ad28140e4bbeb2',
      '0x82f00d10a6d3bd998fcf465f1bf12814f41876adc5feed332311b773d95f7b18',
      '0xe10e60fcf32a830b9d0b8cba423370791814b5d88052b5629a16d03f27ce3d63',
      '0x651376976c412ac46a7605ac4a567e596e3c73c0a5c53e8f18fab25223175e36',
      '0x78dae6a1b9affcef3ec6b281e9388e6174013defae8fa9595c263de1435456c1',
      '0x0016060e5ee9055e4f381ffab20a73f13d71f8d070f5653db0918d697e9fdbb4',
      '0xbb2aba69540dd3d7f627bcfaf0f868230b19096798e27a269ee512f855943118',
      '0x6835309ca5496c3ce6881165c0b5f1f4352310f3d69803aba41ba4434c8bdee1',
      '0x19fecaa01c43c54259561ab3ded3d61f27f0c8930b20a8533be8cacc233ed85e',
    ],
    ExpectedRoot: '0xd4f0f3c40a4d583d98c17d89e550b1143fe4d3d759f25ccc63131c90b183928e',
  },
]
