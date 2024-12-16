import Post from '~/models/Post';
import Comment from '~/models/Comment';

export async function getPostById({ request }: { request: Request }) {
    try {
        const { postId } = await request.json();

        const post = await Post.findById(postId).populate('user');
        if (!post) {
            return new Response(
                JSON.stringify({ message: 'Post not found' }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        const comments = await Comment.find({ post: postId }).populate('user');

        const postResponse = {
            id: post.id.toString(),
            title: post.title,
            description: post.desc,
            comments: comments.map(comment => ({
                id: comment.id.toString(),
                content: comment.content,
                user: comment.user,
            }))
        };

        return new Response(
            JSON.stringify({ post: postResponse }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error('Get Post By ID error:', error);
        return new Response(
            JSON.stringify({ message: 'Server error' }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
