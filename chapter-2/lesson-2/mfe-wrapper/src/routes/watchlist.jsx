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
  const angularComponentRef = useRef(null);
  useEffect(() => {
    import("angularApp/Watchlist")
        .then((module) => {
          if (angularComponentRef.current) {
            angularComponentRef.current.removeEventListener(
                "onReset",
                (event) => onAngularComponentEvent(event.detail.user),
                true
            );
            angularComponentRef.current.addEventListener(
                "onReset",
                (event) => onAngularComponentEvent(event.detail.user),
                true
            );
          }
        })
        .catch(() =>
            console.error(
                "Error: Couldn't load component from Angular Remote"
            )
        );
  }, []);

  useEffect(() => {
    if (angularComponentRef.current) {
      angularComponentRef.current.user = user;
    }
  }, [user]);

  return (
      <div className="container">
        <app-profile-component ref={angularComponentRef}></app-profile-component>
      </div>
  );
}
