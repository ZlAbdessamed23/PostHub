import Post from '~/models/Post';
import Comment from '~/models/Comment';
import { jwtVerify, JWTVerifyResult } from 'jose';
import { getCookie } from 'vinxi/http';
import User from '~/models/User';

export async function POST({ request }: { request: Request }) {
    console.log("entered the post route")
    try {
        const data = await request.json();
        const { title, description } = data;
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
        const newPost = new Post({ title, description , user: userId });
        await newPost.save();

        return new Response(
            JSON.stringify({ post: newPost }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error('Add Post error:', error);
        return new Response(
            JSON.stringify({ message: 'Server error' }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}


export async function DELETE({ request }: { request: Request }) {
    try {
        const { postId } = await request.json();

        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return new Response(
                JSON.stringify({ message: 'Post not found' }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ message: 'Post deleted successfully' }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error('Delete Post error:', error);
        return new Response(
            JSON.stringify({ message: 'Server error' }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}


export async function GET({ request }: { request: Request }) {
    try {
        const posts = await Post.find().populate('user');

        const postsResponse = await Promise.all(posts.map(async post => {
            const comments = await Comment.find({ post: post._id }).populate('user');
            const commentsWithUserName = await Promise.all(comments.map(async comment => {
                const user = await User.findById(comment.user);
                return {
                    id: comment.id.toString(),
                    content: comment.content,
                    user: user ? user.name : 'Unknown' // Returning user name
                };
            }));

            return {
                id: post.id.toString(),
                title: post.title,
                description: post.description,
                comments: commentsWithUserName
            };
        }));

        return new Response(
            JSON.stringify({ posts: postsResponse }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error('Get All Posts error:', error);
        return new Response(
            JSON.stringify({ message: 'Server error' }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

