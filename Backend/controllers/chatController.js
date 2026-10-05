const { GoogleGenAI } = require("@google/genai");

const Expense = require("../models/Expense");
const Income = require("../models/Income");

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    // Get user's financial data
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    const income = await Income.find({ userId }).sort({ date: -1 });

    // Prepare financial data for AI
    const financialData = {
      income: income.map((item) => ({
        source: item.source,
        amount: item.amount,
        date: item.date,
      })),

      expenses: expenses.map((item) => ({
        category: item.category,
        amount: item.amount,
        date: item.date,
      })),
    };

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are an AI Financial Assistant inside an Expense Tracker application.

You have access to the user's actual income and expense data below.

FINANCIAL DATA:
${JSON.stringify(financialData, null, 2)}

USER QUESTION:
${message}

Instructions:
- Answer only using the provided financial data.
- Keep every response very short and direct.
- Include only the most important information.
- Avoid unnecessary explanations.
- Use simple bullet points when helpful.
- For calculations, give the final result clearly.
- Use ₹ for Indian currency.
- If the information is unavailable, say so briefly.
- Maximum 3-4 bullet points.
- Keep the response under 50 words unless the user asks for details.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    res.json({
      reply: response.text,
    });
  } catch (error) {
    console.log("Gemini Error:", error);

    res.status(503).json({
      message:
        "AI service is temporarily busy. Please try again in a few seconds.",
    });
  }
};
