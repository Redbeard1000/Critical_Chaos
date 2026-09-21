import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home";
import { Charakters } from "./pages/Charakters";
import { DM } from "./pages/DM";
import CreateCharacterPage from "./pages/CreateCharacter";
import CharacterDetails from "./pages/CharacterSheet";
import { BattleMap } from "./pages/BattleMap";
import { Monsters } from "./pages/Monsters";
import CreateMonster from "./pages/CreateMonster";

function App() {
  return (
    <>
      <Router>
        <div>
          <Link to="/" className="navbar">
            Home
          </Link>{" "}
          |{" "}
          <Link to="/DM" className="navbar">
            Dungeon Master
          </Link>{" "}
          |{" "}
          <Link to="/BattleMap" className="navbar">
            Kampf Runden
          </Link>{" "}
          |{" "}
          <Link to="/Charakters" className="navbar">
            Charakters
          </Link>{" "}
          |{" "}
          <Link to="/Charakters/Create" className="navbar">
            Neuer Charakter
          </Link>
          {" | "}
          <Link to="/Monsters" className="navbar">
            Monster
          </Link>{" "}
          |{" "}
          <Link to="/Monsters/Create" className="navbar">
            Neues Monster
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/DM" element={<DM></DM>} />
          <Route path="/BattleMap" element={<BattleMap></BattleMap>} />
          <Route path="/Charakters" element={<Charakters></Charakters>} />
          <Route
            path="/Charakters/:id"
            element={<CharacterDetails></CharacterDetails>}
          />
          <Route
            path="/Charakters/Create"
            element={<CreateCharacterPage></CreateCharacterPage>}
          />
          <Route path="/Monsters" element={<Monsters></Monsters>} />
          <Route path="/Monsters/Create" element={<CreateMonster />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
