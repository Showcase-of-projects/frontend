import React from "react";
import { Link } from "react-router-dom";
import "../css/auth.css";

const LoginPage = () => {
    return (
      <div className="login-container">
        <div className="login-card">
          <h3 className="login-title">Вход</h3>
          <form>
            <div className="form-group">
              <label className="form-label">
                Номер студенческого билета
              </label>
              <input
                type="text"
                className="form-control login-input"
                placeholder="Введите номер студенческого билета"
                required
              />
            </div>
  
            <div className="form-group">
              <label className="form-label">
                Пароль
              </label>
              <input
                type="password"
                className="form-control login-input"
                placeholder="Введите пароль"
                required
              />
            </div>
  
            <button type="submit" className="login-button">
              Войти
            </button>
          </form>
          <div className="login-footer">
            <span>Нет аккаунта? </span>
            <Link to="/signup" className="login-link">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
