import { getTodos } from "@/app/todos/actions/getTodos";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import deleteTodo from "@/app/todos/actions/deleteTodo";
import { Button } from "@/components/ui/button";
import { TodosForm } from "@/components/todo/TodosForm";

export async function TodosList({ searchParams }: { searchParams: any }) {
  const { data: todos } = await getTodos(searchParams);

  
  if(!todos?.length){
    return null;
  }

  return (
    <section className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-8 flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
        <Accordion type="single" collapsible className="space-y-4 p-4">
          {todos?.map((todo) => (
            <AccordionItem
              value={todo.id}
              key={todo.id}
              className="bg-gray-50 rounded-lg shadow-sm"
            >
              <AccordionTrigger className="flex justify-between items-center p-4 text-lg font-semibold text-gray-700 border-b border-gray-200 bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
                <span className="flex-1">
                  Priority: {todo.priority} | Due: {todo.due_date} | Task: {todo.title}
                </span>
                <span
                  className={`ml-4 text-sm font-light ${todo.completed ? "text-green-500" : "text-yellow-500"}`}
                >
                  {todo.completed ? "Completed" : "In Progress"}
                </span>
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-gray-100">
                <form
                  action={deleteTodo}
                  className="flex items-center justify-between space-x-4"
                >
                  <input type="hidden" name="id" value={todo.id} />
                  <Button variant="destructive" type="submit">
                    Delete
                  </Button>
                </form>
                <div className="mt-4 border-t border-gray-300 pt-4">
                  <TodosForm todo={todo} isUpdateTodo />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
