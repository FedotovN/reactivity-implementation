type Dependency = Set<Function>;
type KeyToDependencies = Map<any, Dependency>;

const targetDepsMap = new Map<any, KeyToDependencies>();
let currEffect: any;

const track = (target: object) => {
    if (!currEffect) return;
    let depsMap =  targetDepsMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetDepsMap.set(target, depsMap);
    }
    let dependency  = depsMap.get('value');
    if (!dependency) {
        dependency = new Set();
        depsMap.set('value', dependency);
    }
    dependency.add(currEffect);
};
const trigger = (target: object) => {
    let depsMap = targetDepsMap.get(target);
    if (!depsMap) return;    
    depsMap.forEach( stashedSideEffects => {
        console.log(stashedSideEffects);
        stashedSideEffects.forEach( effect => {
            effect();
        })
    })
};
export const ref = (val: string) => {
    return new RefImpl(val);
};
export const eff = (cb: Function) => {
    currEffect = cb;
    cb();
    currEffect = undefined;
};
class RefImpl {
    constructor(private _value: string) {};
    get value() {
        track(this);
        return this._value;
    }   
    set value(val: string) {
        trigger(this);
        this._value = val;
    }
};
