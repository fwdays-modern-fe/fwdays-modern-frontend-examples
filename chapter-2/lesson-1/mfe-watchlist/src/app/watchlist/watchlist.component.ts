import { Component, inject, OnInit } from '@angular/core';
import { WatchlistService } from './watchlist.service';
import { Movie } from './watchlist.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.scss',
  providers: [WatchlistService]
})
export class WatchlistComponent implements OnInit {
  watchlist: Movie[] = [];
  #watchlistService = inject(WatchlistService);

  ngOnInit(): void {
    this.#watchlistService.getWatchlist().subscribe({
      next: (response) => {
        this.watchlist = response.results;
      },
      error: (error) => {
        console.error('Error fetching watchlist:', error);
      }
    });
  }
}
