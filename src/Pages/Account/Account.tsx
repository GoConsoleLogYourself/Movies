import { FC } from "react";
import styles from "./account.module.scss";
import Header from "../../components/Header/Header";
import { useGetMoviesQuery } from "../../store/moviesApi";
import WatchLaterList from "../../components/WatchLaterList/WatchLaterList";
import FavouriteMoviesList from "../../components/FavouriteMoviesList/FavouriteMoviesList";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Account: FC = () => {
  const { data = [] } = useGetMoviesQuery(40);
  const {} = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userName } = useAppSelector((state) => state.user);
  const { light } = useAppSelector((state) => state.theme);
  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/movies");
  };
  return (
    <main className={light ? styles.lightTheme : styles.darkTheme}>
      <Header data={data} />
      <main className={light ? styles.account : styles.accountDark}>
        <section className={styles.userInfo}>
          <h1>Добро пожаловать,{userName}!</h1>
        </section>
        <section className={styles.watchLater}>
          <h2>Ваш список отложенных фильмов:</h2>
          <WatchLaterList />
        </section>
        <section className={styles.favourites}>
          <h3>Ваш список избранных фильмов:</h3>
          <FavouriteMoviesList />
        </section>
        <button className={styles.exitBtn} onClick={() => handleLogout()}>
          Выйти
        </button>
      </main>
    </main>
  );
};

export default Account;
