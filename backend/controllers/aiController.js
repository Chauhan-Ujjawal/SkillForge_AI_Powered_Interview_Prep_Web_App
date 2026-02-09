
const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        // ---- FIXED SDK USAGE ----
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        const result = await model.generateContent(prompt);

        const rawText = result.response.text(); // FIXED

        // ---- Clean fenced JSON if present ----
        const cleanedText = rawText
            .replace(/^```json/, "")
            .replace(/```$/, "")
            .trim();

        let data;

        try {
            data = JSON.parse(cleanedText);
        } catch (err) {
            return res.status(500).json({
                message: "AI did not return valid JSON",
                rawOutput: rawText
            });
        }

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: "Failed to generate questions", error: error.message });
    }
};




// @desc Generate explanation for interview question
// @route POST /api/ai/generate-explanation
// @access Private

const generateConceptExplanation = async(req,res) => {
     try{
        const {question} = req.body;

        if(!question){
            return res.status(400).json({message:"Missing required fields"})
        }
        const prompt = conceptExplainPrompt(question)

        const response = await ai.models.generateContent({
            model:"gemini-2.0-flash-lite",
            contents:prompt
        })

        let rawText = response.text;

        const cleanedText = rawText
        .replace(/^```json\s*/,"")
        .replace(/```$/,"")
        .trim()

        const data = JSON.parse(cleanedText)
        res.status(200).json(data)

    }catch(error){
        res.status(500).json({message:"Failed to generate questions",error:error.message})
    }

}

module.exports = {generateInterviewQuestions,generateConceptExplanation}