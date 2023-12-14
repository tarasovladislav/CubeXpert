const express = require('express');
const app = express();
const router = require('./router');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 3100, () => {
    console.log(`server is running`)
});