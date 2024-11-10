import { expect } from "chai";
import { describe, it, before } from "mocha";
import { initializeTestToDb } from "./helpers/test.js";

const baseUrl = "http://localhost:3001/";
describe("Get Tasks", () => {
  before(async () => {
    return await initializeTestToDb();
  });
  it("should return all tasks", async () => {
    const response = await fetch(baseUrl);
    const data = await response.json();
    expect(response.status).to.equal(200);
    expect(data).to.be.an("array").that.is.not.empty;
    expect(data[0]).to.include.all.keys("id", "description");
  });
});
