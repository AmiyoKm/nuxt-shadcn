<script setup lang="ts">
import { ListTodo } from "lucide-vue-next";
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
  >
    <div class="container mx-auto px-4 flex h-14 items-center justify-between">
      <div class="flex items-center gap-2 font-bold text-xl">
        <div
          class="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground"
        >
          <ListTodo class="h-5 w-5" />
        </div>
        <span>TodoMaster</span>
      </div>
      <nav class="flex items-center gap-4">
        <ModeToggle />
        <Button variant="ghost" size="sm">Log in</Button>
        <Button size="sm">Get Started</Button>
      </nav>
    </div>
  </header>
</template>
