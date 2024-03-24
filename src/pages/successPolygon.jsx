import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/navBar/navbar";
import "./success.css";

function SuccessPolygon() {
  const location = useLocation();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(location.state.wallet);
  const [nftData, setNFTData] = useState(location.state.nftDetail);
  const [metadataURL, setMetadataURL] = useState(location.state.metadataURL);
  const [openseas, setOpenseas] = useState(
    `https://testnets.opensea.io/${walletAddress}`
  );

  return (
    <div className="successPage">
      <NavBar wallet={walletAddress} />
      <h1 className="Heading">Your NFT Has Been Minted Successfully! 🎉</h1>
      <h3 className="HeadingText">
        Details of your Minted NFT are as follows:
      </h3>
      <div className="details">
        <h5>Chain: Polygon Mumbai</h5>
        <h5>Transaction Hash: {nftData.transactionHash}</h5>
        <h5>Block Number: {nftData.blockNum}</h5>
        <h5>
          Block Explorer:{" "}
          <a href={nftData.polygonScanLink}>{nftData.polygonScanLink}</a>
        </h5>
        <h5>
          View Your NFT Metadata uploaded using NFTStorage by Filecoin:{" "}
          <a href={metadataURL}>{metadataURL}</a>
        </h5>
        <h5>
          View Your NFT on Openseas Page: <a href={openseas}>{openseas}</a>{" "}
        </h5>
      </div>
    </div>
  );
}

export default SuccessPolygon;
