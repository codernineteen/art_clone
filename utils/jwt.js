const jwt = require('jsonwebtoken');

const createToken = ({payload}) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
    )
}

const verifyToken = ({token}) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = ({res, eachPayload}) => {
    const token = createToken({payload: eachPayload})
    
    return res.cookie(
        'token',
        token,
        {
            // httpOnly: true,
            expires: new Date(Date.now() + 9000000),
            secure: process.env.NODE_ENV === 'production',
            signed: true,
        }
    )
}

module.exports = {
    createToken,
    verifyToken,
    attachCookiesToResponse
} 