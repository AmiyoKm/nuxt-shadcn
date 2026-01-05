import db from "~~/server/lib/db";
import { loginSchema } from "~~/shared/types/auth";
import { Response } from "~~/shared/types/response";
import { usersTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    loginSchema.parse(body)
  );

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, body.email));

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  const isPasswordValid = await Bun.password.verify(
    body.password,
    user.password
  );

  if (!isPasswordValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid password",
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "12h",
  });

  return {
    data: token,
    message: "User logged in successfully",
  } satisfies Response<typeof token>;
});
