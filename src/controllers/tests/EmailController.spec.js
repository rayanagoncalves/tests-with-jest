// DESCRIBE --> declara um bloco de testes, reunindo eles (testsuites)
// IT OR TEST --> declara um único teste unitário (testcases)
// EXPECT --> faz asserções acerca do resultado do teste unitário 

function sum(a, b) {
    return a + b;
}

describe("Initial Tests", () => {
    it("First unit tests", () => {
        const firstArgument = 7;
        const secondArgument = 1;

        let result = sum(firstArgument, secondArgument);

        expect(result).toEqual(firstArgument + secondArgument);
    })

    it("Second unit tests", () => {
        const firstArgument = 7;
        const secondArgument = 1;

        let result = sum(firstArgument, secondArgument);

        expect(result).toEqual(firstArgument + secondArgument + 1)
    })
})