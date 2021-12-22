const { genWallet, airDropSOL, getWalletBalance, transferSOL} = require("./solana.js");
const web3 = require('@solana/web3.js');

const genRandomNumber = () => {
    const min = 1;      
    const max = 5;
    return (Math.floor(Math.random() * (max-min)) + min);
}

const init = async () => {

    const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

    const userWallet = genWallet();
    const adminWallet = genWallet();

    console.log('wallets created')

    // await airDropSOL(userWallet.publicKey)
    //await airDropSOL(adminWallet.publicKey)

    const currBal = await getWalletBalance(userWallet._keypair.publicKey)

    console.log(`Your current wallet balance is ${currBal}`)

    return {userWallet,adminWallet}
}

module.exports ={
    init,
    genRandomNumber
}