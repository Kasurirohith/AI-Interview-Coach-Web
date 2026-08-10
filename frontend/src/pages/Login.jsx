import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL =
  "https://ai-interview-coach-v2-1.onrender.com";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpinningUp, setIsSpinningUp] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const spinUpTimer = setTimeout(() => {
      setIsSpinningUp(true);
    }, 4000);

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        localStorage.setItem(
          "username",
          result.name
        );

        localStorage.setItem(
          "email",
          result.email
        );

        alert("Login Successful");

        navigate("/");
      } else {
        alert(
          result.message ||
            "Invalid email or password"
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Backend connection failed. Please wait for the server to wake up and try again."
      );
    } finally {
      clearTimeout(spinUpTimer);
      setLoading(false);
      setIsSpinningUp(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#111827",
          border: "1px solid #374151",
          borderRadius: "18px",
          padding: "35px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div style={{ fontSize: "45px" }}>
            🤖
          </div>

          <h1 style={{ margin: "10px 0" }}>
            Welcome Back
          </h1>

          <p style={{ color: "#9ca3af" }}>
            Login to continue your interview
            preparation.
          </p>
        </div>

        <input
          className="input-box"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          className="input-box"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          {loading
            ? "Logging In..."
            : "Login"}
        </button>

        {isSpinningUp && (
          <p
            style={{
              color: "#60a5fa",
              fontSize: "14px",
              marginTop: "15px",
              textAlign: "center",
              lineHeight: "1.5",
            }}
          >
            ⏳ Waking up server... This can take
            a little longer on the first request.
          </p>
        )}

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#9ca3af",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#60a5fa",
              fontWeight: "600",
            }}
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;