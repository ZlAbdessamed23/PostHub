import { type Component } from 'solid-js';
import { createForm, requiredValidator, minLengthValidator } from "solform";
import { addPost } from '~/utils/utils';
import toast from 'solid-toast';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

const AddPostModal: Component<ModalProps> = (props) => {
    const addPostForm = createForm<CreatingPost>({
        validators: {
            title: [
                requiredValidator("Title is required"),
                minLengthValidator(3, "Title must be at least 3 characters")
            ],
            description: [
                requiredValidator("Description is required"),
                minLengthValidator(10, "Description must be at least 10 characters")
            ]
        },
        initialValues: {
            title: "",
            description: ""
        },
        onSubmit: async(values) => {
            console.log(values)
            const res = await addPost(values);
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
            setTimeout(() => {
                props.setIsOpen(false);
            },1000);

        }
    });

    return (
        <>
            {props.isOpen && (
                <div 
                    class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                    onClick={() => props.setIsOpen(false)}
                >
                    <div 
                        class="bg-gray-900 rounded-xl p-8 w-[500px] max-w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 class="text-3xl font-bold text-cyan-400 mb-6">Add New Post</h2>
                        <form 
                            onSubmit={addPostForm.submit}
                            class="space-y-6"
                        >
                            <div class="relative">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    {...addPostForm.register('title')}
                                    class="w-full rounded-lg py-3 px-4 bg-gray-800 border-b-2 border-cyan-600 text-white focus:outline-none focus:border-cyan-400 transition-all duration-300"
                                />
                                {addPostForm.errors.title && (
                                    <p class="text-red-500 text-sm mt-1">{addPostForm.errors.title}</p>
                                )}
                            </div>
                            <div class="relative">
                                <textarea
                                    placeholder="Description"
                                    {...addPostForm.register('description')}
                                    class="w-full rounded-lg py-3 px-4 bg-gray-800 border-b-2 border-cyan-600 text-white focus:outline-none focus:border-cyan-400 transition-all duration-300 min-h-[100px]"
                                />
                                {addPostForm.errors.description && (
                                    <p class="text-red-500 text-sm mt-1">{addPostForm.errors.description}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                class="w-full py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Create Post
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddPostModal;