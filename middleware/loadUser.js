const loadUser = async (req, res, next) => {
    const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);

    console.log(authZeroUser);

    next();
};

const fetchAuthZeroUser = async (authorizationValue) => {
    const response = await fetch(`${process.env.AUTHORIZATION_HOST}/userInfo`, {
        headers: { Authorization: authorizationValue },
    });

    return response.json();
};

module.exports = loadUser;