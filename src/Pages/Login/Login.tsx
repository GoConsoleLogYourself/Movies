import { FC } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import Header from "../../components/Header/Header";
import { useGetMoviesQuery } from "../../store/moviesApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { setUser } from "../../store/slices/userSlice";

const Login: FC = () => {
  const { data = [] } = useGetMoviesQuery(40);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            userName: user.displayName,
          })
        );
        navigate("/account");
      })
      .catch(() => alert("Неверные данные"));
  };
  return (
    <div>
      <Header data={data} />
      <LoginForm mode="login" title="Войти" onClick={handleLogin} />
    </div>
  );
};

export default Login;
