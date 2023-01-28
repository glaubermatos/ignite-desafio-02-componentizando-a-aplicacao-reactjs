import { useCallback, useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import { api } from './services/api';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

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

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get(`movies/?Genre_id=${selectedGenreId}`).then(response => 
      setMovies(response.data)
    )

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => 
      setSelectedGenre(response.data)      
    )
  }, [selectedGenreId])

  const handleClickGenreButton = useCallback((idGenre: number) => {
    setSelectedGenreId(idGenre)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar 
        selectedGenreId={selectedGenreId}
        genres={genres} 
        buttonClickCallback={handleClickGenreButton}
      />

      <Content movies={movies} selectedGenre={selectedGenre} />
    </div>
  )
}