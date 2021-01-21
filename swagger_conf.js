const options = {
    swaggerDefinition: {
        info: {
            description: "API for the Applanta APP",
            title: "ApplantaAPI",
            version: "1.0.0"
        },
        host: "applanta-api.herokuapp.com",
        basePath: "/",
        produces: [
            "application/json"
        ],
        schemes: ["https"]
    },
    basedir: __dirname,
    files: ["./routes/**/*.js", "./models/**/*.js"]
};

module.exports = options;