<script setup lang="ts">
import {reactive} from "vue";

defineProps<{
    items: any[],
}>();

const openedSpoilers = reactive<{[index: string]: boolean}>({});

function toggleSpoiler(key: string, event: Event) {
    if (!['BUTTON', 'A', 'SELECT', 'TEXTAREA', 'INPUT'].includes((event.target as HTMLBaseElement).tagName)) {
        openedSpoilers[key] = !openedSpoilers[key];
    }
}

export type AccordionItem<T> = {
    item: T,
    index: number,
};
</script>

<template>
    <div class="accordion">
        <div v-for="(item, index) in items">
            <div class="accordion__item__header" @click="toggleSpoiler(`spoiler-${index}`, $event)">
                <slot name="head" :item="item" :index="index"/>
            </div>
            <div class="accordion__item__spoiler" :data-show="openedSpoilers[`spoiler-${index}`] ?? false">
                <slot name="body" :item="item" :index="index"/>
            </div>
        </div>
    </div>
</template>

