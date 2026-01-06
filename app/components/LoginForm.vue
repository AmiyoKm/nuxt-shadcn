<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { loginSchema } from "../../shared/types/auth";

const form = useForm({
    validationSchema: toTypedSchema(loginSchema),
    initialValues: {
        email: "",
        password: "",
    },
});

const onSubmit = form.handleSubmit(async (values) => {
    try {
        const result = await $fetch("/api/auth/login", {
            method: "POST",
            body: values,
        });

        const token = useCookie("auth_token");
        token.value = result.data;

        const { fetchUser } = useUser();
        await fetchUser();

        toast.success("Login successful", {
            description: "Welcome back!",
        });

        await navigateTo("/dashboard");
    } catch (err: any) {
        console.error("Login failed:", err);
        toast.error("Login failed", {
            description:
                err.data?.statusMessage ||
                "Please check your credentials and try again",
        });
    }
});
</script>

<template>
    <Card class="mx-auto max-w-md">
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
                Enter your credentials to access your account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form class="space-y-4" @submit.prevent="onSubmit">
                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input
                                type="email"
                                placeholder="m@example.com"
                                v-bind="componentField"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <div class="flex flex-col gap-2">
                    <Button type="submit">Sign In</Button>
                    <Button variant="outline" type="button">
                        Sign in with Google
                    </Button>
                    <p class="px-6 text-center text-sm text-muted-foreground">
                        Don't have an account?
                        <NuxtLink to="/signup" class="underline"
                            >Sign up</NuxtLink
                        >
                    </p>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
