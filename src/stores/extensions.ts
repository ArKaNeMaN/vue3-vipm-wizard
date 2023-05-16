import {defineStore} from "pinia";
import {useStorage} from "@vueuse/core";
import {
    IBaseClass,
    ClassDeclaration,
    ClassType,
    IItemClass,
    ILimitClass,
    IModuleClass,
    ParamsList,
    ParamType
} from "../vipm/types.ts";
import {checkParamType} from "../vipm/params.ts";

export const useExtensionsStore = defineStore('extensions', {
    state: () => ({
        modules: useStorage<Map<string, IModuleClass>>('ext-modules', new Map()),
        limits: useStorage<Map<string, ILimitClass>>('ext-limits', new Map()),
        items: useStorage<Map<string, IItemClass>>('ext-items', new Map()),
    }),

    getters: {
        modulesList: (state): IModuleClass[] => Array.from(state.modules, (v) => v[1]),
        limitsList: (state): ILimitClass[] => Array.from(state.limits, (v) => v[1]),
        itemsList: (state): IItemClass[] => Array.from(state.items, (v) => v[1]),
    },

    actions: {
        getModule(name: string): IModuleClass | undefined {
            return this.modules.get(name);
        },
        getLimit(name: string): ILimitClass | undefined {
            return this.limits.get(name);
        },
        getItem(name: string): IItemClass | undefined {
            return this.items.get(name);
        },

        addFromGithubByString(repo: string) {
            let r = repo.split('/');
            r = [r[0], ...r[1].split('@')];
            return this.addFromGithub(r[0], r[1], r[2] ?? 'master');
        },
        addFromGithub(user: string, repo: string, branch: string = 'master') {
            return this.addFromUrl(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/vipm-classes.json`);
        },
        async addFromUrl(url: string) {
            this.addByDecl(await (await fetch(url)).json());
        },
        async addFromFile(file: File) {
            this.addByDecl(JSON.parse(await file.text()));
        },
        addByDecl(decls: ClassDeclaration | ClassDeclaration[]) {
            if (!(decls instanceof Array)) {
                decls = [decls];
            }

            function makeParamsList(params: any[] | undefined): ParamsList {
                if (params === undefined) {
                    return [];
                }

                let list: ParamsList = [];
                for (const param of params) {
                    if (!Object.values(ParamType).includes(param.type)) {
                        throw `Undefined param type (${param.type}).`;
                    }

                    if (param.default !== undefined && !checkParamType(param.type, param.default)) {
                        throw `Invalid default value (${param.default}) for (${param.type}) param type.`;
                    }

                    list.push({
                        name: param.name,
                        type: param.type,
                        required: param.required,
                        default: param.default ?? undefined,
                        desc: param.desc ?? undefined,
                    });
                }

                return list;
            }

            for (const decl of decls) {
                const baseData: IBaseClass = {
                    name: decl.classData.name,
                    params: makeParamsList(decl.classData.params),
                    title: decl.classData.title ?? undefined,
                    desc: decl.classData.desc ?? undefined,
                };

                switch (decl.classType) {
                    case ClassType.Module:
                        this.modules.set(baseData.name, baseData);
                        break;
                    case ClassType.Limit:
                        this.limits.set(baseData.name, {
                            ...baseData,
                            // https://github.com/ArKaNeMaN/amxx-VipModular-pub/blob/master/amxmodx/scripting/include/VipM/Limits.inc#L74
                            forPlayer: decl.classData.forPlayer ?? true,
                            static: decl.classData.static ?? false,
                        });
                        break;
                    case ClassType.Item:
                        this.items.set(baseData.name, baseData);
                        break;
                }
            }
        },
    },
});
