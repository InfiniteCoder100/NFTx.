import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage.jsx";
import MintOptions from "./pages/mintOptions.jsx";
import MintFromURL from "./pages/mintURLNFT";
import MintFromAI from "./pages/mintAINFT";
import NFTDetails from "./pages/nftDetails";
import Success from "./pages/success";
import SuccessPolygon from "./pages/successPolygon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/option" element={<MintOptions />} />
        <Route path="/urlnft" element={<MintFromURL />} />
        <Route path="/ainft" element={<MintFromAI />} />
        <Route path="/nftdetails" element={<NFTDetails />} />
        <Route path="/success" element={<Success />} />
        <Route path="/successpolygon" element={<SuccessPolygon />} />
      </Routes>
    </Router>
  );
}

export default App;
