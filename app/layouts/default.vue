<template>
    <div
        class="flex flex-col min-h-screen bg-background text-foreground font-sans antialiased"
    >
        <Navbar
            class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur"
        />

        <main class="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <slot />
        </main>

        <footer class="border-t py-6" />
    </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
    transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
