<script setup lang="ts">

withDefaults(defineProps<{
    placeholder?: string,
    type?: string,
    modelValue: string | number,
}>(), {
    type: 'text',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void,
}>();

</script>

<template>
    <input
        :type.camel="type"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        class="px-3 py-2 rounded-lg border"
        :placeholder="placeholder"
    />
</template>
