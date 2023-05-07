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
        class="
            text-base leading-4 py-2.5 px-4 rounded-lg border h-4 box-content
            focus:border focus:border-blue-400
            focus-visible:outline-0
        "
        :placeholder="placeholder"
    />
</template>
