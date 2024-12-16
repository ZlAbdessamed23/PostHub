import { Schema, model, Document } from 'mongoose';

interface IPost extends Document {
  title: string;
  description: string;
  user: Schema.Types.ObjectId;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Post = model<IPost>('Post', postSchema);

export default Post;
