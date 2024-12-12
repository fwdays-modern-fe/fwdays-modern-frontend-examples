import Link from "next/link";

const ExamplesLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/">
            <span className="text-blue-400 hover:text-blue-500 text-lg">
              &lt;-- Back to main page
            </span>
          </Link>
          <h2 className="text-2xl font-bold">Роутинг</h2>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="min-h-screen p-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamplesLayout;