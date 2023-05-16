import {GeneratedObject, IBaseClass, IBaseClassUnit, Param, ParamValues} from "./types.ts";
import {checkParamType} from "./params.ts";

export class UnitParamException {
    protected param: Param;
    protected msg: string;

    constructor(param: Param, msg: string) {
        this.msg = msg;
        this.param = param;
    }

    getMsg(): string {
        return `'${this.param.name}' param error: ${this.msg}`;
    }
}

export abstract class AbstractUnit<T extends IBaseClass> implements IBaseClassUnit<T> {
    unitClass: T;
    params?: ParamValues;

    protected classFieldKey: string = 'Class';

    constructor(unitClass: T, params: ParamValues) {
        this.unitClass = unitClass;

        this.params = {};
        for (const param of this.unitClass?.params ?? []) {
            if (param.required && params[param.name] === undefined) {
                throw new UnitParamException(param, 'Required, but not presented.');
            }

            if (!checkParamType(param.type, params[param.name] ?? param.default)) {
                throw new UnitParamException(param, 'Invalid value.');
            }

            if (params[param.name] !== undefined) {
                this.params[param.name] = params[param.name];
            }
        }
    }

    generate(): GeneratedObject {
        let res = {
            [this.classFieldKey]: this.unitClass.name,
        };

        if (this.params !== undefined) {
            for (const key in Object.keys(this.params)) {
                if (this.params[key]?.generate instanceof Function) {
                    res[key] = this.params[key].generate();
                } else {
                    res[key] = this.params[key];
                }
            }
        }

        return res;
    }
}
