import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

const renderSkills = () => {
  const skills = [
    {
      title: "Languages",
      skills: ["typescript.png", "python.png", "dart.png"],
    },
    {
      title: "Platforms",
      skills: ["heroku.svg", "firebase.svg", "netlify.png"],
    },
    {
      title: "Technologies",
      skills: [
        "react.svg",
        "boot.png",
        // "bulma.png",
        "mongo.svg",
        "flutter.png",
      ],
    },
    {
      title: "Tools",
      skills: ["git.png", "webpack.png"],
    },
  ];

  return skills.map((entry) => (
    <div className={styles.skillCard} key={entry.title}>
      <h3>{entry.title}</h3>
      <div className={styles.skillContainer}>
        {entry.skills.map((skill) => (
          <Image
            key={`skill-${skill}`}
            className={styles.skill}
            src={`/techs/${skill}`}
            width="100"
            height="100"
            priority
          />
        ))}
      </div>
    </div>
  ));
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Diego Melo's Portfolio</title>
        <meta name="description" content="Diego Melo's Portfolio site." />
      </Head>

      <main className={styles.mainContainer}>
        <h1>DIEGO MELO</h1>
        <div className={styles.mainWrapper}>
          <Image src="/coder2.png" width="300" height="300" priority />
          <div className={styles.mainIntro}>
            <h2 className="caret-underscore">
              Full Stack Developer<span>&nbsp;</span>
            </h2>
            <p>
              With over three years of experience creating open source projects;
              I strive for tangible, usable, and meaningful products, as well as
              keeping up with the latest tools and technologies.
            </p>
          </div>
        </div>
        <div className={styles.ctaContainer}>
          <Link href="/contact">Let's talk!</Link>
          <Link href="/portfolio">Explore my work </Link>
        </div>
        <section className={styles.skillsContainer}>
          <h2 className="caret-underscore">
            Skills<span>&nbsp;</span>
          </h2>
          <div className={styles.skills}>{renderSkills()}</div>
        </section>
      </main>
    </div>
  );
};

export default Home;
