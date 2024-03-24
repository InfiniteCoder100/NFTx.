import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import "./wallet.css";
import { useNavigate } from "react-router-dom";

function Wallet() {
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  async function requestAccount() {
    console.log("Requesting account...");

    // ❌ Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("metamask detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        navigate("/option", {
          state: {
            wallet: accounts[0],
          },
        });
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("metamask not detected");
    }
  }

  //   // Create a provider to interact with a smart contract
  //   async function connectWallet() {
  //     if (typeof window.ethereum !== "undefined") {
  //       await requestAccount();

  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     }
  //   }

  return (
    <div className="walletButton">
      <button className="connectButton" onClick={requestAccount}>Connect Wallet</button>
      {/* <p>{walletAddress}</p> */}
    </div>
  );
}

export default Wallet;
