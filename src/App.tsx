import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home";
import { Charakters } from "./pages/Charakters";
import { Starri } from "./Charakters/Starri";

function App() {
  return (
    <>
      <Router>
        <div>
          <Link to="/"></Link>
          <Link to="/Charakters"></Link>
          <Link to="/Charakters/Starri"></Link>
        </div>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/Charakters" element={<Charakters></Charakters>} />
          <Route path="/Charakters/Starri" element={<Starri></Starri>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
