<script setup lang="ts">
import { BarChart3, Layers, ListTodo } from "lucide-vue-next";

const features = [
    {
        title: "Smart Task Management",
        description:
            "Organize your tasks with intelligent categorization and priority setting.",
        icon: ListTodo,
    },
    {
        title: "Deep Analytics",
        description:
            "Track your productivity trends and visualize your accomplishments.",
        icon: BarChart3,
    },
    {
        title: "Custom Workflows",
        description:
            "Create workflows that fit your unique style of getting things done.",
        icon: Layers,
    },
];
</script>

<template>
    <section class="py-20 bg-muted/50">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                    v-for="feature in features"
                    :key="feature.title"
                    class="bg-background"
                >
                    <CardHeader>
                        <div
                            class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"
                        >
                            <component :is="feature.icon" class="h-6 w-6" />
                        </div>
                        <CardTitle>{{ feature.title }}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription class="text-base">
                            {{ feature.description }}
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
</template>
