import bcrypt from 'bcryptjs';
import User from '~/models/User';
import { generateToken } from '~/utils/utils';
import { IUser } from '~/models/User';

export async function POST({ request }: { request: Request }) {
    try {
        const data = await request.json();
        const { email, password } = data;

        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return new Response(
                JSON.stringify({ message: 'Invalid email or password' }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, userDoc.password);
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ message: 'Invalid email or password' }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const user = userDoc.toObject() as IUser;
        const token = await generateToken(user);

        return new Response(
            JSON.stringify({ user }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Set-Cookie": `user_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
                }
            }
        );
    } catch (error) {
        console.error('Login error:', error);
        return new Response(
            JSON.stringify({ message: 'Server error' }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
