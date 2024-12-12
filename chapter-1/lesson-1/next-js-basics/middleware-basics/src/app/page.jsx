import Link from "next/link";

export default function Root() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Познайомимось з middleware</h1>
        <div className="space-x-4">
          <Link href="/home">
            <span className="text-blue-400 hover:text-blue-500 font-semibold">
              Додому
            </span>
          </Link>
          <Link href="/sign-in">
            <span className="text-blue-400 hover:text-blue-500 font-semibold">
              Увійти
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}