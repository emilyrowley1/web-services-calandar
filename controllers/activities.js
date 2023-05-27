const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb
        .getDb()
        .db()
        .collection('activities')
        .find().toArray().then((err, lists) => {
            if (err) {
                res.status(400).json({message: err});
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(lists);
            }
        });
};

const getOne = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must be a valid ID to get a activity');
    }
    const activityId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('activities')
      .find({ _id: activityId })
      .toArray().then((err, result) => {
        if (err) {
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
  };

const createActivity = async (req, res) => {
    const activity = {
        activityName: req.body.activityName,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        location: req.body.location,
    };
    const result = await mongodb.getDb().db().collection('activities').insertOne(activity);

    if (result.acknowledged) {
        res.status(200).json(result);
    } else {
        res.status(500).json(response.error || 'Some error occurred while create a activity');
    }
};

const updateActivity = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must be a valid ID to update a activity.');
    }
    const activityId = new ObjectId(req.params.id);
    const activity = {
        activityName: req.body.activityName,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        location: req.body.location,
    };
    const response = await mongodb.getDb().db().collection('activities').replaceOne({ _id: activityId }, activity);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the activity.');
    }
};

const deleteActivity = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must be a valid ID to delete activity.');
    }
    const activityId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('activities')
      .deleteOne({ _id: activityId });
  
      if (result.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(result.error || 'Some error occurred while deleting the activity.');
      }
  };

module.exports = {
    getAll,
    getOne,
    createActivity,
    updateActivity,
    deleteActivity
};
