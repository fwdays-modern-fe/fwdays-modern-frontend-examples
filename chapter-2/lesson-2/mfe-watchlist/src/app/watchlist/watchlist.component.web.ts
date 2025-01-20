import { createCustomElement } from '@angular/elements';
import { bootstrapApplication } from '@angular/platform-browser';
import { WatchlistComponent } from './watchlist.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(WatchlistComponent, {
  providers: [
    provideHttpClient()
  ]
}).then((appRef) => {
  const element = createCustomElement(WatchlistComponent, {
    injector: appRef.injector,
  });
  customElements.define('app-watchlist', element);
});
