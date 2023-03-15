const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();


const postRoute = require('./src/routes/posts.js');
const productRoute = require('./src/routes/product.js');
const categorysRoute = require('./src/routes/category.js');
const userRoute = require('./src/routes/user.js');
const cartRoute = require('./src/routes/cart.js');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.static(path.join(__dirname)));
app.use(cookieParser())

// app.use(express.static('public'));



app.use("/posts", postRoute);

app.use("/products", productRoute);
app.use("/categories", categorysRoute);
app.use("/users", userRoute);
app.use("/cart", cartRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


mongoose.connect(process.env.MONGODB_URI,
  () => {
    console.log('Connected to database!');
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});