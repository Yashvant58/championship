require('dotenv').config();
const express = require('express');
const moment = require('moment-timezone');
const Joi = require('joi');
const knex = require('knex')(require('./knexfile').development);
require("./db")
const app = express();
app.use(express.json());

// Joi Schema for Validation
const registrationSchema = Joi.object({
    name: Joi.string().required(),
    father_name: Joi.string().required(),
    contact_no: Joi.string().required(),
    father_contact_no: Joi.string().required(),
    school_name: Joi.string().required(),
    school_code: Joi.string().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dob: Joi.string().required(),
});

// Registration Route
app.post('/registration', async (req, res) => {
    try {
        // Validate request data
        const { error } = registrationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: "001", message: error.details[0].message });
        }

        const { name, contact_no, father_name, father_contact_no, school_name, school_code, gender, dob } = req.body;
        const created_at = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

        // Check if user already exists by contact number
        const existingUser = await knex("registrations").where({ contact_no }).first();
        if (existingUser) {
            // Check if the name is also the same
            const existingName = await knex("registrations").where({ name }).first();
            if (existingName) {
                return res.status(400).json({
                    status: "002",
                    message: "This mobile number or name already exists. Please use unique credentials."
                });
            }
        }

        // Insert new registration
        const [id] = await knex('registrations').insert({
            name,
            father_name,
            contact_no,
            father_contact_no,
            school_name,
            school_code,
            gender,
            dob,
            created_at
        });

        return res.status(201).json({ status: "001", message: "Registration successful", id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "500", message: "Internal Server Error" });
    }
});

// Get All Registered Users
app.get('/registrations', async (req, res) => {
    try {
        const users = await knex('registrations').select('*');
        return res.status(200).json({ status: "001", message: "Data retrieved successfully", data: users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "500", message: "Internal Server Error" });
    }
});

// Start Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
