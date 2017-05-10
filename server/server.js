const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const api = require('./routes/api');

const app = express();

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', api);

app.listen(process.env.PORT || 3000, () => {
  console.log(`server is listening on port ${process.env.PORT || 3000}!`);
});
