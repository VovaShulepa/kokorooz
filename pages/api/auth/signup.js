import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  try {
    await connectMongo();

    if (req.method === 'POST') {
      if (!req.body) {
        return res.status(400).json({ error: 'No form data provided.' });
      }

      const { username, email, password } = req.body;

      const checkExisting = await Users.findOne({ email });
      if (checkExisting) {
        console.error('User with this email already exists.');
        return res
          .status(422)
          .json({ message: 'User with this email already exists.' });
      }

      const hashedPassword = await hash(password, 12);
      const newUser = await Users.create({
        username,
        email,
        password: hashedPassword,
      });

      console.log('New user created:', newUser);
      return res.status(201).json({ status: true, user: newUser });
    } else {
      return res
        .status(405)
        .json({ message: 'HTTP method not allowed. Only POST is accepted.' });
    }
  } catch (error) {
    console.error('Error processing registration:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
