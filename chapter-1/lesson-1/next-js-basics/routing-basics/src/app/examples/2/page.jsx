import Link from "next/link";

const Posts = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <ul className="space-y-4">
        <li>
          <Link href="/blog/top-10-travel-destinations">
            <span className="text-blue-400 hover:text-blue-500 text-xl font-semibold transition duration-300 ease-in-out">
              Топ-10 найпопулярніших туристичних напрямків
            </span>
          </Link>
        </li>
        <li>
          <Link href="/blog/budget-friendly-travel-tips/client">
            <span className="text-green-400 hover:text-green-500 text-xl font-semibold transition duration-300 ease-in-out">
              Поради для бюджетних подорожей
            </span>
          </Link>
        </li>
        <li>
          <Link href="/blog/hidden-gems-of-europe">
            <span className="text-purple-400 hover:text-purple-500 text-xl font-semibold transition duration-300 ease-in-out">
              Приховані перлини Європи, які варто відвідати
            </span>
          </Link>
        </li>
        <li>
          <Link href="/blog/solo-travel-guide">
            <span className="text-yellow-400 hover:text-yellow-500 text-xl font-semibold transition duration-300 ease-in-out">
              Гід для самостійних подорожей
            </span>
          </Link>
        </li>
        <li>
          <Link href="/blog/adventure-travel-experiences/client">
            <span className="text-red-400 hover:text-red-500 text-xl font-semibold transition duration-300 ease-in-out">
              Найкращі пригодницькі подорожі
            </span>
          </Link>
        </li>
        <li>
          <Link href="/blog/cultural-immersion-trips">
            <span className="text-indigo-400 hover:text-indigo-500 text-xl font-semibold transition duration-300 ease-in-out">
              Подорожі для глибокого занурення в культуру
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Posts;