import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

function Login() {
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSub = async (e) => {
    e.preventDefault();

    if (inputs.username === "" || inputs.password === "") {
      setError("Both fields are required");
      return;
    }

    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam minus
            repellendus, v el incidunt tempore sed veniam aperiam ex eum labo re
            eius suscipit, maxime distinctio, unde id tene tur quasi explicabo
            soluta!
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <p style={{ color: "red" }}>{error && error}</p>
            <button onClick={handleSub}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
