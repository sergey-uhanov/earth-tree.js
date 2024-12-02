import Image from "next/image";
import styles from "./page.module.css";
import ThreeDModel from '@/components/ThreeDModel';
import Stars from '@/components/Stars';

export default function Home() {
  return (
    <div className="">
      <Stars/>
      <ThreeDModel />;
    </div>
  );
}
