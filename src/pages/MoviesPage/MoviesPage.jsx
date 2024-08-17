import { Field, Form, Formik } from "formik";
import s from "./MoviesPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import MoviesList from "../../components/MoviesList/MoviesList";
import { useSearchParams } from "react-router-dom";
import { fetchMoviesSearch } from "../../API/api";

const MoviesPage = () => {
  const [moviesSearch, setMoviesSearch] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const searchValue = searchParams.get("search") ?? "";

  const initialValues = {
    search: "",
  };

  const validationSchema = Yup.object().shape({
    search: Yup.string(),
  });

  const notify = () => toast.error("You need to enter the value!");

  const handleSubmit = (values, actions) => {
    const searchQuery = values.search?.trim();
    if (!searchQuery) {
      notify();
      setMoviesSearch([]);
      setSearchParams({});
      return;
    }
    searchParams.set("search", searchQuery);
    setSearchParams(searchParams);
    actions.resetForm();
  };

  useEffect(() => {
    const getData = async () => {
      if (searchValue) {
        try {
          setIsError(false);
          setErrorMessage("");
          const data = await fetchMoviesSearch(searchValue);
          if (data.length === 0) {
            setMoviesSearch([]);
            setErrorMessage("Nothing found. Please try again.");
          } else {
            setMoviesSearch(data);
          }
        } catch (error) {
          setIsError(true);
          setErrorMessage("Oops! Something went wrong. Please try again.");
        }
      }
    };
    getData();
  }, [searchValue]);

  return (
    <div className={s.wrapper}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <Field
            className={s.input}
            name="search"
            placeholder="Search movies"
            type="search"
          ></Field>
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {isError ? (
        <p>{errorMessage}</p>
      ) : moviesSearch.length === 0 ? (
        <p>{errorMessage}</p>
      ) : (
        <MoviesList movies={moviesSearch} basicPath={""} />
      )}
      <Toaster />
    </div>
  );
};

export default MoviesPage;