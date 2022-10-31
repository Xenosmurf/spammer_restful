const db = require("../models");
const Address = db.address;

const PHRASES = [
    {
        name: "Friend",
        text: "Nice to meet stranger! Do you mind to be my friend?",
    },
    {
        name: "Money",
        text:
            "Do you want a lot of money? Of course you do! I can help you with that. Just email me back for more! ",
    },
];

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.route("/").get((req, res) => {
        Address.find()
            .then((addresses) => {
                res.render(__dirname + "\\..\\.." + "\\templ.twig", {
                    phrases: PHRASES,
                    addresses: addresses,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });
};