import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-8 animate-bounce">
          Welcome to the Chapter 1 Homework Reference
        </h1>
        <Link href="/todos">
            Go to Todo List
        </Link>
      </div>
    </main>
  );
}