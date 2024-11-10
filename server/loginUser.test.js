import { expect } from "chai";
import { describe, it, before } from "mocha";
import { insertTestUser } from "./helpers/test.js";

const baseUrl = "http://localhost:3001";

describe("POST login", () => {
  before(async () => {
    await insertTestUser(email, password);
  });
  const email = "login@foo.com";
  const password = "login123";
  it("should login with valid credentials", async () => {
    const response = await fetch(`${baseUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    expect(response.status).to.equal(200, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id", "email", "token");
  });
});
