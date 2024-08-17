import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesByIdCredits } from "../../API/api";
import s from "./MovieCast.module.css";
import { BounceLoader } from "react-spinners";

const MovieCast = () => {
  const params = useParams();
  const [cast, setCast] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const BASIC_IMG_URL = "http://image.tmdb.org/t/p/original";

  const DEFAULT_IMG =
    "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg";

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await fetchMoviesByIdCredits(params.movieId);
        setCast(data.cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [params.movieId]);

  if (isLoading) {
    return (
      <div className={s.loader}>
        <BounceLoader color="#ffffff" size={200} />
      </div>
    );
  }

  if (cast.length === 0) {
    return <h3 className={s.error}>Nothing found</h3>;
  }

  return (
    <div className={s.wrapper}>
      <h3 className={s.title}>Cast</h3>
      {isError ? (
        <p>Oops! Something went wrong. Please try again.</p>
      ) : (
        <ul className={s.list}>
          {cast.map((item) => (
            <li key={item.id} className={s.castItem}>
              <img
                className={s.castImg}
                src={
                  item.profile_path
                    ? `${BASIC_IMG_URL}${item.profile_path}`
                    : DEFAULT_IMG
                }
                alt={item.name}
                height={300}
              />
              <h3 className={s.castTitle}>{item.name}</h3>
              <p className={s.castText}>({item.character})</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;