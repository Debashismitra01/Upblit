const axios = require("axios");

let telemetry = [];

const API_URL = "http://app.upblit.dev/api/v1/logscollector";


setInterval(async () => {
    if (telemetry.length === 0) return;

    try {
        await axios.post(
            API_URL,
            { telemetry },
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        telemetry = [];
    } catch (err) {
        console.error("Failed to send logs:", err.message);
    }
}, 30000);
const upblit = (key) => {
    jwtToken = key;
    return (req, res, next) => {
        if (req.method == "GET" && req.originalUrl == "/health") res.send({ status: "up" });
        res.on("finish", () => {
            let log = {
                timestamp: Date.now(),
                requestMethod: req.method,
                requestURL: req.originalUrl,
                responseStatus: res.statusCode
            }
            telemetry.push(log);
        });
        next();
    };
};

module.exports = upblit;
