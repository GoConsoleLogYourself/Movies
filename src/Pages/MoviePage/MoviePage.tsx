import { FC } from "react";
import styles from "./moviePage.module.scss";
import day from "../../assets/day.png";
import night from "../../assets/night.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddFavouriteMoviesMutation,
  useAddWatchLaterMoviesMutation,
  useGetMoviesQuery,
} from "../../store/moviesApi";
import Header from "../../components/Header/Header";
import Player from "../../components/Player/Player";
import { useAuth } from "../../hooks/useAuth";
import { getRandomInt } from "../../utils/GetRandomInt";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Comments from "../../components/Comments/Comments";
import { setDarkTheme, setLightTheme } from "../../store/slices/themeSlice";

const MoviePage: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data = [] } = useGetMoviesQuery(40);
  const [addWatchLaterMovie] = useAddWatchLaterMoviesMutation();
  const [addFavouriteMovie] = useAddFavouriteMoviesMutation();
  const { id } = useAuth();
  const { comments } = useAppSelector((state) => state.comments);
  const { dark, light } = useAppSelector((state) => state.theme);
  const currentMovie = data.find((item) => item.title.trim() === params.title);
  const currentMovieComments = comments.filter(
    (item) => item.title === currentMovie!.title
  );
  const handleAddWatchLaterMovie = async () => {
    await addWatchLaterMovie({
      ...currentMovie!,
      id: id + getRandomInt(10000),
    });
  };
  const handleAddFavouriteMovie = async () => {
    await addFavouriteMovie({
      ...currentMovie!,
      id: id + getRandomInt(10000),
    });
  };
  return (
    <div className={light ? styles.light : styles.dark}>
      <Header data={data} />
      <button className={styles.goBack} onClick={() => navigate(-1)}>
        {"< Назад"}
      </button>

      <main className={styles.movieContainer}>
        <section className={styles.movieInfo}>
          <div className={styles.movieOptions}>
            <img src={currentMovie?.img} alt="img" />
            <div>
              <p onClick={handleAddWatchLaterMovie}>Отложить просмотр</p>
              <p onClick={handleAddFavouriteMovie}>Добавить в избранное</p>
            </div>
          </div>
          <div className={styles.movieDesc}>
            <p>{currentMovie?.title}</p>
            <p>Дата выхода: {currentMovie?.date}</p>
            <p>Рейтинг Kinopoisk: {currentMovie?.rating}</p>
            <p>Жанр: {currentMovie?.janres}</p>
            <p>{currentMovie?.desc}</p>
          </div>
        </section>
        <section className={styles.player}>
          <div className={styles.theme}>
            <div>
              <span
                onClick={() => dispatch(setLightTheme())}
                className={light ? styles.themeIcon : styles.nothig}
              >
                <img src={day} alt="day" />
              </span>
              <span
                onClick={() => dispatch(setDarkTheme())}
                className={dark ? styles.themeIcon : styles.nothig}
              >
                <img src={night} alt="night" />
              </span>
            </div>
          </div>
          <Player poster={currentMovie?.poster} />
        </section>
        <section className={styles.comments}>
          <Comments
            title={currentMovie!.title}
            comments={currentMovieComments}
          />
        </section>
      </main>
    </div>
  );
};

export default MoviePage;
