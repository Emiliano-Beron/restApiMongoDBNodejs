import { Router } from "express";
const router = Router();

// Database Connection
import { connect } from "../database";
import { ObjectID, ObjectId } from "mongodb";

router.get("/", async (req, res) => {
  const db = await connect();
  const result = await db.collection("tasks").find({}).toArray();
  res.json(result);
});

router.post("/", async (req, res) => {
  const db = await connect();
  const task = {
    title: req.body.title,
    description: req.body.description,
  };
  const result = await db.collection("tasks").insertOne(task);

  res.json(result.ops[0]);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const db = await connect();
  const result = await db.collection("tasks").findOne({ _id: ObjectID(id) });
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const db = await connect();
  const result = await db.collection('tasks').deleteOne({ _id: ObjectId(id) });
  res.json({
      message: `Task ${id} deleted`,
      result
  })
});

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const updateTask = {
        title: req.body.title,
        description: req.body.description
    };
    const db = await connect();
    await db.collection('task').updateOne({_id: ObjectId(id)},{$set: updateTask});
    res.json({
        message: `Tasks ${id} Updated`
    })
});

export default router;
