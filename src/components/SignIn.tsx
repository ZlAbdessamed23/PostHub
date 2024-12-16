import { A, useNavigate } from '@solidjs/router';
import { type Component } from 'solid-js';
import { createForm, requiredValidator, emailValidator } from "solform";
import { login } from '~/utils/utils';

const SignInComponent: Component = () => {
    const navigate = useNavigate();
    const signInForm = createForm<LoggedUser>({
        validators: {
            email: [
                requiredValidator("Email is required"),
                emailValidator("Invalid email format")
            ],
            password: [
                requiredValidator("Password is required")
            ]
        },
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async(values) => {
            console.log(values);
            try{
                const res = await login(values);
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
                    <h1 class="text-5xl font-bold text-cyan-400 mb-6">Login</h1>
                    <p class="text-xl text-gray-300 mb-4">
                        Welcome back to PostHub!
                    </p>
                    <p class="text-md text-slate-400">
                        Continue sharing, connecting, and exploring conversations.
                    </p>
                </div>
                <div class="w-1/2 bg-gray-900 flex flex-col justify-center p-12">
                    <form
                        onSubmit={signInForm.submit}
                        class="space-y-6 animate-float-subtle"
                    >
                        <div class="relative">
                            <input
                                type="email"
                                placeholder="Email"
                                {...signInForm.register('email')}
                                class="w-full rounded-lg py-3 px-4 bg-gray-800 border-b-2 border-cyan-600 text-white focus:outline-none focus:border-cyan-400 transition-all duration-300"
                            />
                            {signInForm.errors.email && (
                                <p class="text-red-500 text-sm mt-1">{signInForm.errors.email}</p>
                            )}
                        </div>
                        <div class="relative">
                            <input
                                type="password"
                                placeholder="Password"
                                {...signInForm.register('password')}
                                class="w-full rounded-lg py-3 px-4 bg-gray-800 border-b-2 border-cyan-600 text-white focus:outline-none focus:border-cyan-400 transition-all duration-300"
                            />
                            {signInForm.errors.password && (
                                <p class="text-red-500 text-sm mt-1">{signInForm.errors.password}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            class="w-full py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sign In
                        </button>

                        <div class="text-center mt-4">
                            <A
                                href="/signup"
                                class="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                            >
                                Don't have an account? Sign Up
                            </A>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInComponent;