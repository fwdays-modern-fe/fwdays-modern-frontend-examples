import {createFileRoute, useLoaderData} from '@tanstack/react-router'

//Динамічний шлях /movie/[id]
export const Route = createFileRoute('/movie/$id')({
    component: RouteComponent,

    //Функція loader, що завантажує дані з API по [id]
    loader: async ({params}) => {
        const {id} = params
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {})

        if (!response.ok) throw new Error(response.statusText)

        return await response.json()
    },
})

function RouteComponent() {
    //useLoaderData функція отримує об'єкт data що повертається з loader під час завантаження шляху
    const data = useLoaderData({from: '/movie/$id'})

    return <div>
        <h3>{data.title}</h3>
        <p>{data.body}</p>
    </div>
}
