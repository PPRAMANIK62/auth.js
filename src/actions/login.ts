"use server";

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
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

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(existingUser.email, verificationToken.token);

    return { success: "Confirmation email sent!" };
  }

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

  return { success: "Successfully logged in!" };
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

  return { success: "Successfully logged in!" };
};
