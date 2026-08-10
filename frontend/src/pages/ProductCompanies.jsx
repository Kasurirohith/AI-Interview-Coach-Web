import { useNavigate } from "react-router-dom";

function ProductCompanies() {
  const navigate = useNavigate();

  const companies = [
    {
      name: "Google",
      focus: [
        "Advanced DSA",
        "Algorithms",
        "System Design",
        "Problem Solving",
      ],
      difficulty: "Hard",
      roles: [
        "Software Engineer",
        "SDE",
      ],
      description:
        "Prepare for Google's coding, algorithms, system design and behavioral interview focus.",
    },
    {
      name: "Microsoft",
      focus: [
        "DSA",
        "Algorithms",
        "OOP",
        "System Design",
      ],
      difficulty: "Hard",
      roles: [
        "Software Engineer",
        "SDE",
      ],
      description:
        "Prepare for Microsoft technical interviews with strong DSA, coding and system design practice.",
    },
    {
      name: "Amazon",
      focus: [
        "DSA",
        "Problem Solving",
        "Leadership Principles",
        "System Design",
      ],
      difficulty: "Medium-Hard",
      roles: [
        "SDE-1",
        "Software Development",
      ],
      description:
        "Prepare for Amazon coding, problem solving, system design and behavioral interviews.",
    },
  ];

  const openCompany = (company) => {
    localStorage.setItem(
      "selectedCompany",
      company.name
    );

    localStorage.setItem(
      "targetCompany",
      company.name
    );

    localStorage.setItem(
      "companyCategory",
      "Product Based"
    );

    navigate(
      `/company/${encodeURIComponent(
        company.name
      )}`
    );
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
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto 45px",
          }}
        >
          <div
            style={{
              fontSize: "50px",
              marginBottom: "10px",
            }}
          >
            💻
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3rem)",
              margin: "0 0 12px",
            }}
          >
            Product-Based Companies
          </h1>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "17px",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            Select your target company and get a
            preparation path designed around its
            interview requirements.
          </p>
        </div>

        {/* Companies */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
          }}
        >
          {companies.map((company) => (
            <div
              key={company.name}
              style={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "18px",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  marginBottom: "8px",
                }}
              >
                {company.name}
              </h2>

              <span
                style={{
                  display: "inline-block",
                  width: "fit-content",
                  background: "#1e3a8a",
                  color: "#93c5fd",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "18px",
                }}
              >
                Product Based
              </span>

              <p
                style={{
                  color: "#9ca3af",
                  lineHeight: "1.6",
                  minHeight: "75px",
                }}
              >
                {company.description}
              </p>

              {/* Difficulty */}
              <div
                style={{
                  background: "#1f2937",
                  borderRadius: "10px",
                  padding: "12px",
                  marginTop: "10px",
                }}
              >
                <span
                  style={{
                    color: "#9ca3af",
                  }}
                >
                  Interview Difficulty
                </span>

                <strong
                  style={{
                    display: "block",
                    marginTop: "5px",
                    color: "#f59e0b",
                  }}
                >
                  {company.difficulty}
                </strong>
              </div>

              {/* Roles */}
              <div style={{ marginTop: "18px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    marginBottom: "10px",
                  }}
                >
                  🎯 Preparation Tracks
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {company.roles.map((role) => (
                    <span
                      key={role}
                      style={{
                        background: "#1f2937",
                        border:
                          "1px solid #374151",
                        padding: "7px 10px",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Focus */}
              <div style={{ marginTop: "20px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    marginBottom: "10px",
                  }}
                >
                  📚 Main Preparation Areas
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {company.focus.map((item) => (
                    <span
                      key={item}
                      style={{
                        background: "#172554",
                        color: "#bfdbfe",
                        padding: "7px 10px",
                        borderRadius: "8px",
                        fontSize: "13px",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  openCompany(company)
                }
                style={{
                  marginTop: "25px",
                  width: "100%",
                  padding: "14px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                🚀 Open {company.name} Preparation
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCompanies;