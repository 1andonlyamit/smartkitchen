class UsersModel {
    constructor() {
        this.mysql = require('mysql2');
        this.sql = new (require('../services/databasehelper'))();
    }

    async login(userJson) {
        try {
            const { email, password } = userJson;
            if (!email || !password) return { status: false, message: "Email and password are required" };

            const query = "SELECT email, password FROM users WHERE email = ?";
            const result = await this.sql.executeQuery(query, [email]);

            if (result.length === 0) return { status: false, message: "User not found" };

            const user = result[0];
            if (password !== user.password) return { status: false, message: "Invalid credentials" };

            return { status: true, message: "Login successful" };
        } catch (error) {
            return { status: false, message: "An error occurred during login" };
        }
    }

    async register(userJson) {
        try {
            const { name, email, password } = userJson;
            if (!name || !email || !password) return { status: false, message: "Name, email, and password are required" };

            const checkUserQuery = "SELECT email FROM users WHERE email = ?";
            const existingUser = await this.sql.executeQuery(checkUserQuery, [email]);

            if (existingUser.length > 0) return { status: false, message: "Email already registered" };

            const insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            await this.sql.executeQuery(insertQuery, [name, email, password]);

            return { status: true, message: "Registration successful" };
        } catch (error) {
            return { status: false, message: "An error occurred during registration" };
        }
    }
}

module.exports = UsersModel;
