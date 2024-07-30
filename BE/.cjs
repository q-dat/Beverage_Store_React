const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

const path = require('path');
// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Thay đổi theo thư mục chứa các tệp EJS của bạn

// Danh sách các endpoint
const endpointsByCategory = {
  'Products': [
    { name: 'Get Products', url: '/products', type: 'read' },
    { name: 'Get Product by ID', url: '/products/{id}', type: 'read' },
    { name: 'Create Product', url: '/products', type: 'create' },
    { name: 'Update Product', url: '/products/{id}', type: 'update' },
    { name: 'Delete Product', url: '/products/{id}', type: 'delete' },
    { name: 'Get Products by Catalog', url: '/products/catalog/:id_catalog', type: 'read' },
    { name: 'Search Products by Name', url: '/products/search/:name', type: 'read' },
    { name: 'Get Products on Sale', url: '/sale', type: 'read' }
  ],
  'Catalogs': [
    { name: 'Get Catalogs', url: '/catalog', type: 'read' },
    { name: 'Get Catalog by ID', url: '/catalog/{id}', type: 'read' },
    { name: 'Create Catalog', url: '/catalog', type: 'create' },
    { name: 'Update Catalog', url: '/catalog/{id}', type: 'update' },
    { name: 'Delete Catalog', url: '/catalog/{id}', type: 'delete' }
  ],
  'Orders': [
    { name: 'Create Order', url: '/orders', type: 'create' },
    { name: 'Get Orders', url: '/orders', type: 'read' },
    { name: 'Get Order by ID', url: '/orders/{id}', type: 'read' },
    { name: 'Update Order', url: '/orders/{id}', type: 'update' },
    { name: 'Delete Order', url: '/orders/{id}', type: 'delete' }
  ],
  'Order Details': [
    { name: 'Create Order Detail', url: '/order-detail', type: 'create' },
    { name: 'Get Order Details', url: '/order-detail', type: 'read' },
    { name: 'Get Order Detail by ID', url: '/order-detail/{id}', type: 'read' },
    { name: 'Update Order Detail', url: '/order-detail/{id}', type: 'update' },
    { name: 'Delete Order Detail', url: '/order-detail/{id}', type: 'delete' }
  ]
};
app.get('/', (req, res) => {
  res.render('index', { endpointsByCategory });
});


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
  const {
    name,
    id_catalog,
    price,
    sale,
    status,
    views,
    description,
    img,
    img_child,
  } = req.body;
  if (!name || !id_catalog || !price) {
    return res
      .status(400)
      .json({ message: "Tên sản phẩm, ID danh mục và giá là bắt buộc" });
  }

  const query =
    "INSERT INTO products (`name`, `id_catalog`, `price`, `sale`, `status`, `views`, `description`, `img`, `img_child`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [name, id_catalog, price, sale, status, views, description, img, img_child],
    (error, results) => {
      if (error) {
        console.error("Lỗi truy vấn: ", error);
        return res.status(500).send({ error: "Lỗi truy vấn" });
      }
      res.status(201).send({ message: "Sản phẩm đã được thêm" });
    }
  );
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
  const {
    name,
    id_catalog,
    price,
    sale,
    status,
    views,
    description,
    img,
    img_child,
  } = req.body;

  let query = "UPDATE products SET ";
  const params = [];
  if (name !== undefined) {
    query += "`name` = ?, ";
    params.push(name);
  }
  if (id_catalog !== undefined) {
    query += "`id_catalog` = ?, ";
    params.push(id_catalog);
  }
  if (price !== undefined) {
    query += "`price` = ?, ";
    params.push(price);
  }
  if (sale !== undefined) {
    query += "`sale` = ?, ";
    params.push(sale);
  }
  if (status !== undefined) {
    query += "`status` = ?, ";
    params.push(status);
  }
  if (views !== undefined) {
    query += "`views` = ?, ";
    params.push(views);
  }
  if (description !== undefined) {
    query += "`description` = ?, ";
    params.push(description);
  }
  if (img !== undefined) {
    query += "`img` = ?, ";
    params.push(img);
  }
  if (img_child !== undefined) {
    query += "`img_child` = ?, ";
    params.push(img_child);
  }

  if (params.length === 0) {
    return res.status(400).json({ message: "Không có dữ liệu để cập nhật" });
  }

  query = query.slice(0, -2);
  query += " WHERE `id` = ?";
  params.push(productId);

  connection.query(query, params, (error, results) => {
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

app.put("/catalog/:id", (req, res) => {
  const categoryId = req.params.id;
  const { name, description } = req.body;

  let query = "UPDATE catalog SET ";
  const params = [];

  if (name !== undefined) {
    query += "`name` = ?, ";
    params.push(name);
  }
  if (description !== undefined) {
    query += "`description` = ?, ";
    params.push(description);
  }
  if (params.length === 0) {
    return res.status(400).json({ message: "Không có dữ liệu để cập nhật" });
  }

  query = query.slice(0, -2);
  query += " WHERE `id` = ?";
  params.push(categoryId);

  connection.query(query, params, (error, results) => {
    if (error) {
      console.error("Lỗi truy vấn: ", error);
      return res.status(500).send({ error: "Lỗi truy vấn" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }
    res.status(200).send({ message: "Danh mục đã được cập nhật" });
  });
});

app.delete("/catalog/:id", (req, res) => {
  const categoryId = req.params.id;
  connection.query(
    "DELETE FROM catalog WHERE `id` = ?",
    [categoryId],
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Danh mục không tồn tại" });
      }
      res.status(200).send({ message: "Danh mục đã được xóa" });
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
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  connection.query(
    "SELECT `id`, `username`, `phone`, `email`, `address`, `password`, `description` FROM `user` WHERE `id` = ?",
    [userId],
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      if (results.length === 0) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      res.json(results[0]);
    }
  );
});
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
        return res.status(500).send({ error: "Lỗi truy vấn" });
      }
      res.status(201).send({ message: "Người dùng đã được đăng ký" });
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body || {};
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

// Đơn hàng
app.post("/orders", (req, res) => {
  const { createAt, status, total, user_id, payment_id } = req.body;
  if (!createAt || !status || !total || !user_id || !payment_id) {
    return res
      .status(400)
      .json({ message: "Tất cả các trường đều là bắt buộc" });
  }

  const query =
    "INSERT INTO `orders` (`createAt`, `status`, `total`, `user_id`, `payment_id`) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    query,
    [createAt, status, total, user_id, payment_id],
    (error, results) => {
      if (error) {
        console.error("Lỗi truy vấn: ", error);
        return res.status(500).send({ error: "Lỗi truy vấn" });
      }
      res.status(201).send({ message: "Đơn hàng đã được thêm" });
    }
  );
});
// Lấy đơn hàng của người dùng
app.get("/orders", (req, res) => {
  const userId = req.query.user_id; // Lấy user_id từ query params
  let query = "SELECT `id`, `createAt`, `status`, `total`, `user_id`, `payment_id` FROM `orders`";
  const params = [];

  if (userId) {
    query += " WHERE `user_id` = ?";
    params.push(userId);
  }

  connection.query(query, params, (error, results) => {
    if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
    res.json(results);
  });
});


app.get("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  connection.query(
    "SELECT `id`, `createAt`, `status`, `total`, `user_id`, `payment_id` FROM `orders` WHERE `id` = ?",
    [orderId],
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      if (results.length === 0) {
        return res.status(404).json({ message: "Đơn hàng không tồn tại" });
      }
      res.json(results[0]);
    }
  );
});

