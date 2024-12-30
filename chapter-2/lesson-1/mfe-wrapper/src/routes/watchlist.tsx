import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/watchlist')({
  beforeLoad: ({ context }) => {

    //використовуємо контекст для перевірки авторизації користувача і доступу до /watchlist сторінки
    if (!context.auth.isAuthenticated) {

      //Відправляємо користувача на login сторінку за відсутності авторизації
      throw redirect({
        to: '/login',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/watchlist"!</div>
}
