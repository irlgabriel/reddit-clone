var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "username already used"],
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    email: {
      type: String,
      unique: [true, "email already used"],
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    password: { type: String, required: [true, "can't be blank"] },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}]
  },
  { timestamps: true }
);

UserSchema.methods.verifyPassword = async function(password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
}

var User = mongoose.model("User", UserSchema);

module.exports = User;
