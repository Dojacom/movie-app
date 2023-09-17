import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './moviedetails.css';
import { getMoviebyId } from "./helper";
import VerticalNav from './vertical-nav';

export async function loader({ params }) {
  let movie = await getMoviebyId(Number(params.movieId));
  return { movie };
}

export default function MovieDetail() {
  const { movie } = useLoaderData();
  const { title, backdrop_path, release_date, overview } = movie;

  const localDateStr = release_date;
  const localDate = new Date(localDateStr);
  const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
  const utcDateString = utcDate.toISOString();

  return (
    <div className="main">
      <VerticalNav />
      <div className="main-container">
        <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt="movie_poster" />
        <div className="movie-details">
          <p className="title" data-testid='movie-title'>{title}</p>
          <p className="release-date" data-testid='movie-release-date'>{utcDateString}</p>
        </div>
        <p className="overview" data-testid='movie-overview'>{overview}</p>
      </div>
    </div>
  );
}
