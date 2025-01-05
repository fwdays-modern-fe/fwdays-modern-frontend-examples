import {createFileRoute, redirect} from '@tanstack/react-router'
import {useEffect, useRef} from "react";

export const Route = createFileRoute('/watchlist')({
  beforeLoad: ({ context }) => {

    // //використовуємо контекст для перевірки авторизації користувача і доступу до /watchlist сторінки
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
  useEffect(() => {
    import("angularApp/ProfileComponent")
        .then((module) => {
         console.log("loaded !")
        })
        .catch((e) =>
            console.error(
                e
            )
        );
  }, []);

  return (
      <div className="container">
        <app-profile-component></app-profile-component>
      </div>
  );
}
