const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/routing');
const errLog = require('./utilities/errorLogger');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.use(errLog);

app.listen(port, () => {
  console.log(`Application is hosted in port ${port}`);
  console.log("WeCare - We care for you!!!");
});

module.exports = app;
