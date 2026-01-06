import { eq } from "drizzle-orm";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { usersTable } from "~~/server/db/schema";
import db from "~~/server/lib/db";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, "auth_token");
    if (!token) {
        event.context.user = null;
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        if (!decoded.id) {
            event.context.user = null;
            return;
        }

        const [user] = await db
            .select({
                id: usersTable.id,
                username: usersTable.username,
                email: usersTable.email,
            })
            .from(usersTable)
            .where(eq(usersTable.id, Number(decoded.id)));

        if (!user) {
            event.context.user = null;
            return;
        }

        event.context.user = user;
    } catch (error: unknown) {
        console.error("Failed to verify token:", error);
        event.context.user = null;
    }
});
