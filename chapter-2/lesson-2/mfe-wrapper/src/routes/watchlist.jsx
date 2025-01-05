import {createFileRoute} from '@tanstack/react-router'
import {useEffect} from "react";

export const Route = createFileRoute('/watchlist')({
  beforeLoad: () => {

    //використовуємо контекст для перевірки авторизації користувача і доступу до /watchlist сторінки
    // if (!context.auth.isAuthenticated) {
    //
    //   //Відправляємо користувача на login сторінку за відсутності авторизації
    //   throw redirect({
    //     to: '/login',
    //   })
    // }
  },
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(()=>{
    import("angularApp/WatchlistComponent").then((module)=>{
      console.log('loaded !');
    }).catch((e)=>{
      console.error(e);
    });
  })
  return <div className="container">
    <app-watchlist></app-watchlist>
  </div>
}
