import Paper from "../models/Paper.js";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "./verifyToken.js";
import express from "express"

const router = express.Router();

//Submit

router.post('/', async (req, res) => {
    try {
      const { paper } = req.body;
  
      if (!Array.isArray(paper)) {
        return res.status(400).json({ message: 'Invalid data format' });
      }
  
      // Save each paper entry to the database
      const results = await Promise.all(paper.map(async (entry) => {
        const newPaper = new Paper(entry);
        return newPaper.save();
      }));
  
      res.status(201).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
  let questions;
  try {  
    questions = await Paper.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET QUESTION
router.get("/find/:id", async (req, res) => {
  try {
    const question = await Paper.findById(req.params.id);
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;