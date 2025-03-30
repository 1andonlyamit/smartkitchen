const express = require('express');
const config = require('./config/master-config');
const DatabaseService = require('./services/databasehelper');
const userController = new (require('./controller/users_c'))

const app = express();
const appPort = config.app_port;
app.use(express.json());

const dbService = new DatabaseService();

// app.use(express.static(path.join(__dirname, 'public')));


//login-resister routes
app.post('/login', (req, res) => userController.login(req, res));
app.post('/register', (req, res) => userController.register(req, res));

app.use("*", function (req, res) {
    res.status(200).send({ "message": "Access Denied" })
})
async function initializeDatabase() {
    try {
        console.log('Connecting to database...');
        await dbService.connect();

        console.log('Initializing database tables...');
        await dbService.initializeTables();

        console.log('Database initialization completed successfully.');

        startServer();
    } catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
}

function startServer() {
    app.listen(appPort, () => {
        console.log(`SmartKitchen Backend API is listening on port ${appPort}`);
        console.log(`API available at http://localhost:${appPort}/api`);
    });
}

initializeDatabase();
