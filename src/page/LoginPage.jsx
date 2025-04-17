import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/auth";
import { useForm } from "react-hook-form";
import "../css/auth.css";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const dispatch = useDispatch();
  const [redirect, setRedirect] = React.useState(false);

  const onSubmit = async (data) => {
    const response = await dispatch(login(data));

    if (!response.payload) {
      return alert("Не удалось войти");
    }

    if ("token" in response.payload.data) {
      localStorage.setItem("token", response.payload.data.token);
    }

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3 className="login-title">Вход</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
            <label className="form-label">Логин</label>
            <input
              type="text"
              className={`form-control login-input ${
                errors.login ? "input-error" : ""
              }`}
              placeholder="Введите логин"
              {...register("login", { required: "Обязательное поле" })}
            />
            {errors.login && <p className="error">{errors.login.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              className={`form-control login-input ${
                errors.password ? "input-error" : ""
              }`}
              placeholder="Введите пароль"
              {...register("password", { required: "Обязательное поле" })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="login-button" disabled={!isValid}>
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
