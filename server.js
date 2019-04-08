const express = require('express');
const policecallsRoutes = require('./routes/policecalls');
const path = require('path');
const {clientId, tenantId, secret, name, oauthServerUrl} = require('./keys/keys').appid_creds;
const app = express();

// requirements for IBM App ID Service 
const session = require('express-session');
const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;
const cors = require('cors');

const LANDING_PAGE_URL = "/web-app-sample.html";
const LOGIN_URL = "/ibm/bluemix/appid/login";
const SIGN_UP_URL = "/ibm/bluemix/appid/sign_up";
const CHANGE_PASSWORD_URL = "/ibm/bluemix/appid/change_password";
const CHANGE_DETAILS_URL = "/ibm/bluemix/appid/change_details";
const FORGOT_PASSWORD_URL = "/ibm/bluemix/appid/forgot_password";
const LOGIN_ANON_URL = "/ibm/bluemix/appid/loginanon";
const CALLBACK_URL = "/ibm/bluemix/appid/callback";
const LOGOUT_URL = "/ibm/bluemix/appid/logout";
const ROP_LOGIN_PAGE_URL = "/ibm/bluemix/appid/rop/login";


const env = process.env.NODE_ENV || 'dev';
console.log(`env: ${env}`);

//middleware
app.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const redirectUri = (env === 'dev') ? `http://localhost:5000${CALLBACK_URL}` : `https://badsystem.mybluemix.net${CALLBACK_URL}`;
const webAppStrategy = new WebAppStrategy({
    appidServiceEndpoint: 'https://us-south.appid.cloud.ibm.com',
    tenantId: tenantId,
    clientId: clientId,
    secret: secret,
    oauthServerUrl: oauthServerUrl,
    redirectUri: redirectUri,
    version: 3,
});
passport.use(webAppStrategy);

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
   
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

app.get(CALLBACK_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME));

app.get('/', function (req, res) {
    res.redirect('/protected');
});

app.get('/main', (req, res) => {
    const stateicFilePath = path.join(__dirname, 'client', 'build');
    app.use(express.static(stateicFilePath));
    res.redirect('index.html');
}); 

app.get('/protected',(req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    next();
}, passport.authenticate(WebAppStrategy.STRATEGY_NAME), function (req, res) {
    res.redirect('/main');
});

// app.use('/api/policecalls', passport.authenticate(WebAppStrategy.STRATEGY_NAME), policecallsRoutes);
if(env === 'dev'){
    app.use('/api/policecalls', policecallsRoutes);
}else{
    app.use('/api/policecalls', passport.authenticate(WebAppStrategy.STRATEGY_NAME), policecallsRoutes);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}. . .`);
});
