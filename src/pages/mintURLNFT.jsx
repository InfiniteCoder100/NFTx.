import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { NFTStorage, File } from "nft.storage";
import NavBar from "../component/navBar/navbar";
import "./mintURLNFT.css";

// const API_KEY = process.env.NFT_STORAGE_KEY;

function MintFromURL() {
//   const client = new NFTStorage({ token: API_KEY });
  const location = useLocation();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(location.state.wallet);
  const [url, setURL] = useState("");

  function handleChange(event) {
    setURL(event.target.value);
  }

  async function submitImgURL() {
    console.log(url);

    navigate("/nftdetails", {
        state: {
            wallet: location.state.wallet,
            img: url,
        },
    });
  }

  
  return (
    <div className="mintURLPage">
      <NavBar wallet={walletAddress} />
      <h1 className="Heading">Mint an NFT from URL 😳</h1>
      <h3 className="HeadingText">
        Enter the URL of the image you want to mint as an NFT.
      </h3>
      <div className="urlInput">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Enter URL here"
          value={url}
        />
        <button className="URLButton" onClick={submitImgURL}>Submit Image</button>
      </div>
    </div>
  );
}

export default MintFromURL;
