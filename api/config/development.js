'use strict';

module.exports = Object.freeze({
    whiteList: ["*"],

    googleCloud: {
        keyfile: {
            "type": "service_account",
            "project_id": "growth-c0b90",
            "private_key_id": "d76c6403746ca29ca7ef3e5f8be8207232a0f1e1",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCwbm5M4MpOfciC\n4qm7wotIUpOOBDOO4xQA6HTbJiDF56whBXwxF3tRQKamuhchTIM99cWM9YFMZ5GP\nYPhu65kxr0GB4/zYZuKxf3Eq7gKIIaMBxdJjqr6WLI9fJHx79cK+1b1eQxVlAyBH\n/6MTHufF7bX6WE7eTERx4ih8wd9w6RGmAJK83LlMh5t80i1YZpuw03fummLInB4H\ni8j14Eqy31UVQgrvTWEJKzWeLYTaDx+6LJTGdkYXwjGoj/QetY0Sriw5xYXhvy9H\ne1uvw69PSIoDvG2YzcbxHLDZ65RJyM+PRfA3CZHfMHXhSHieOu4CSnAdJwrgXkGw\nyq/vUn8vAgMBAAECggEAGVwGJq645YdW5tlFpGNWOdMEuokIECW7nlXLViSo2Ulv\niF+NdlD1vLwaOCTPZk3lH2bQOm6fYygP2BgMHYVnw6h5Nf5bPY+sTe8PiSgk3QRY\ntcyFbSYBtvw4r2hDLF4q29tFGONzk81bOn4YJoturRh56739uB4mSGhFgYksYMIi\nIbkKWheRgWM4jmr3RU2IiRQ41sgeB6YwrkE/la6AcwOlhS6pj77uoXf1e9WQB07H\n9jgVK//OIAj2DWJgY/R1YuN0ghsd47oyroyAd8JV/MPZegAA3HUyTtDs4oqnMo56\nztU0vA35tNH9vlDINKdc3LOcYy7+jfEeYBm+B7WOYQKBgQDnerYNlD/gwzmoHOFM\nxgj+3XJadOdryE/aSsI7jwLxPFVFkDf2RLC2f6C//epXCFiKNz3ygboHhZ+TViUi\n6UGdew4eUsdfqOFdPOhKq8UdOWYZkTL1uChyHXvvZ+fo/GBBYU2bAE/2s92IO9SM\nq/NO8JAg/567YbQosBicmVQvRQKBgQDDHuvWDwPM4QJ06A1rtOl3QGPH18+/5OX2\n3voX68EHPa8dTXx474R4FlodQSvrfE20I5jGB7mvvKnmOIipr4Fg/T3NLjRkpnBK\nB/zc8FnxqVjd3Os5k7xNN4xvmuZhWaWAcnQo0/KFBrLYVPFMb/RP7isdeFFeCSnR\nOW+1KHUR4wKBgESAGdPW5ThcTXmkYj/X8t2JJsgCBGHu+0J8ERKS9anx0sItNYJZ\nPXokNqvaNjjfLWRpiJl1Lln/fwOY4JB+On6h5cGveXSjg12WIp/GSSSm0cILJ+tz\nPfTXKM/mDcjytoFijBasdv1oqMwh+HpQgEYCBoTdYFnPRgMsaXweG72JAoGAQJwL\nka0VIBFd4+I3F3QnXqKGp9TxaORdtZpuC9+34jLtunE/Bzigj7cvDcLXzTky7bRf\n0SsbtHJve9k6f52q5LfWcAuds7pdMlZkx7AayGfAEm8lwMIHtzXuncIYCSJLKDY9\n+or8IkpujC3MXPgxWQpPYonFv7KfEzXGpKEJ6usCgYAQBkYs6B5XiZCb4DZlQnQq\njwieZ1BNYz4h66s7fxIDB60Aor+/GEaSmdlZtbYcM4kZYbkWI/EIwAxRA0Ewi/GI\nqR/NtUV6Bpfk+n0t2TuzfrrXjvkoTmbE6PViwQ9+++Q+7o38PUDsBBJpDWqJIZaT\n62/6DgIfwZ0yT2UH+7HDMg==\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-vjjxe@growth-c0b90.iam.gserviceaccount.com",
            "client_id": "104782751715151185459",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vjjxe%40growth-c0b90.iam.gserviceaccount.com"
        }
        ,
        databaseURL: "https://growth-c0b90.firebaseio.com",
    },

    jwt: {
        key: "SGF2ZSB0byBkZWFsIHdpdGggQmFzZTY0IGZvcm1hdD8gVGhlbiB0aGlzIHNpdGUgaXMgbWFkZSBmb3IgeW91ISBVc2UgdGhlIHN1cGVyIHNpbXBsZSBvbmxpbmUgZm9ybSBiZWxvdyB0byBkZWNvZGUgb3IgZW5jb2RlIHlvdXIgZGF0YS4gSWYgeW91J3JlIGludGVyZXN0ZWQgYWJvdXQgdGhlIGlubmVyIHdvcmtpbmdzIG9mIHRoZSBCYXNlNjQgZm9ybWF0LCBqdXN0IHJlYWQgdGhlIGRldGFpbGVkIGRlc2NyaXB0aW9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHBhZ2UuIFdlbGNvbWUh"
    },

    email: {
        emailName: "BEI ICO",
        emailAddress: "develop@momacoin.io",
        accessKeyId: "AKIAIQS2O5ERFCV25IZQ",
        secretAccessKey: '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',
        emailReceive: "develop@momacoin.io",
    },

    config: {
        mnemonic: 'canoe smile mouse issue maximum anxiety loyal simple wish guess doll focus',
        urlWeb3: 'https://ropsten.infura.io/5SwylsjmljrUPuDIiBpi',
        gasPrice: 5000000000,
        gasLimit: 210000,
        chainId: 3,
        serverAddress: "0x8898A37edB8D06E3484C4720F5686E09FF03d725",
        serverPrivateKey: new Buffer('9836c78926f7c1215c0eb37d43e0d0ac288606ede8ac126dc08f2bde8e19d51a'),
        contractABI: [{
            "constant": true,
            "inputs": [],
            "name": "version",
            "outputs": [{
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
            ],
            "name": "allowance",
            "outputs": [{
                "name": "remaining",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{
                "name": "",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{
                "name": "",
                "type": "string"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{
                "name": "_owner",
                "type": "address"
            }],
            "name": "balanceOf",
            "outputs": [{
                "name": "balance",
                "type": "uint256"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{
                "name": "",
                "type": "uint8"
            }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [{
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
            ],
            "name": "transfer",
            "outputs": [{
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
            ],
            "name": "approve",
            "outputs": [{
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            },
            {
                "name": "_extraData",
                "type": "bytes"
            }
            ],
            "name": "approveAndCall",
            "outputs": [{
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "fallback"
        },
        {
            "constant": false,
            "inputs": [{
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
            ],
            "name": "transferFrom",
            "outputs": [{
                "name": "success",
                "type": "bool"
            }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
        ]
    },
    encodeDecode: {
        baseSecret: "fsdfsdfsdfsdgvzxbcvnvbmfghfdyertegsdfdjghhhhyujhfdhsgdfgdfgdfhdfhfhfghfghgf128763912",
        baseContent: "TXtAzPOfceGVhQoYygxaldCMNZjnwvUpIEHFSbLKRBWJrmquDski",
        lengthBaseContent: 52
    },
});