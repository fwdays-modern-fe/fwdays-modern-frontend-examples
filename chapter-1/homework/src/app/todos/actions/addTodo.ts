"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Priority } from "@/constants/todos";

export default async function addTodo(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const todoData = {
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    due_date: formData.get("due_date")
      ? new Date((formData.get("due_date") as object).toString())
      : null,
    priority: formData.get("priority")?.toString() || Priority.P4,
    completed: Boolean(formData.get("completed")),
  };

  const { error } = await supabase.from("todos").insert([todoData]);

  if (error) {
    throw new Error(`Failed to insert todo: ${error.message}`);
  }

  revalidatePath("/todos");

  redirect("/todos");
}
