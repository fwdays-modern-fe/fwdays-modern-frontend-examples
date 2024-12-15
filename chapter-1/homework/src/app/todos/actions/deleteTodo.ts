"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteTodo(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const todoId = formData.get("id")?.toString();

  if (!todoId) {
    console.warn("Todo ID is missing.");
    return;
  }

  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", todoId);

  if (error) {
    throw new Error(`Failed to delete todo: ${error.message}`);
  }

  console.log("Deleted todo:", data);

  revalidatePath("/todos");

  redirect("/todos");
}
