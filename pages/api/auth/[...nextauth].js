import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackUrl: "https://my-kokorooz.vercel.app/api/auth/callback/google",
    }),

    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials, req) => {
        try {
          await connectMongo(); // Використовуйте try-catch для обробки помилок підключення

          if (credentials.provider === "google") {
            const googleUser = await fetch(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              {
                headers: {
                  Authorization: `Bearer ${credentials.accessToken}`,
                },
              }
            ).then((res) => res.json());

            const existingUser = await Users.findOne({
              email: googleUser.email,
            });

            if (!existingUser) {
              const newUser = new Users({
                username: googleUser.name,
                email: googleUser.email,
                // інші дані, які ви хочете зберегти
              });
              await newUser.save();
            }
          } else {
            const result = await Users.findOne({ email: credentials.email });
            if (!result) {
              throw new Error("No user found with this email. Please sign up!");
            }

            const checkPassword = await compare(
              credentials.password,
              result.password
            );

            if (!checkPassword || result.email !== credentials.email) {
              throw new Error("Username or Password doesn't match");
            }

            return {
              id: result._id,
              name: result.username,
              email: result.email,
            };
          }
        } catch (error) {
          throw new Error(`Error during authorization: ${error.message}`);
        }
      },
    }),
  ],
  secret: "KGz/8TViRGHntEFFe2ccGK7X1QYfgzhR36LfhLKNeis=",
  session: {
    strategy: "jwt",
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  },
});
