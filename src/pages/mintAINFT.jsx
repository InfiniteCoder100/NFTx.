import React from "react";
import { useState } from "react";
import "./mintAINFT.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../component/navBar/navbar";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Buffer } from "buffer";
import axios from "axios";

const API_KEY = process.env.REACT_APP_HUGGINGFACE_API_KEY;

function MintFromAI() {
  const location = useLocation();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState(location.state.wallet);
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setPrompt(event.target.value);
  }

  const generateImg = async (e) => {
    e.preventDefault();

    if (prompt === "" || prompt === null) {
      window.alert("Please provide a prompt.");
      return;
    }

    setIsWaiting(true);

    // Call AI API to generate a image based on description
    const imageData = await createImage();
    // console.log(imageData);

    setIsWaiting(false);
    setMessage("");
  };

  // Generating image from AI
  const createImage = async () => {
    setMessage("Generating Image...");

    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`;

    // Send the request
    const response = await axios({
      url: URL,
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        inputs: prompt,
        options: { wait_for_model: true },
      }),
      responseType: "arraybuffer",
    });

    // console.log(response);

    const type = response.headers["content-type"];
    const data = response.data;

    const base64data = Buffer.from(data).toString("base64");
    const img = `data:${type};base64,` + base64data;
    setImage(img);

    return data;
  };

  const submitImgURL = () => {
    if (image === null) {
      window.alert("Please generate an image first.");
      return;
    }

    navigate("/nftdetails", {
      state: {
        wallet: location.state.wallet,
        img: image,
      },
    });
  };

  return (
    <div className="mintAIPage">
      <NavBar wallet={walletAddress} />
      <h1 className="Heading">Mint an NFT using Generative AI 😱</h1>
      <h3 className="HeadingText">Enter Prompt to Generate Your Image</h3>
      <div className="image">
        {!isWaiting && image ? (
          <img src={image} alt="AI generated image" />
        ) : isWaiting ? (
          <div className="image__placeholder">
            <Spinner animation="border" />
            <p>{message}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="promptInput">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Enter prompt here"
          value={prompt}
        />
      </div>
      <div className="optionButton">
        <button className="AIButton" onClick={generateImg}>Generate Image</button>
        <button className="AIButton" onClick={submitImgURL}>Submit Image</button>
      </div>
    </div>
  );
}

export default MintFromAI;
