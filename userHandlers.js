const database = require("./database");

const getUser = (req, res) => {
    database
        .query("SELECT firstname, lastname, email, city, language, --hashedPassword FROM users")
        .then(([result]) => {
            res.send(result)
        })
}

const postUser = (req, res) => {
    const { firstname, lastname, email, city, language, hashedPassword } = req.body;

    database
        .query(
            "INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)", [firstname, lastname, email, city, language, hashedPassword]
        )
        .then(([result]) => {
            res.location(`/api/users/${result.insertID}`).sendStatus(201);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error creating user");
        });
};

module.exports = {
    getUser,
    postUser,
};

