"use client"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import styles from "./page.module.css";
import Index from "../components/index";
import Projects from "../components/projects";
// import MainProject from "@/components/mainproject";

export default function Home() {
    useEffect( () => {
      (
        async () => {
          const Locomotivescroll = (await import('locomotive-scroll')).default;
          const locomotiveScroll = new Locomotivescroll();
        }
      )()

    },[])

    return( 
    <main className={styles.main}>
      <Index/>
      {/* <MainProject/> */}
      <Projects/>
    </main>
    )
}