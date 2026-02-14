import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Navigation from "./pages/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/navigation" element={<Navigation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
