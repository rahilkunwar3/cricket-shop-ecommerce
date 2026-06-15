const Task = require('../models/task');


const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find({userId: req.userId});
        res.json(tasks);
    } catch (error){
        res.status(500).json({message: 'Server Error'});
    }
};


const createTask = async (req, res) => {
    try{
        const {title, description} = req.body;
        const task = new Task({title, description, userId: req.userId});
        await task.save();
        res.status(201).json(task);
    } catch (error){
        res.status(500).json({message: 'Server Error'});

    }
};

const updateTask = async (req, res) => {
    try{
        const {title, description, completed} = req.body;
        const task = await Task.findOne({id: req.params.id, userId: req.userId});

        if (!task){
            return res.status(404).json({message: 'Task not found'});
        }

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (completed !== undefined) task.completed = completed;

        await task.save();
        res.json(task);
    } catch (error){
        res.status(500).json({message: 'Server Error'});

    }
};

const deleteTask = async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, userId: req.userId});

        if (!task){
            return res.status(404).json({message: 'Task not found'});
        }

        res.json({message: 'Task completed successfully'});
    } catch (error){
        res.status(500).json({message: 'Server Error'});
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};