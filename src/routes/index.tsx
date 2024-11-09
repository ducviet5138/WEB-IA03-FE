import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;