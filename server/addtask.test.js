import { expect } from "chai";
import { describe, it } from "mocha";
import { insertTestUser, getToken } from "./helpers/test.js";

const baseUrl = "http://localhost:3001";

describe("Post Task", async () => {
  const email = "register@foo.com";
  const password = "register123";
  insertTestUser(email, password);
  const token = await getToken(email);

  it("should post a task", async () => {
    const response = await fetch(`${baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },

      body: JSON.stringify({ description: "Task from unit test" }),
    });

    const data = await response.json();
    expect(response.status).to.equal(200);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id", "description");
  });

  it("should not post a task without description", async () => {
    const email = "post@foo.com";
    const password = "post123";
    insertTestUser(email, password);
    const token = await getToken(email);
    const response = await fetch(`${baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        description: null,
      }),
    });
    const data = await response.json();
    expect(response.status).to.equal(400);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
  });
  it("should not post a task with empty description", async () => {
    const email = "post@foo.com";
    const password = "post123";
    insertTestUser(email, password);
    const token = await getToken(email);
    const response = await fetch(`${baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        description: "",
      }),
    });
    const data = await response.json();
    expect(response.status).to.equal(400);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
  });
});
