
const config = {
    mode : "production", // development
    port: parseInt(process.env.PORT) || 3001,
    hostname : "127.0.0.1",
    jwtSecret : "bvhhejhe@83r83832HHwc",
    mainMongo : {
        url : "mongodb://ds141024.mlab.com:41024/soshace",
        options : {
            db: { native_parser: true },
            server: { poolSize: 5 },
            user : "admin",
            pass : "admin"
        }
    }
};

module.exports = config;
