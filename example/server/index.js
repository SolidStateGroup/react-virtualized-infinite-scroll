import express from 'express';
import exphbs from 'express-handlebars';
import spm from './middleware/single-page-middleware';
import webpackMiddleware from './middleware/webpack-middleware';
const isDev = process.env.NODE_ENV !== 'production';
const app = express();

console.log('Enabled Webpack Hot Reloading');
webpackMiddleware(app);

app.set('views', 'example/src/');
app.use(express.static('example/src'));

app.use(spm);
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('index', {
    isDev,
    layout: false
  });
});

app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});