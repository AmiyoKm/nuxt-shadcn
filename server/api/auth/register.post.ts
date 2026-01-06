import db from "~~/server/lib/db";
import { registerSchema } from "~~/shared/types/auth";
import type { Response } from "~~/shared/types/response";
import { hash } from "bcrypt-ts";
import { usersTable } from "~~/server/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, (body) =>
        registerSchema.parse(body)
    );

    const userExists = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, body.email));

    if (userExists.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: "User already exists",
        });
    }

    const hashedPassword = await hash(body.password, 10);

    const [newUser] = await db
        .insert(usersTable)
        .values({
            ...body,
            password: hashedPassword,
        })
        .returning({
            id: usersTable.id,
            username: usersTable.username,
            email: usersTable.email,
        });

    return {
        data: newUser,
        message: "User registered successfully",
    } satisfies Response<typeof newUser>;
});
