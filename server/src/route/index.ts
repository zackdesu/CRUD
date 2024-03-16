import { Router } from "express";
import { create, del, read, readSingle, update } from "../controller";

const router = Router();

router.route("/item").get(read).post(create).put(update).delete(del);
router.get("/item/:id", readSingle);
export default router;
