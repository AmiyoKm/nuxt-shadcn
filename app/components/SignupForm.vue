<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { registerSchema } from "../../shared/types/auth";
import { toast } from "vue-sonner";
import { navigateTo } from "#app";

const form = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const result = await $fetch("/api/auth/register", {
      method: "POST",
      body: values,
    });
    toast.success("Registration successful " + result.data?.username, {
      description: "You can now login",
    });
    form.resetForm();
    await navigateTo("/login");
  } catch (err) {
    console.error("Registration failed:", err);
    toast.error("Registration failed", {
      description: "Please try again",
    });
  }
});
</script>

<template>
  <Card class="mx-auto max-w-md">
    <CardHeader>
      <CardTitle>Create an account</CardTitle>
      <CardDescription>
        Enter your information below to create your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" placeholder="John" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

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
            <FormDescription>
              We'll use this to contact you. We will not share your email with
              anyone else.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormDescription>
              Must be at least 6 characters long.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="passwordConfirmation">
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormDescription> Please confirm your password. </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex flex-col gap-2">
          <Button type="submit">Create Account</Button>
          <Button variant="outline" type="button"> Sign up with Google </Button>
          <p class="px-6 text-center text-sm text-muted-foreground">
            Already have an account?
            <NuxtLink to="/login" class="underline">Sign in</NuxtLink>
          </p>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
