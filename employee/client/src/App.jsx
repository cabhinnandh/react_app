import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AddDetails from "./components/AddDetails.jsx";
import ViewDetails from "./components/ViewDetails.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/add" element={<AddDetails />} />
        <Route path="/view" element={<ViewDetails />} />
      </Routes>
    </div>
  );
}

export default App;
