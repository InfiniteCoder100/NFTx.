import React from "react";
import jsonABI from "./abi.json";
const { ethers } = require("ethers");

const privateKey = process.env.REACT_APP_METAMASK_PRIVATE_KEY;

const QUICKNODE_HTTP_ENDPOINT =
  "https://attentive-thrilling-replica.matic-testnet.discover.quiknode.pro/44e62a91602f5065cb7f8e41f8cd0142568bf039/";
const provider = new ethers.providers.JsonRpcProvider(QUICKNODE_HTTP_ENDPOINT);

const contractAddress = "0x66e47a27241f38b8482c0ae95e55a535324f9f54";
const contractAbi = jsonABI;
const contractInstance = new ethers.Contract(
  contractAddress,
  contractAbi,
  provider
);

const wallet = new ethers.Wallet(privateKey, provider);

async function getGasPrice() {
  let feeData = (await provider.getGasPrice()).toNumber();
  return feeData;
}

async function getNonce(signer) {
  let nonce = await provider.getTransactionCount(wallet.address);
  return nonce;
}

async function mintNFT(address, URI) {
  try {
    const nonce = await getNonce(wallet);
    const gasFee = await getGasPrice();
    let rawTxn = await contractInstance.populateTransaction.safeMint(
      address,
      URI,
      {
        gasPrice: gasFee,
        nonce: nonce,
      }
    );
    console.log(
      "...Submitting transaction with gas price of:",
      ethers.utils.formatUnits(gasFee, "gwei"),
      " - & nonce:",
      nonce
    );
    let signedTxn = (await wallet).sendTransaction(rawTxn);
    let reciept = (await signedTxn).wait();
    if (reciept) {
      let transactionHash = (await signedTxn).hash;
      let blockNum = (await reciept).blockNumber;
      let polygonScanLink =
        "https://mumbai.polygonscan.com/tx/" + transactionHash;
      //   let openSeasLink =
      //     "https://testnets.opensea.io/assets/mumbai/" + transactionHash;
      console.log("Transaction is successful!!!");
      console.log("Transaction Hash: ", transactionHash);
      console.log("Block Number: ", blockNum);
      console.log("Polygon Scan Link: ", polygonScanLink);
      //   console.log("Open Seas Link: ", openSeasLink);
      const nftData = {
        transactionHash: transactionHash,
        blockNum: blockNum,
        polygonScanLink: polygonScanLink
      };
      return nftData;
    } else {
      console.log("Error submitting transaction");
      return null;
    }
  } catch (e) {
    console.log("Error Caught in Catch Statement: ", e);
    return null;
  }
}

export default mintNFT;
