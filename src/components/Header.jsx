import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <header
      className="header w-100 fixed-top shadow-sm p-3"
      style={{
        backgroundColor: "#F7FAFC",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontWeight: 50,
      }}
    >
      <div className="d-flex align-items-center px-4">
        <img
          src={Logo}
          alt="logotype"
          style={{ width: "24px", height: "24px", marginRight: "10px" }}
        />
        <h1 className="fs-5 m-0" style={{ fontWeight: 600 }}>
          Витрина проектов
        </h1>
        <nav className="ms-4">
          <Link
            to="/"
            className="text-decoration-none text-dark mx-4"
            style={{ fontWeight: 500 }}
          >
            Главная
          </Link>
          <Link
            to="/"
            className="text-decoration-none text-dark"
            style={{ fontWeight: 500 }}
          >
            Команда
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
