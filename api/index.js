const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { formValidationSchema } = require("../schemas/formvalidation");
const app = express();
const multer = require("multer");
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/../public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/../views");
app.use(expressLayouts);
app.set("layout", "../views/layouts/layout");
app.set("view engine", "ejs");

app.get("/", async function (req, res) {
  // res.send("Hello this is working");
  res.render("index", {
    title: "Welcome to my portfolio!",
    // Other data
  });
});

app.get("/about", async function (req, res) {
  res.render("about", {
    title: "Welcome to my portfolio!",
    teamMembers: [
      { name: "Syed Zeeshan Ahmed", position: "CEO", image: "zee.png" },
      // Add other team members as needed
    ],
  });
});

app.get("/contact", async function (req, res) {
  res.render("contact", {
    title: "Welcome to my portfolio!",
    // Other data
  });
});

// app.get("/submit", async function (req, res) {
//   const formData = {};
//   res.render("submit", {
//     title: "Welcome to my portfolio!",
//     formData,
//     // Other data
//   });
// });

app.post("/submit", async function (req, res) {
  // Process the form data (e.g., send an email, save to database, etc.)
  // For demonstration purposes, we'll just log the data
  const body = req.body;

  const validatedData = formValidationSchema.safeParse(body);
  if (!validatedData.success) {
    res.render("error", {
      title: "Error Page",
      heading: "Form Validation Failed",
      errorMessage: validatedData.error.errors,
      suggestion: "Go Back And Try Submitting The Form Again",
    });
  }
  // Render the submit.ejs view with the form data
  res.render("submit", {
    title: "Welcome to my portfolio!",
    formData: req.body,
  });
});

// Sample user data (you would use a database in a real application)
let user = {
  name: "Syed Zeeshan Ahmed",
  email: "zee@awispo.com",
  bio: "Digital Marketer.",
  username: "zee123",
  password: "********",
};

// Route to render the projects page
app.get("/projects", (req, res) => {
  res.render("projects", { title: "Welcome to my portfolio!" });
});

// Route to render the login page
app.get("/login", (req, res) => {
  res.render("login", { title: "Welcome to my portfolio!" });
});

app.get("/*", (req, res) => {
  res.render("wrongroute", { title: "wrong route" });
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
