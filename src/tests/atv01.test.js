import { sum } from "../function/atv01"

describe("sum", () => {
    it("Should add 2 numbers", () => {
        expect(sum(2,3)).toBe(5)
    })
})