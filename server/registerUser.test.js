import { expect } from "chai";
import { describe, it } from "mocha";

const baseUrl = "http://localhost:3001";
describe("POST register", () => {
  const email = "register@foo.com";
  const password = "register123";
  it("should register with valid email and password", async () => {
    const response = await fetch(`${baseUrl}/user/register`, {
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
    expect(response.status).to.equal(201, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("id", "email");
  });
  it("should not register with password less than 8 characters", async () => {
    const response = await fetch(`${baseUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: "123",
      }),
    });
    const data = await response.json();
    expect(response.status).to.equal(400, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
  });
});
