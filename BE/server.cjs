const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "beverage-store-angular",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Kết Nối CSDL Thành Công!");
});

app.get("/products", (req, res) => {
  connection.query("SELECT * FROM products ", (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  connection.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (error, results, fields) => {
      if (error) throw error;
      if (results.length === 0) {
        res.status(404).json({ message: "Sản phẩm không tồn tại" });
      } else {
        res.json(results[0]);
      }
    }
  );
});

app.get("/sale", (req, res) => {
  connection.query(
    "SELECT * FROM products WHERE sale ",
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});
// User
app.post("/register", (req, res) => {
  const { username, phone, email, address, password, description } = req.body;
  if (!username || !phone || !email || !address || !password) {
    return res
      .status(400)
      .send({ message: "Tất cả các trường đều là bắt buộc" });
  }

  const query =
    "INSERT INTO user (username, phone, email, address, password, description) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [username, phone, email, address, password, description],
    (error, results) => {
      if (error) {
        console.error("Lỗi truy vấn: ", error);
        res.status(500).send({ error: "Lỗi truy vấn" });
      } else {
        res.status(201).send({ message: "Người dùng đã được đăng ký" });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body || {}; // Thêm fallback giá trị {}
  console.log("Received login request:", req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "Email và mật khẩu là bắt buộc" });
  }
  const sql = "SELECT * FROM user WHERE email = ? AND password = ?";

  connection.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Lỗi hệ thống" });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Sai email hoặc mật khẩu" });
    }

    const user = results[0];
    const {
      id,
      username,
      phone,
      email: userEmail,
      address,
      description,
    } = user;

    res.status(200).json({
      message: "Đăng nhập thành công",
      id: id,
      username: username,
      phone: phone,
      email: userEmail,
      address: address,
      description: description,
    });
  });
});

app.get("/catalog", (req, res) => {
  connection.query("SELECT id, name FROM catalog", (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/catalog/:id", (req, res) => {
  const categoryId = req.params.id;
  connection.query(
    "SELECT name FROM catalog WHERE id = ?",
    [categoryId],
    (error, results, fields) => {
      if (error) throw error;
      if (results.length === 0) {
        res.status(404).json({ message: "Danh mục không tồn tại" });
      } else {
        res.json(results[0].name);
      }
    }
  );
});

app.get("/products/catalog/:id_catalog", (req, res) => {
  const id_catalog = req.params.id_catalog;
  connection.query(
    "SELECT * FROM products WHERE id_catalog = ?",
    [id_catalog],
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.get("/products/search/:name", (req, res) => {
  const productName = req.params.name;
  connection.query(
    "SELECT * FROM products WHERE name LIKE ?",
    [`%${productName}%`],
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `--------------------------------------------------------------------http://localhost:${port}/products`
  );
});
