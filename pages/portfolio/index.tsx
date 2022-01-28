import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Portfolio.module.scss";
import { GetStaticProps } from "next";

interface PortfolioProps {
  projects: any[];
}

import { Octokit } from "octokit";
import Link from "next/link";

const Portfolio = (props: PortfolioProps) => {
  const renderProjects = () => {
    const projects = props.projects;

    // let width = 330;
    let width = 400;
    let height = (width * 9) / 16;

    return projects.map((project) => (
      <div className={styles.project} key={`project-${project.name}`}>
        <div className={styles.projectDetailsMobile}>
          <p className={styles.projectTitle}>{project.name}</p>
          <p>{project.language}</p>
        </div>
        <Link
          href={`/portfolio/${project.name}`}
          aria-label={`Link to the full project site of ${project.name}`}
        >
          <a>
            <Image
              className={styles.projectImage}
              src={`/projects/${project.name}.png`}
              key={`project-${project.name}`}
              width={width}
              height={height}
              priority
              alt={`Preview of the ${project.name} project`}
            />
          </a>
        </Link>
        <div className={styles.projectDetails}>
          <p className={styles.projectTitle}>{project.name}</p>
          <p>{project.language}</p>
          <Link href={`/portfolio/${project.name}`}>Learn more</Link>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Head>
        <title>Diego Melo&apos;s Portfolio</title>
        <meta name="description" content="Some of my portfolio projects" />
      </Head>

      <main className={styles.mainContainer}>
        <h1 className="caret-underscore">
          Portfolio<span>&nbsp;</span>
        </h1>
        <div className={styles.projectsContainer}>{renderProjects()}</div>
      </main>
    </>
  );
};

export default Portfolio;

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const getStaticProps: GetStaticProps = async () => {
  const { data: projects } = await octokit.request(
    `GET /users/POWRFULCOW89/repos?per_page_100`,
    {
      per_page: 100,
    }
  );

  // let res = await fetch(
  //   "https://api.github.com/users/POWRFULCOW89/repos?per_page=100",
  //   {
  //     headers: {
  //       Authorization: `token ${process.env.GITHUB_TOKEN}`,
  //     },
  //   }
  // );

  interface Project {
    name: string;
    html_url: string;
    description: string;
    language: string | null;
    homepage: string | null;
    topics: string[];
    is_template?: boolean | null;
  }

  let newProjects: Project[] = [];

  projects.forEach((project: Project) => {
    let {
      name,
      html_url,
      homepage,
      description,
      language,
      topics,
      is_template,
    } = project;

    if (description && topics.length > 0 && is_template == false) {
      newProjects.push({
        name,
        html_url,
        homepage,
        description,
        language,
        topics,
      });
    }
  });

  return {
    props: {
      projects: newProjects,
    },
  };
};
