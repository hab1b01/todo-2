import { expect } from "chai";
import { describe, it } from "mocha";

const baseUrl = "http://localhost:3001";
describe("Delete Task", () => {
  it("should delete a task", async () => {
    const response = await fetch(`${baseUrl}/delete/1`, {
      method: "DELETE",
    });
    const data = await response.json();
    expect(response.status).to.equal(200);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id");
  });
  it("should not delete task with sql injection", async () => {
    const response = await fetch(`${baseUrl}/delete/id=0 or id > 0`, {
      method: "DELETE",
    });
    const data = await response.json();
    expect(response.status).to.equal(500);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
  });
});
