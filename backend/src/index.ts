import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import { loanApplicationSchema } from "shared";
import { z } from "zod";

function validateRequest(schema: z.AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(400).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello there!");
});

app.post("/submission", validateRequest(loanApplicationSchema), (req: Request, res: Response) => {
  console.log(req.body)
  res.json(req.body)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});