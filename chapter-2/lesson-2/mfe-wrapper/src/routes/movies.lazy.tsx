import {createLazyFileRoute} from '@tanstack/react-router'
import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const MoviesLazy = React.lazy(()=> import("movies/Movies"))

//Створюємо lazy route для виключення його з первинного бандлу і завантаження on-demand
export const Route = createLazyFileRoute('/movies')({
    component: RouteComponent,
})

function RouteComponent() {


    return (
        <div className="page-container">
           <MoviesLazy/>
        </div>
    )
}
