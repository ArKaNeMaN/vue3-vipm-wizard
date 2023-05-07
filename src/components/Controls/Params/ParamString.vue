<script setup lang="ts">
import TextInput from "../TextInput.vue";

defineProps<{
    modelValue: string,
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void,
}>();
</script>

<template>
    <text-input
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', String($event))"
    />
</template>
