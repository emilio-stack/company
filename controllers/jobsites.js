const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    /**
     * #swagger.description = 'Get all jobsites'
     */
    try {
        const result = await mongodb.getDb().db('company').collection('jobsites').find();
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
     * #swagger.description = 'Get single jobsite by id'
     */
    try {
      const userId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db('company')
        .collection('jobsites')
        .find({ _id: userId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const createJobsite = async (req, res) => {
    /**
     * #swagger.description = 'Create a new jobsite'
     */
    try {
      // first extract the jobsite from the request
      const newContact = {
        name: req.body.name,
        addressLn1: req.body.addressLn1,
        addressLn2: req.body.addressLn2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
      }
    
      // send the contact to the db
      const response = await mongodb.getDb().db('company').collection('jobsites').insertOne(newContact);
    
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

module.exports = { getAll, getSingle, createJobsite };