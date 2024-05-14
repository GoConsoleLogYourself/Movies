import { FC, useState } from "react";
import styles from "./loginForm.module.scss";
import { Link } from "react-router-dom";

type mode = "register" | "login";
interface LoginFormProps {
  mode: mode;
  title: string;
  onClick: (email: string, pass: string, userName?: string | undefined) => void;
}

const LoginForm: FC<LoginFormProps> = ({ title, onClick, mode }) => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [checkPass, setCheckPass] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [showText, setShowText] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [entryPass, setEntryPass] = useState<string>("");
  const func = () => {
    if (pass === checkPass) {
      onClick(email, pass, userName);
      setShowText(false);
    } else {
      setShowText(true);
    }
  };
  if (mode === "register") {
    return (
      <div>
        <div className={styles.container}>
          <h1 className={styles.header}>{title}</h1>
          <input
            className={styles.login}
            type="text"
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.password}
            type="password"
            placeholder="Придумайте пароль"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <div className={styles.notMatchContainer}>
            <input
              className={showText ? styles.notMatch : styles.checkPass}
              type="password"
              placeholder="Повторите пароль"
              value={checkPass}
              onChange={(e) => setCheckPass(e.target.value)}
              required
            />
            <p className={showText ? styles.notMatchText : styles.none}>
              Пароли не совпадают!
            </p>
          </div>
          <input
            className={styles.password}
            type="text"
            placeholder="Имя пользователя"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <div className={styles.btnNone}>
            <button className={styles.submitBtn} onClick={() => func()}>
              {title}
            </button>
          </div>
          <p className={styles.loginLink}>
            Уже есть аккаунт? <Link to="/login">Войти!</Link>
          </p>
        </div>
      </div>
    );
  }
  if (mode === "login") {
    return (
      <div>
        <div className={styles.container}>
          <h1 className={styles.header}>{title}</h1>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className={styles.login}
            type="text"
            placeholder="Логин"
          />
          <input
            value={entryPass}
            onChange={(e) => setEntryPass(e.target.value)}
            className={styles.password}
            type="password"
            placeholder="Пароль"
          />
          <button
            className={styles.submitBtn}
            onClick={() => onClick(login, entryPass)}
          >
            {title}
          </button>
          <p className={styles.register}>
            Нет аккаунта? <Link to="/register">Зарегестрироваться</Link>
          </p>
        </div>
      </div>
    );
  }
};

export default LoginForm;
