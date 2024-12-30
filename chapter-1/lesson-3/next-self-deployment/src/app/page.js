import Link from "next/link";

const Home = () => {
  return (
      <main className="min-h-screen text-white flex items-center justify-center">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link href="/about">
                <span className="text-blue-400 hover:text-blue-500 text-lg">
                  Демонстрація звичайних Next.js посилань
                </span>
                </Link>
              </li>
              <li>
                <Link href="/posts">
                <span className="text-blue-400 hover:text-blue-500 text-lg">
                  Демонстрація навігації на динамічних сторінках
                </span>
                </Link>
              </li>
              <li>
                <Link href="/server">
                <span className="text-blue-400 hover:text-blue-500 text-lg">
                  Демонстрація SSR
                </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </main>
  );
};

export default Home;