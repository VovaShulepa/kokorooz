import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

// Перевірка, чи модель 'user' вже існує в models
const Users = models.user ? models.user : model("user", userSchema);

export default Users;
