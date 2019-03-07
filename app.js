const morgan = require('morgan');
const express = require('express');
const layout = require('./views/layout');
const models = require('./models');
const app = express();
//parses body from request object
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//allows each request to be logged to the console
app.use(morgan('dev'));

//serves up static content from public folder (homepage content)
app.use(express.static('./public'));

app.get('/', (req, res, next) => {
  console.log('Hello World!');

  next();
});

//calling the function that layout.js returns in its module
app.get('/', (req, res) => {
  res.send(layout(''));
});

//syncing our models to tables in our database


const PORT = 3000;
async function init() {
  await models.Page.sync();
  await models.User.sync();

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}
init();
