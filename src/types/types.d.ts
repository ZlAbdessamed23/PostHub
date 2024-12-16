interface RegisteredUser {
    name: string;
    email: string;
    password: string;
}

interface LoggedUser {
    email: string;
    password: string;
}

interface CreatingPost {  // the type where we want to create a post and send it to backend
    title : string;
    description : string;
}

interface CreatedPost {   // the type where we want to get a post from backend
    id : string;
    title : string;
    description : string;
    comments : CreatedComment[];
}

interface CreatingComment {
    content : string;
    postId : string;
}

interface CreatedComment {
    id : string;
    content : string;
    user : string  // user id
}