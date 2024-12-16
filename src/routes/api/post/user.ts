import Post from '~/models/Post';
import Comment from '~/models/Comment';
import { jwtVerify, JWTVerifyResult } from "jose";
import { getCookie } from "vinxi/http";

export async function GET({ request }: { request: Request }) {
    try {
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

        const posts = await Post.find({ user: userId }).populate('user');

        const postsResponse = await Promise.all(posts.map(async post => {
            const comments = await Comment.find({ post: post._id }).populate('user');
            return {
                id: post.id.toString(),
                title: post.title,
                description: post.desc,
                comments: comments.map(comment => ({
                    id: comment.id.toString(),
                    content: comment.content,
                    user: comment.user
                }))
            };
        }));

        return new Response(
            JSON.stringify({ posts: postsResponse }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error('Get User Posts error:', error);
        return new Response(
            JSON.stringify({ message: 'Server error' }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
