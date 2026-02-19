const { TextEncoder, TextDecoder } = require("node:util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const request = require('supertest');
const app = require('./index');

describe("Test todo methods", () => {

  it("Returns all todos", async () => {
    const response = await request(app).get("/todo");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  it("Returns a todo with id:2", async () => {
    const response = await request(app).get("/todo/2");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Get pizza for dinner");
  });

});

describe("Test responses from querying an external API", () => {

  it("Should retrieve a random Chuck Norris joke", async () => {
    const response = await request(app).get("/joke");

    expect(response.status).toBe(200);
    expect(response.body.value).toBeTruthy();
  });

  it("No 2 Chuck Norris jokes will be the same", async () => {
    const joke1 = await request(app).get("/joke");
    const joke2 = await request(app).get("/joke");

    expect(joke1.body.value).not.toBe(joke2.body.value);
  });

});
