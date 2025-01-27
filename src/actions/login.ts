"use server";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/server/auth/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/server/auth/routes";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });
    redirect(DEFAULT_LOGIN_REDIRECT);
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) throw error;

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
  }

  return { success: "Email sent!" };
};

export const loginWithProvider = async (provider: "google" | "github") => {
  try {
    await signIn(provider);
    redirect(DEFAULT_LOGIN_REDIRECT);
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) throw error;

    return { error: "Something went wrong!" };
  }

  return { success: "Email sent!" };
};
