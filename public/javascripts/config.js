var dbContract;

var productContract;

var parents = [];

var childs = [];

var listActions = [];

var web3 = require('web3');

var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
if (web3.isConnected())
    console.log("ok");

var db_contract = '0xd4713E2Dde2926F12A8bBd78201b2D416A352C11';

var abiDatabase = [ { "constant": true, "inputs": [ { "name": "_handler", "type": "address" } ], "name": "getCountProductOfOwner", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_name", "type": "bytes32" }, { "name": "_parentProducts", "type": "address[]" }, { "name": "_unit", "type": "bytes32" }, { "name": "_amount", "type": "uint256" }, { "name": "_ratio", "type": "uint256" }, { "name": "_handler", "type": "address" } ], "name": "createProduct", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_handler", "type": "address" }, { "name": "idx", "type": "uint256" } ], "name": "getProductOfOwnerByAddress", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "products", "outputs": [ { "name": "", "type": "address", "value": "0x4b00f766a9785d4b7b69f09932d23d207f199d8e" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "productAddress", "type": "address" } ], "name": "storeProductReference", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "uint256" } ], "name": "productOfOwner", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCountProduct", "outputs": [ { "name": "", "type": "uint256", "value": "5" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_handler", "type": "address" }, { "name": "_pro", "type": "address" } ], "name": "AddlistProductOfOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getAddressProduct", "outputs": [ { "name": "", "type": "address", "value": "0x4b00f766a9785d4b7b69f09932d23d207f199d8e" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": false, "stateMutability": "nonpayable", "type": "fallback" } ];
var abiProduct  = [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "bytes32", "value": "0x7269636500000000000000000000000000000000000000000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newOwner", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "childProducts", "outputs": [ { "name": "", "type": "address", "value": "0x3ffe779402a0528231d2163554de9c992e0caf1a" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" } ], "name": "setAmount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "DATABASE_CONTRACT", "outputs": [ { "name": "", "type": "address", "value": "0xd4713e2dde2926f12a8bbd78201b2d416a352c11" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCountAction", "outputs": [ { "name": "", "type": "uint256", "value": "3" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getConsumed", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCountParent", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newProductAddress", "type": "address" }, { "name": "ratioToProduct", "type": "uint256" } ], "name": "collaborateInMerge", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getAddressChildByIdx", "outputs": [ { "name": "", "type": "address", "value": "0x3ffe779402a0528231d2163554de9c992e0caf1a" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "isConsumed", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "actions", "outputs": [ { "name": "description", "type": "string", "value": "Product creation" }, { "name": "timestamp", "type": "uint256", "value": "1514860236" }, { "name": "ratio", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [ { "name": "", "type": "address", "value": "0xe6d43a62976401b571d8f78e6a4534bdba896ef5" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0xe6d43a62976401b571d8f78e6a4534bdba896ef5" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "otherProducts", "type": "address[]" }, { "name": "newProductName", "type": "bytes32" }, { "name": "ratioToProduct", "type": "uint256[]" }, { "name": "newProductAmount", "type": "uint256" }, { "name": "newProductUnit", "type": "bytes32" } ], "name": "merge", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "unit", "outputs": [ { "name": "", "type": "bytes32", "value": "0x6300000000000000000000000000000000000000000000000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_newAmount", "type": "uint256" } ], "name": "setNewAmount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "amount", "outputs": [ { "name": "", "type": "uint256", "value": "920" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getAction", "outputs": [ { "name": "", "type": "string", "value": "Product creation" }, { "name": "", "type": "uint256", "value": "1514860236" }, { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_consumed", "type": "bool" } ], "name": "setConsumed", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getCountChild", "outputs": [ { "name": "", "type": "uint256", "value": "4" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getAmount", "outputs": [ { "name": "", "type": "uint256", "value": "920" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "idx", "type": "uint256" } ], "name": "getAddressParentByIdx", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "parentProducts", "outputs": [ { "name": "", "type": "address", "value": "0x" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newProductsNames", "type": "bytes32[]" }, { "name": "units", "type": "bytes32[]" }, { "name": "amounts", "type": "uint256[]" }, { "name": "ratios", "type": "uint256[]" } ], "name": "addAction", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_name", "type": "bytes32", "index": 0, "typeShort": "bytes", "bits": "32", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;name", "template": "elements_input_bytes", "value": "0x72696365" }, { "name": "_parentProducts", "type": "address[]", "index": 1, "typeShort": "address", "bits": "[]", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;parent Products", "template": "elements_input_json", "value": [] }, { "name": "_unit", "type": "bytes32", "index": 2, "typeShort": "bytes", "bits": "32", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;unit", "template": "elements_input_bytes", "value": "0x63" }, { "name": "_amount", "type": "uint256", "index": 3, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;amount", "template": "elements_input_uint", "value": "1000" }, { "name": "_ratio", "type": "uint256", "index": 4, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;ratio", "template": "elements_input_uint", "value": "" }, { "name": "handler", "type": "address", "index": 5, "typeShort": "address", "bits": "", "displayName": "handler", "template": "elements_input_address", "value": "0xE6d43A62976401B571D8F78e6a4534bDBA896ef5" }, { "name": "_DATABASE_CONTRACT", "type": "address", "index": 6, "typeShort": "address", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp; D A T A B A S E&thinsp;<span class=\"punctuation\">_</span>&thinsp; C O N T R A C T", "template": "elements_input_address", "value": "0xd4713E2Dde2926F12A8bBd78201b2D416A352C11" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": false, "stateMutability": "nonpayable", "type": "fallback" } ];

function checkPassword(accountExcuse,password)
{
    var check = web3.personal.unlockAccount(accountExcuse, password);
    //console.log("check "+check);
    return check;
}