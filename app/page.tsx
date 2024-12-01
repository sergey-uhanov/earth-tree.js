import Image from "next/image";
import styles from "./page.module.css";
import ThreeDModel from '@/components/ThreeDModel';

export default function Home() {
  return (
    <div className="">
      <ThreeDModel />;
    </div>
  );
}
