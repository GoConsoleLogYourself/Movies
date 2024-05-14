import { FC } from "react";
import styles from "./account.module.scss";
import Header from "../../components/Header/Header";
import { useGetMoviesQuery } from "../../store/moviesApi";
import WatchLaterList from "../../components/WatchLaterList/WatchLaterList";
import FavouriteMoviesList from "../../components/FavouriteMoviesList/FavouriteMoviesList";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeUser } from "../../store/slices/userSlice";

const Account: FC = () => {
  const { data = [] } = useGetMoviesQuery(40);
  const {} = useAuth();
  const dispatch = useAppDispatch();
  const { userName } = useAppSelector((state) => state.user);
  return (
    <>
      <Header data={data} />
      <main className={styles.account}>
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
        <button onClick={() => dispatch(removeUser())}>Выйти</button>
      </main>
    </>
  );
};

export default Account;
