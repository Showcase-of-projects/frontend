import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login"); 
  };

  return (
    <header
      className="header w-100 fixed-top shadow-sm p-3"
      style={{
        backgroundColor: "#F7FAFC",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div className="d-flex align-items-center px-4">
        <img
          src={Logo}
          alt="logotype"
          style={{ width: "24px", height: "24px", marginRight: "10px" }}
        />
        <h1 className="fs-5 m-0 fw-semibold">Витрина проектов</h1>
        <nav className="ms-4 ">
          <Link
            to="/"
            className="text-decoration-none text-dark mx-4 fw-normal"
          >
            Главная
          </Link>
          <Link to="/team" className="text-decoration-none text-dark fw-normal">
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
      </div>
    </header>
  );
};

export default Header;
