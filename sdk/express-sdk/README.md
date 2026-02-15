# upblit-express

Simple observation and monitoring setup for Express apps using **Upblit**.

Set up application observation in seconds with just two lines of code.

---

## 🚀 Installation

```bash
npm install upblit-express
```

---

## 📌 Prerequisites

1. Create an Express application at https://upblit.dev
2. Generate your observation token from the dashboard

---

## ⚡ Quick Setup

Add the middleware to your Express app.

```js
const upblit = require("upblit-express");

app.use(upblit("<YOUR_TOKEN>"));
```

That’s it. Observation is now enabled.

---

## 🧠 How It Works

`upblit-express` adds monitoring and observation capabilities to your Express application using your Upblit token. Once connected, your app automatically starts sending observation data to Upblit.

---

## 🧩 Example

```js
const express = require("express");
const upblit = require("upblit-express");

const app = express();

app.use(upblit("<YOUR_TOKEN>"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);
```

---

## 🔐 Token

You can obtain your token from your Upblit dashboard after creating an application.

---

## 📦 Requirements

* Node.js
* Express

---

## 🛠 Support

For issues or feature requests, please open an issue in the repository.
