<script setup lang="ts">
import ModalLayout from "./ModalLayout.vue";
import {computed, ref} from "vue";
import FaIcon from "../Icons/FaIcon.vue";

const props = withDefaults(defineProps<{
    closeByCross?: boolean,
    show?: boolean,
    closeByBg?: boolean,
    closeByEsc?: boolean,
}>(), {
    closeByCross: true,
    show: false,
    closeByBg: true,
    closeByEsc: true,
});

const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
}>();

const showProxy = computed<boolean>({
    get: () => props.show,
    set: (val) => emit('update:show', val),
});

const modalLayoutEl = ref<typeof ModalLayout | null>(null);

defineExpose({
    close: () => modalLayoutEl.value?.close(),
    open: () => modalLayoutEl.value?.open(),
});

</script>

<script lang="ts">
export default {
    inheritAttrs: false,
}
</script>

<template>
    <modal-layout
        class="p-4"
        ref="modalLayoutEl"
        v-model:show="showProxy"
        :close-by-bg="closeByBg"
        :close-by-esc="closeByEsc"
    >
        <div class="bg-neutral-100 rounded-md relative min-w-[400px] min-h-[100px] max-w-full max-h-full" v-bind="$attrs">
            <button
                v-if="closeByCross"
                class="absolute top-1 right-1 cursor-pointer hover:bg-gray-500/10 rounded p-1"
                @click="modalLayoutEl?.close()"
            >
                <fa-icon icon="times"/>
            </button>

            <div class="overflow-auto h-full w-full p-5">
                <slot/>
            </div>
        </div>
    </modal-layout>
</template>
