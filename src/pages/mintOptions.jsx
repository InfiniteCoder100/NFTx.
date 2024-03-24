import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./mintOptions.css";
import NavBar from "../component/navBar/navbar";

function MintOptions() {
  const location = useLocation();
  const navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState(location.state.wallet);

  function mintFromURL() {
    navigate("/urlnft", {
      state: {
        wallet: walletAddress,
      },
    });
  }

  function mintFromAI() {
    navigate("/ainft", {
      state: {
        wallet: walletAddress,
      },
    });
  }

  return (
    <div className="mintOptionsPage">
      <NavBar wallet={walletAddress} />
      <h1 className="Heading">How do you want to generate NFT Image?</h1>
      <h2 className="optionTitle">With NFTx, you could easily mint an NFT using Generative AI or Image URL 🚀</h2>
      <h3 className="HeadingText">How do you want to mint your NFT?</h3>
      <div className="optionButton">
        <button className="nftmintOptionButton" onClick={mintFromURL}>Mint an NFT from URL</button>
        <button className="nftmintOptionButton" onClick={mintFromAI}>Mint an NFT using Generative AI</button>
      </div>
    </div>
  );
}

export default MintOptions;
