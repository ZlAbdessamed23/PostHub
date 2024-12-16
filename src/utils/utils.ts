import { SignJWT } from "jose";
import axios from "axios";

export async function generateToken(user : RegisteredUser) {
    const secret = new TextEncoder().encode(process.env.JWT_KEY);
    const token = await new SignJWT({...user}).setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
    return token;
};


export async function register(user : RegisteredUser) {
    try{
        const res = await axios.post("/api/auth/signup" , user);
        return res.data;
    }
    catch(err:any){
        throw new Error(err.message);
    };
};

export async function login(user : LoggedUser) {
    try{
        const res = await axios.post("/api/auth/signin" , user);
        return res.data;
    }
    catch(err:any){
        throw new Error(err.message);
    };
};

export async function addPost(post : CreatingPost) {
    try{
        const res = await axios.post("/api/post/posts" , post);
        console.log(res.data);
        return res.data;
    }
    catch(err:any){
        console.log(err);
    };
};

export async function addComment(comment : CreatingComment) {
    try{
        const res = await axios.post("/api/comment" , comment);
        return res.data;
    }
    catch(err:any){
        throw new Error(err.message);
    };
};


export async function getPosts() : Promise<{posts : CreatedPost[]}> {
    try {
        const res = await fetch('http://localhost:3000/api/post/posts');
        const data = await res.json();
        return data;
    } catch(err: any) {
        console.error('Error fetching posts:', err);
        throw new Error(err.message);
    }
};

export async function getUserPosts() {
    try{
        const res = await axios.get("/api/post/user");
        return res.data;
    }
    catch(err:any){
        throw new Error(err.message);
    };
};

export async function getPostById(id : string) {
    try{
        const res = await axios.get(`/api/post/${id}`);
        return res.data;
    }
    catch(err:any){
        throw new Error(err.message);
    };
};