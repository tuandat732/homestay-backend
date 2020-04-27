const jwt = require('express-jwt')

const getToken = req => {
    const { headers: { authorization } } = req;

    if (authorization && authorization.split(" ")[0] === "Bearer") { // bearer or bất cứ từ j
        return authorization.split(" ")[1]
    }
    return null
}

const auth = {
    required: jwt({
        secret: process.env.JWT_SECRET,
        userProperty: "payload",
        getToken: getToken
    }),
    optional: jwt(
        {
            secret: process.env.JWT_SECRET,
            userProperty: "payload",
            getToken: getToken,
            credentialsRequired: false
        }
    )
}

module.exports = auth