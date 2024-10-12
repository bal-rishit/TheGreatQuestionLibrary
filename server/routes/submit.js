import Question from "../models/Question.js";
import Paper from "../models/Paper.js";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "./verifyToken.js";
import express from "express"
import multer from 'multer';
import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';
import dotenv from 'dotenv';


// import fs from 'fs';

const router = express.Router();

dotenv.config(); 



//Submit Question

router.post('/', async (req, res) => {
    try {
      const { questionarray } = req.body;
  
      if (!Array.isArray(questionarray)) {
        return res.status(400).json({ message: 'Invalid data format' });
      }
  
      // Save each question entry to the database
      const results = await Promise.all(questionarray.map(async (entry) => {
        const newQuestion = new Question(entry);
        return newQuestion.save();
      }));
  
      res.status(201).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

//Submit Paper

router.post('/submitPaper', async (req, res) => {
  const newPaper = new Paper(req.body);
  try {
    const savedPaper = await newPaper.save();

    res.status(201).json(savedPaper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//UPLOAD IN DROPBOX

const upload = multer(); // No disk storage, use memory for handling file uploads

// Dropbox configuration
const dropboxAccessToken = process.env.DROPBOX_ACCESS_TOKEN; // Ensure you store this in an environment variable
const dbx = new Dropbox({ accessToken: dropboxAccessToken, fetch: fetch });
// Route to handle Dropbox file upload
router.post('/uploadDropbox', upload.single('file'), async (req, res) => {
  try {
    const { paperTitle } = req.body;
    const fileBuffer = req.file.buffer;

    // Step 1: Upload the file to Dropbox
    const dropboxResponse = await fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${dropboxAccessToken}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: `/${paperTitle}_paper.pdf`,
          mode: 'add',
          autorename: true,
          mute: false
        }),
        'Content-Type': 'application/octet-stream'
      },
      body: fileBuffer
    });

    if (!dropboxResponse.ok) {
      const errorText = await dropboxResponse.text(); // Read raw response text
      throw new Error(`Dropbox API error: ${errorText}`);
    }

    // Parse the uploaded file response
    const uploadResult = await dropboxResponse.json();
    const filePath = uploadResult.path_lower; // Dropbox file path

    // Step 2: Create a shared link for the uploaded file
    const sharedLinkResponse = await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${dropboxAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: filePath, // Use the uploaded file path
        settings: {
          "requested_visibility": "public" // Set visibility to public
        }
      })
    });

    if (!sharedLinkResponse.ok) {
      const errorText = await sharedLinkResponse.text(); // Read raw response text
      const errorJson = JSON.parse(errorText);
      console.error('Error creating shared link:', errorJson);
      throw new Error(`Error creating shared link: ${errorJson.error_summary}`);
    }

    const sharedLinkResult = await sharedLinkResponse.json();

    // Step 3: Return the shared link to the client
    const viewableLink = sharedLinkResult.url.replace("?dl=0", "?raw=1"); // Adjust the link to allow viewing
    res.status(200).json({ message: 'File uploaded successfully', viewableLink });
  } catch (error) {
    console.error('Error uploading file to Dropbox:', error);
    res.status(500).json({ message: 'Error uploading to Dropbox', error: error.message });
  }
});




//GET ALL QUESTIONS
router.get('/', async (req, res) => {
  let questions;
  try {  
    questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET QUESTIONS OF AUTHOR
router.get('/author/questions/:authorId', async (req, res) => {
  let questions;
  try {  
    questions = await Question.find({ userId: req.params.authorId });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PAPER OF THE AUTHOR
router.get('/author/papers/:authorId', async (req, res) => {
  let papers;
  try {  
    papers = await Paper.find({ userId: req.params.authorId });
    res.status(200).json(papers);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ONE QUESTION
router.get("/find/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;