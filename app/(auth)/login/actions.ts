"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

export type LoginFormState = {
  error: string | null;
};

export async function authenticateAdmin(
  _state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/",
    });

    return {
      error: null,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          error: "Invalid username or password.",
        };
      }

      return {
        error: "Authentication failed. Please try again.",
      };
    }

    throw error;
  }
}
