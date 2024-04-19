export const CONTRACT_ABI=[
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "CID",
                "type": "string"
            },
            {
                "internalType": "uint8",
                "name": "flag",
                "type": "uint8"
            }
        ],
        "name": "commitFilePermission",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "host",
                "type": "address"
            }
        ],
        "name": "getCommonFilescid",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "CID",
                "type": "string"
            }
        ],
        "name": "getKey",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "listMyFiles",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "CID",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "key",
                "type": "string"
            }
        ],
        "name": "uploadCID",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];