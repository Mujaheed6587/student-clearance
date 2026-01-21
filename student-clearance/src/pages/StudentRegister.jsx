import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const [regnumber, setRegnumber] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Validate registration number format and range
    const pattern = /^UG22\/SCCS\/(\d{4})$/i;
    const match = regnumber.match(pattern);

    if (!match) {
      alert("Invalid registration number format");
      return;
    }

    const number = parseInt(match[1], 10);
    if (number < 1001 || number > 1999) {
      alert("Registration number not allowed");
      return;
    }

    if (
      name.trim() === "" ||
      department.trim() === "" ||
      password.trim() === ""
    ) {
      alert("All fields are required");
      return;
    }

    // Get existing students
    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    // Check if already registered
    const exists = students.find(
      (s) => s.regnumber === regnumber
    );

    if (exists) {
      alert("Student already registered");
      return;
    }

    // Save student
    students.push({
      regnumber,
      name,
      department,
      password,
      clearance: {
        library: false,
        bursary: false,
        department: false,
      },
    });

    localStorage.setItem("students", JSON.stringify(students));

    alert("Registration successful. Please login.");
    navigate("/login");
  };

  return (
    <div className="login-container">
      <h2>Student Registration</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Registration Number (UG22/SCCS/1001)"
          value={regnumber}
          onChange={(e) => setRegnumber(e.target.value)}
        />

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default StudentRegister;
