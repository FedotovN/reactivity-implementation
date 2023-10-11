import { track, trigger } from "./eff";
export const ref = (val: any) => {
    return new RefImpl(val);
};
class RefImpl {
    constructor(private _value: any) {};
    get value() {
        track(this);
        return this._value;
    }   
    set value(val: any) {
        this._value = val;
        trigger(this);
    }

};
export { type RefImpl };
