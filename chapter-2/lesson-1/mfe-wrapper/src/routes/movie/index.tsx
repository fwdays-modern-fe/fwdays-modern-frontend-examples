import {createFileRoute, notFound} from '@tanstack/react-router'

export const Route = createFileRoute('/movie/')({
  component: RouteComponent,

  //В loader використовуємо context для завантаження даних фільму, context передається з main.tsx
  loader: ({ context }) => fetchTodosByUserId(context.movie),

  //Можливість завантажити компонент для відображення помилок при навігаціїї (неіснуючого шляху)
  notFoundComponent: () => {
    return <p>Movie not found!</p>
  },
})

function RouteComponent() {
  return <div>Hello "/movies/"!</div>
}

//Функція хелпер для завантаження даних по [id] отриманого через context
async function fetchTodosByUserId(movie: {id: string}) {
  const {id} = movie
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {})

  if (!response.ok) throw notFound()

  return await response.json()
}