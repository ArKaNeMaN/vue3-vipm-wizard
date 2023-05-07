<script setup lang="ts">
import TextInput from "../TextInput.vue";

const props = defineProps<{
    modelValue: number,
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void,
}>();
</script>

<template>
    <text-input
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', Number($event))"

        type="number"
        step="1"
    />
</template>
