import { useEffect, useState } from "react";
import s from "./HomePage.module.css";
import { fetchMoviesTrends } from "../../API/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import { BounceLoader } from "react-spinners";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchMoviesTrends();
        setMovies(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) {
    return (
      <div className={s.loader}>
        <BounceLoader color="#ffffff" size={200} />
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Trending today</h2>
      {isError ? (
        <p>Oops! Something went wrong. Please try again.</p>
      ) : (
        <MoviesList movies={movies} basicPath={"movies/"} />
      )}
    </div>
  );
};

export default HomePage;