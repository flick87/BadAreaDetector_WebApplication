const express = require('express');
const policecallsRoutes = require('./routes/policecalls');
const path = require('path');
const {clientId, tenantId, secret, name, oauthServerUrl, redirectUri} = require('./keys/keys').appid_creds;
const app = express();
const cookieParser = require("cookie-parser");

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

app.use(cookieParser());
const stateicFilePath = path.join(__dirname, 'client', 'build');
app.use(express.static(path.join(stateicFilePath)));

app.use(cors({credentials: true, origin: 'http://localhost:5000'}));

//middleware
app.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
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
    // res.redirect('/protected')
    res.sendFile('index.html');
});

app.get('/protected',(req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    next();
}, passport.authenticate(WebAppStrategy.STRATEGY_NAME), function (req, res) {
    res.sendFile('index.html');
});

app.use('/api/policecalls', policecallsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}. . .`);
});
