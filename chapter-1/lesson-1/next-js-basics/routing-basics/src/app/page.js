import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">
          Познайомимось з роутингом у Нексті
        </h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/examples/1">
                <span className="text-blue-400 hover:text-blue-500 text-lg">
                  Демонстрація звичайних Next.js посилань
                </span>
              </Link>
            </li>
            <li>
              <Link href="/examples/2">
                <span className="text-blue-400 hover:text-blue-500 text-lg">
                  Демонстрація навігації на динамічних сторінках
                </span>
              </Link>
            </li>
            <li>
              <Link href="/examples/3">
                <span className="text-blue-400 hover:text-blue-500 text-lg">
                  Демонстрація різних типів навігації з query параметрами
                </span>
              </Link>
            </li>
            <li>
              <Link href="/examples/4">
                <span className="text-blue-400 hover:text-blue-500 text-lg">
                  Демонстрація програмної навігації за допомогою роутера
                </span>
              </Link>
            </li>
            <li>
              <Link href="/examples/5">
                <span className="text-blue-400 hover:text-blue-500 text-lg">
                  Демонстрація створення посилання, яке буде змінювати стиль у
                  випадку співпадіння шляхів
                </span>
              </Link>
            </li>
            <li>
              <Link href="/examples/6">
                <span className="text-blue-400 hover:text-blue-500 text-lg">
                  Демонстрація простого редіректу для незалогінених користувачів
                </span>
              </Link>
            </li>
            <li>
              <Link href="/examples/7">
                <span className="text-blue-400 hover:text-blue-500 text-lg">
                  Демонстрація переходу на profile page після запиту на sign-in
                  endpoint
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
