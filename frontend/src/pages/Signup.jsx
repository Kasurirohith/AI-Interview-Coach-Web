import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL =
  "https://ai-interview-coach-v2-1.onrender.com";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert(
        "Password must contain at least 6 characters"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        localStorage.setItem(
          "username",
          name
        );

        localStorage.setItem(
          "email",
          email
        );

        alert(
          "Account Created Successfully"
        );

        navigate("/");
      } else {
        alert(
          result.message ||
            "Unable to create account"
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Backend connection failed. Please try again."
      );
    } finally {
      setLoading(false);
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
            🚀
          </div>

          <h1 style={{ margin: "10px 0" }}>
            Create Account
          </h1>

          <p style={{ color: "#9ca3af" }}>
            Start your personalized AI interview
            preparation.
          </p>
        </div>

        <input
          className="input-box"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
          placeholder="Create Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="primary-btn"
          onClick={handleSignup}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#9ca3af",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#60a5fa",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;