const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    /**
     * #swagger.description = 'Get all employees'
     */
    try {
        const result = await mongodb.getDb().db('company').collection('employees').find();
        result.toArray().then((lists) => {
            res.header('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getSingle = async (req, res) => {
    /**
     * #swagger.description = 'Get single employee by id'
     */
    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db('company')
        .collection('employees')
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const createEmployee = async (req, res) => {
    /**
     * #swagger.description = 'Create a new employee'
     */
    try {
      // first extract the employee from the request
      const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        trade: req.body.trade,
        manager: req.body.manager,
        team: req.body.team,
        wage: req.body.wage,
      }
    
      // send the contact to the db
      const response = await mongodb.getDb().db('company').collection('employees').insertOne(newContact);
    
      // now check the result and return response accordingly
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || "An error occured while creating the contact")
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

module.exports = { getAll, getSingle, createEmployee };