const { Upload } = require("../models/index.js");

const UploadController = {
    profile: async function (req, res) {
        try {
            console.log(req.file);
            res.send("¡Funcionó!");
        } catch (error) {
            console.error(error);
            res.status(500).send("Ocurrió un error");
        }
    },
};

module.exports = UploadController;
