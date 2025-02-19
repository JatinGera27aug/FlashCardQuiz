const flashCardModel = require("../models/flashCardModel");

class FlashCardController {
    static getAllFlashCards = async (req, res) => {
        try {
            const flashCards = await flashCardModel.find();
            res.status(200).json({ flashCards });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // one by one
    static getOneFlashCard = async (req, res) => {
        const box_number = req.body.box;
        console.log(box_number);
        const user = req.user._id;
        console.log("user is:", user);
        try {
            if (!user) {
                return res.status(401).json({ message: "Not authorized, no token" });
            }

            const box = box_number || 1; // default to box 1 if not provided

            const flashCards = await flashCardModel.aggregate([
                { $match: { box: box, nextReviewDate: { $gte: new Date() } } },
                { $sample: { size: 20 } }
            ]);

            console.log(flashCards);
            res.status(200).json({ flashCards });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }



    // make cards
    static makeFlashCard = async (req, res) => {
        // const user = req.user._id;
        const { question, answer, box } = req.body;
        console.log(req.body);
        try {

            // console.log(user);
            // if (!user) {
            //     return res.status(401).json({ message: "Not authorized, no token" });
            // }

            if (!question || !answer) {
                return res.status(400).json({ message: "Please fill in all fields" });
            }
            // console.log(user);
            const alreadyExists = await flashCardModel.findOne({ question, answer});
            if (alreadyExists) {
                return res.status(400).json({ message: "Flashcard already exists" });
            }
            // const newFlashCard = new flashCardModel({ question, answer, user, box });
            const newFlashCard = new flashCardModel({ question, answer, box });
            await newFlashCard.save();
            res.status(201).json({ newFlashCard });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // update
    static updateFlashCard = async (req, res) => {
        // const { question, answer } = req.body;
        // const user = req.user._id;
        const id = req.params.cardId;
        const { correct } = req.body;
        try {
            // if (!user) {
            //     return res.status(401).json({ message: "Not authorized, no token" });
            // }
            // if (!correct) {
            //     return res.status(400).json({ message: "Please fill all fields" });
            // }

            const flashCard = await flashCardModel.findById(id);
            if (!flashCard) {
                return res.status(404).json({ message: "Flashcard not found" });
            }

            if (correct) {
                flashCard.box = Math.min(flashCard.box + 1, 5);
            } else {
                // Reset to Box 1 if incorrect
                flashCard.box = 1;
            }

            const daysToAdd = [1, 3, 7, 10, 20]; 
            flashCard.nextReviewDate = new Date();
            flashCard.nextReviewDate.setDate(flashCard.nextReviewDate.getDate() + daysToAdd[flashCard.box - 1]);





            await flashCard.save();
            res.status(200).json({ flashCard });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    // delete card
    static deleteFlashCard = async (req, res) => {
        // const user = req.user._id;
        const id = req.params.cardId;
        try {
            // if (!user) {
            //     return res.status(401).json({ message: "Not authorized, no token" });
            // }
            const deletedFlashCard = await flashCardModel.findById(id);
            if (!deletedFlashCard) {
                return res.status(404).json({ message: "Flashcard not found" });
            }

            await flashCardModel.findByIdAndDelete(id);
            res.status(200).json({ message: "Flashcard deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = FlashCardController;