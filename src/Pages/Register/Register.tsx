import { FC } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import Header from "../../components/Header/Header";
import { useGetMoviesQuery } from "../../store/moviesApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase";
import { setUser } from "../../store/slices/userSlice";

const Register: FC = () => {
  const { data = [] } = useGetMoviesQuery(40);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleRegister = (
    email: string,
    password: string,
    userName: string | undefined
  ) => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      updateProfile(user, {
        displayName: userName,
      })
        .then(() => {
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
        .catch(console.error);
    });
  };
  return (
    <div>
      <Header data={data} />
      <LoginForm mode="register" title="Регистрация" onClick={handleRegister} />
    </div>
  );
};

export default Register;
