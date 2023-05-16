export enum ClassType {
    Module = 'module',
    Limit = 'limit',
    Item = 'item',
}

export interface ClassDeclaration {
    classType: ClassType;
    classData: IBaseClass & (ILimitClass | IItemClass | IModuleClass) | any;
}

export interface IBaseClass {
    name: string;
    params?: ParamsList;

    title?: string;
    desc?: string;
    url?: string;
}

export type GeneratedValue = string | number | boolean | GeneratedArray | GeneratedObject;
export type GeneratedArray = GeneratedValue[];
export type GeneratedObject = { [index: string]: GeneratedValue };

export interface CanBeGenerated {
    generate(): GeneratedObject;
}

export interface IBaseClassUnit<T extends IBaseClass = IBaseClass> extends CanBeGenerated {
    unitClass: T;
    params?: ParamValues | null;
}

export interface IModuleClass extends IBaseClass {
}

export interface IModuleUnit extends IBaseClassUnit<IModuleClass> {
}

export interface ILimitClass extends IBaseClass {
    forPlayer: boolean,
    static: boolean,
}

export interface ILimitUnit extends IBaseClassUnit<ILimitClass> {
}

export interface IItemClass extends IBaseClass {
}

export interface IItemUnit extends IBaseClassUnit<IItemClass> {
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

export type Param = {
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
export type CustomParamValue = IItemUnit | IItemUnit[] | any;
export type ColorParamValue = { Red: number, Green: number, Blue: number };
export type Vector2ParamValue = { X: number, Y: number };
export type Vector3ParamValue = { X: number, Y: number, Z: number };
export type LimitParamValue = ILimitUnit;
export type LimitsParamValue = ILimitUnit[];
export type ItemParamValue = IItemUnit;
export type ItemsParamValue = IItemUnit[];

// TODO: Или лучше массив обьектов типа {param: Param, value: ParamValue}, чтобы не терять инфу о параметре?
// export type ParamValues = {param: Param, value: ParamValue}[]
export type ParamValues = {
    [index: string]: ParamValue,
};

export interface IVipItem extends CanBeGenerated {
    access: ILimitUnit[],
    modules: IModuleUnit[],
}

export type ICommentedVipItem = {
    comment: string,
    vip: IVipItem,
}
