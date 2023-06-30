import { Inter } from "next/font/google";
import Login from "../Components/Organism/Auth/Login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Login />;
  // return <Register />;
}
