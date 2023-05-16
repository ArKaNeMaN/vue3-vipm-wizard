import {
    GeneratedObject,
    IItemClass, IItemUnit,
    ILimitClass, ILimitUnit,
    IModuleClass,
    IModuleUnit, IVipItem,
} from "./types.ts";
import {AbstractUnit} from "./abstract.ts";
import {Type} from "typeserializer";

export class ModuleUnit extends AbstractUnit<IModuleClass> implements IModuleUnit {
    protected classFieldKey = 'Module';
}

export class LimitUnit extends AbstractUnit<ILimitClass> implements ILimitUnit {
    protected classFieldKey = 'Limit';
}

export class ItemUnit extends AbstractUnit<IItemClass> implements IItemUnit {
    protected classFieldKey = 'Type';
}

export class VipItem implements IVipItem {
    // @ts-ignore
    @Type([LimitUnit])
    access: LimitUnit[] = [];

    // @ts-ignore
    @Type([ModuleUnit])
    modules: ModuleUnit[] = [];

    constructor(access: LimitUnit[] = [], modules: ModuleUnit[] = []) {
        this.access = access;
        this.modules = modules;
    }

    generate(): GeneratedObject {
        return {
            Access: this.access.map(limit => limit.generate()),
            Modules: this.modules.map(module => module.generate()),
        };
    }
}
