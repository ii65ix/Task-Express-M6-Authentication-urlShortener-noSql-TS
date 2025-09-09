import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  urls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
    },
  ],
});
export type UserAttrs = mongoose.InferSchemaType<typeof UserSchema>
export type UserDoc = mongoose.HydratedDocument<UserAttrs>
const User = mongoose.model("User", UserSchema);

export default User;
