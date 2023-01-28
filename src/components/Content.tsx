import { useState, useEffect } from 'react';

import { api } from '../services/api';

import { MovieCard } from './MovieCard'

import '../styles/content.scss';
import { Header } from './Header';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  };
  movies: MovieProps[];
}

export function Content({ movies, selectedGenre}: ContentProps) {

  return(
    <div className="container">
    
      <Header genreTitle={selectedGenre.title} />

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}