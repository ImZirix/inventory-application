const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("node:path");
const app = express();
const PORT = 3000;
const indexRouter = require("./routes/indexRouter");
const itemsRouter = require("./routes/itemsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const adminRouter = require("./routes/adminRouter");
const expressSession = require("express-session");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  expressSession({
    secret: "idk",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.set("layout", "layout");

app.use("/", indexRouter);
app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on ${PORT}.`);
});
