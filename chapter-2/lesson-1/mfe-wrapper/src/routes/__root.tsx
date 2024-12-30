import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from "../hooks/useAuth.ts";

//Тип для створення шляху з контекстом
type AuthContext = ReturnType<typeof useAuth>

//createRootRouteWithContext створює root rout з об'єктом контексту
export const Route = createRootRouteWithContext<{ movie: { id: string, name: string }, auth: AuthContext }>()({
    component: () => (
        <>
            <div className="p-2 flex gap-2 nav-container">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{' '}
                <Link to="/movies" className="[&.active]:font-bold">
                    Movies
                </Link>{' '}
                <Link to="/watchlist" className="[&.active]:font-bold">
                    Watchlist
                </Link>{' '}
                <Link to="/login" className="[&.active]:font-bold">
                    Login
                </Link>
            </div>
            <hr/>
            <Outlet/>
            <TanStackRouterDevtools/>
        </>
    )
})