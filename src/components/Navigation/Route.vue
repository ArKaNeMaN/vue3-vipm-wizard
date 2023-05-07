<script setup lang="ts">
withDefaults(defineProps<{
    a?: boolean,
}>(), {
    a: false,
});
</script>

<template>
    <a v-if="a"><slot/></a>
    <router-link v-else :to="$attrs.href"><slot/></router-link>
</template>
