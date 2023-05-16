<script setup lang="ts">

import {useVipsStore} from "../stores/vips.ts";
import PrimaryButton from "../components/Controls/PrimaryButton.vue";
import TextInput from "../components/Controls/TextInput.vue";
import {ref} from "vue";
import Accordion, {AccordionItem} from "../components/Accordion.vue";
import {ICommentedVipItem} from "../vipm/types.ts";
import SecondaryButton from "../components/Controls/SecondaryButton.vue";
import {useExtensionsStore} from "../stores/extensions.ts";
import {ModuleUnit} from "../vipm/impl.ts";

const vips = useVipsStore();
const exts = useExtensionsStore();
const newVipComment = ref<string>('');

function onAddVip() {
    vips.add(newVipComment.value, [], []);
    newVipComment.value = '';
}

function test(vipIndex: number) {
    const moduleClass = exts.getModule('VipInTab');
    if (moduleClass === undefined) {
        return;
    }

    const moduleUnit = new ModuleUnit(moduleClass, {
        Enabled: true,
        Override: false,
    });

    vips.addModule(vipIndex, moduleUnit);
}

// TODO: Нормальные списки лимитов и модулей
// TODO: Кнопки для добавления лимита/модуля с селектом из доступных
// TODO: Модалки для ввода параметров
//       Возможно выбор класса юнита будет уже в модалке,
//       и после выбора будут появляться поля для параметров.

//       А поля для параметров скорее всего отдельными компонентами для каждого типа,
//       и динамически подставлять это всё в формочку.
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
            <template v-slot:head="{item, index}: AccordionItem<ICommentedVipItem>">
                <div class="flex items-center w-full font-semibold">
                    <h3 class="shrink-0">
                        <span v-if="item.comment">{{ item.comment }}</span>
                        <span v-else class="italic">*Untitled*</span>
                    </h3>
                    <div class="grow"></div>
                    <secondary-button class="shrink-0" @click="vips.remove(index)">Remove</secondary-button>
                </div>
            </template>
            <template v-slot:body="{item, index}: AccordionItem<ICommentedVipItem>">
                <div class="space-y-2">
                    <p>Limits count: {{ item.vip.access.length }}</p>
                    <p>Modules count: {{ item.vip.modules.length }}</p>
                    <pre>{{ item.vip.generate() }}</pre>
                    <primary-button @click="test(index)">Test</primary-button>
                </div>
            </template>
        </accordion>

        <pre>{{ vips.generated }}</pre>
    </div>
</template>
