<template>
    <section class="py-24 lg:py-32 relative overflow-hidden">
        <div
            class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-40"
        ></div>
        <div class="container mx-auto px-4 text-center">
            <Badge variant="secondary" class="mb-4">v2.0 is now live</Badge>
            <h1
                class="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            >
                Master your day, <br />
                one task at a time.
            </h1>
            <p class="text-xl text-muted-foreground max-w-[600px] mx-auto mb-8">
                The ultimate productivity tool designed to help you stay
                focused, organized, and ahead of your schedule.
            </p>
            <div
                class="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
                <Button size="lg" class="w-full sm:w-auto"
                    >Start for free</Button
                >
                <Button variant="outline" size="lg" class="w-full sm:w-auto"
                    >View Demo</Button
                >
            </div>

            <!-- Hero Visual -->
            <div
                class="mt-16 mx-auto max-w-5xl rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden"
            >
                <div
                    class="aspect-video bg-muted/50 w-full flex items-center justify-center text-muted-foreground"
                >
                    <span class="text-sm">App Dashboard Preview</span>
                </div>
            </div>
        </div>
    </section>
</template>
