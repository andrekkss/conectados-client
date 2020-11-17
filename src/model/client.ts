import { Document, model, Schema } from "mongoose"

const ClientSchema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
  }, { versionKey: false });

export interface IClient extends Document {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}

export interface IClientAuthenticated extends IClient {
    token: string,
}

export default model<IClient>('Client', ClientSchema);
