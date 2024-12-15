import { TodosActions } from "@/components/todo/TodosActions";
import { TodosList } from "@/components/todo/TodosList";
import Link from "next/link";

export default async function Todos(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <TodosActions searchParams={searchParams} />
      <TodosList searchParams={searchParams} />
      <Link
        href="/todos/create"
        className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Create a new todo
      </Link>
    </section>
  );
}
