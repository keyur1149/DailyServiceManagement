const dotenv = require("dotenv");
const mongoose = require('mongoose');
var cors = require('cors')
const schedule = require('node-schedule');

mongoose.set('strictQuery', true);

const express = require('express');
const router = require("./routes/customer_routes/auth");
const app = express();
dotenv.config({ path: './config.env' });
require('./db/connect')
app.use(express.urlencoded({ extended: false }));

app.use(express.json())
app.use(cors());
schedule.scheduleJob('* * * 1-12 *', () => {
    console.log("working ");
});
// app.use(require('./routes/customer_routes/auth'));
app.use(require('./routes/customer_routes/auth'));
app.use(require('./routes/customer_routes/cusidtoname'));
app.use(require('./routes/customer_routes/notmilk'));
app.use(require('./routes/customer_routes/date'));
app.use(require('./routes/customer_routes/request'));
app.use(require('./routes/customer_routes/update'));
app.use(require('./routes/customer_routes/milkprize'));
const port = process.env.port;
app.listen(port, () => {
    console.log(`server is running on ${port} port`);
});
console.log("moanan")