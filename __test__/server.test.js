import { port } from "../src/server/index";

describe('Test: "PORT" should be set to 3000', () => {
    it("should be a 3000", async () => {
        expect(port).toBe(3000);
    });
});