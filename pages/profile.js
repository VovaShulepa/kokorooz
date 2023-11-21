import Link from "next/link";
import { getSession } from "next-auth/react";

export default function Profile({ session }) {
  return (
    <section className="container mx-auto text-center">
      <h3 className="text-4xl font-bold">Profile Page</h3>

      {session ? (
        <div>
          <p>Welcome, {session.user.name}!</p>
          <p>Email: {session.user.email}</p>
        </div>
      ) : (
        <p>Please sign in to view your profile.</p>
      )}

      <Link href={"/"}>Home Page</Link>
    </section>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
