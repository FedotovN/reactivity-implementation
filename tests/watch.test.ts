import { watch, ref, eff } from "../reactivity"
describe("Watcher implementation", () => {
    it('Triggers only on change', () => {
        const a = ref(0);
        const watcherCallback = jest.fn(newValue => {
            const temp = newValue.value;
        })
        watch(a, watcherCallback)
        a.value = 1;
        expect(watcherCallback).toBeCalledTimes(1);
    });
    it('Works with effects ', () => {
        const a = ref(0);
        const b = ref(0);
        const watcherCallback = jest.fn(newValue => {
            b.value = 1
        })
        const effectCallback = jest.fn(() => {
            a.value = 1;
        })
        watch(a, watcherCallback)
        eff(effectCallback)
        expect(watcherCallback).toBeCalledTimes(1);
        expect(effectCallback).toBeCalledTimes(1);
    });
})