app.put("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const { createAt, status, total, user_id, payment_id } = req.body;

  let query = "UPDATE `orders` SET ";
  const params = [];

  if (createAt !== undefined) {
    query += "`createAt` = ?, ";
    params.push(createAt);
  }
  if (status !== undefined) {
    query += "`status` = ?, ";
    params.push(status);
  }
  if (total !== undefined) {
    query += "`total` = ?, ";
    params.push(total);
  }
  if (user_id !== undefined) {
    query += "`user_id` = ?, ";
    params.push(user_id);
  }
  if (payment_id !== undefined) {
    query += "`payment_id` = ?, ";
    params.push(payment_id);
  }
  if (params.length === 0) {
    return res.status(400).json({ message: "Không có dữ liệu để cập nhật" });
  }

  query = query.slice(0, -2);
  query += " WHERE `id` = ?";
  params.push(orderId);

  connection.query(query, params, (error, results) => {
    if (error) {
      console.error("Lỗi truy vấn: ", error);
      return res.status(500).send({ error: "Lỗi truy vấn" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }
    res.status(200).send({ message: "Đơn hàng đã được cập nhật" });
  });
});

app.delete("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  connection.query(
    "DELETE FROM `orders` WHERE `id` = ?",
    [orderId],
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Đơn hàng không tồn tại" });
      }
      res.status(200).send({ message: "Đơn hàng đã được xóa" });
    }
  );
});

