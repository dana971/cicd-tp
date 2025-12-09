const request = require("supertest");
const app = require("../../src/server");

describe("Server", () => {
  describe("GET /hello/:name?", () => {
    it("should return a greeting with the provided name", async () => {
      const response = await request(app).get("/hello/Alice");

      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello Alice");
    });

    it("should return a default greeting when no name is provided", async () => {
      const response = await request(app).get("/hello");

      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello World");
    });

    it("should handle empty string as name", async () => {
      const response = await request(app).get("/hello/");

      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello World");
    });
  });

  describe("POST /hello", () => {
    it("should return a greeting with the name from header", async () => {
      const response = await request(app)
        .post("/hello")
        .set("x-name", "Bob");

      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello Bob");
    });

    it("should return a default greeting when no header is provided", async () => {
      const response = await request(app).post("/hello");

      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello World");
    });

    it("should handle empty string as header value", async () => {
      const response = await request(app)
        .post("/hello")
        .set("x-name", "");

      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello World");
    });
  });

  describe("Error handling", () => {
    it("should return 404 for unknown routes", async () => {
      const response = await request(app).get("/unknown");

      expect(response.status).toBe(404);
    });
  });
});
