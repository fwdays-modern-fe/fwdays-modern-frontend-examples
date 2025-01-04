// movies.jsx
import { createLazyFileRoute } from "@tanstack/react-router";
import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const MoviesLazy = React.lazy(() => import("movies/Movies"));

export const Movies = () => {
    return (
        <div className="movies-container">
            <MoviesLazy />
        </div>
    );
};

export const Route = createLazyFileRoute("/movies")({
    component: Movies,
});
