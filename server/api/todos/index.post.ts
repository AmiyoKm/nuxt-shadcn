import { todosTable } from "~~/server/db/schema";
import db from "~~/server/lib/db";
import { createTodoSchema } from "~~/shared/types/todos";

export default defineEventHandler(async (event) => {
    const user = event.context.user;
    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: "Unauthorized",
        });
    }

    const body = await readBody(event);
    const result = createTodoSchema.safeParse(body);

    if (!result.success) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid input",
            data: result.error.errors,
        });
    }

    const [newTodo] = await db
        .insert(todosTable)
        .values({
            title: result.data.title,
            description: result.data.description,
            userId: user.id,
        })
        .returning();

    return {
        data: newTodo,
        message: "Todo created successfully",
    };
});
