const login = (req, res) => {
    const authorizationUrl = `${process.env.AUTHORIZATION_HOST}/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URL)}&state=1234&scope=openid%20profile%20email`

    res.redirect(authorizationUrl);
};

const callback = async (req, res) => {
    const response = await fetch(`${process.env.AUTHORIZATION_HOST}/oauth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URL,
            scope: "openid profile email",
            code: req.query.code,
        }),
    });

    const jsonResponse = await response.json();

    res.json(jsonResponse);
};

module.exports = { login, callback };