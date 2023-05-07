<script setup lang="ts">
import PrimaryButton from "../components/Controls/PrimaryButton.vue";
import {ref} from "vue";
import {useToast} from "vue-toastification";
import {useExtensionsStore} from "../stores/extensions.ts";
import SecondaryButton from "../components/Controls/SecondaryButton.vue";
import TextInput from "../components/Controls/TextInput.vue";
import ParamsTable from "../components/Table/ParamsTable.vue";

const selectedFile = ref<File | null>(null);
const githubImportUrl = ref<string>('');

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
            useToast().error('Can\'t import extensions from this file.');
            throw e;
        }
    }
}

const openedSpoiler = ref<string | null>(null);

function toggleSpoiler(key: string) {
    openedSpoiler.value = openedSpoiler.value === key ? null : key;
}

</script>

<template>
    <div>
        <h2 class="header-2">Extensions list</h2>

        <div class="py-4">
            <h3 class="form-label">Import from file</h3>
            <div class="flex items-center">
                <input
                    type="file"
                    accept="application/json"
                    @change="selectedFile = ($event.target.files || $event.dataTransfer.files)[0] ?? null"
                />
                <primary-button
                    type="button"
                    @click="loadFormFile"
                    :disabled="selectedFile === null"
                >Import</primary-button>
            </div>

            <h3 class="form-label">Import from GitHub (user/repo[@branch])</h3>
            <div class="flex items-center">
                <text-input v-model.trim="githubImportUrl" class="md:w-1/2 w-full"/>
                <primary-button
                    type="button"
                    @click="loadFromGithub"
                    :disabled="!githubImportUrl.length"
                >Import</primary-button>
            </div>
        </div>


        <div class="flex flex-col gap-y-4 mt-8 md:w-1/2 w-full">
            <div>
                <h3 class="header-3">Modules</h3>
                <div class="exts-list">
                    <div v-for="module in exts.modulesList" :key="module.name">
                        <div
                            class="exts-list__item__header"
                            @click="toggleSpoiler(`module-${module.name}`)"
                        >
                            <h4 class="font-semibold shrink-0">{{ module.name }}</h4>
                            <div class="grow"></div>
                            <secondary-button
                                class="shrink-0"
                                @click="exts.modules.delete(module.name)"
                            >Remove</secondary-button>
                        </div>
                        <div class="exts-list__item__spoiler" :data-show="openedSpoiler === `module-${module.name}`">
                            <h5>Params:</h5>
                            <params-table :params="module.params" class="w-full text-sm"/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="header-3">Limits</h3>
                <div class="exts-list">
                    <div v-for="limit in exts.limitsList" :key="limit.name">
                        <div
                            class="exts-list__item__header"
                            @click="toggleSpoiler(`limit-${limit.name}`)"
                        >
                            <h4 class="font-semibold shrink-0">{{ limit.name }}</h4>
                            <div class="grow"></div>
                            <secondary-button
                                class="shrink-0"
                                @click="exts.limits.delete(limit.name)"
                            >Remove</secondary-button>
                        </div>
                        <div
                            class="exts-list__item__spoiler space-y-2"
                            :data-show="openedSpoiler === `limit-${limit.name}`"
                        >
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
                    </div>
                </div>
            </div>
            <div>
                <h3 class="header-3">Items</h3>
                <div class="exts-list">
                    <div v-for="item in exts.itemsList" :key="item.name">
                        <div
                            class="exts-list__item__header"
                            @click="toggleSpoiler(`item-${item.name}`)"
                        >
                            <h4 class="font-semibold shrink-0">{{ item.name }}</h4>
                            <div class="grow"></div>
                            <secondary-button
                                class="shrink-0"
                                @click="exts.items.delete(item.name)"
                            >Remove</secondary-button>
                        </div>
                        <div class="exts-list__item__spoiler" :data-show="openedSpoiler === `item-${item.name}`">
                            <h5>Params:</h5>
                            <params-table :params="item.params" class="w-full text-sm"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.exts-list {
    & > div {
        @apply border border-t-0;
        @apply px-2;

        &:first-child {
            @apply rounded-t-lg border-t;
        }

        .exts-list__item__header {
            @apply flex items-center cursor-pointer py-2;
        }

        .exts-list__item__spoiler {
            @apply overflow-y-hidden py-2;

            &[data-show=true] {
                @apply block;
            }

            &[data-show=false] {
                @apply hidden;
            }
        }
    }
}
</style>
