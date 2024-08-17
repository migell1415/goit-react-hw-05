import { NavLink } from "react-router-dom";
import s from "./NotFoundPage.module.css";
import { FaRegSadTear } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className={s.wrapper}>
      <FaRegSadTear size="200" />
      <p>Page is not found</p>
      <button type="button">
        <NavLink className={s.link} to="/">
          Back Home
        </NavLink>
      </button>{" "}
    </div>
  );
};

export default NotFoundPage;