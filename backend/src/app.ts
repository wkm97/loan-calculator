import express, { Request, Response } from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import { loanApplicationSchema } from "shared";

import mongoose from 'mongoose';
import { validateRequest } from "./middlewares.js";
import { LoanApplicationModel } from "./database.js";

dotenv.config();
const port = process.env.PORT || 3000;
const mongodb_uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test'

mongoose.connect(mongodb_uri)
mongoose.connection.once("open", (_) => {
  console.log(`Database connected: ${mongodb_uri}`);
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello there!");
});

app.post("/submission", validateRequest(loanApplicationSchema), async (req: Request, res: Response) => {
  const application = new LoanApplicationModel(req.body)

  try {
    await application.save();
    res.json(application);
  } catch (error) {
    if (error instanceof mongoose.Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});