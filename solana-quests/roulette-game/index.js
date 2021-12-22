const { genWallet, airDropSOL, getWalletBalance, transferSOL} = require("./solana.js");
const {init,genRandomNumber} = require('./helper.js');
const readline = require("readline");

const game = async ()=>{

    const {userWallet,adminWallet} = await init();

    let stakedAmt,chosenNum;

    console.log('The maximum amount to be staked is 2 SOL');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('What is the amount you want to stake?: ', async amt =>{
        stakedAmt = amt;
        rl.question('Choose a number between 1 and 5: ', async num => {
            chosenNum = num;
            randNum = genRandomNumber();

            console.log('random num: ',randNum)

            //win
            if( chosenNum == randNum){
                console.log(`Yaay! you've guessed the correct number. ${stakedAmt} will be transfered to your wallet.`);
                await airDropSOL(adminWallet.publicKey);
                await transferSOL(adminWallet,userWallet,stakedAmt);
            }
            //loss
            else{
                console.log(`Better luck next time. ${stakedAmt} will be deducted from your wallet.`);
                await airDropSOL(userWallet.publicKey)
                await transferSOL(userWallet,adminWallet,stakedAmt);
            }
            
            const currBal = await getWalletBalance(userWallet.publicKey)
            console.log('Your current balance is: '+currBal)

            rl.close()
        })
    })

    rl.on('close',()=>{
        console.log('BYE BYE!!')
    })
}

game();