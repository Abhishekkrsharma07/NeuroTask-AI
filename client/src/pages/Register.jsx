import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) return alert("All fields required");

    try {
      const data = await registerUser({ name, email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="container">

      <div className="card" style={{ maxWidth: "400px", margin: "100px auto" }}>
        <h2>Register</h2>

        <form onSubmit={handleRegister}>
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button>Register</button>
        </form>
      </div>

    </div>
  );
}

export default Register;