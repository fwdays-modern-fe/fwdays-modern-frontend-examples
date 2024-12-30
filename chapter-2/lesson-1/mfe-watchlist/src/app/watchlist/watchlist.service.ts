import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ACCOUNT_ID, WatchlistResponse } from './watchlist.interface';

@Injectable()
export class WatchlistService {
  #http = inject(HttpClient);

  getWatchlist(): Observable<WatchlistResponse> {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': `Bearer ${environment.accessToken}`
    });

    return this.#http.get<WatchlistResponse>(
      `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/watchlist/movies?api_key=${environment.apiKey}`,
      { headers }
    );
  }
}
