import {defineStore} from "pinia";
import {useStorage} from "@vueuse/core";
import {CommentedVipItem, LimitUnit, ModuleUnit} from "../vipm/types.ts";

export const useVipsStore = defineStore('vips', {
    state: () => ({
        vips: useStorage<CommentedVipItem[]>('vips', [], localStorage, {
            deep: true,
        }),
    }),

    getters: {
        vipsList: (state): CommentedVipItem[] => state.vips,
    },

    actions: {
        add(comment: string, access: LimitUnit[], modules: ModuleUnit[]) {
            this.vips.push({comment, access, modules});
        },
        remove(index: number) {
            this.vips.splice(index, 1);
        },

        addLimit(index: number, limit: LimitUnit) {
            this.vips[index].access.push(limit);
        },
        removeLimit(index: number, limitIndex: number) {
            this.vips[index].access.splice(limitIndex, 1);
        },

        addModule(index: number, module: ModuleUnit) {
            this.vips[index].modules.push(module);
        },
        removeModule(index: number, moduleIndex: number) {
            this.vips[index].access.splice(moduleIndex, 1);
        },
    },
});
