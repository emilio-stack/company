const loadUser = async (req, res, next) => {
    try {
        const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);

    console.log(authZeroUser);

    req.user = authZeroUser;
    } catch (error) {
        // could not load user just continue with the request
        next();
    }

    next();
};

const fetchAuthZeroUser = async (authorizationValue) => {
    const response = await fetch(`${process.env.AUTHORIZATION_HOST}/userInfo`, {
        headers: { Authorization: authorizationValue },
    });

    return response.json();
};

module.exports = loadUser;