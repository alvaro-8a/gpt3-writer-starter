import { Configuration, OpenAIApi } from "openai"

// Configuration for OpenAI API
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

// Connection to OpenAI API
const openai = new OpenAIApi(configuration)

// Base Prompts to joint with userInput
const basePromptPrefix = "Give me a music composing idea for "
const basePromptSufix = `. Also give me a key, chord progression, instruments, music structure with the chords used in each one and explain me why. 
    
    Key:
    Chords: 
    Instruments: 
    Music Structure: 
    Explanation:`

/**
 * Make the OpenAI prompt request with the userInput. Return the prompt output
 *
 * @param {*} req userInput
 * @param {*} res Prompt output
 *
 * @dev You can change the OpenAI configuration for the Prompt (Model, temperature, max_tokens...)
 */
const generateAction = async (req, res) => {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}${basePromptSufix}`)

    const baseCompletion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${basePromptPrefix}${req.body.userInput}${basePromptSufix}\n`,
        temperature: 0.7,
        max_tokens: 900,
    })

    const basePromptOutput = baseCompletion.data.choices.pop()

    res.status(200).json({ output: basePromptOutput })
}

// Export function
export default generateAction
