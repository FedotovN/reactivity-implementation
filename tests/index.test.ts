import { ref, eff } from "../reactivity/ref";
describe("Index", () => {
    it('Creates ref', () => {
        const a = ref('123');
        eff(() => {
            console.log('a has changed');
            
        });
        a.value = '123';
    });
})