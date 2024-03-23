import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { createUser, getUserByEmail } from "@/actions/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { username, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser({
      username,
      email,
      password: hashedPassword,
    });

    return { success: "User created" };
  } catch {
    return { error: "Something went wrong!" };
  }
};
