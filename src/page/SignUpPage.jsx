import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../redux/slices/auth";
import { useForm } from "react-hook-form";
import "../css/auth.css";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const dispatch = useDispatch();
  const [redirect, setRedirect] = React.useState(false);

  const onSubmit = async (data) => {
    const response = await dispatch(signup(data));

    if (!response.payload) {
      return alert("Не удалось зарегистрироваться");
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
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-title">Регистрация</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label">Имя</label>
            <input
              type="text"
              className={`form-control login-input ${
                errors.name ? "input-error" : ""
              }`}
              placeholder="Введите имя"
              {...register("name", { required: "Обязательное поле" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Фамилия</label>
            <input
              type="text"
              className={`form-control login-input ${
                errors.surname ? "input-error" : ""
              }`}
              placeholder="Введите фамилию"
              {...register("surname", { required: "Обязательное поле" })}
            />
            {errors.surname && (
              <p className="error">{errors.surname.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Отчество</label>
            <input
              type="text"
              className={`form-control login-input ${
                errors.patronymic ? "input-error" : ""
              }`}
              placeholder="Введите отчество"
              {...register("patronymic", { required: "Обязательное поле" })}
            />
            {errors.patronymic && (
              <p className="error">{errors.patronymic.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Группа</label>
            <input
              type="text"
              className={`form-control login-input ${
                errors.group ? "input-error" : ""
              }`}
              placeholder="Введите группу"
              {...register("group", { required: "Обязательное поле" })}
            />
            {errors.group && <p className="error">{errors.group.message}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Роль</label>
            <input
              type="text"
              className={`form-control login-input ${
                errors.role ? "input-error" : ""
              }`}
              placeholder="Введите роль"
              {...register("role", { required: "Обязательное поле" })}
            />
            {errors.role && <p className="error">{errors.role.message}</p>}
          </div>

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

          {/* <div className="form-group">
            <label className="form-label">Повторите пароль</label>
            <input
              type="password"
              className="form-control login-input"
              placeholder="Введите пароль"
              {...register("confirmPassword", { required: "Повторите пароль" })}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
          </div> */}

          <button type="submit" className="login-button" disabled={!isValid}>
            Зарегистрироваться
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
