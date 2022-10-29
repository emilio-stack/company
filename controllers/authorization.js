const login = (req, res) => {
    const authorizationUrl = `${process.env.AUTHORIZATION_HOST}/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URL)}&state=1234&scope=openid%20profile%20email`

    res.redirect(authorizationUrl);
};

const callback = (req, res) => {
    res.json(req.query.code);
};

module.exports = { login, callback };