// Chi tiết đơn hàng
app.post("/order-detail", (req, res) => {
  const { order_id, product_id, price, quantity, total } = req.body;
  if (!order_id || !product_id || !price || !quantity || !total) {
    return res
      .status(400)
      .json({ message: "Tất cả các trường đều là bắt buộc" });
  }

  const query =
    "INSERT INTO `order_detail` (`order_id`, `product_id`, `price`, `quantity`, `total`) VALUES (?, ?, ?, ?, ?)";
  connection.query(
    query,
    [order_id, product_id, price, quantity, total],
    (error, results) => {
      if (error) {
        console.error("Lỗi truy vấn: ", error);
        return res.status(500).send({ error: "Lỗi truy vấn" });
      }
      res.status(201).send({ message: "Chi tiết đơn hàng đã được thêm" });
    }
  );
});
app.get("/order-detail", (req, res) => {
  connection.query(
    "SELECT `id`, `order_id`, `product_id`, `price`, `quantity`, `total` FROM `order_detail`",
    (error, results) => {
      if (error) {
        console.error("Lỗi truy vấn: ", error);
        return res.status(500).json({ error: "Lỗi truy vấn" });
      }
      res.json(results);
    }
  );
});

app.get("/order-detail/:id", (req, res) => {
  const detailId = req.params.id;
  connection.query(
    "SELECT `id`, `order_id`, `product_id`, `price`, `quantity`, `total` FROM `order_detail` WHERE `id` = ?",
    [detailId],
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      if (results.length === 0) {
        return res.status(404).json({ message: "Chi tiết đơn hàng không tồn tại" });
      }
      res.json(results[0]);
    }
  );
});

app.put("/order-detail/:id", (req, res) => {
  const detailId = req.params.id;
  const { order_id, product_id, price, quantity, total } = req.body;

  let query = "UPDATE `order_detail` SET ";
  const params = [];

  if (order_id !== undefined) {
    query += "`order_id` = ?, ";
    params.push(order_id);
  }
  if (product_id !== undefined) {
    query += "`product_id` = ?, ";
    params.push(product_id);
  }
  if (price !== undefined) {
    query += "`price` = ?, ";
    params.push(price);
  }
  if (quantity !== undefined) {
    query += "`quantity` = ?, ";
    params.push(quantity);
  }
  if (total !== undefined) {
    query += "`total` = ?, ";
    params.push(total);
  }
  if (params.length === 0) {
    return res.status(400).json({ message: "Không có dữ liệu để cập nhật" });
  }

  query = query.slice(0, -2);
  query += " WHERE `id` = ?";
  params.push(detailId);

  connection.query(query, params, (error, results) => {
    if (error) {
      console.error("Lỗi truy vấn: ", error);
      return res.status(500).send({ error: "Lỗi truy vấn" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Chi tiết đơn hàng không tồn tại" });
    }
    res.status(200).send({ message: "Chi tiết đơn hàng đã được cập nhật" });
  });
});

app.delete("/order-detail/:id", (req, res) => {
  const detailId = req.params.id;
  connection.query(
    "DELETE FROM `order_detail` WHERE `id` = ?",
    [detailId],
    (error, results) => {
      if (error) return res.status(500).json({ error: "Lỗi truy vấn" });
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Chi tiết đơn hàng không tồn tại" });
      }
      res.status(200).send({ message: "Chi tiết đơn hàng đã được xóa" });
    }
  );
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  // Products
console.log(`--------------------------------------------------------------------GET http://localhost:${port}`);

});
