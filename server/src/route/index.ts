import { Router } from "express";
import { create, del, read, update } from "../controller";

const router = Router();

router.route("/item").get(read).post(create).put(update).delete(del);

export default router;
