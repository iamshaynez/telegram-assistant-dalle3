const ENV_VALUE_TYPE = {
    OPENAI_KEY: "string",
    OPENAI_ORG: "string",
};

export const ENV = {
    // Bing cookie _U
    OPENAI_KEY: "",
    OPENAI_ORG: "",
};

export function initEnv(env) {
    for (const key in ENV) {
        if (env[key]) {
            switch (ENV_VALUE_TYPE[key] || typeof ENV[key]) {
                case "number":
                    ENV[key] = parseInt(env[key]) || ENV[key];
                    break;
                case "boolean":
                    ENV[key] = (env[key] || "false") === "true";
                    break;
                case "string":
                    ENV[key] = env[key];
                    break;
                case "object":
                    if (Array.isArray(ENV[key])) {
                        ENV[key] = env[key].split(",");
                    } else {
                        try {
                            ENV[key] = JSON.parse(env[key]);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    break;
                default:
                    ENV[key] = env[key];
                    break;
            }
        }
    }
}
