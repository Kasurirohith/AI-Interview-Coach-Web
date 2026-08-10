import { useNavigate } from "react-router-dom";

function ServiceCompanies() {
  const navigate = useNavigate();

  const companies = [
    {
      name: "Cognizant",
      focus: [
        "GenC",
        "GenC Pro",
        "GenC Next",
        "SQL",
        "Java / Python",
        "Web Technologies",
        "Communication",
      ],
      difficulty: "Medium",
      roles: [
        "GenC",
        "GenC Pro",
        "GenC Next",
      ],
      description:
        "Prepare for Cognizant drives with role-based programming, SQL, web, communication and interview preparation.",
    },
    {
      name: "TCS",
      focus: [
        "Ninja",
        "Digital",
        "Prime",
        "Coding",
        "SQL",
        "Java / Python",
        "Core CS",
      ],
      difficulty: "Easy-Medium",
      roles: [
        "Ninja",
        "Digital",
        "Prime",
      ],
      description:
        "Prepare for TCS with track-based coding, SQL, programming, aptitude and core computer science preparation.",
    },
    {
      name: "Infosys",
      focus: [
        "System Engineer",
        "Specialist Programmer",
        "Java / Python",
        "SQL",
        "DSA",
        "DBMS",
      ],
      difficulty: "Medium",
      roles: [
        "System Engineer",
        "Specialist Programmer",
      ],
      description:
        "Build an Infosys-focused preparation plan covering programming, SQL, DSA, DBMS and technical interviews.",
    },
    {
      name: "Accenture",
      focus: [
        "ASE",
        "FSE",
        "Pseudocode",
        "SQL",
        "Java",
        "Problem Solving",
        "Communication",
      ],
      difficulty: "Easy-Medium",
      roles: [
        "ASE",
        "FSE",
      ],
      description:
        "Prepare for Accenture with pseudocode, programming, SQL, problem solving and communication practice.",
    },
    {
      name: "Capgemini",
      focus: [
        "Software Engineer",
        "Analyst",
        "Java / C++",
        "SQL",
        "OOP",
        "Coding",
        "Communication",
      ],
      difficulty: "Medium",
      roles: [
        "Software Engineer",
        "Analyst",
      ],
      description:
        "Prepare for Capgemini with programming, SQL, OOP, coding and interview communication practice.",
    },
    {
      name: "Deloitte",
      focus: [
        "Analyst",
        "Software Engineer",
        "SQL",
        "Coding",
        "Problem Solving",
        "CS Fundamentals",
        "Communication",
      ],
      difficulty: "Medium",
      roles: [
        "Analyst",
        "Software Engineer",
      ],
      description:
        "Prepare for Deloitte with SQL, coding, analytical problem solving, CS fundamentals and communication.",
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
      "Service Based"
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
            maxWidth: "850px",
            margin: "0 auto 45px",
          }}
        >
          <div
            style={{
              fontSize: "50px",
              marginBottom: "10px",
            }}
          >
            🏢
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3rem)",
              margin: "0 0 12px",
            }}
          >
            Service-Based Companies
          </h1>

          <p
            style={{
              color: "#9ca3af",
              fontSize: "17px",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            Select your target company and prepare
            according to its interview requirements
            and job track.
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
                  background: "#064e3b",
                  color: "#6ee7b7",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "600",
                  marginBottom: "18px",
                }}
              >
                Service Based
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
                        background: "#052e2b",
                        color: "#a7f3d0",
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
                  background: "#059669",
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

export default ServiceCompanies;