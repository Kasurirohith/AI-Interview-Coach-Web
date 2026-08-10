import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import CodingPractice from "./components/CodingPractice";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductCompanies from "./pages/ProductCompanies";
import ServiceCompanies from "./pages/ServiceCompanies";
import CompanyDetails from "./pages/CompanyDetails";
import Report from "./pages/Report";

// Footer Component
function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "25px 20px",
        background: "#111827",
        borderTop: "1px solid #1f2937",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "auto",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontWeight: "500",
          color: "#9ca3af",
          marginBottom: "6px",
          letterSpacing: "0.5px",
        }}
      >
        AI-Powered Interview Coach and Career Intelligence Platform
      </div>

      <div
        style={{
          fontSize: "14px",
          color: "#60a5fa",
          fontWeight: "600",
        }}
      >
        Developed By Kasuri Rohith | B.Tech Computer Science & Engineering
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/product-companies"
              element={<ProductCompanies />}
            />
            <Route
              path="/service-companies"
              element={<ServiceCompanies />}
            />
            <Route
              path="/company/:name"
              element={<CompanyDetails />}
            />
            <Route
              path="/coding"
              element={<CodingPractice />}
            />
            <Route
              path="/report"
              element={<Report />}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;