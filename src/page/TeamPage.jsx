import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const TeamPage = () => {
  const token = useSelector((state) => state.auth.token);
  const team = useSelector((state) => state.team.team);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  const teamMembers = [
    { name: "Елизавета Макарова", role: "Teamlead" },
    { name: "Александр Смирнов", role: "Backend developer" },
    { name: "Анна Николаева", role: "Frontend developer" },
  ];

  const files = [
    { name: "Product Roadmap (1).pdf", date: "2023-01-05", size: "12MB" },
    { name: "Product Roadmap (2).pdf", date: "2023-01-05", size: "33MB" },
    { name: "Product Roadmap (3).pdf", date: "2023-01-05", size: "28MB" },
    { name: "Product Roadmap (1).pdf", date: "2023-01-05", size: "12MB" },
  ];

  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: "70px",
          backgroundColor: "#F7FAFC",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          minHeight: "100vh",
          padding: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            gap: "2rem",
          }}
        >
          <div style={{ width: "60%" }}>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "2rem",
              }}
            >
              {team?.name || "Название команды"}
            </h1>

            <div style={{ marginBottom: "2rem" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Команда группы УВП-312
              </h2>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Навигатор ИУЦТ
              </h3>

              <div style={{ padding: "1rem" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "8px 0",
                          fontWeight: "500",
                        }}
                      >
                        Команда
                      </th>
                      <th style={{ textAlign: "right", padding: "8px 0" }}>
                        <a
                          href="#"
                          style={{
                            color: "#3b82f6",
                            textDecoration: "none",
                            fontWeight: "500",
                            fontSize: "14px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span>Пригласить</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 4V20M20 12H4"
                              stroke="#3b82f6"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </a>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member, index) => (
                      <tr
                        key={index}
                        style={{
                          borderTop: index !== 0 ? "1px solid #eee" : "none",
                        }}
                      >
                        <td
                          style={{ padding: "12px 0", verticalAlign: "top" }}
                          colSpan={2}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "#e0e0e0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                overflow: "hidden",
                              }}
                            >
                              <span style={{ color: "#666" }}>
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                            <div>
                              <div style={{ fontWeight: "500" }}>
                                {member.name}
                              </div>
                              <div
                                style={{
                                  color: "#666",
                                  fontSize: "14px",
                                  marginTop: "4px",
                                }}
                              >
                                {member.role}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div style={{ width: "40%" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "1rem",
                visibility: "hidden",
              }}
            >
              Загруженные файлы
            </h2>

            <div style={{ marginTop: "3.5rem" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Загруженные файлы
              </h2>

              <div
                style={{
                  padding: "1rem",
                }}
              >
                {files.map((file, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderTop: index !== 0 ? "1px solid #eee" : "none",
                    }}
                  >
                    <div style={{ fontWeight: "500" }}>{file.name}</div>
                    <div
                      style={{ display: "flex", gap: "2rem", color: "#666" }}
                    >
                      <span>{file.date}</span>
                      <span>{file.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
