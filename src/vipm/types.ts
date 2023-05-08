export enum ClassType {
    Module = 'module',
    Limit = 'limit',
    Item = 'item',
}

export interface ClassDeclaration {
    classType: ClassType;
    classData: BaseClass & (LimitClass | ItemClass | ModuleClass) | any;
}

export interface BaseClass {
    name: string;
    params: ParamsList;

    title?: string;
    desc?: string;
    url?: string;
}

export interface BaseClassUnit {
    // generate(): Object;
}

export interface ModuleClass extends BaseClass {
}

export interface ModuleUnit extends BaseClassUnit {
    module: ModuleClass;
    params: ParamValues;
}

export interface LimitClass extends BaseClass {
    forPlayer: boolean,
    static: boolean,
}

export interface LimitUnit extends BaseClassUnit {
    type: LimitClass;
    params: ParamValues;
}

export interface ItemClass extends BaseClass {
}

export interface ItemUnit extends BaseClassUnit {
    type: ItemClass;
    params: ParamValues;
}

export enum ParamType {
    Custom = 'Custom',
    Integer = 'Integer',
    Float = 'Float',
    Boolean = 'Boolean',
    String = 'String',
    Color = 'Color',
    Vector2 = 'Vector2',
    Vector3 = 'Vector3',
    Limit = 'Limit',
    Limits = 'Limits',
    Item = 'Item',
    Items = 'Items',
}

export interface Param {
    name: string,
    type: ParamType,
    required: boolean,
    default?: ParamValue,
    desc?: string;
}

export type ParamsList = Param[];

export type ParamValue =
    CustomParamValue
    | number
    | boolean
    | string
    | ColorParamValue
    | Vector2ParamValue
    | Vector3ParamValue
    | LimitParamValue
    | LimitsParamValue
    | ItemParamValue
    | ItemsParamValue;
export type CustomParamValue = ItemUnit | ItemUnit[] | any;
export type ColorParamValue = { Red: number, Green: number, Blue: number };
export type Vector2ParamValue = { X: number, Y: number };
export type Vector3ParamValue = { X: number, Y: number, Z: number };
export type LimitParamValue = LimitUnit;
export type LimitsParamValue = LimitUnit[];
export type ItemParamValue = ItemUnit;
export type ItemsParamValue = ItemUnit[];

// TODO: Или лучше массив обьектов типа {param: Param, value: ParamValue}, чтобы не терять инфу о параметре?
// export type ParamValues = {param: Param, value: ParamValue}[]
export type ParamValues = {
    [index: string]: ParamValue,
};

export interface VipItem {
    access: LimitUnit[],
    modules: ModuleUnit[],
}

export interface CommentedVipItem extends VipItem {
    comment: string,
}
