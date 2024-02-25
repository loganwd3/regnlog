import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Registration } from "./Components/Registration";
import { Login } from "./Components/Login";
import { Home } from "./Components/Home";
import { useState } from "react";
import { createContext } from "react";
import { Private } from "./Components/Private";

export const userContext = createContext();
function App() {
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(localStorage.getItem("logindata"))
  );

  // console.log(loggedUser);
  return (
    <div className="App">
      <HashRouter>
        <userContext.Provider value={{ loggedUser, setLoggedUser }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/home" element={<Private value={Home} />} />
          </Routes>
        </userContext.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
