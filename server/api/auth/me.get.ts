import { eq } from "drizzle-orm";

import { usersTable } from "~~/server/db/schema";
import db from "~~/server/lib/db";
import { Response } from "~~/shared/types/response";

import jwt, { JwtPayload } from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, "auth_token");
    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;
        const [user] = await db
            .select({
                id: usersTable.id,
                username: usersTable.username,
                email: usersTable.email,
            })
            .from(usersTable)
            .where(eq(usersTable.id, Number(decoded.id)));

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
            });
        }

        return {
            data: user,
            message: "User fetched successfully",
        } satisfies Response<typeof user>;
    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    }
});
