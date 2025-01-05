import { Component } from '@angular/core';
import {WatchlistComponent} from './watchlist/watchlist.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [WatchlistComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mfe-watchlist';
}
