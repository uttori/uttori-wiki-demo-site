// Server
const express = require('express');
const shrinkRay = require('shrink-ray-current');
const favicon = require('serve-favicon');

// Error Reporting
// const Raven = require('raven');
// Must configure Raven before doing anything else with it
// Raven.config('https://___@sentry.io/123456').install();

// Reference the Uttori App
const { wiki } = require('@uttori/wiki');

// Pull in our custom config
const config = require('./config.js');

// Initilize Your app
const app = express();

// Clean up unused headers, exposing headers
app.disable('x-powered-by');

// Setup the app
app.set('port', process.env.PORT || 8000);
app.set('ip', process.env.IP || '127.0.0.1');

// Allow IP passthrough from NGINX
app.set('trust proxy', true);

// Setup error reporting
// app.use(Raven.requestHandler());
// app.use(Raven.errorHandler());

// Setup Express
app.use(favicon(`${config.public_dir}/favicon.ico`));
app.use(shrinkRay());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Simple placeholder for our root
app.get('/', (req, res) => {
  res.send('The demo is setup to serve the wiki under <a href="/wiki">/wiki</a>.');
});

// Setup the wiki on the `/wiki` path, could also be `/` if we remove the above get()
app.use('/wiki', wiki(config));

// Listen for connections
app.listen(app.get('port'), app.get('ip'), () => {
  console.log('✔ UttoriWiki Listening at %s:%d', app.get('ip'), app.get('port'));
});
