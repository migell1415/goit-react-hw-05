import axios from "axios";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmU4NTU4MzBmMDRkZTU2MTcxZThkZmE5ODlmOThiMiIsIm5iZiI6MTcyMzkxNzU0My45NDUyMzgsInN1YiI6IjY2YmY5ZmI3MWQ3YTBhZmYxMzQ5ZTRjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8hFx8i8Ki-WS8EuLD6zVkHmJE4UMQ2Qi9Fp-tJ3T700";
const BASIC_URL = "https://api.themoviedb.org/3";
const END_POINT_TRENDS = "/trending/movie/day";
const END_POINT_SEARCH = "/search/movie";
const END_POINT_ID = "/movie/";
const END_POINT_CREDITS = "/credits";
const END_POINT_REVIEWS = "/reviews";

export const options = {
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
  params: {
    query: "",
    include_adult: false,
    language: "en-US",
    page: 1,
  },
};

export const fetchMoviesTrends = async () => {
  const url = `${BASIC_URL}${END_POINT_TRENDS}`;

  const { data } = await axios.get(url, options);
  return data.results;
};

export const fetchMoviesSearch = async (searchQuery) => {
  const url = `${BASIC_URL}${END_POINT_SEARCH}`;

  const { data } = await axios.get(url, {
    ...options,
    params: { query: searchQuery },
  });
  return data.results;
};

export const fetchMoviesById = async (id) => {
  const url = `${BASIC_URL}${END_POINT_ID}${id}`;

  const { data } = await axios.get(url, options);
  return data;
};

export const fetchMoviesByIdCredits = async (id) => {
  const url = `${BASIC_URL}${END_POINT_ID}${id}${END_POINT_CREDITS}`;

  const { data } = await axios.get(url, options);
  return data;
};

export const fetchMoviesByIdReviews = async (id) => {
  const url = `${BASIC_URL}${END_POINT_ID}${id}${END_POINT_REVIEWS}`;

  const { data } = await axios.get(url, options);
  return data;
};