// import { useState } from "react";
// import { officers } from "../data/officers";
// import { students } from "../data/Student";
// import { useNavigate} from "react-router-dom";

// const Login = () => {
//     const [role, setrole] =
//     useState( "student");
//     const [regnumber, setregnumber] =
//     useState("");
//     const [ department,setdepartment] =
//     useState("");

//     const [username, setusername] =
//     useState("");
//     const[password,setpassword] =
//     useState("");
//     const[unit,setunit] =
//     useState("");
//     const navigate = useNavigate();

//   const handLogin = (e) => {
//     e.preventDefault();
//     if (role === "student") {
//         const student = students.find(
//             (s) =>
//                 s.regnumber === regnumber &&
//             s.department === department
//         );
//         if (student) {
//             navigate("/student/dashboard");
//         } else {
//             alert("invalid student details");
//         }
//     }
//   }  
//    if(role === "officer") {
//     const officer = officers.find(
//         (o) =>
//             o.username === username &&
//             o.password === password &&
//             o.unit === unit
//     );
//     if (officer) {
//         navigate("/officer/dashboard");
//     } else {
//         alert("invalid officer details");
//    }
// };
//     return (
//     <div className="login-container">
//         <h2>Student Clearance System</h2>
//         <select value={role} onChange={(e) => setrole(e.target.value)}>
//             <option 
//             value="student">Student</option>
//             <option
//                 value="officer">Officer</option>
//         </select>
//         <form onSubmit={handLogin}>
//             {role === "student" && ( <>
//                 <input
//                     type="text"
//                     placeholder="Registration Number"
//                     value={regnumber}
//                     onChange={(e) => setregnumber(e.target.value)} />
//                 <input
//                     type="text"
//                     placeholder="Department"
//                     value={department}
//                     onChange={(e) => setdepartment(e.target.value)} />
//             </> )}
//             {role === "officer" && ( <>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setusername(e.target.value)} />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setpassword(e.target.value)} />
//                 <select
//                     value={unit}
//                     onChange={(e) => setunit(e.target.value)}>
//                     <option value="">Select Unit</option>
//                     <option value="library">Library</option>
//                     <option value="bursary">Bursary</option>
//                     <option value="Department">Department</option>
//                 </select>
//             </> )}
//             <button type="submit">Login</button>
//         </form>
//     </div>
//     );
// };
// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { officers } from "../data/officers";

const Login = () => {
  const [role, setRole] = useState("student");

  // Student states
  const [regnumber, setRegnumber] = useState("");
  const [password, setPassword] = useState("");

  // Officer states
  const [username, setUsername] = useState("");
  const [unit, setUnit] = useState("");
  const [officerPassword, setOfficerPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    /* ================= STUDENT LOGIN ================= */
    if (role === "student") {
      const students =
        JSON.parse(localStorage.getItem("students")) || [];

      const student = students.find(
        (s) =>
          s.regnumber.toUpperCase() === regnumber &&
          s.password.toUpperCase() === password
      );

      if (student) {
        // Save logged-in student (optional but useful)
        localStorage.setItem(
          "currentStudent",
          JSON.stringify(student)
        );

        navigate("/student/dashboard");
      } else {
        alert("Invalid login details or student not registered");
      }
    }

    /* ================= OFFICER LOGIN ================= */
    if (role === "officer") {
      const officer = officers.find(
        (o) =>
          o.username === username &&
          o.password === officerPassword &&
          o.unit === unit
      );

      if (officer) {
        localStorage.setItem(
          "currentOfficer",
          JSON.stringify(officer)
        );

        navigate("/officer/dashboard");
      } else {
        alert("Invalid officer login details");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Student Clearance System</h2>

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="officer">Officer</option>
      </select>

      <form onSubmit={handleLogin}>
        {role === "student" && (
          <>
            <input
              type="text"
              placeholder="Registration Number"
              value={regnumber}
              onChange={(e) => setRegnumber(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {role === "officer" && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={officerPassword}
              onChange={(e) => setOfficerPassword(e.target.value)}
            />

            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="">Select Unit</option>
              <option value="library">Library</option>
              <option value="bursary">Bursary</option>
              <option value="department">Department</option>
            </select>
          </>
        )}

        <button type="submit">Login</button>
      </form>

      {role === "student" && (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#2b6cb0", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      )}
    </div>
  );
};

export default Login;
