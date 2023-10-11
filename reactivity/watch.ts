import { targetDepsMap } from "./eff";
import { RefImpl } from "./ref";
type WatcherCallback<T> = (newValue: T) => void;

export const watch = (ref: RefImpl, callback: WatcherCallback<RefImpl>) => {
    const targetObjectDependencies = targetDepsMap.get(ref);
    if (!targetObjectDependencies) {
        const newDepsMap = new Map();
        newDepsMap.set('value', new Set([() => callback(ref)]));
        targetDepsMap.set(ref, newDepsMap);
        return;
    }
    const targetValueDependencies = targetObjectDependencies.get('value');
    if (!targetValueDependencies) {
        targetDepsMap.get(ref)?.set('value', new Set([() => callback(ref)]));
        return;
    }
    targetValueDependencies.add(() => callback(ref));
}