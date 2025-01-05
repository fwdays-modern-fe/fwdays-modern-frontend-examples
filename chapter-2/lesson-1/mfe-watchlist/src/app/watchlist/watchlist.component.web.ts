import { createCustomElement } from '@angular/elements';
import { bootstrapApplication } from '@angular/platform-browser';
import { WatchlistComponent } from './watchlist.component';

bootstrapApplication(WatchlistComponent).then((appRef) => {
  const element = createCustomElement(WatchlistComponent, {
    injector: appRef.injector,
  });
  customElements.define('app-watchlist', element);
});
