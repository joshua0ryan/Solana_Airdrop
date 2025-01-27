const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
   } = require("@solana/web3.js");

   const newPair = new Keypair();
   console.log(newPair);

   const publickey= new PublicKey(newPair._keypair.publicKey).toString();
   const secretKey = newPair._keypair.secretKey

   const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
         );
         console.log(`=> For wallet address ${DzepEPWiVBKXSXdwhVJwjkkKaKqC3BBkV8X3NgETVBm9}`);
        console.log(`   Wallet balance: ${parseInt(0)/LAMPORTS_PER_SOL}SOL`);
    } 
    catch (err) {
        console.log(err);
    }
};

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        console.log(`-- Airdropping 2 SOL --`)
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

const driverFunction = async()=>{
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance(1000);
}

driverFunction();
