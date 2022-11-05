const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const exists = async (id) => {
  /**
   * A functionn to check if an id is in the db
   */
  const result = await mongodb.getDb().db('company').collection('employees').findOne({ _id: id });
  if (result) {
    return true;
  } else {
    return false;
  }
}

const getAll = async (req, res) => {
    /**
     * #swagger.description = 'Get all employees'
     */
    try {

      console.log("user in controller function", req.user);

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
      const result = await mongodb.getDb().db('company').collection('employees').find({ _id: userId });
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
      // first validate the data in the request
      if (!req.body.firstname || !req.body.lastname ||
          !req.body.birthday  || !req.body.birthday ||
          !req.body.trade     || !req.body.manager  ||
          !req.body.team      || !req.body.wage      )
      {
        // return validation error message
        res.status(400).send({ message: 'All fields are required!' });
        return;
      }

      // then extract the employee from the request
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

const updateEmployee = async (req, res) => {
  /**
   * #swagger.description = 'Update employee by ID'
   */
  try {
    // first get the id of the employee to be updated 
    const employeeId = new ObjectId(req.params.id);

    // validate that the id exists
    if (! await exists(employeeId))
    {
      // return validation error message
      res.status(400).send({ message: 'ID does not exist!' });
      return;
    }

    // validate the data
    if (!req.body.firstname || !req.body.lastname ||
        !req.body.birthday  || !req.body.birthday ||
        !req.body.trade     || !req.body.manager  ||
        !req.body.team      || !req.body.wage      )
    {
      // return validation error message
      res.status(400).send({ message: 'All fields are required!' });
      return;
    }
    
    // create the updated employee from the request
    const updatedEmployee = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        trade: req.body.trade,
        manager: req.body.manager,
        team: req.body.team,
        wage: req.body.wage,
    }

    // now push the updated employee to the db at the specified id
    const response = await mongodb.getDb().db('company').collection('employees').replaceOne({ _id: employeeId }, updatedEmployee);

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

const deleteEmployee = async (req, res) => {
  /**
   * #swagger.description = 'Delete employee by ID'
   */
  try {
    // first get the id of the employee to delete
    const employeeId = new ObjectId(req.params.id);

    // validate that the id exists
    if (! await exists(employeeId))
    {
      // return validation error message
      res.status(400).send({ message: 'ID does not exist!' });
      return;
    }
  
    // delete the employee from the db
    const response = await mongodb.getDb().db('company').collection('employees').deleteOne({_id: employeeId}, true);
  
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

module.exports = { getAll, getSingle, createEmployee, updateEmployee, deleteEmployee };