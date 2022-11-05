const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const exists = async (id) => {
  /**
   * A functionn to check if an id is in the db
   */
  const result = await mongodb.getDb().db('company').collection('jobsites').findOne({ _id: id });
  if (result) {
    return true;
  } else {
    return false;
  }
}

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
    // first get the id from the request
    const userId = new ObjectId(req.params.id);

    // validate that the id exists
    if (! await exists(userId))
    {
      // return validation error message
      res.setHeader('Content-Type', 'application/json');
      res.status(400).json({ message: 'ID does not exist!' });
      return;
    }

    // then get the data
    const result = await mongodb.getDb().db('company').collection('jobsites').find({ _id: userId });
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
    // first validate the data in the request
    if (!req.body.name        || !req.body.addressLn1 ||
        !req.body.addressLn2  || !req.body.city       ||
        !req.body.state       || !req.body.zip         )
    {
      // return validation error message
      res.status(400).send({ message: 'All fields are required!' });
      return;
    }

    // then extract the jobsite from the request
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

const updateJobsite = async (req, res) => {
  /**
   * #swagger.description = 'Update jobsite by ID'
   */
  try {
    // first get the id of the jobsite to be updated 
    const jobsiteId = new ObjectId(req.params.id);

    // validate that the id exists
    if (! await exists(jobsiteId))
    {
      // return validation error message
      res.status(400).send({ message: 'ID does not exist!' });
      return;
    }

    // then validate the data in the request
    if (!req.body.name        || !req.body.addressLn1 ||
        !req.body.addressLn2  || !req.body.city       ||
        !req.body.state       || !req.body.zip         )
    {
      // return validation error message
      res.status(400).send({ message: 'All fields are required!' });
      return;
    }
    
    // then extract the jobsite from the request
    const updatedJobsite = {
      name: req.body.name,
      addressLn1: req.body.addressLn1,
      addressLn2: req.body.addressLn2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    }

    // now push the updated jobsite to the db at the specified id
    const response = await mongodb.getDb().db('company').collection('jobsites').replaceOne({ _id: jobsiteId }, updatedJobsite);

    // check the response
    if (response.modifiedCount = 1) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'An error occured while updating the contact.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteJobsite = async (req, res) => {
  /**
   * #swagger.description = 'Delete jobsite by ID'
   */
  try {
    // first get the id of the jobsite to delete
    const jobsiteId = new ObjectId(req.params.id);

    // validate that the id exists
    if (! await exists(jobsiteId))
    {
      // return validation error message
      res.status(400).send({ message: 'ID does not exist!' });
      return;
    }

    // delete the employee from the db
    const response = await mongodb.getDb().db('company').collection('jobsites').deleteOne({_id: jobsiteId}, true);

    // check the respoonse
    if (response.deletedCount > 0) {
      res.status(200).send()
    } else {
      res.status(500).json(response.error || "An error occured while deleting the contact");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createJobsite, updateJobsite, deleteJobsite };