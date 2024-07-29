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

// Products
app.get("/products", (req, res) => {
  connection.query(
    "SELECT `id`, `id_catalog`, `name`, `img`, `img_child`, `price`, `sale`, `status`, `views`, `description` FROM `products` WHERE 1",
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      res.json(results);
    }
  );
});

app.post("/products", (req, res) => {
  const { name, id_catalog, price, sale, status, views, description, img, img_child } = req.body;
  if (!name || !id_catalog || !price) {
    return res.status(400).json({ message: "Tên sản phẩm, ID danh mục và giá là bắt buộc" });
  }

  const query = "INSERT INTO products (`name`, `id_catalog`, `price`, `sale`, `status`, `views`, `description`, `img`, `img_child`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(query, [name, id_catalog, price, sale, status, views, description, img, img_child], (error, results) => {
    if (error) {
      console.error("Lỗi truy vấn: ", error);
      return res.status(500).send({ error: "Lỗi truy vấn" });
    }
    res.status(201).send({ message: "Sản phẩm đã được thêm" });
  });
});

app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  connection.query(
    "SELECT `id`, `id_catalog`, `name`, `img`, `img_child`, `price`, `sale`, `status`, `views`, `description` FROM `products` WHERE `id` = ?",
    [productId],
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      if (results.length === 0) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }
      res.json(results[0]);
    }
  );
});

app.put("/products/:id", (req, res) => {
  const productId = req.params.id;
  const { name, id_catalog, price, sale, status, views, description, img, img_child } = req.body;

  const query = "UPDATE products SET `name` = ?, `id_catalog` = ?, `price` = ?, `sale` = ?, `status` = ?, `views` = ?, `description` = ?, `img` = ?, `img_child` = ? WHERE `id` = ?";
  connection.query(query, [name, id_catalog, price, sale, status, views, description, img, img_child, productId], (error, results) => {
    if (error) {
      console.error("Lỗi truy vấn: ", error);
      return res.status(500).send({ error: "Lỗi truy vấn" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).send({ message: "Sản phẩm đã được cập nhật" });
  });
});

app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  connection.query(
    "DELETE FROM products WHERE `id` = ?",
    [productId],
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }
      res.status(200).send({ message: "Sản phẩm đã được xóa" });
    }
  );
});

app.get("/sale", (req, res) => {
  connection.query(
    "SELECT `id`, `id_catalog`, `name`, `img`, `img_child`, `price`, `sale`, `status`, `views`, `description` FROM `products` WHERE `sale` IS NOT NULL",
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      res.json(results);
    }
  );
});

// Catalog
app.get("/catalog", (req, res) => {
  connection.query(
    "SELECT `id`, `name`, `description` FROM catalog",
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      res.json(results);
    }
  );
});

app.post("/catalog", (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Tên danh mục là bắt buộc" });
  }

  const query = "INSERT INTO catalog (`name`, `description`) VALUES (?, ?)";
  connection.query(query, [name, description], (error, results) => {
    if (error) {
      console.error("Lỗi truy vấn: ", error);
      return res.status(500).send({ error: "Lỗi truy vấn" });
    }
    res.status(201).send({ message: "Danh mục đã được thêm" });
  });
});

app.get("/catalog/:id", (req, res) => {
  const categoryId = req.params.id;
  connection.query(
    "SELECT `id`, `name`, `description` FROM catalog WHERE `id` = ?",
    [categoryId],
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      if (results.length === 0) {
        return res.status(404).json({ message: "Danh mục không tồn tại" });
      }
      res.json(results[0]);
    }
  );
});

app.get("/products/catalog/:id_catalog", (req, res) => {
  const id_catalog = req.params.id_catalog;
  connection.query(
    "SELECT `id`, `id_catalog`, `name`, `img`, `img_child`, `price`, `sale`, `status`, `views`, `description` FROM products WHERE `id_catalog` = ?",
    [id_catalog],
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      res.json(results);
    }
  );
});

app.get("/products/search/:name", (req, res) => {
  const productName = req.params.name;
  connection.query(
    "SELECT `id`, `id_catalog`, `name`, `img`, `img_child`, `price`, `sale`, `status`, `views`, `description` FROM products WHERE `name` LIKE ?",
    [`%${productName}%`],
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      res.json(results);
    }
  );
});

// Auth
app.post("/register", (req, res) => {
  const { username, phone, email, address, password, description } = req.body;
  if (!username || !phone || !email || !address || !password) {
    return res.status(400).send({ message: "Tất cả các trường đều là bắt buộc" });
  }

  const query = "INSERT INTO user (username, phone, email, address, password, description) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(query, [username, phone, email, address, password, description], (error, results) => {
    if (error) {
      console.error("Lỗi truy vấn: ", error);
      return res.status(500).send({ error: "Lỗi truy vấn" });
    }
    res.status(201).send({ message: "Người dùng đã được đăng ký" });
  });
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
    const { id, username, phone, email: userEmail, address, description } = user;

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`--------------------------------------------------------------------http://localhost:${port}/products`);
});
