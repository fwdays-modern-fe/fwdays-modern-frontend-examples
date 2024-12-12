import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <ul className="space-y-4">
        <li>
          <Link href="/post/abc">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              Перейти на сторінку — "app/post/[pid]/page.jsx"
            </span>
          </Link>
        </li>
        <li>
          <Link href="/post/abc?foo=bar">
            <span className="inline-block bg-gradient-to-r from-green-500 to-teal-600 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              Перейти на сторінку + query параметр — "app/post/[pid]/page.jsx"
            </span>
          </Link>
        </li>
        <li>
          <Link href="/post/abc/a-comment">
            <span className="inline-block bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              Перейти на сторінку — "app/post/[...all]/page.jsx"
            </span>
          </Link>
        </li>
        <li>
          <Link href="/post/abc/a-comment?foo=exists">
            <span className="inline-block bg-gradient-to-r from-red-500 to-pink-600 text-white text-lg font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              Перейти на сторінку + query параметр — "app/post/[...all]/page.jsx"
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;