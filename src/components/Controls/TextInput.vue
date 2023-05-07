<script setup lang="ts">

const props = withDefaults(defineProps<{
    placeholder?: string,
    type?: string,
    modelValue: string,
}>(), {
    type: 'text',
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void,
}>();

</script>

<template>
    <input
        :type.camel="type"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        class="px-3 py-2 rounded-lg border"
        :placeholder="placeholder"
    />
</template>
