
import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import{Link} from "react-router-dom";
import "./global.css";
import Homepage from "./Pages/Homepage";
import Loginpage from "./Pages/Loginpage";
import Header from "./Components/Header";
import Lifecycle from "./Pages/lifecycle";  
import Register from "./Components/register";
import Fetch from "./Pages/fetch";
import Pluspage from "./Pages/pluspage";
import Minuspage from "./Pages/minuspage";



const App: React.FC = () => {
  return (
    <BrowserRouter>
     <Header email="test@example.com" isLoggedIn={true} /> 
      <Routes>
       
        <Route path="/" element={<Homepage />} /> 
        <Route path="/login" element={<Loginpage />} /> 
        <Route path="/lifecycle" element={<Lifecycle />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/fetch" element={<Fetch />} />
        <Route path="/pluspage" element={<Pluspage />} />
        <Route path="/minuspage" element={<Minuspage />} />   

      </Routes>
    </BrowserRouter>
  );
}

export default App;