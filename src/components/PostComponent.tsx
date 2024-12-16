import { type Component, For, Show } from 'solid-js';
import { createForm, requiredValidator } from "solform";
import { addComment } from '~/utils/utils';
import toast from 'solid-toast';

interface PostComponentProps {
    post: CreatedPost;
}

const PostComponent: Component<PostComponentProps> = (props) => {
    const commentForm = createForm<CreatingComment>({
        validators: {
            content: [
                requiredValidator("Comment cannot be empty")
            ]
        },
        initialValues: {
            content: "",
            postId: props.post.id,
        },
        onSubmit: async(values) => {
            const content = values.content;
            const postId = props.post.id;
            await addComment({content , postId});
            toast.success("comment added successfully", {
                position: "top-center",
                iconTheme: {
                    primary: "oklch(var(--cyan-600))",
                    secondary: "oklch(var(--gray-900))"
                },
                style: {
                    "background-color": "oklch(var(--gray-900))",
                    "color": "oklch(var(--cyan-400))",
                    "border": "1px solid oklch(var(--cyan-600))"
                }
            });
        }
    });

    return (
        <div class="bg-gray-900 rounded-xl shadow-2xl p-6 mb-6 border-l-4 border-cyan-600">
            <div class="mb-4">
                <h2 class="text-2xl font-bold text-cyan-400 mb-2">{props.post.title}</h2>
                <p class="text-gray-300">{props.post.description}</p>
            </div>
            <div class="mt-6">
                <h3 class="text-xl font-semibold text-gray-200 mb-4">Comments</h3>
                <div class="max-h-64 overflow-y-auto pr-2 space-y-3 mb-4">
                    <Show when={props.post.comments.length > 0}>
                        <For each={props.post.comments}>
                            {
                                (comment) => (
                                    <div
                                        class="bg-gray-800 p-3 rounded-lg"
                                    >
                                        <p class="text-gray-300">{comment.content}</p>
                                        <span class="text-sm text-gray-500">by {comment.user}</span>
                                    </div>
                                )
                            }
                        </For>
                    </Show>
                </div>

                <form
                    onSubmit={commentForm.submit}
                    class="flex items-center space-x-2"
                >
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        {...commentForm.register('content')}
                        class="flex-grow py-2 px-3 bg-gray-800 border-b-2 border-cyan-600 text-white focus:outline-none focus:border-cyan-400 transition-all duration-300 rounded-md"
                    />
                    <button
                        type="submit"
                        class="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-all duration-300"
                    >
                        Send
                    </button>
                </form>
                {commentForm.errors.content && (
                    <p class="text-red-500 text-sm mt-1">{commentForm.errors.content}</p>
                )}
            </div>
        </div>
    );
};

export default PostComponent;