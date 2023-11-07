import OpenAI from "openai";
import { ENV } from "./env";
import { responseToAssistant } from "./util";

export async function createImage(sentence) {
    const openai = new OpenAI({
        organization: ENV.OPENAI_ORG,
        apiKey: ENV.OPENAI_KEY,
    });

    // quality = hd
    // size = 1024x1024, 1792x1024, or 1024x1792
    // style = vivid or natural
    const response = await openai.images.generate({
        prompt: sentence,
        model: "dall-e-3",
        n: 1,
        size: "1024x1024",
    });

    console.log(`open ai data - ${response.data}`);
    console.log(`open ai revised_prompt - ${response.data[0].revised_prompt}`);
    console.log(`open ai url - ${response.data[0].url}`);
    //image_url = response.data.data[0].url;
    return responseToAssistant(response.data[0].revised_prompt, [
        response.data[0].url,
    ]);
}
