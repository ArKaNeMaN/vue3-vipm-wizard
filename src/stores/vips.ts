import {defineStore} from "pinia";
import {useStorage} from "@vueuse/core";
import {ICommentedVipItem, GeneratedObject, IModuleUnit} from "../vipm/types.ts";
import {LimitUnit, ModuleUnit, VipItem} from "../vipm/impl.ts";
import {deserialize, serialize} from "typeserializer";

export const useVipsStore = defineStore('vips', {
    state: () => ({
        vips: useStorage<ICommentedVipItem[]>('vips', [], localStorage, {
            deep: true,
            serializer: {
                read(raw: string): ICommentedVipItem[] {
                    return (JSON.parse(raw) as { [key: string]: any }[]).map((item) => ({
                        comment: item.comment,
                        vip: deserialize(item.vip, VipItem),
                    }));
                },
                write(value: ICommentedVipItem[]): string {
                    return JSON.stringify(value.map((item) => ({
                        comment: item.comment,
                        vip: serialize(item.vip),
                    })));
                }
            },
        }),
    }),

    getters: {
        vipsList: (state): ICommentedVipItem[] => state.vips,
        generated: (state): GeneratedObject[] => state.vips.map(vip => {
            return vip.vip.generate();
        }),
    },

    actions: {
        add(comment: string, access: LimitUnit[], modules: ModuleUnit[]) {
            this.vips.push({comment, vip: new VipItem(access, modules)});
        },
        remove(index: number) {
            this.vips.splice(index, 1);
        },

        addLimit(index: number, limit: LimitUnit) {
            this.vips[index].vip.access.push(limit);
        },
        removeLimit(index: number, limitIndex: number) {
            this.vips[index].vip.access.splice(limitIndex, 1);
        },

        addModule(index: number, module: IModuleUnit) {
            this.vips[index].vip.modules.push(module);
        },
        removeModule(index: number, moduleIndex: number) {
            this.vips[index].vip.access.splice(moduleIndex, 1);
        },
    },
});
