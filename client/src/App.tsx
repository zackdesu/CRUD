import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateProfile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProfile />} />
        <Route path="/:id/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
