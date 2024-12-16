import { createSignal, type Component } from 'solid-js';
import ClientOnlyModal from './ClientOnlyModal';

const AddPostButton: Component = () => {
    const [isModalOpen, setIsModalOpen] = createSignal(false);
    return (
        <div>
            <button
                onClick={() => setIsModalOpen(true)}
                class="fixed bottom-10 right-10 bg-cyan-600 text-white py-4 px-6 rounded-full shadow-2xl hover:bg-cyan-700 transition-all duration-300 z-40 flex items-center gap-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Post
            </button>
            <ClientOnlyModal isOpen={isModalOpen()} setIsOpen={setIsModalOpen} />
        </div>
    );
};

export default AddPostButton;