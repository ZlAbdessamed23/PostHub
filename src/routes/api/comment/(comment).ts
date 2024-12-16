import { jwtVerify, JWTVerifyResult } from 'jose';
import { getCookie } from 'vinxi/http';
import Comment from '~/models/Comment';

export async function POST({ request }: { request: Request }) {
    try {
        const data = await request.json();
        const { content, postId } = data;
        const token = getCookie('user_token');
        if (!token) {
            return new Response(
                JSON.stringify({ message: 'Unauthorized' }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }
        const secret = new TextEncoder().encode(process.env.JWT_KEY);
        const { payload } = (await jwtVerify(token as string, secret)) as JWTVerifyResult;
        const userId = payload._id;
        console.log(userId)
        console.log(postId)
        console.log(content);
        const newComment = new Comment({ content, user: userId, post: postId });
        await newComment.save();

        return new Response(
            JSON.stringify({ comment: newComment }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error('Add Comment error:', error);
        return new Response(
            JSON.stringify({ message: 'Server error' }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
