import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
      if (window.innerWidth > 550) {
        setMenuOpen(false); // Закрываем меню при расширении экрана
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className="header w-100 fixed-top shadow-sm"
        style={{
          backgroundColor: "#F7FAFC",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: "12px 16px",
          zIndex: 1100,
        }}
      >
        <div
          className="d-flex align-items-center w-100"
          style={{ minHeight: "40px" }}
        >
          <img
            src={Logo}
            alt="logotype"
            style={{ width: "24px", height: "24px", marginRight: "10px" }}
          />
          <h1 className="fs-5 m-0 fw-semibold">Витрина проектов</h1>

          {isMobile ? (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
              aria-label="Toggle menu"
            >
              <i className={`bi ${menuOpen ? "bi-x" : "bi-list"}`}></i>
            </button>
          ) : (
            <>
              <nav className="ms-4">
                <Link
                  to="/"
                  className="text-decoration-none text-dark mx-4 fw-normal"
                >
                  Главная
                </Link>
                <Link
                  to="/team"
                  className="text-decoration-none text-dark fw-normal"
                >
                  Команда
                </Link>
              </nav>
              <div className="ms-auto">
                <button
                  onClick={logout}
                  className="text-decoration-none text-dark fw-normal"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  Выйти
                </button>
              </div>
            </>
          )}
        </div>
      </header>

    
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1050,
          }}
        />
      )}

      <nav
        style={{
          position: "fixed",
          top: 0,
          right: menuOpen ? 0 : "-100px", 
          width: "100px",
          height: "300px",
          backgroundColor: "#F7FAFC",
          boxShadow: "-2px 0 8px rgba(0,0,0,0.15)",
          borderRadius: "8px 0 0 8px",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          transition: "right 0.3s ease",
          zIndex: 1100,
        }}
      >
        <Link
          to="/"
          className="text-decoration-none text-dark fw-normal"
          onClick={() => setMenuOpen(false)}
          style={{ fontSize: "15px" }}
        >
          Главная
        </Link>
        <Link
          to="/team"
          className="text-decoration-none text-dark fw-normal"
          onClick={() => setMenuOpen(false)}
          style={{ fontSize: "15px" }}
        >
          Команда
        </Link>
        <button
          onClick={() => {
            setMenuOpen(false);
            logout();
          }}
          className="text-decoration-none text-dark fw-normal"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            textAlign: "left",
            fontSize: "15px",
          }}
        >
          Выйти
        </button>
      </nav>
    </>
  );
};

export default Header;
