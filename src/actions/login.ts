"use server";

import { signIn } from "@/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";
import userApi from "@/services/api/modules/user-api";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { username, password } = validatedFields.data;

  const existingUser = await userApi.getUserByUsername({ username });

  if (!existingUser || !existingUser.username) {
    return { error: "User name does not exist!" };
  }

  if (!existingUser.password) {
    return {
      error:
        "Invalid login method, account already linked with Google or Github",
    };
  }

  // if (!existingUser.emailVerified) {
  //   return { error: "Confirmation email sent!" };
  // }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  return { success: "User created sucessfully!" };
};
