const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/userController')(app);

app.get('/health-check', (req, res) => {
  res.send('Check.');
})

app.listen(3000);