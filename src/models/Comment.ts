import { Schema, model, Document } from 'mongoose';

interface IComment extends Document {
  content: string;
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});

const Comment = model<IComment>('Comment', commentSchema);

export default Comment;
