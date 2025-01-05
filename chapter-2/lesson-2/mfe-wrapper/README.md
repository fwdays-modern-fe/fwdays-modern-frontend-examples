# MFE Wrapper

A React-based Micro Frontend wrapper application built with Vite, TypeScript, and TanStack Router, focused on movie-related functionality.

## Overview

This project serves as a wrapper for micro frontends, providing a modern development environment with React 18, TypeScript, and robust routing capabilities through TanStack Router.

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn package manager

## Tech Stack

- **React**: ^18.3.1
- **TypeScript**: ~5.6.2
- **Vite**: ^6.0.5
- **TanStack Router**: ^1.92.6

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open your browser and navigate to the local development server (typically http://localhost:5173)

## Project Structure

```
mfe-wrapper/
├── node_modules/           # Dependencies
├── public/                 # Public assets
├── src/
│   ├── assets/            # Static assets
│   ├── hooks/
│   │   └── useAuth.ts     # Authentication hook
│   ├── routes/
│   │   ├── movie/         # Movie-related routes
│   │   │   ├── $id.tsx    # Dynamic movie detail route
│   │   │   └── index.tsx  # Movie list route
│   │   ├── _root.tsx      # Root layout
│   │   ├── index.tsx      # Main entry route
│   │   ├── login.tsx      # Login page
│   │   ├── movies.lazy.tsx # Lazy-loaded movies component
│   │   └── watchlist.jsx  # Watchlist feature
│   ├── index.css          # Global styles
│   ├── main.tsx          # Application entry point
│   ├── routeTree.gen.ts  # Generated route tree
│   └── vite-env.d.ts     # Vite type declarations
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

## Features

- **Authentication**: Custom authentication hook (`useAuth.ts`)
- **Movie Management**:
    - Movie listing
    - Individual movie details
    - Watchlist functionality
- **Lazy Loading**: Implemented for better performance
- **Type Safety**: Full TypeScript implementation
- **Routing**: TanStack Router with generated route tree

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the project for production (runs TypeScript compilation followed by Vite build)
- `npm run lint` - Runs ESLint to check code quality
- `npm run preview` - Previews the production build locally

## Development Features

### TypeScript Support
The project is configured with TypeScript for type safety and better developer experience. TypeScript configuration is handled through `tsconfig.json`.

### ESLint Integration
Comprehensive linting setup with:
- React Hooks linting rules
- TypeScript support
- React Refresh plugin

### Router
Uses TanStack Router for type-safe routing with included development tools for debugging and visualization. Routes are automatically generated in `routeTree.gen.ts`.

## Building for Production

To create a production build:

1. Run the build command:
```bash
npm run build
# or
yarn build
```

2. The built files will be in the `dist` directory

## Development Tools

- TanStack Router DevTools for route debugging
- Vite for fast development and optimized builds
- ESLint for code quality enforcement

## Contributing

Please ensure you follow these guidelines when contributing:
1. Follow the established TypeScript patterns
2. Run linting before submitting changes
3. Test your changes in development mode
4. Place new routes in appropriate directories following the existing structure

## License

This is a private project. All rights reserved.
