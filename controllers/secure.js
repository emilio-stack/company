const mongodb = require('../db/connect');

const getAll = async (req, res) => {
    /**
     * #swagger.description = 'PROTECTED ROUTE!!! Get all secure docs'
     */
    try {
      if (!req.user) {
        res.status(401).send("No user logged in");
        return;
      }

      console.log("user in controller function", req.user);

        const result = await mongodb.getDb().db('company').collection('secure').find();
        result.toArray().then((lists) => {
            res.header('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};


module.exports = { getAll }