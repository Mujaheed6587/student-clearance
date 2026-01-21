import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./components/Student/StudentDashboard";
import OfficerDashboard from "./components/Officer/OfficerDashboard";
import NotFound from "./pages/NotFound";
import StudentRegister from "./pages/StudentRegister";
function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Student Dashboard */}
      <Route path="/student" element={<StudentDashboard />} />

      {/* Officer Dashboard */}
      <Route path="/officer" element={<OfficerDashboard />} />

      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
       <Route path="/register" element={<StudentRegister />} />
    </Routes>
  );
}

export default App;
