<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

defineProps<{ icon: string }>();
</script>

<template>
    <font-awesome-icon :icon="icon" class="w-4 h-4"/>
</template>
