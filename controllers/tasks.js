const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('tasks').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getOne = async (req, res, next) => {
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('tasks')
      .find({ _id: taskId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

const createTask = async (req, res) => {
    const task = {
        taskName: req.body.taskName,
        priority: req.body.priority,
    };
    const result = await mongodb.getDb().db().collection('tasks').insertOne(task);

    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(response.error || 'Some error occurred while create a task');
    }
};

const updateTask = async (req, res) => {
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
