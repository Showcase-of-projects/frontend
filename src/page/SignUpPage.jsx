import React from "react";
import { Link } from "react-router-dom";
import "../css/auth.css";
const SignUpPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-title">Регистрация</h3>
        <form>
          <div className="form-group">
            <label className="form-label">Имя</label>
            <input
              type="text"
              className="form-control login-input"
              placeholder="Введите имя"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Фамилия</label>
            <input
              type="text"
              className="form-control login-input"
              placeholder="Введите фамилию"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Номер студенческого билета</label>
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

            <div className="form-group">
              <label className="form-label">
                Повторите пароль
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
            <span>Есть аккаунт? </span>
            <Link to="/login" className="login-link">
              Войти
            </Link>
          </div>
      </div>
    </div>
  );
};

export default SignUpPage;
