<script setup lang="ts">
import Route from "./Route.vue";
withDefaults(defineProps<{
    a?: boolean,
    href: string,
}>(), {
    a: false,
});
</script>

<template>
    <route v-bind="$props" class="px-4 hover:bg-gray-500/10 min-h-full text-lg flex items-center h-16">
        <slot/>
    </route>
</template>
