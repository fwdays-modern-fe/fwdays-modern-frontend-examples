export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
  overview?: string;
}

export interface WatchlistResponse {
  results: Movie[];
}

export const ACCOUNT_ID = '21271511';
