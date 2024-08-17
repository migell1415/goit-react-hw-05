import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviesByIdReviews } from "../../API/api.js";
import s from "./MovieReviews.module.css";
import { BounceLoader } from "react-spinners";

const MovieReviews = () => {
  const params = useParams();
  const [reviews, setReviews] = useState([]);
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
        const data = await fetchMoviesByIdReviews(params.movieId);
        setReviews(data.results);
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
        <BounceLoader color="#ffffff" size={100} />
      </div>
    );
  }

  if (reviews.length === 0) {
    return <h3 className={s.error}>Nothing found</h3>;
  }

  return (
    <div className={s.container}>
      <h3 className={s.title}>Reviews</h3>
      {isError ? (
        <p>Oops! Something went wrong. Please try again.</p>
      ) : (
        <ul className={s.list}>
          {reviews.map((item) => (
            <li className={s.reviewsItem} key={item.id}>
              <div className={s.wrapper}>
                <img
                  className={s.userImg}
                  src={
                    item.author_details.avatar_path
                      ? `${BASIC_IMG_URL}${item.author_details.avatar_path}`
                      : DEFAULT_IMG
                  }
                  alt={item.author_details.username}
                  width={100}
                  height={100}
                />
                <h3 className={s.username}>{item.author_details.username}</h3>
              </div>
              <p className={s.reviewsText}>{item.content}</p>
              <p className={s.details}>Created: {item.created_at}</p>
              <p className={s.details}>Updated: {item.updated_at}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;