import { Component } from '@angular/core';
import {WatchlistComponent} from './watchlist/watchlist.component';

@Component({
  selector: 'app-root',
  imports: [WatchlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mfe-watchlist';
}
