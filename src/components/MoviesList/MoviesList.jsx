import { NavLink, useLocation } from "react-router-dom";
import s from "./MoviesList.module.css";

const MoviesList = ({ movies, basicPath }) => {
  const BASIC_IMG_URL = "http://image.tmdb.org/t/p/original";

  const DEFAULT_IMG =
    "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg";

  const location = useLocation();

  return (
    <ul className={s.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.item}>
          <NavLink
            to={`${basicPath}${movie.id}`}
            state={location}
            className={s.link}
          >
            <img
              className={s.img}
              src={
                movie.poster_path
                  ? `${BASIC_IMG_URL}${movie.poster_path}`
                  : DEFAULT_IMG
              }
              alt={movie.title}
              height={450}
            />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;