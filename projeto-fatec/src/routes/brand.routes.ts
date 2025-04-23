
import express, { Request, Response } from "express"
import { listAll } from "../controllers/brand.controllers";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const brands = await listAll();
    res.json({brands});
});

export default router;
