<script setup lang="ts">
import TextInput from "../TextInput.vue";

const props = defineProps<{
    modelValue: string,
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void,
}>();
</script>

<template>
    <text-input
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', $event)"
    />
</template>
