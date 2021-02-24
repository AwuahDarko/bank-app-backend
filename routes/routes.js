module.exports = (app) => {

  const register = require('../controllers/register-user');
  const user = require('../controllers/update-user');
  const auth = require('../controllers/auth');

  // extract token middleware
  function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
      // split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }

  // TEST SERVER
  app.get('/test-server', (req, res) => {
    res.json({ message: 'No heart feelings server is working well' });
  });


  // ===== AUTH =======
  app.get('/api/auth-token', verifyToken, auth.verifyLogin);
  app.route('/api/user-login',)
    .post(auth.login);


  // ====== RGISTER ROUTES ======= 
  app
    .route('/api/register-one')
    .post(register.registerUserStepOne);
  app.post('/api/register-two', register.registerUserStepTwo);
  app.put('/api/change-pin', verifyToken, user.changePin);
  app.put('/api/update-user', verifyToken, user.updateUser);


  // NB: all routes should be above this line
  // ===============================================================
  // ===============================================================

  // 404 Not Found
  app.get('*', function (req, res) {
    if (req.headers['source'] == 'frontend') {
      res.status(404).json({ 'message': "Route does not exist" })

    } else {
      res.redirect('/index.html');
    }
  });





  //   // 500 Internal server error
  //   app.use((error, req, res, next) => {
  //     res.status(500);
  //     res.redirect('/500.html');
  //   });

}