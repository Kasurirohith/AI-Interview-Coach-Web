import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") !== "light"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const logout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("username");
    localStorage.removeItem("email");

    navigate("/");
  };

  return (
    <nav
      style={{
        width: "100%",
        minHeight: "75px",
        padding: "12px 30px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        background: "#111827",
        borderBottom: "1px solid #1f2937",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <h1
          className="logo"
          style={{
            cursor: "pointer",
            margin: 0,
            whiteSpace: "nowrap",
            fontSize: "22px",
          }}
        >
          🤖 AI Interview Coach
        </h1>
      </Link>

      {/* Navigation */}
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "22px",
          listStyle: "none",
          margin: 0,
          padding: 0,
          flexWrap: "wrap",
        }}
      >
        <li>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "600",
            }}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/product-companies"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "600",
            }}
          >
            Product Companies
          </Link>
        </li>

        <li>
          <Link
            to="/service-companies"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "600",
            }}
          >
            Service Companies
          </Link>
        </li>

        <li>
          <Link
            to="/coding"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "600",
            }}
          >
            Coding Practice
          </Link>
        </li>
      </ul>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Theme Toggle */}
        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
          title={
            darkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            background: darkMode ? "#1f2937" : "#ffffff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Logged In User */}
        {username ? (
          <>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,#60a5fa,#a855f7)",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "700",
                fontSize: "17px",
              }}
            >
              {username.charAt(0).toUpperCase()}
            </div>

            <span
              style={{
                color: "#60a5fa",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              {username}
            </span>

            <button
              className="login-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
            >
              <button className="login-btn">
                Login
              </button>
            </Link>

            <Link
              to="/signup"
              style={{ textDecoration: "none" }}
            >
              <button className="login-btn">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;