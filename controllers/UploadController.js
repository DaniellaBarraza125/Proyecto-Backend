const { Upload } = require("../models/index.js");

const UploadController = {
    async profile(req, res, next) {
        try {
            console.log(req.file);
            res.send({ msg: "Imagen de peril cargada!", file: req.file });
            // res.json(req.file) //esto da informaciond el objeto cargado, nombre original y fecha etc
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Ocurrió un error" });
        }
    },
    async products(req, res, next) {
        try {
            console.log(req.file);
            res.send({ msg: "Imagen de peril cargada!", file: req.file });
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Ocurrió un error" });
        }
    },
};

module.exports = UploadController;
