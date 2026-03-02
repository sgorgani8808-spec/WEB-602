const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongo;
let app;

beforeAll(async () => {
  process.env.SESSION_SECRET = "test_secret";
  mongo = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongo.getUri();

  const connectDB = require("../config/db");
  await connectDB(process.env.MONGODB_URI);

  app = require("../app");
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

test("GET / should return 200", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
});

test("Signup creates a user and redirects", async () => {
  const res = await request(app).post("/auth/signup").send({
    name: "Test User",
    email: "test@example.com",
    password: "password123"
  });

  expect(res.statusCode).toBe(302);
});