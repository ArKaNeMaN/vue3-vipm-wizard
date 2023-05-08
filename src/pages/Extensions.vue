<script setup lang="ts">
import PrimaryButton from "../components/Controls/PrimaryButton.vue";
import {ref} from "vue";
import {useToast} from "vue-toastification";
import {useExtensionsStore} from "../stores/extensions.ts";
import SecondaryButton from "../components/Controls/SecondaryButton.vue";
import TextInput from "../components/Controls/TextInput.vue";
import ParamsTable from "../components/Table/ParamsTable.vue";
import FileInput from "../components/Controls/FileInput.vue";
// noinspection ES6UnusedImports
import Accordion, {AccordionItem} from "../components/Accordion.vue";
import {ItemClass, LimitClass, ModuleClass} from "../vipm/types.ts";

const selectedFile = ref<File | null>(null);
// Чтобы для теста каждый раз не писать руками
const githubImportUrl = ref<string>('ArKaNeMaN/amxx-VipModular-pub@feature-classes-declaration');

const exts = useExtensionsStore();

async function loadFormFile() {
    if (selectedFile.value === null) {
        useToast().warning('Файл не выбран');
        return;
    }

    try {
        await exts.addFromFile(selectedFile.value as File);
    } catch (e) {
        if (typeof e === 'string') {
            useToast().error(e);
        } else {
            useToast().error('Can\'t import extensions from this file.');
            throw e;
        }
    }
}

async function loadFromGithub() {
    try {
        await exts.addFromGithubByString(githubImportUrl.value);
    } catch (e) {
        if (typeof e === 'string') {
            useToast().error(e);
        } else {
            useToast().error('Can\'t import extensions from this repository.');
            throw e;
        }
    }
}
</script>

<template>
    <div class="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        <h2 class="header-2">Extensions list</h2>

        <div class="py-4">
            <h3 class="header-3">Import</h3>

            <h3 class="form-label">Import from file</h3>
            <form class="controls-row collapse-borders" @submit.prevent="loadFormFile">
                <file-input
                    type="file"
                    accept="application/json"
                    @change="selectedFile = (($event.target as HTMLInputElement)?.files ?? [])[0] ?? null"
                    class="w-full"
                />
                <primary-button :disabled="selectedFile === null">Import</primary-button>
            </form>

            <h3 class="form-label">Import from GitHub (user/repo[@branch])</h3>
            <form class="controls-row collapse-borders" @submit.prevent="loadFromGithub">
                <text-input v-model.trim="githubImportUrl" class="w-full"/>
                <primary-button :disabled="!githubImportUrl.length">Import</primary-button>
            </form>
        </div>

        <div class="flex flex-col gap-y-4 mt-4">
            <div>
                <h3 class="header-3">Modules</h3>
                <accordion :items="exts.modulesList">
                    <template v-slot:head="{item: module}: AccordionItem<ModuleClass>">
                        <h4 class="font-semibold shrink-0">
                            <span>{{ module.title ?? module.name }}</span>
                            <span class="text-gray-500 ml-2 font-normal" v-if="module.title">({{ module.name }})</span>
                        </h4>
                        <div class="grow"></div>
                        <secondary-button
                            class="shrink-0"
                            @click="exts.modules.delete(module.name)"
                        >Remove</secondary-button>
                    </template>
                    <template v-slot:body="{item: module}: AccordionItem<ModuleClass>">
                        <p class="mb-6" v-if="module.desc">{{ module.desc }}</p>
                        <h5>Params:</h5>
                        <params-table :params="module.params" class="w-full text-sm"/>
                    </template>
                </accordion>
            </div>
            <div>
                <h3 class="header-3">Limits</h3>
                <accordion :items="exts.limitsList">
                    <template v-slot:head="{item: limit}: AccordionItem<LimitClass>">
                        <h4 class="font-semibold shrink-0">
                            <span>{{ limit.title ?? limit.name }}</span>
                            <span class="text-gray-500 ml-2 font-normal" v-if="limit.title">({{ limit.name }})</span>
                        </h4>
                        <div class="grow"></div>
                        <secondary-button
                            class="shrink-0"
                            @click="exts.limits.delete(limit.name)"
                        >Remove</secondary-button>
                    </template>
                    <template v-slot:body="{item: limit}: AccordionItem<LimitClass>">
                        <p class="mb-6" v-if="limit.desc">{{ limit.desc }}</p>
                        <div class="space-y-2">
                            <div class="space-x-2">
                                <span>For player:</span>
                                <span>{{ limit.forPlayer ? 'Yes' : 'No' }}</span>
                            </div>
                            <div class="space-x-2">
                                <span>Static:</span>
                                <span>{{ limit.static ? 'Yes' : 'No' }}</span>
                            </div>
                            <div>
                                <h5>Params:</h5>
                                <params-table :params="limit.params" class="w-full text-sm"/>
                            </div>
                        </div>
                    </template>
                </accordion>
            </div>
            <div>
                <h3 class="header-3">Items</h3>
                <accordion :items="exts.itemsList">
                    <template v-slot:head="{item: item}: AccordionItem<ItemClass>">
                        <h4 class="font-semibold shrink-0">
                            <span>{{ item.title ?? item.name }}</span>
                            <span class="text-gray-500 ml-2 font-normal" v-if="item.title">({{ item.name }})</span>
                        </h4>
                        <div class="grow"></div>
                        <secondary-button
                            class="shrink-0"
                            @click="exts.items.delete(item.name)"
                        >Remove</secondary-button>
                    </template>
                    <template v-slot:body="{item: item}: AccordionItem<ItemClass>">
                        <p class="mb-6" v-if="item.desc">{{ item.desc }}</p>
                        <h5>Params:</h5>
                        <params-table :params="item.params" class="w-full text-sm"/>
                    </template>
                </accordion>
            </div>
        </div>
    </div>
</template>
