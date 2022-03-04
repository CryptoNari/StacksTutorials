// Step 2: Generating an account

const { fetch } = require("cross-fetch");
const {
  makeRandomPrivKey,
  privateKeyToString,
  getAddressFromPrivateKey,
  TransactionVersion,
} = require("@stacks/transactions");
const {
  AccountsApi,
  FaucetsApi,
  Configuration,
} = require("@stacks/blockchain-api-client");

const apiConfig = new Configuration({
  fetchApi: fetch,
  // for mainnet, replace `testnet` with `mainnet`
  basePath: "https://stacks-node-api.testnet.stacks.co",
});

// Step 3: Reviewing account info

/* const privateKey = makeRandomPrivKey();


const stacksAddress = getAddressFromPrivateKey(
    privateKeyToString(privateKey),
    TransactionVersion.Testnet // remove for Mainnet addresses
  ); */

const stacksAddress = "ST0ANAYPAZ5A77ET8Q7V3NJ3S4WQ30TC2WCSQSS4"

const accounts = new AccountsApi(apiConfig);

async function getAccountInfo() {
  const accountInfo = await accounts.getAccountInfo({
    principal: stacksAddress,
  });
  
  return accountInfo;
}
// Disabling proofs
async function getAccountInfoWithoutProof() {
  const accountInfo = await accounts.getAccountInfo({
    principal: stacksAddress,
    proof: 0,
  });

  return accountInfo;
}

// step 4: Reviewing account history

async function runFaucetStx() {
  const faucets = new FaucetsApi(apiConfig);

  const faucetTx = await faucets.runFaucetStx({
    address: stacksAddress,
  });
  
  return faucetTx;
}

async function getAccountTransactions() {
  const history = await accounts.getAccountTransactions({
    principal: stacksAddress,
  });

  return history;
}

/* // handling pagintation
async function getAccountTransactions() {
  const history = await accounts.getAccountTransactions({
    principal: stacksAddress,
    limit: 50,  // < ---- number of list items returned
    offset: 50, // < ---- number of elements skipped
  });

  return history;
} */

// Step 5: Getting account balances

async function getAccountBalance() {
  const balances = await accounts.getAccountBalance({
    principal: stacksAddress,
  });

  return balances;
}

async function main() {
  const accountInfo = await getAccountInfo();
  console.log('---- Account Info : ----');
  console.log(accountInfo);
  console.log(accountInfo.results);

  /* const faucetInfo = await runFaucetStx();
  console.log('---- Run Faucet : ----');
  console.log(faucetInfo); */

  const balance = await getAccountBalance();
  console.log('---- Account Balance : ----');
  console.log(balance);


}

main();