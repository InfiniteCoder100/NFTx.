import React from "react";
import Wallet from "../component/walletConnect/wallet"; 
import "./homepage.css";
import nftHomepageImg from "./assets/nftHomepage.png";

function Homepage() {
  return (
    <div className="HomePage">
      <h1 className="Heading">Welcome to NFTx.</h1>
      <h2 className="TitleText">Minting Creativity Across 16 Chains with AI-Generated NFTs ⚡️</h2>
      <img className="HomePageImage" src={nftHomepageImg} alt="NFTx" />
      <h3 className="HeadingText">Connect your wallet to get started.</h3>
      <Wallet />
    </div>
  );
}

export default Homepage;