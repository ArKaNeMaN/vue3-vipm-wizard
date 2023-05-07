<script setup lang="ts">
withDefaults(defineProps<{
    a?: boolean,
    href: string,
}>(), {
    a: false,
});
</script>

<template>
    <a v-if="a" :href="href"><slot/></a>
    <router-link v-else :to="href"><slot/></router-link>
</template>
