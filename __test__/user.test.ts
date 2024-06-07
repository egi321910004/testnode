import request from "supertest";
import mongoose, { ConnectOptions } from "mongoose";
import app from "../src/app";
import User from "../src/models/userModel";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("POST /api/users", () => {
  it("should create a new user", async () => {
    const newUser = {
      name: "John Doe",
      identity_number: "1234567890",
      email: "johndoe@example.com",
      date_of_birth: "1990-01-01",
    };

    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
  });

  it("should return a 400 status code for invalid data", async () => {
    const invalidUser = {
      name: "Jo",
      identity_number: "12345",
      email: "not-an-email",
      date_of_birth: "1990-01-01",
    };

    const response = await request(app).post("/api/users").send(invalidUser);

    expect(response.status).toBe(400);
  });

  it("should return a 400 status code for invalid email", async () => {
    const invalidUser = {
      name: "John Doe",
      identity_number: "1234567890",
      email: "not-an-email",
      date_of_birth: "1990-01-01",
    };

    const response = await request(app).post("/api/users").send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"email" must be a valid email');
  });

  it("should return a 400 status code for short identity_number", async () => {
    const invalidUser = {
      name: "John Doe",
      identity_number: "12345",
      email: "johndoe@example.com",
      date_of_birth: "1990-01-01",
    };

    const response = await request(app).post("/api/users").send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      '"identity_number" length must be 10 characters long'
    );
  });

  it("should return a 400 status code for missing date_of_birth", async () => {
    const invalidUser = {
      name: "John Doe",
      identity_number: "1234567890",
      email: "johndoe@example.com",
    };

    const response = await request(app).post("/api/users").send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"date_of_birth" is required');
  });
});
