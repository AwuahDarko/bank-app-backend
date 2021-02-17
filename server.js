const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyparser = require("body-parser");
const routes = require('./routes/routes');

const https = require('https');
const http = require('http');
const mongodb = require('./config/mongodb');

const serveStatic = require('serve-static');
var cors = require('cors')

const app = express();
const httpApp = express();

app.use(cors())
httpApp.use(cors())

// connect MongoDB
mongodb.on('error', console.error.bind(console, 'mongodb connection error:'));

mongodb.once('open', function () {
  console.log('connected to mongo database...')
});


app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(serveStatic(__dirname + "/public"));


routes(app);

// ? ========================= Developemnt ===================================== 
// ? ==========================================================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// ? ========================= production ===================================== 
// ? ==========================================================================
// for http redirect 

// httpApp.set('port', process.env.PORT || 80);
// httpApp.get("*", function (req, res, next) {
//     res.redirect("https://" + req.headers.host + req.path);
// });


// // Determine port to listen on

// const PORT = process.env.PORT || 443;


// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See 
// http://expressjs.com/api#app-settings for more details.

// app.enable('trust proxy');


// http.createServer(httpApp).listen(httpApp.get('port'), function() {
//   console.log('Express HTTP server listening on port ' + httpApp.get('port'));
// });



// https.createServer({
//   key: fs.readFileSync('/etc/letsencrypt/live/event360-gh.com/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/event360-gh.com/fullchain.pem')
// }, app)
// .listen(PORT, function () {
//   console.log(`Server started on port ${PORT}`)
// })
