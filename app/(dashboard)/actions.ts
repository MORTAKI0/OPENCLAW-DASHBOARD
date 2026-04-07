"use server";

import { signOut } from "@/auth";

export async function signOutAdmin(): Promise<void> {
  await signOut({ redirectTo: "/login" });
}
