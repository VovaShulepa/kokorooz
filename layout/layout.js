import Image from "next/image";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
        <div className={styles.imgStyle}>
          <h1 className="text-yellow-400 text-4xl font-bold pt-9 flex justify-center items-center">
            <Image
              alt="smile"
              className="mr-2"
              src={"/assets/smile.svg"}
              width={30}
              height={30}
            />{" "}
            Kokorooz
          </h1>
          <h1 className="text-yellow-200 pt-4 text-center text-xl font-bold">
            Знайди свою половинку ❤️ &#128152;
          </h1>

          <div className={styles.cartoonImg}></div>
          <div className={styles.cloud_one}></div>
          <div className={styles.cloud_two}></div>
        </div>
        <div className="right flex flex-col justify-evenly">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
