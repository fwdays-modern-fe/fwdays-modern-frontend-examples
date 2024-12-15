"use server";

import { Priority } from "@/constants/todos";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function updateTodo(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const id = formData.get("id")?.toString();
  if (!id) {
    throw new Error("Todo ID is missing");
  }

  const todoData = {
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    due_date: formData.get("due_date")
      ? new Date((formData.get("due_date") as object).toString())
      : null,
    priority: formData.get("priority")?.toString() || Priority.P4,
    completed: Boolean(formData.get("completed")),
  };

  const { data, error } = await supabase
    .from("todos")
    .update(todoData)
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update todo: ${error.message}`);
  }

  console.log("Updated todo:", data);

  revalidatePath("/todos");
  redirect("/todos");
}
