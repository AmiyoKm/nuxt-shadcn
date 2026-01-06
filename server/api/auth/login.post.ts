import { compare } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { usersTable } from "~~/server/db/schema";
import db from "~~/server/lib/db";
import { loginSchema } from "~~/shared/types/auth";
import type { Response } from "~~/shared/types/response";

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

    const isPasswordValid = await compare(body.password, user.password);

    if (!isPasswordValid) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid password",
        });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "12h",
    });

    setCookie(event, "auth_token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 12,
    });

    return {
        data: token,
        message: "User logged in successfully",
    } satisfies Response<typeof token>;
});
