
import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import{Link} from "react-router-dom";
import "./global.css";
import Homepage from "./Pages/Homepage";
import Loginpage from "./Pages/Loginpage";
import Header from "./Components/Header";

// ⭕ 올바른 코드
const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Header는 Routes 밖에 있어야 에러가 안 나고 모든 페이지에 공통으로 뜹니다 */}
      <Header email="test@example.com" /> 
      
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/login" element={<Loginpage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;