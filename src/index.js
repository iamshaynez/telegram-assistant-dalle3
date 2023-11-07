
import { responseToAssistant, errorToString } from "./util";
import { initEnv } from "./env";
import { createImage } from "./openai";

export default {
    async fetch(request, env) {
        console.log(`Recieved request on DALLE3 Creator`)
        initEnv(env)
        try {
            const body = await request.json();
            const text = body.message.text;
            console.log(`Text: ${text}`)
            return await createImage(text);
        } catch (e) {
            console.error(e);
            return responseToAssistant(errorToString(e));
        }
    },
};

