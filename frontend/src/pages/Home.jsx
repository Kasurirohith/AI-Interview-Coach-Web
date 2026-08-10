import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [resumeName, setResumeName] = useState(
    localStorage.getItem("resumeName") || ""
  );

  const [atsScore, setAtsScore] = useState(
    Number(localStorage.getItem("atsScore")) || 0
  );

  const [uploading, setUploading] = useState(false);

  const calculateATS = (file) => {
    setUploading(true);

    setTimeout(() => {
      const score = Math.floor(
        Math.random() * 21 + 70
      );

      localStorage.setItem("resumeName", file.name);
      localStorage.setItem("atsScore", score);

      setResumeName(file.name);
      setAtsScore(score);
      setUploading(false);
    }, 800);
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or Word resume.");
      return;
    }

    calculateATS(file);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 25px",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      {/* Hero */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center",
          padding: "30px 20px 50px",
        }}
      >
        <div
          style={{
            fontSize: "60px",
            marginBottom: "10px",
          }}
        >
          🤖
        </div>

        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            margin: "0 0 15px",
            fontWeight: "800",
          }}
        >
          AI Interview Coach
        </h1>

        <p
          style={{
            maxWidth: "750px",
            margin: "0 auto",
            color: "#9ca3af",
            fontSize: "18px",
            lineHeight: "1.7",
          }}
        >
          Prepare smarter for your dream company with
          resume analysis, company-specific preparation,
          coding practice and AI interview preparation.
        </p>
      </section>

      {/* Resume ATS Section */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto 35px",
          background: "#111827",
          border: "1px solid #374151",
          borderRadius: "20px",
          padding: "35px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h2 style={{ marginBottom: "10px" }}>
            📄 Resume ATS Checker
          </h2>

          <p
            style={{
              color: "#9ca3af",
              margin: 0,
            }}
          >
            Upload your resume and check how prepared
            it is for applicant tracking systems.
          </p>
        </div>

        <label
          style={{
            display: "block",
            maxWidth: "500px",
            margin: "0 auto",
            padding: "25px",
            border: "2px dashed #374151",
            borderRadius: "14px",
            textAlign: "center",
            cursor: "pointer",
            background: "#1f2937",
          }}
        >
          <div
            style={{
              fontSize: "35px",
              marginBottom: "10px",
            }}
          >
            📤
          </div>

          <strong>
            {uploading
              ? "Analyzing Resume..."
              : "Upload Your Resume"}
          </strong>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "14px",
              marginBottom: 0,
            }}
          >
            PDF or DOC/DOCX
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeUpload}
            style={{ display: "none" }}
          />
        </label>

        {resumeName && !uploading && (
          <div
            style={{
              marginTop: "25px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#d1d5db",
                marginBottom: "15px",
              }}
            >
              📎 {resumeName}
            </p>

            <div
              style={{
                maxWidth: "500px",
                margin: "0 auto",
                background: "#1f2937",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <p
                style={{
                  color: "#9ca3af",
                  margin: "0 0 5px",
                }}
              >
                Current ATS Score
              </p>

              <div
                style={{
                  fontSize: "42px",
                  fontWeight: "800",
                  color:
                    atsScore >= 75
                      ? "#10b981"
                      : "#f59e0b",
                }}
              >
                {atsScore}%
              </div>
            </div>

            <button
              className="primary-btn"
              onClick={() => navigate("/report")}
              style={{
                marginTop: "20px",
              }}
            >
              📊 View Resume Report
            </button>
          </div>
        )}
      </section>

      {/* Company Preparation */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto 35px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h2>🎯 Choose Your Target Company</h2>

          <p style={{ color: "#9ca3af" }}>
            Select a company category and get a
            preparation dashboard tailored to that company.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Product */}
          <div
            style={{
              background: "#111827",
              border: "1px solid #374151",
              borderRadius: "18px",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "45px" }}>
              💻
            </div>

            <h2>Product-Based Companies</h2>

            <p
              style={{
                color: "#9ca3af",
                lineHeight: "1.6",
              }}
            >
              Google, Microsoft and Amazon with
              advanced DSA, algorithms, system design
              and coding preparation.
            </p>

            <button
              onClick={() =>
                navigate("/product-companies")
              }
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "15px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              🚀 Explore Product Companies
            </button>
          </div>

          {/* Service */}
          <div
            style={{
              background: "#111827",
              border: "1px solid #374151",
              borderRadius: "18px",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "45px" }}>
              🏢
            </div>

            <h2>Service-Based Companies</h2>

            <p
              style={{
                color: "#9ca3af",
                lineHeight: "1.6",
              }}
            >
              Cognizant, TCS, Infosys, Accenture,
              Capgemini and Deloitte with role-specific
              preparation.
            </p>

            <button
              onClick={() =>
                navigate("/service-companies")
              }
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "15px",
                background: "#059669",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              🚀 Explore Service Companies
            </button>
          </div>
        </div>
      </section>

      {/* Coding */}
      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto 40px",
          background: "#111827",
          border: "1px solid #374151",
          borderRadius: "18px",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "45px" }}>
          🧠
        </div>

        <h2>Daily Coding Practice</h2>

        <p
          style={{
            color: "#9ca3af",
            maxWidth: "650px",
            margin: "0 auto 20px",
            lineHeight: "1.6",
          }}
        >
          Practice Arrays, Strings, Linked Lists,
          Trees, Graphs and Dynamic Programming.
          Your selected company and preparation track
          can be used to guide your practice.
        </p>

        <button
          onClick={() => navigate("/coding")}
          style={{
            padding: "14px 30px",
            background: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "15px",
          }}
        >
          🧠 Start Coding Practice
        </button>
      </section>
    </div>
  );
}

export default Home;