const { GoogleGenAI } = require("@google/genai");
const { questionAnswerPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateInterviewQuestions = async (req, res) => {
  let rawText = "";

  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "Missing GEMINI_API_KEY on server" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    // ✅ Use ONE consistent @google/genai method
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    rawText = response.text || "";

    const cleanedText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (e) {
      // ✅ This tells you exactly what Gemini returned (so you can fix prompt/cleaning)
      return res.status(500).json({
        message: "Gemini returned non-JSON (parse failed)",
        parseError: e.message,
        rawPreview: cleanedText.slice(0, 400),
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("AI ERROR →", error);
    console.error("AI RAW TEXT →", rawText);
    return res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
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