const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/config/db");
const route = require("./src/routes");
const cloudinaryConfig = require("./src/config/cloudinary");
const cors = require("cors");

const transactions = require("./src/models/Transactions");
const users = require("./src/models/Users");


// const products = require("./src/models/Products");
// const promotions = require("./src/models/Promotions");

dotenv.config();

const app = express();

const port = process.env.PORT;
app.use(
  cors({
    origin: ["http://localhost:3000", "*"],
  })
);

db.authenticate()
  .then(() => {
    console.log(`DB conneected`);
  })
  .catch((err) => {
    console.log(`Error ${err}`);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cloudinaryConfig);
app.use(route);

app.use(express.static(__dirname));

// products.sync().then(()=>{
//   console.log(`Products is syncrorize`);

// }).catch(err=>{
//   console.log(err);

// })

// promotions.sync().then(()=>{
//   console.log('Db Connected');

// }).catch(err=>{
//   console.log(err);

// })

users.sync().then(()=>{
  console.log('DB conected');
  
}).catch(err=>{
  console.log(err);
  
})

transactions.sync().then(()=>{
  console.log('DB conected');
  
}).catch(err=>{
  console.log(err);
  
})



app.get("/", (req, res) => {
  res.status(200).send("Wellcome to my simple API");
});

app.get("/ping", (req, res) => {
  res.json({ msg: "PONG" });
});

app.listen(port, () => {
  console.log(`APP is running on PORT ${port}`);
});

//MVC model,view,controlers
