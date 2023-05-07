<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

const props = withDefaults(defineProps<{
    show?: boolean,
    closeByBg?: boolean,
    closeByEsc?: boolean,
}>(), {
    show: false,
    closeByBg: true,
    closeByEsc: true,
});

const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
}>();

const showState = ref<boolean>(false);

onMounted(() => {
    (props.show ? open : close)();
});

watch(() => props.show, () => {
    (props.show ? open : close)();
});

function onKeyPressed(e) {
    if (showState.value && e.key === 'Escape') {
        close();
    }
}

const open = (): void => {
    emit('update:show', true);
    showState.value = true;
    document.addEventListener('keydown', onKeyPressed);
}

const close = (): void => {
    emit('update:show', false);
    showState.value = false;
    document.removeEventListener('keydown', onKeyPressed);
}

defineExpose({close, open});
</script>

<script lang="ts">
export default {
    inheritAttrs: false,
}
</script>

<template>
    <teleport to="body">
        <div
            :class="`modal-layout ${showState ? 'modal-layout_show' : 'modal-layout_hide'}`"
            @click.self="closeByBg ? close() : undefined"
            v-bind="$attrs"
        >
            <slot/>
        </div>
    </teleport>
</template>

<style scoped lang="scss">
.modal-layout {
    @apply absolute top-0 right-0 bottom-0 left-0 max-h-screen max-w-full;
    @apply bg-gray-900/30 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden;

    --fade-time: .1s;

    &.modal-layout_show {
        transition: opacity var(--fade-time) linear;
        visibility: visible;
        opacity: 1;
    }

    &.modal-layout_hide {
        transition: opacity var(--fade-time) linear, visibility 0s var(--fade-time);
        visibility: hidden;
        opacity: 0;
    }
}
</style>
