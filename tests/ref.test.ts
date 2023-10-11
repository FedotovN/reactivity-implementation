import { ref, eff } from "../reactivity";
describe("Ref Implementation", () => {
    it('Reactivity magic', () => {
        const firstCallback = jest.fn(() => {
            b.value = '1';
            expect(firstCallback).toBeCalledTimes(1);
        })
        const secondCallback = jest.fn(() => {
            a.value = '0';
            expect(secondCallback).toBeCalledTimes(1);
        })
        const [a, b] = [ref(''), ref('')];
        eff(firstCallback);
        eff(secondCallback)
        a.value = 'Has changed';
    });
    it.failing("Stack overflow on recursive side effects invoke", () => {
        const a = ref(1);
        const b = ref('');
        eff(() => {
            b.value = '1';
            const temp = a.value;
        });
        eff(() => {
            a.value = '0';
            const temp = b.value; 
        })
        a.value = 'Has changed';
    })
})