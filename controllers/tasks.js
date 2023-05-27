const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb
        .getDb()
        .db()
        .collection('tasks')
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
        res.status(400).json('Must be a valid ID to get a task');
    }
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('tasks')
      .find({ _id: taskId })
      .toArray().then((err, result) => {
        if (err) {
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
  };

const createTask = async (req, res) => {
    const task = {
        taskName: req.body.taskName,
        priority: req.body.priority,
    };
    const result = await mongodb.getDb().db().collection('tasks').insertOne(task);

    if (result.acknowledged) {
        res.status(200).json(result);
    } else {
        res.status(500).json(response.error || 'Some error occurred while create a task');
    }
};

const updateTask = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must be a valid ID to update a task.');
    }
    const taskId = new ObjectId(req.params.id);
    const task = {
        taskName: req.body.taskName,
        priority: req.body.priority,
    };
    const response = await mongodb.getDb().db().collection('tasks').replaceOne({ _id: taskId }, task);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the task.');
    }
};

const deleteTask = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must be a valid ID to delete task.');
    }
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('tasks')
      .deleteOne({ _id: taskId });
  
      if (result.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(result.error || 'Some error occurred while deleting the task.');
      }
  };

module.exports = {
    getAll,
    getOne,
    createTask,
    updateTask,
    deleteTask
};
