import { jwtVerify, JWTVerifyResult } from "jose";
import { getCookie } from "vinxi/http";
import { generateToken } from "~/utils/utils";

export async function POST({ request }: { request: Request }) {
    try {
        const data = await request.json();
        
        const token = await generateToken({});
        console.log(token);
        console.log("Parsed data:", data);
        return new Response(
            JSON.stringify({ user: data }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Set-Cookie": `user_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
                }
            }
        );
    } catch (error) {
        console.error("Error parsing request body:", error);
        return new Response(
            JSON.stringify({ status: 400, message: "Invalid request body" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }
};


export async function GET({ request }: { request: Request }) {
    try {
        const token = getCookie("user_token");
        const secret = new TextEncoder().encode(process.env.JWT_KEY);
        const { payload } = (await jwtVerify(token as string, secret)) as JWTVerifyResult;
        console.log(payload);
        const responseData = {
            message: "Hello from the GET method!",
            timestamp: new Date().toISOString(),
        };

        return new Response(
            JSON.stringify({ user: { name: "samidou", age: 65 } }),
            { headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error handling GET request:", error);
        return new Response(
            JSON.stringify({ status: 500, message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
