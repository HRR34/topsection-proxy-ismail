const express = require('express'),
  path = require('path'),
  request = require('request'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  proxy = require('http-proxy-middleware')
  app = express();

const port = 9999;

app.use(cors());
app.enable('trust proxy');

const apiProxy = proxy({
  target: 'http://localhost:9999',
  changeOrigin: true,
  router: {
    '/course': 'http://localhost:7777',
    '/repos': 'http://localhost:3000', 
    '/instructors': 'http://localhost:3332',
    '/reviews': 'http://localhost:8000'
  }
});

app.use('/instructors', apiProxy);
app.use('/reviews', apiProxy);
app.use('/repos', apiProxy);
app.use('/course', apiProxy);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './')));

app.listen(port, () => console.log('Listening on port', port));
