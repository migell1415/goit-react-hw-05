import { useEffect, useRef, useState, Suspense } from "react";
import s from "./MovieDetailsPage.module.css";
import { NavLink, Outlet, useParams, useLocation } from "react-router-dom";
import { fetchMoviesById } from "../../API/api";
import { BounceLoader } from "react-spinners";
import clsx from "clsx";
import { FaArrowLeft } from "react-icons/fa";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const MovieDetailsPage = () => {
  const params = useParams();
  const [moviesById, setMoviesById] = useState(null);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const goBackRef = useRef(location?.state || "/movies");

  const BASIC_IMG_URL = "http://image.tmdb.org/t/p/original";

  const DEFAULT_IMG =
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

  useEffect(() => {
    const getData = async () => {
      try {
        setIsError(false);
        const data = await fetchMoviesById(params.movieId);
        setMoviesById(data);
      } catch (error) {
        setIsError(true);
      }
    };
    getData();
  }, [params.movieId]);

  if (isError) return <p>Oops! Something went wrong. Please try again.</p>;

  if (!moviesById) {
    return (
      <div className={s.loader}>
        <BounceLoader color="#ffffff" size={100} />
      </div>
    );
  }

  return (
    <div className={s.mainContainer}>
      <h2 className={s.title}>Movie Details</h2>
      <div className={s.goBack}>
        <FaArrowLeft size={18} />
        <NavLink className={s.link} to={goBackRef.current}>
          Go Back
        </NavLink>
      </div>
      <div className={s.container}>
        <img
          className={s.movieImg}
          src={
            moviesById.backdrop_path
              ? `${BASIC_IMG_URL}${moviesById.backdrop_path}`
              : DEFAULT_IMG
          }
          alt={moviesById.title}
        />
        <div className={s.wrapper}>
          <h3 className={s.movieTitles}>{moviesById.title}</h3>
          <p className={s.description}>
            Release date: {moviesById.release_date}
          </p>
          <p className={s.description}>Rating: {moviesById.vote_average}</p>
        </div>
      </div>
      <div className={s.overview}>
        <h3 className={s.movieTitles}>Overview</h3>
        <p className={s.description}>{moviesById.overview}</p>
      </div>
      <ul className={s.navList}>
        <li className={s.navItem}>
          <NavLink className={buildLinkClass} to="cast">
            Cast
          </NavLink>
        </li>
        <li className={s.navItem}>
          <NavLink className={buildLinkClass} to="reviews">
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense
        fallback={
          <div className={s.loader}>
            <BounceLoader color="#ffffff" size={100} />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;