import { Router } from "express";
import { createUser } from "../controllers/userController";
import validateUser from "../middleware/validate";

const router: Router = Router();

router.post("/", validateUser, createUser);

export default router;
