import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home";
import { Charakters } from "./pages/Charakters";
import CreateCharacterPage from "./pages/CreateCharacter";

function App() {
  return (
    <>
      <Router>
        <div>
          <Link to="/" className="navbar">
            Home
          </Link>{" "}
          |{" "}
          <Link to="/Charakters" className="navbar">
            Charakters
          </Link>{" "}
          |{" "}
          <Link to="/Charakters/Create" className="navbar">
            Neuer Charakter
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/Charakters" element={<Charakters></Charakters>} />
          <Route
            path="/Charakters/Create"
            element={<CreateCharacterPage></CreateCharacterPage>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
