import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider, createRouter} from "@tanstack/react-router";
import { routeTree } from './routeTree.gen'
import { NotFoundRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './routes/__root.tsx'
import { useAuth } from "./hooks/useAuth.ts";
import "zone.js";

//Створюємо NotFoundRoute для глобального відображення 404 сторінки для всього застосунку
const notFoundRoute = new NotFoundRoute({
    getParentRoute: () => rootRoute,
    component: () => '404 Not Found',
})

//Створюємо роутер для рендеру застосунку, до createRouter передаємо автоматично згенероване routeTree, context та notFoundRoute
const router = createRouter({
    routeTree,
    context: {
        movie: {
            id: '123',
            name: 'Die Hard'
        },
        auth: undefined!,
    },
    notFoundRoute,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

//InnerApp компонент для рендеру RouterProvider з нашим деревом роутів та контекстом
function InnerApp() {
    const auth = useAuth()
    return <RouterProvider router={router} context={{auth}} />
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <InnerApp />
  </StrictMode>,
)
