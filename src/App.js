import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Planner from "./pages/Planner";
import Navigation from "./pages/Navigation";
import Export from "./pages/Export";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/export" element={<Export />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
