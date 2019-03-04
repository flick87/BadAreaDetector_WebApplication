const express = require('express');
const policecallsRoutes = require('./routes/policecalls');
const {clientId, tenantId, secret, name, oauthServerUrl, redirectUri} = require('./keys/keys').appid_creds;
const app = express();

// requirements for IBM App ID Service 
const session = require('express-session');
const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;
const cors = require('cors');

const LANDING_PAGE_URL = "/web-app-sample.html";
const LOGIN_URL = "/ibm/bluemix/appid/login";
const CALLBACK_URL = "/ibm/bluemix/appid/callback";

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

const corsOptions = {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}

//middleware
app.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: true
}));

app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());


const webAppStrategy = new WebAppStrategy({
    tenantId: tenantId,
    clientId: clientId,
    secret: secret,
    oauthServerUrl: oauthServerUrl,
    redirectUri: redirectUri
});

passport.use(webAppStrategy);

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
   
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

app.get(LOGIN_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
	successRedirect: LANDING_PAGE_URL,
	forceLogin: true
}));

app.get(CALLBACK_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME));

app.get('/protected', passport.authenticate(WebAppStrategy.STRATEGY_NAME), (req, res) => {
    res.json(req.user)
});


// app.use('/api/policecalls', passport.authenticate(WebAppStrategy.STRATEGY_NAME), policecallsRoutes);
app.use('/api/policecalls', policecallsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}. . .`);
});