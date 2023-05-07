import {defineStore} from "pinia";
import {useStorage} from "@vueuse/core";
import {ClassDeclaration, ClassType, ItemClass, LimitClass, ModuleClass, ParamsList, ParamType} from "../vipm/types.ts";
import {checkParamType} from "../vipm/params.ts";

export const useExtensionsStore = defineStore('extensions', {
    state: () => ({
        modules: useStorage<Map<string, ModuleClass>>('ext-modules', new Map()),
        limits: useStorage<Map<string, LimitClass>>('ext-limits', new Map()),
        items: useStorage<Map<string, ItemClass>>('ext-items', new Map()),
    }),

    getters: {
        modulesList: (state): ModuleClass[] => Array.from(state.modules, (v) => v[1]),
        limitsList: (state): LimitClass[] => Array.from(state.limits, (v) => v[1]),
        itemsList: (state): ItemClass[] => Array.from(state.items, (v) => v[1]),
    },

    actions: {
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
                    });
                }

                return list;
            }

            for (const decl of decls) {
                switch (decl.classType) {
                    case ClassType.Module:
                        const moduleData = decl.classData as ModuleClass;
                        this.modules.set(moduleData.name, {
                            name: moduleData.name,
                            params: makeParamsList(moduleData.params),
                        });
                        break;
                    case ClassType.Limit:
                        const limitData = decl.classData as LimitClass;
                        this.limits.set(limitData.name, {
                            name: limitData.name,
                            params: makeParamsList(limitData.params),
                            forPlayer: limitData.forPlayer,
                            static: limitData.static,
                        });
                        break;
                    case ClassType.Item:
                        const itemData = decl.classData as ItemClass;
                        this.items.set(itemData.name, {
                            name: itemData.name,
                            params: makeParamsList(itemData.params),
                        });
                        break;
                }
            }
        },
    },
});
