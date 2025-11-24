import request from "supertest";
import app from "../../server.js";

let token = "";
let categoryId = "";
let productId = "";
let testEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;

describe("API InventarioEC", () => {
  test("Registrar usuario", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({ name: "Juan Perez", email: testEmail, password: "123456" });
    expect(res.statusCode).toBe(201);
    token = res.body.token;
  },10000);

  test("Login usuario", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: testEmail, password: "123456" });
    expect(res.statusCode).toBe(200);
    token = res.body.token;
  });

  test("Crear categoría", async () => {
    const res = await request(app)
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Celulares" });
    expect([200, 201]).toContain(res.statusCode);
    categoryId = res.body._id || res.body.id; 
  });

  test("Crear producto", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "iPhone 15",
        description: "Smartphone Apple",
        category: categoryId,
        price: 1200,
        stock: 15,
      });
    expect(res.statusCode).toBe(201);
    productId = res.body._id;
  });

  test("Agregar inventario", async () => {
    const res = await request(app)
      .post("/api/inventory")
      .set("Authorization", `Bearer ${token}`)
      .send({ product: productId, quantity: 10, type: "IN" });
    expect(res.statusCode).toBe(201);
  });

  test("Filtrar productos", async () => {
    const res = await request(app)
      .get("/api/products/filter?search=iPhone")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.products.length).toBeGreaterThan(0);
  });
});
