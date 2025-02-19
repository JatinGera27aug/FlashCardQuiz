const FlashCardController = require('../controllers/flashcardController');
const authMiddleware = require('../middleware/authMiddleware');
const express = require("express");
const router = express.Router();

router.get("/all/flashcards", FlashCardController.getAllFlashCards);
router.get('/each/flashcard', authMiddleware, FlashCardController.getOneFlashCard);
router.post("/make/flashcard", FlashCardController.makeFlashCard);
// router.post("/make/flashcard", authMiddleware, FlashCardController.makeFlashCard);

router.put("/update/flashcard/:cardId",  FlashCardController.updateFlashCard);
// router.put("/update/flashcard/:cardId", authMiddleware, FlashCardController.updateFlashCard);

router.delete("/delete/flashcard/:cardId", FlashCardController.deleteFlashCard);
// router.delete("/delete/flashcard/:cardId", authMiddleware, FlashCardController.deleteFlashCard);


module.exports = router;