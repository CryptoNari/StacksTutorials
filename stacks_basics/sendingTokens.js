import fetch from "cross-fetch";
const BN = require("bn.js");
const {
  makeSTXTokenTransfer,
  createStacksPrivateKey,
  broadcastTransaction,
  estimateTransfer,
  getNonce,
  privateKeyToString,
} = require("@stacks/transactions");
const { StacksTestnet, StacksMainnet } = require("@stacks/network");
const {
  TransactionsApi,
  Configuration,
} = require("@stacks/blockchain-api-client");

const apiConfig = new Configuration({
  fetchApi: fetch,
  // for mainnet, replace `testnet` with `mainnet`
  basePath: "https://stacks-node-api.testnet.stacks.co",
});

// Specifying a sender

const key =
  "edf9aee84d9b7abc145504dde6726c64f369d37ee34ded868fabd876c26570bc01";
const senderKey = createStacksPrivateKey(key);

// Generating Transactions

const recipient = 'SP3FGQ8Z7JY9BWYZ5WM53E0M9NK7WHJF0691NZ159';

// amount of Stacks (STX) tokens to send (in micro-STX). 1,000,000 micro-STX are worth 1 Stacks (STX) token
const amount = new BN(1000000);

// skip automatic fee estimation
const fee = new BN(2000);

// skip automatic nonce lookup
const nonce = new BN(0);

// override default setting to broadcast to the Testnet network
// for mainnet, use `StacksMainnet()`
const network = new StacksTestnet();

const memo = 'hello world';

const txOptions = {
  recipient,
  amount,
  fee,
  nonce,
  senderKey: privateKeyToString(senderKey),
  network,
  memo,
};


const transaction = await makeSTXTokenTransfer(txOptions);


// Estimating Gas Fees
// get fee
const feeEstimate = estimateTransfer(transaction);

// set fee manually
transaction.setFee(feeEstimate);

// Handling nonces
const senderAddress = "SJ2FYQ8Z7JY9BWYZ5WM53SKR6CK7WHJF0691NZ942";

const senderNonce = getNonce(senderAddress);

// Broadcasting transactions
const serializedTx = transaction.serialize().toString("hex");

//  Checking completion
const transactions = new TransactionsApi(apiConfig);

const txInfo = await transactions.getTransactionById({
  txId,
});

console.log(txInfo);

