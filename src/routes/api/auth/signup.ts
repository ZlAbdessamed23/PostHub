import bcrypt from 'bcryptjs';
import User from '~/models/User';
import { generateToken } from '~/utils/utils';
import { IUser } from '~/models/User';

export async function POST({ request }: { request: Request }) {
    try {
        const data = await request.json();
        const { name, email, password } = data;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(
                JSON.stringify({ message: 'User already exists' }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const user = newUser.toObject() as IUser;
        const token = await generateToken(user);

        return new Response(
            JSON.stringify({ user: newUser }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Set-Cookie": `user_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
                }
            }
        );
    } catch (error) {
        console.error('SignUp error:', error);
        return new Response(
            JSON.stringify({ message: 'Server error' }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
