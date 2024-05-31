import { FC } from "react";
import styles from "./favouriteMoviesList.module.scss";
import {
  useDeleteFavouriteMoviesMutation,
  useGetFavouriteMoviesQuery,
} from "../../store/moviesApi";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAppSelector } from "../../hooks";

const FavouriteMoviesList: FC = () => {
  const { data = [] } = useGetFavouriteMoviesQuery(40);
  const [deleteMovie] = useDeleteFavouriteMoviesMutation();
  const { id } = useAuth();
  const { light } = useAppSelector((state) => state.theme);
  const navigate = useNavigate();
  const currentUserFavourites = data.filter((item) =>
    item.id.toString().includes(id)
  );
  const handleDeleteFromFavourites = async (id: number) => {
    await deleteMovie(id).unwrap();
  };
  return (
    <div className={light ? styles.favouritesList : styles.favouritesListDark}>
      {currentUserFavourites.length > 0 ? (
        currentUserFavourites.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            rating={item.rating}
            date={item.date}
            img={item.img}
            janre={item.janres}
            noDesc
            deleteBtn
            onDeleteBtnClick={() => handleDeleteFromFavourites(item.id)}
            onClick={() => navigate(`/movies/${item.title}`)}
          />
        ))
      ) : (
        <p>
          Ваш список избранного пуст.{" "}
          <span onClick={() => navigate("/movies")}>
            Перейти ко всем фильмам.
          </span>
        </p>
      )}
    </div>
  );
};

export default FavouriteMoviesList;
