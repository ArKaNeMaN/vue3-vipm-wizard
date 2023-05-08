<script setup lang="ts">

import {useVipsStore} from "../stores/vips.ts";
import PrimaryButton from "../components/Controls/PrimaryButton.vue";
import TextInput from "../components/Controls/TextInput.vue";
import {ref} from "vue";
// noinspection ES6UnusedImports
import Accordion, {AccordionItem} from "../components/Accordion.vue";
import {CommentedVipItem, ModuleUnit} from "../vipm/types.ts";
import SecondaryButton from "../components/Controls/SecondaryButton.vue";
import {useExtensionsStore} from "../stores/extensions.ts";

const vips = useVipsStore();
const exts = useExtensionsStore();
const newVipComment = ref<string>('');

function onAddVip() {
    vips.add(newVipComment.value, [], []);
    newVipComment.value = '';
}

function test(vipIndex: number) {
    const moduleClass = exts.getModule('VipInTab');
    console.log(moduleClass);
    if (moduleClass === undefined) {
        return;
    }

    const moduleUnit: ModuleUnit = {
        module: moduleClass,
        params: {
            Enabled: true,
            Override: false,
        },
    };
    console.log(moduleUnit);

    vips.addModule(vipIndex, moduleUnit);
    console.log(vips.vipsList);
}
</script>

<template>
    <div class="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        <h2 class="header-2">Vips</h2>

        <form class="controls-row collapse-borders" @submit.prevent="onAddVip">
            <text-input
                v-model.trim="newVipComment"
                class="w-full"
                placeholder="Comment"
            />
            <primary-button>Add</primary-button>
        </form>

        <accordion :items="vips.vipsList" class="mt-4">
            <template v-slot:head="{item: vip, index}: AccordionItem<CommentedVipItem>">
                <div class="flex items-center w-full font-semibold">
                    <h3 class="shrink-0">
                        <span v-if="vip.comment">{{ vip.comment }}</span>
                        <span v-else class="italic">*Untitled*</span>
                    </h3>
                    <div class="grow"></div>
                    <secondary-button class="shrink-0" @click="vips.remove(index)">Remove</secondary-button>
                </div>
            </template>
            <template v-slot:body="{item: vip, index}: AccordionItem<CommentedVipItem>">
                <div class="space-y-2">
                    <p>Limits count: {{ vip.access.length }}</p>
                    <p>Modules count: {{ vip.modules.length }}</p>
                    <pre>{{ vip }}</pre>
                    <primary-button @click="test(index)">Test</primary-button>
                </div>
            </template>
        </accordion>
    </div>
</template>
