// src/services/database.service.js
const mysql = require('mysql2/promise');
const config = require('../config/master-config');
const fs = require('fs');
const path = require('path');

class DatabaseService {
    constructor() {
        this.connection = null;
        this.isConnected = false;
        this.config = {
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database,
            port: config.database.port,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        };
    }


    async connect() {
        try {
            const tempConfig = { ...this.config };
            delete tempConfig.database;
            const tempConnection = await mysql.createConnection(tempConfig);

            const [rows] = await tempConnection.execute(
                `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${this.config.database}'`
            );

            if (rows.length === 0) {
                console.log(`Database '${this.config.database}' does not exist. Creating it now...`);
                await tempConnection.execute(`CREATE DATABASE ${this.config.database}`);
                console.log(`Database '${this.config.database}' created successfully.`);
            }

            await tempConnection.end();

            this.connection = await mysql.createPool(this.config);

            await this.connection.query('SELECT 1');
            this.isConnected = true;
            console.log('Successfully connected to the MySQL database.');

            return this.connection;
        } catch (error) {
            console.error('Could not connect to the database:', error);
            throw error;
        }
    }

    async executeQuery(sql, params = []) {
        try {
            if (!this.isConnected) {
                await this.connect();
            }

            const [results] = await this.connection.execute(sql, params);
            return results;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    // async executeTransaction(callback) {
    //     let connection;
    //     try {
    //         if (!this.isConnected) {
    //             await this.connect();
    //         }

    //         connection = await this.connection.getConnection();
    //         await connection.beginTransaction();

    //         const result = await callback(connection);

    //         await connection.commit();
    //         return result;
    //     } catch (error) {
    //         if (connection) {
    //             await connection.rollback();
    //         }
    //         console.error('Transaction failed:', error);
    //         throw error;
    //     } finally {
    //         if (connection) {
    //             connection.release();
    //         }
    //     }
    // }

    async tableExists(tableName) {
        try {
            const result = await this.executeQuery(
                `SELECT COUNT(*) as count FROM information_schema.tables 
         WHERE table_schema = ? AND table_name = ?`,
                [this.config.database, tableName]
            );
            return result[0].count > 0;
        } catch (error) {
            console.error(`Error checking if table ${tableName} exists:`, error);
            throw error;
        }
    }

    async initializeTables() {
        try {
            console.log('Checking and initializing database tables...');

            await this.initializeUserTables();
            await this.initializeImageTable();
            await this.initializeFridgeTable();
            // await this.initializeInventoryTables();
            // await this.initializeRecipeTables();
            // await this.initializeOrderTables();
            // await this.initializeWasteTables();
            // await this.initializeVisionTables();
            // await this.initializePredictionTables();
            // await this.initializeSystemTables();

            console.log('All database tables initialized successfully.');
        } catch (error) {
            console.error('Error initializing database tables:', error);
            throw error;
        }
    }

    async initializeUserTables() {
        const usersExists = await this.tableExists('users');

        if (!usersExists) {
            console.log('Creating users tables...');

            await this.executeQuery(`CREATE TABLE users (user_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) UNIQUE NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL)`);

            await this.executeQuery(`INSERT INTO users (name, email, password) VALUES ('admin', 'admin@smartkitchen.com', '1234')`);

            console.log('Users tables created successfully');
        }
    }

    async initializeImageTable() {
        const imagesExists = await this.tableExists('images');
        if (!imagesExists) {
            console.log('Creating images table...');
            await this.executeQuery(`CREATE TABLE images (id INT AUTO_INCREMENT PRIMARY KEY, filename VARCHAR(255) NOT NULL, path VARCHAR(500) NOT NULL, processed TINYINT(1) DEFAULT 0, item_name VARCHAR(100), item_category VARCHAR(100), uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
            console.log('Images table created successfully');
        }
    }

    async initializeFridgeTable() {
        const tableExists = await this.tableExists('fridge');

        if (!tableExists) {
            console.log('Creating fridge table...');

            await this.executeQuery(`
                CREATE TABLE fridge (
                    id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, category ENUM('Dairy', 'Fruit', 'Vegetable', 'Meat', 'Seafood', 'Grain', 'Condiment', 'Beverage', 'Other') NOT NULL, expiry_date DATE NOT NULL, purchase_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, quantity FLOAT NOT NULL, cost_per_unit DECIMAL(10,2) NOT NULL)`);
            console.log('Fridge table created successfully.');
        }
    }



}

module.exports = DatabaseService


//   async initializeInventoryTables() {
//     // Check if core inventory tables exist
//     const categoriesExists = await this.tableExists('categories');

//     if (!categoriesExists) {
//       console.log('Creating inventory tables...');

//       await this.executeQuery(`
//         CREATE TABLE categories (
//           category_id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(50) NOT NULL,
//           description TEXT,
//           parent_category_id INT NULL,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//           FOREIGN KEY (parent_category_id) REFERENCES categories(category_id) ON DELETE SET NULL
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE storage_locations (
//           location_id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(50) NOT NULL,
//           description TEXT,
//           temperature_range VARCHAR(50),
//           is_refrigerated BOOLEAN DEFAULT FALSE,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE units (
//           unit_id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(30) NOT NULL,
//           abbreviation VARCHAR(10),
//           is_volume BOOLEAN DEFAULT FALSE,
//           is_weight BOOLEAN DEFAULT FALSE,
//           is_count BOOLEAN DEFAULT FALSE,
//           base_unit_id INT NULL,
//           conversion_factor DECIMAL(10,4) NULL,
//           FOREIGN KEY (base_unit_id) REFERENCES units(unit_id) ON DELETE SET NULL
//         )
//       `);

//       // Insert basic unit types
//       await this.executeQuery(`
//         INSERT INTO units (name, abbreviation, is_weight, is_volume, is_count) VALUES
//         ('Kilogram', 'kg', 1, 0, 0),
//         ('Gram', 'g', 1, 0, 0),
//         ('Liter', 'L', 0, 1, 0),
//         ('Milliliter', 'ml', 0, 1, 0),
//         ('Piece', 'pc', 0, 0, 1),
//         ('Tablespoon', 'tbsp', 0, 1, 0),
//         ('Teaspoon', 'tsp', 0, 1, 0)
//       `);

//       // Create default storage locations
//       await this.executeQuery(`
//         INSERT INTO storage_locations (name, description, is_refrigerated) VALUES
//         ('Main Refrigerator', 'Main kitchen refrigerator', 1),
//         ('Freezer', 'Main kitchen freezer', 1),
//         ('Dry Storage', 'Dry goods storage area', 0),
//         ('Vegetable Cooler', 'Dedicated vegetable refrigerator', 1)
//       `);

//       // Create default categories
//       await this.executeQuery(`
//         INSERT INTO categories (name, description) VALUES
//         ('Vegetables', 'Fresh vegetables'),
//         ('Fruits', 'Fresh fruits'),
//         ('Meat', 'Meat products'),
//         ('Dairy', 'Dairy products'),
//         ('Grains', 'Grains and cereals'),
//         ('Spices', 'Herbs and spices')
//       `);

//       await this.executeQuery(`
//         CREATE TABLE suppliers (
//           supplier_id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(100) NOT NULL,
//           contact_person VARCHAR(100),
//           email VARCHAR(100),
//           phone VARCHAR(20),
//           address TEXT,
//           website VARCHAR(255),
//           notes TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE ingredients (
//           ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(100) NOT NULL,
//           description TEXT,
//           category_id INT,
//           default_unit_id INT NOT NULL,
//           average_shelf_life_days INT,
//           reorder_threshold DECIMAL(10,2),
//           optimal_stock_level DECIMAL(10,2),
//           image_url VARCHAR(255),
//           barcode VARCHAR(100),
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//           FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL,
//           FOREIGN KEY (default_unit_id) REFERENCES units(unit_id)
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE inventory_items (
//           inventory_id INT AUTO_INCREMENT PRIMARY KEY,
//           ingredient_id INT NOT NULL,
//           location_id INT,
//           quantity DECIMAL(10,2) NOT NULL,
//           unit_id INT NOT NULL,
//           purchase_date DATE,
//           expiry_date DATE,
//           lot_number VARCHAR(50),
//           cost_per_unit DECIMAL(10,2),
//           supplier_id INT,
//           status ENUM('in_stock', 'low', 'expired', 'reserved', 'depleted') DEFAULT 'in_stock',
//           last_counted TIMESTAMP NULL,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//           FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
//           FOREIGN KEY (location_id) REFERENCES storage_locations(location_id) ON DELETE SET NULL,
//           FOREIGN KEY (unit_id) REFERENCES units(unit_id),
//           FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE SET NULL
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE inventory_transactions (
//           transaction_id INT AUTO_INCREMENT PRIMARY KEY,
//           inventory_id INT NOT NULL,
//           user_id INT,
//           transaction_type ENUM('purchase', 'consumption', 'waste', 'adjustment', 'transfer', 'count') NOT NULL,
//           quantity DECIMAL(10,2) NOT NULL,
//           unit_id INT NOT NULL,
//           previous_quantity DECIMAL(10,2),
//           new_quantity DECIMAL(10,2),
//           reference_id INT,
//           reference_type VARCHAR(50),
//           notes TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           FOREIGN KEY (inventory_id) REFERENCES inventory_items(inventory_id),
//           FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
//           FOREIGN KEY (unit_id) REFERENCES units(unit_id)
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE supplier_ingredients (
//           supplier_ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
//           supplier_id INT NOT NULL,
//           ingredient_id INT NOT NULL,
//           supplier_sku VARCHAR(50),
//           unit_price DECIMAL(10,2),
//           unit_id INT NOT NULL,
//           lead_time_days INT,
//           minimum_order_quantity DECIMAL(10,2),
//           is_preferred BOOLEAN DEFAULT FALSE,
//           notes TEXT,
//           last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//           FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE CASCADE,
//           FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE CASCADE,
//           FOREIGN KEY (unit_id) REFERENCES units(unit_id)
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE purchase_orders (
//           order_id INT AUTO_INCREMENT PRIMARY KEY,
//           supplier_id INT NOT NULL,
//           user_id INT,
//           order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           expected_delivery_date DATE,
//           actual_delivery_date DATE,
//           status ENUM('draft', 'placed', 'partially_received', 'completed', 'cancelled') DEFAULT 'draft',
//           total_amount DECIMAL(10,2),
//           notes TEXT,
//           FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
//           FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE purchase_order_items (
//           order_item_id INT AUTO_INCREMENT PRIMARY KEY,
//           order_id INT NOT NULL,
//           ingredient_id INT NOT NULL,
//           quantity DECIMAL(10,2) NOT NULL,
//           unit_id INT NOT NULL,
//           unit_price DECIMAL(10,2),
//           received_quantity DECIMAL(10,2) DEFAULT 0,
//           FOREIGN KEY (order_id) REFERENCES purchase_orders(order_id) ON DELETE CASCADE,
//           FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
//           FOREIGN KEY (unit_id) REFERENCES units(unit_id)
//         )
//       `);

//       console.log('Inventory tables created successfully');
//     }
//   }


//   async initializeRecipeTables() {
//     const recipesExists = await this.tableExists('recipes');

//     if (!recipesExists) {
//       console.log('Creating recipe and menu tables...');

//       await this.executeQuery(`
//         CREATE TABLE recipes (
//           recipe_id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(100) NOT NULL,
//           description TEXT,
//           instructions TEXT,
//           preparation_time_minutes INT,
//           cooking_time_minutes INT,
//           servings INT,
//           cost_per_serving DECIMAL(10,2),
//           selling_price DECIMAL(10,2),
//           category_id INT,
//           image_url VARCHAR(255),
//           created_by INT,
//           is_active BOOLEAN DEFAULT TRUE,
//           is_special BOOLEAN DEFAULT FALSE,
//           allergen_info TEXT,
//           nutritional_info TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//           FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL,
//           FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE SET NULL
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE recipe_ingredients (
//           recipe_ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
//           recipe_id INT NOT NULL,
//           ingredient_id INT NOT NULL,
//           quantity DECIMAL(10,3) NOT NULL,
//           unit_id INT NOT NULL,
//           notes VARCHAR(255),
//           is_optional BOOLEAN DEFAULT FALSE,
//           substitute_ingredient_id INT,
//           FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE,
//           FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
//           FOREIGN KEY (unit_id) REFERENCES units(unit_id),
//           FOREIGN KEY (substitute_ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE SET NULL
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE menu_items (
//           menu_item_id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(100) NOT NULL,
//           description TEXT,
//           recipe_id INT,
//           price DECIMAL(10,2) NOT NULL,
//           cost DECIMAL(10,2),
//           profit_margin DECIMAL(5,2),
//           category_id INT,
//           is_active BOOLEAN DEFAULT TRUE,
//           is_special BOOLEAN DEFAULT FALSE,
//           start_date DATE,
//           end_date DATE,
//           image_url VARCHAR(255),
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//           FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE SET NULL,
//           FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE menu_schedules (
//           schedule_id INT AUTO_INCREMENT PRIMARY KEY,
//           menu_item_id INT NOT NULL,
//           day_of_week TINYINT,
//           meal_period ENUM('breakfast', 'lunch', 'dinner', 'all_day'),
//           start_time TIME,
//           end_time TIME,
//           is_active BOOLEAN DEFAULT TRUE,
//           FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id) ON DELETE CASCADE
//         )
//       `);

//       console.log('Recipe and menu tables created successfully');
//     }
//   }


//   async initializeOrderTables() {
//     const ordersExists = await this.tableExists('orders');

//     if (!ordersExists) {
//       console.log('Creating order tracking tables...');

//       await this.executeQuery(`
//         CREATE TABLE orders (
//           order_id INT AUTO_INCREMENT PRIMARY KEY,
//           order_number VARCHAR(50) UNIQUE,
//           table_number VARCHAR(20),
//           server_id INT,
//           order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           completion_time TIMESTAMP NULL,
//           status ENUM('pending', 'in_progress', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
//           total_amount DECIMAL(10,2),
//           payment_status ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
//           notes TEXT,
//           FOREIGN KEY (server_id) REFERENCES users(user_id) ON DELETE SET NULL
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE order_items (
//           order_item_id INT AUTO_INCREMENT PRIMARY KEY,
//           order_id INT NOT NULL,
//           menu_item_id INT NOT NULL,
//           quantity INT NOT NULL DEFAULT 1,
//           unit_price DECIMAL(10,2) NOT NULL,
//           special_instructions TEXT,
//           status ENUM('pending', 'in_progress', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
//           FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
//           FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id)
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE sales_history (
//           sales_id INT AUTO_INCREMENT PRIMARY KEY,
//           date DATE NOT NULL,
//           menu_item_id INT NOT NULL,
//           quantity_sold INT NOT NULL,
//           total_revenue DECIMAL(10,2) NOT NULL,
//           total_cost DECIMAL(10,2),
//           profit DECIMAL(10,2),
//           meal_period ENUM('breakfast', 'lunch', 'dinner', 'all_day'),
//           FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id)
//         )
//       `);

//       console.log('Order tracking tables created successfully');
//     }
//   }


//   async initializeWasteTables() {
//     const wasteLogsExists = await this.tableExists('waste_logs');

//     if (!wasteLogsExists) {
//       console.log('Creating waste tracking tables...');

//       await this.executeQuery(`
//         CREATE TABLE waste_logs (
//           waste_id INT AUTO_INCREMENT PRIMARY KEY,
//           inventory_id INT,
//           ingredient_id INT,
//           quantity DECIMAL(10,2) NOT NULL,
//           unit_id INT NOT NULL,
//           waste_type ENUM('expired', 'spoiled', 'overproduction', 'preparation', 'returned', 'damaged', 'other') NOT NULL,
//           cost DECIMAL(10,2),
//           recorded_by INT,
//           waste_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           notes TEXT,
//           image_url VARCHAR(255),
//           FOREIGN KEY (inventory_id) REFERENCES inventory_items(inventory_id) ON DELETE SET NULL,
//           FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE SET NULL,
//           FOREIGN KEY (unit_id) REFERENCES units(unit_id),
//           FOREIGN KEY (recorded_by) REFERENCES users(user_id) ON DELETE SET NULL
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE waste_detection_logs (
//           detection_id INT AUTO_INCREMENT PRIMARY KEY,
//           image_id VARCHAR(255),
//           waste_id INT,
//           detection_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           confidence_score DECIMAL(5,4),
//           detected_items TEXT,
//           ml_model_used VARCHAR(100),
//           FOREIGN KEY (waste_id) REFERENCES waste_logs(waste_id) ON DELETE SET NULL
//         )
//       `);

//       console.log('Waste tracking tables created successfully');
//     }
//   }


//   async initializeVisionTables() {
//     const visionCaptureDevicesExists = await this.tableExists('vision_capture_devices');

//     if (!visionCaptureDevicesExists) {
//       console.log('Creating computer vision management tables...');

//       await this.executeQuery(`
//         CREATE TABLE vision_capture_devices (
//           device_id INT AUTO_INCREMENT PRIMARY KEY,
//           name VARCHAR(100) NOT NULL,
//           location_description VARCHAR(255),
//           device_type ENUM('camera', 'mobile', 'upload'),
//           status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
//           ip_address VARCHAR(45),
//           last_connection TIMESTAMP NULL,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE vision_capture_schedule (
//           schedule_id INT AUTO_INCREMENT PRIMARY KEY,
//           device_id INT NOT NULL,
//           capture_frequency_minutes INT NOT NULL,
//           start_time TIME,
//           end_time TIME,
//           is_active BOOLEAN DEFAULT TRUE,
//           days_of_week VARCHAR(20),
//           location_id INT,
//           purpose ENUM('inventory', 'waste', 'spoilage', 'quality'),
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//           FOREIGN KEY (device_id) REFERENCES vision_capture_devices(device_id) ON DELETE CASCADE,
//           FOREIGN KEY (location_id) REFERENCES storage_locations(location_id) ON DELETE SET NULL
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE image_metadata (
//           image_id VARCHAR(255) PRIMARY KEY,
//           device_id INT,
//           location_id INT,
//           capture_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           file_path VARCHAR(255) NOT NULL,
//           file_size INT,
//           width INT,
//           height INT,
//           purpose ENUM('inventory', 'waste', 'spoilage', 'quality'),
//           status ENUM('pending', 'processing', 'processed', 'failed') DEFAULT 'pending',
//           FOREIGN KEY (device_id) REFERENCES vision_capture_devices(device_id) ON DELETE SET NULL,
//           FOREIGN KEY (location_id) REFERENCES storage_locations(location_id) ON DELETE SET NULL
//         )
//       `);

//       // Create default device for uploads
//       await this.executeQuery(`
//         INSERT INTO vision_capture_devices (name, location_description, device_type)
//         VALUES ('Web Upload', 'Manual uploads from web interface', 'upload')
//       `);

//       console.log('Computer vision management tables created successfully');
//     }
//   }


//   async initializePredictionTables() {
//     const demandForecastsExists = await this.tableExists('demand_forecasts');

//     if (!demandForecastsExists) {
//       console.log('Creating AI prediction model tables...');

//       await this.executeQuery(`
//         CREATE TABLE demand_forecasts (
//           forecast_id INT AUTO_INCREMENT PRIMARY KEY,
//           ingredient_id INT,
//           menu_item_id INT,
//           forecast_date DATE NOT NULL,
//           forecast_quantity DECIMAL(10,2) NOT NULL,
//           confidence_level DECIMAL(5,4),
//           model_used VARCHAR(100),
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id) ON DELETE SET NULL,
//           FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id) ON DELETE SET NULL
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE spoilage_predictions (
//           prediction_id INT AUTO_INCREMENT PRIMARY KEY,
//           inventory_id INT NOT NULL,
//           predicted_spoilage_date DATE,
//           risk_score DECIMAL(5,4),
//           factors TEXT,
//           model_used VARCHAR(100),
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           FOREIGN KEY (inventory_id) REFERENCES inventory_items(inventory_id) ON DELETE CASCADE
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE menu_optimization_history (
//           optimization_id INT AUTO_INCREMENT PRIMARY KEY,
//           generated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           effective_date DATE,
//           optimization_type ENUM('waste_reduction', 'profit_maximization', 'balanced'),
//           optimization_score DECIMAL(5,4),
//           generated_by INT,
//           approved_by INT,
//           is_implemented BOOLEAN DEFAULT FALSE,
//           notes TEXT,
//           FOREIGN KEY (generated_by) REFERENCES users(user_id) ON DELETE SET NULL,
//           FOREIGN KEY (approved_by) REFERENCES users(user_id) ON DELETE SET NULL
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE menu_optimization_items (
//           optimization_item_id INT AUTO_INCREMENT PRIMARY KEY,
//           optimization_id INT NOT NULL,
//           menu_item_id INT NOT NULL,
//           action ENUM('add', 'remove', 'price_change', 'ingredient_substitute'),
//           old_value VARCHAR(255),
//           new_value VARCHAR(255),
//           reason TEXT,
//           expected_impact DECIMAL(10,2),
//           FOREIGN KEY (optimization_id) REFERENCES menu_optimization_history(optimization_id) ON DELETE CASCADE,
//           FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id)
//         )
//       `);

//       console.log('AI prediction model tables created successfully');
//     }
//   }


//   async initializeSystemTables() {
//     const systemLogsExists = await this.tableExists('system_logs');

//     if (!systemLogsExists) {
//       console.log('Creating system logs and settings tables...');

//       await this.executeQuery(`
//         CREATE TABLE system_logs (
//           log_id INT AUTO_INCREMENT PRIMARY KEY,
//           log_type VARCHAR(50) NOT NULL,
//           log_level ENUM('debug', 'info', 'warning', 'error', 'critical') NOT NULL,
//           message TEXT NOT NULL,
//           source VARCHAR(100),
//           user_id INT,
//           ip_address VARCHAR(45),
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
//         )
//       `);

//       await this.executeQuery(`
//         CREATE TABLE settings (
//           setting_id INT AUTO_INCREMENT PRIMARY KEY,
//           category VARCHAR(50) NOT NULL,
//           name VARCHAR(100) NOT NULL,
//           value TEXT,
//           data_type ENUM('string', 'number', 'boolean', 'json', 'date', 'time') NOT NULL,
//           description TEXT,
//           is_system BOOLEAN DEFAULT FALSE,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//           UNIQUE KEY (category, name)
//         )
//       `);

//       // Insert default system settings
//       await this.executeQuery(`
//         INSERT INTO settings (category, name, value, data_type, description, is_system) VALUES
//         ('system', 'app_name', 'Smart Kitchen System', 'string', 'Application name', 1),
//         ('system', 'version', '1.0.0', 'string', 'Application version', 1),
//         ('inventory', 'low_stock_threshold_percentage', '25', 'number', 'Percentage threshold for low stock alerts', 0),
//         ('inventory', 'expiry_warning_days', '3', 'number', 'Days before expiry to show warning', 0),
//         ('notification', 'email_alerts', 'true', 'boolean', 'Enable email alerts', 0),
//         ('ai', 'vision_confidence_threshold', '0.7', 'number', 'Minimum confidence score for vision detection', 0)
//       `);

//       console.log('System logs and settings tables created successfully');
//     }
//   }