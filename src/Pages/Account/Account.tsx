import { FC } from "react";
import styles from "./account.module.scss";
import Header from "../../components/Header/Header";
import { useGetMoviesQuery } from "../../store/moviesApi";

const Account: FC = () => {
  const { data = [] } = useGetMoviesQuery(40);
  return (
    <>
      <Header data={data} />
      <main>
        <section></section>
      </main>
    </>
  );
};

export default Account;
