import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../app/page.module.css';


interface Project {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string[];
  technologies: string[];
}

const ProjectCard: React.FC<{ project: Project; index: number; isVisible: boolean }> = ({ project, index, isVisible }) => (
  <motion.div
    className={styles.projectCard}
    initial={{ opacity: 0, y: 20 }}
    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ delay: index * 0.2 }}
    whileHover={{ scale: 1.02 }}
    style={{ maxWidth: '590px', width: '100%' }}
  >
    <div className={styles.projectContent}>
      <div className={styles.projectHeader}>
        <h2>{project.title}</h2>
        <p>{project.shortDesc}</p>
      </div>
      <div className={styles.projectDetails}>
        <div className={styles.description}>
          {project.longDesc.map((desc, idx) => (
            <p key={idx}>• {desc}</p>
          ))}
        </div>
        <div className={styles.technologies}>
          {project.technologies.map((tech, idx) => (
            <span key={idx} className={styles.technology}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const [visibleProjects, setVisibleProjects] = useState<boolean[]>(Array(7).fill(false));
  const projects: Project[] = [
    {
      id: 1,
      title: "Technical Consultant Intern",
      shortDesc: "Alfa Financial Systems London",
      longDesc: [
        "Selected as 1 of 9 interns in meetings focused on asset finance and gaining hands-on experience in the industry.",
        "Consulted on improving financial software (Alfa Systems) for third-party clients, developing a comprehensive website using the Next.js framework and TypeScript based on stakeholder feedback.",
        "Created an Effective Development Document (EDD) to guide project adjustments and successfully presented the project to stakeholders, resulting in first place recognition among competing teams."
      ],
      technologies: ["Next.js", "TypeScript"]
    },
    {
      id: 2,
      title: "Spring Insight",
      shortDesc: "Morgan Stanley London",
      longDesc: [
        "Participated in a Morgan Stanley-hosted coding challenge, gaining insights into trading strategies and simulating the impact of Brexit on the Pound-Euro pair.",
        "Collaborated with a team to maximize profits while maintaining portfolio balance, achieving a turnaround from last place to 4/80 participants.",
        "Awarded a one-on-one mentorship with a Morgan Stanley technology professional for outstanding performance."
      ],
      technologies: ["Trading Strategies", "Mentorship"]
    },
    {
      id: 3,
      title: "Spring Insight",
      shortDesc: "Willis Tower Watson Manchester",
      longDesc: [
        "Selected 1 out of 32 to attend the event.",
        "Networked with different LoB within WTW and understanding the industrial use of .NET, SQL and TypeScript."
      ],
      technologies: [".NET", "SQL", "TypeScript"]
    },
    {
      id: 4,
      title: "BNY Mellon Cyber Security Challenge",
      shortDesc: "April 2024",
      longDesc: [
        "Participated in a BNY Challenge Day, focusing on a workshop where a fake scenario involved a startup experiencing a data breach and then being held ransom.",
        "Assumed the role of Head of Communications within the group, developed and shared strategies on public and internal communication concerning the breach.",
        "Delivered a presentation on our communication strategy to multiple groups and won for the best strategy."
      ],
      technologies: ["Cyber Security", "Communication"]
    },
    {
      id: 5,
      title: "Auto-Trader Hackathon – Python",
      shortDesc: "March 2024",
      longDesc: [
        "Challenged to predict how long cars would sell on AutoTrader using previous data with 42 categories.",
        "Used previous data on starting and final asking price to then use a multiplier to predict final asking prices of other cars and used other methods for data that was missing.",
        "Presented the project to a board of judges and ranked 2nd place among the other competitors."
      ],
      technologies: ["Python", "Data Analysis"]
    },
    {
      id: 6,
      title: "MU0 Processor & FPGA Board Instrument – Verilog & MU0 Assembly",
      shortDesc: "December 2023",
      longDesc: [
        "Produced a MU0 processor that included ALU, Registers, Datapath and functional commands such as store & sub.",
        "Used the MU0 processor, MU0 assembly and Verilog to then add peripherals a keypad, speakers and a display to then create an instrument that would play at 10 different notes."
      ],
      technologies: ["Verilog", "MU0 Assembly"]
    },
    {
      id: 7,
      title: "S&P 500 Stock Indicator – Python",
      shortDesc: "",
      longDesc: [
        "Developed a predictive model for stock market movement using Random Forest Classifier.",
        "Preprocessed historical data, removing irrelevant features and engineering target variables.",
        "Conducted iterative backtesting to refine model performance and achieved 0.57 precision score."
      ],
      technologies: ["Python", "Random Forest Classifier"]
    }
  ];
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (index >= 0 && index < projects.length && index < visibleProjects.length) {
            if (entry.isIntersecting) {
              setVisibleProjects((prev) => {
                const newVisibleProjects = [...prev];
                newVisibleProjects[index] = true;
                return newVisibleProjects;
              });
            } else {
              setVisibleProjects((prev) => {
                const newVisibleProjects = [...prev];
                newVisibleProjects[index] = false;
                return newVisibleProjects;
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectElements = projectsRef.current?.querySelectorAll(`.${styles.projectCard}`);
    projectElements?.forEach((element, index) => {
      if (element) {
        element.setAttribute('data-index', index.toString());
        observer.current?.observe(element);
      }
    });

    return () => {
      projectElements?.forEach((element) => {
        observer.current?.unobserve(element);
      });
    };
  }, [projects.length]);

  useEffect(() => {
    return () => {
      const projectElements = projectsRef.current?.querySelectorAll(`.${styles.projectCard}`);
      projectElements?.forEach((element) => {
        observer.current?.unobserve(element);
      });
    };
  }, []);

  return (
    <div className={styles.projectsWrapper}>
      <div ref={projectsRef} className={styles.projectsContainer}>
        <motion.h1
          className={styles.projectsTitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Projects & Experiences
        </motion.h1>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isVisible={visibleProjects[index]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;

