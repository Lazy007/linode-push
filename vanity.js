var ethers = require('ethers');
var crypto = require('crypto');
let scanCount = 0;

function genEth(address) {
    scanCount += 1;
    var privateKey = crypto.randomBytes(32).toString('hex');
    var wallet = new ethers.Wallet(privateKey);
    console.log("Address: " + wallet.address);
    if (address === wallet) {
        console.log("SAVE BUT DO NOT SHARE THIS:", privateKey);
    } else {
        console.log(scanCount + " address: " + wallet + "priv: " + privateKey)
        genEth(address)
    }
}