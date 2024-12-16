import { createAsync, query } from '@solidjs/router';
import { type Component, For, Show, Suspense } from 'solid-js';
import ClientOnlyButton from '~/components/ClientOnlyButton';
import ClientOnlyCards from '~/components/ClientOnlyCards';
import { getPosts } from '~/utils/utils';

const getPostsForHome = query(async () => {
    "use server";
    const res = await getPosts();
    console.log(res);
    return res;
}, "posts");


const HomePage: Component = () => {
    const posts = createAsync(async () => await getPostsForHome());
    return (
        <div class="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
            <div class="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl mx-auto space-y-6">
                    <Suspense
                        fallback={<div>Loading...</div>}
                    >
                        <For each={posts()?.posts}>
                            {(post) => <ClientOnlyCards post={post} />}
                        </For>
                    </Suspense>
                </div>
                <ClientOnlyButton />
            </div>
            <ClientOnlyButton />
        </div>
    );
};

export default HomePage;