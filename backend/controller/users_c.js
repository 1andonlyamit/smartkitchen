class UserController {
    constructor() {
        this.userModel = new (require("../model/users_m"));
    }

    async login(req, res) {
        try {

            const result = await this.userModel.login(req.body);
            if (!result) return res.status(200).send("Unexpected Error Occurred");
            return res.status(200).json(result);

        } catch (error) {
            res.status(400).send(error)
        }
    }

    async register(req, res) {
        try {

            const result = await this.userModel.register(req.body);
            if (!result) return res.status(200).send("Unexpected Error Occurred");
            return res.status(200).json(result);

        } catch (error) {
            res.status(400).send(error)
        }
    }
}

module.exports = UserController