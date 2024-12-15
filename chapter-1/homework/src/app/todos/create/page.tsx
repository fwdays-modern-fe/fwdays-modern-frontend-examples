import { TodosForm } from "@/components/todo/TodosForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateTodo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add new todo</CardTitle>
      </CardHeader>
      <CardContent>
        <TodosForm />
      </CardContent>
    </Card>
  );
}
