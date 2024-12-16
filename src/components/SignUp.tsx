import { A, useNavigate } from '@solidjs/router';
import { type Component } from 'solid-js';
import { createForm, requiredValidator, emailValidator, minLengthValidator } from "solform";
import { register } from '~/utils/utils';

const SignUpComponent: Component = () => {
    const navigate = useNavigate();
    const signUpForm = createForm<RegisteredUser>({
        validators: {
            name: [
                requiredValidator("Name is required"),
                minLengthValidator(2, "Name must be at least 2 characters")
            ],
            email: [
                requiredValidator("Email is required"),
                emailValidator("Invalid email format")
            ],
            password: [
                requiredValidator("Password is required"),
                minLengthValidator(6, "Password must be at least 6 characters")
            ]
        },
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        onSubmit: async(values) => {
            console.log(values);
            try{
                const res = await register(values);
                console.log(res);
                if(res){
                    navigate("/main");
                };
            }
            catch(err : any){
                console.log(err.message);
            };
        }
    });

    return (
        <div class="h-screen w-screen flex justify-center items-center bg-gray-950">
            <div class="flex flex-row w-3/4 max-w-4xl shadow-2xl rounded-xl overflow-hidden animate-float">
                <div class="w-1/2 bg-cyan-900/30 flex flex-col justify-center p-12">
                    <h1 class="text-5xl font-bold text-cyan-400 mb-6">Sign Up</h1>
                    <p class="text-xl text-gray-300 mb-4">
                        Create your PostHub account and join our vibrant community.
                    </p>
                    <p class="text-md text-slate-400">
                        Share your thoughts, connect with others, and explore exciting conversations.
                    </p>
                </div>
                <div class="w-1/2 bg-gray-900 flex flex-col justify-center p-12">
                    <form
                        onSubmit={signUpForm.submit}
                        class="space-y-6 animate-float-subtle"
                    >
                        <div class="relative">
                            <input
                                type="text"
                                placeholder="Name"
                                {...signUpForm.register('name')}
                                class="w-full rounded-lg py-3 px-4 bg-gray-800 border-b-2 border-cyan-600 text-white focus:outline-none focus:border-cyan-400 transition-all duration-300"
                            />
                            {signUpForm.errors.name && (
                                <p class="text-red-500 text-sm mt-1">{signUpForm.errors.name}</p>
                            )}
                        </div>
                        <div class="relative">
                            <input
                                type="email"
                                placeholder="Email"
                                {...signUpForm.register('email')}
                                class="w-full rounded-lg py-3 px-4 bg-gray-800 border-b-2 border-cyan-600 text-white focus:outline-none focus:border-cyan-400 transition-all duration-300"
                            />
                            {signUpForm.errors.email && (
                                <p class="text-red-500 text-sm mt-1">{signUpForm.errors.email}</p>
                            )}
                        </div>
                        <div class="relative">
                            <input
                                type="password"
                                placeholder="Password"
                                {...signUpForm.register('password')}
                                class="w-full rounded-lg py-3 px-4 bg-gray-800 border-b-2 border-cyan-600 text-white focus:outline-none focus:border-cyan-400 transition-all duration-300"
                            />
                            {signUpForm.errors.password && (
                                <p class="text-red-500 text-sm mt-1">{signUpForm.errors.password}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            class="w-full py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sign Up
                        </button>

                        <div class="text-center mt-4">
                            <A
                                href="/signin"
                                class="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                            >
                                Already have an account? Sign In
                            </A>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpComponent;