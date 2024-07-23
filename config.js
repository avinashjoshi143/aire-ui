const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    APIS: {
        LOGIN_USER: process.env.LOGIN_USER,
        REGISTER_USER: process.env.REGISTER_USER,
        sendVerificationCode: process.env.sendVerificationCode,
        verifyCode: process.env.verifyCode,
        resetPassword: process.env.resetPassword,
        Google_Login: process.env.Google_Login,
    },
}