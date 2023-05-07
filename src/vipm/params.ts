import {ParamType, ParamValue} from "./types.ts";

const paramTypeValidators: { [key in ParamType]: (value: ParamValue) => boolean } = {
    [ParamType.Custom]() {
        return true;
    },
    [ParamType.Boolean](value) {
        return typeof value === 'boolean';
    },
    [ParamType.Float](value) {
        return typeof value === 'number' && Number.isFinite(value);
    },
    [ParamType.Integer](value) {
        return typeof value === 'number' && Number.isInteger(value);
    },
    [ParamType.String](value) {
        return typeof value === 'string';
    },
    [ParamType.Vector2](value) {
        return Object.keys(value).includes('X') && Object.keys(value).includes('Y');
    },
    [ParamType.Vector3](value) {
        return Object.keys(value).includes('X') && Object.keys(value).includes('Y') && Object.keys(value).includes('Z');
    },
    [ParamType.Color](value) {
        return Object.keys(value).includes('R') && Object.keys(value).includes('G') && Object.keys(value).includes('B');
    },

    [ParamType.Limits](value) {
        // TODO: ...
        return Array.isArray(value) && value.find(() => false) === undefined;
    },
    [ParamType.Limit]() {
        // TODO: ...
        return false;
    },
    [ParamType.Items](value) {
        // TODO: ...
        return Array.isArray(value) && value.find(() => false) === undefined;
    },
    [ParamType.Item]() {
        // TODO: ...
        return false;
    },
}

export function checkParamType(type: ParamType, value: ParamValue): boolean {
    return paramTypeValidators[type](value) ?? false;
}
