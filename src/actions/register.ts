"use server";

import { getUserByEmail } from "@/data/user";
import { env } from "@/env";
import { RegisterSchema } from "@/schemas";
import { db } from "@/server/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validatedFields.data;

  const salt = await bcrypt.genSalt(Number(env.SALT_ROUNDS));
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // TODO: Send verification token email

  return { success: "Email sent!" };
};
