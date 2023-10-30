import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSub = async (e) => {
    e.preventDefault();

    if (
      inputs.username === "" ||
      inputs.email === "" ||
      inputs.password === "" ||
      inputs.name === ""
    ) {
      setError("All fields are required");
      return;
    }
    if (inputs.password.length < 5) {
      setError("password must be 5 or more letters");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", inputs);
      navigate("/login");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Our Social</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam minus
            repellendus, v el incidunt tempore sed veniam aperiam ex eum labo re
            eius suscipit, maxime distinctio, unde id tene tur quasi explicabo
            soluta!
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>{error && error}</p>
            <button onClick={handleSub}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
