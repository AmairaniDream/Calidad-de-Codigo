import { Router } from "express";
import { BookController } from "../controllers/bookController";

const router = Router();
const bookController = new BookController();

router.get("/books", bookController.getAll);
router.post('/books', bookController.create);
router.get('/books/:id', bookController.getById);
router.put('/books/:id', bookController.update);
router.delete('/books/:id', bookController.delete);
export default router;
