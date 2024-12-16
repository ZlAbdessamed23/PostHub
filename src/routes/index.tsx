import { A } from '@solidjs/router';
import { type Component } from 'solid-js';

const WelcomePage: Component = () => {
  return (
    <div class="h-screen w-screen flex justify-center items-center bg-gray-950">
      <div class="flex flex-row">
        <div class="w-1/2 flex flex-col justify-center items-center">
          <h1 class='text-5xl font-bold text-cyan-400 text-pretty'>PostHub</h1>
        </div>
        <div class="w-1/2 flex flex-col justify-center">
          <h1 class="text-5xl font-bold text-blue-300">Welcome to PostHub</h1>
          <p class="text-2xl text-gray-400 mt-5">Connect, Share, Engage</p>
          <p class="text-lg text-slate-300 mt-5 w-[28rem]">Discover a vibrant community where ideas flow freely. Share your thoughts, explore diverse perspectives, and engage in meaningful conversations with people from around the world.</p>
          <button class='text-start w-24 h-11 rounded-lg flex justify-center items-center bg-cyan-600 hover:bg-cyan-700 mt-10'>
            <A href='/signup' class=" text-white">Explore</A>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;