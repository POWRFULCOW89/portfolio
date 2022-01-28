import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Project.module.scss";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Octokit, App } from "octokit";

import ReactMarkdown from "react-markdown";
import { useState } from "react";

interface PageProps {
  project: Project;
  readme: string;
}

const filterArray = (arr: string[], filtered: string[]) => {
  return arr.filter((str) => {
    for (const title of filtered) {
      if (str.includes(title.replaceAll(" ", ""))) return false;
      return true;
    }
  });
};

const removeAndRename = (arr: string[]) => {
  const techs = [
    {
      name: "api",
    },
    {
      name: "grand-theft-auto",
    },
    {
      name: "cli",
    },
    {
      name: "library",
    },
    {
      name: "css",
      rename: "CSS",
    },
    {
      name: "scss",
      rename: "SCSS",
    },
    {
      name: "css3",
      rename: "CSS3",
    },
    {
      name: "typescript",
      rename: "TypeScript",
    },
    {
      name: "jwt",
      rename: "JWT",
    },
    {
      name: "html",
      rename: "HTML",
    },
    {
      name: "html5",
      rename: "HTML5",
    },
    {
      name: "js",
      rename: "JavaScript",
    },
    {
      name: "javascript",
      rename: "JavaScript",
    },
    {
      name: "bootcamp",
    },
    {
      name: "latam",
    },
    {
      name: "programacion",
    },
    {
      name: "espanol",
    },
    {
      name: "webextension",
    },
    {
      name: "react-native",
      rename: "react native",
    },
    {
      name: "discordjs",
      rename: "DiscordJS",
    },
    {
      name: "npm",
      rename: "NPM",
    },
  ];

  let newArr = [...arr];

  techs.forEach((tech) => {
    if (newArr.includes(tech.name)) {
      if (tech?.rename) {
        newArr[newArr.indexOf(tech.name)] = tech.rename;
      } else {
        newArr.splice(newArr.indexOf(tech.name), 1);
      }
    }
  });

  return newArr;
};

const renderProjectType = (topics: string[]) => {
  let projectType = {
    type: "Tool",
    icon: "tools",
  };

  if (topics.includes("cli")) {
    projectType = {
      type: "CLI",
      icon: "terminal",
    };
  } else if (
    topics.includes("css") ||
    topics.includes("html") ||
    topics.includes("react") ||
    topics.includes("netlify")
  )
    projectType = {
      type: "Website",
      icon: "globe",
    };
  else if (topics.includes("library")) {
    projectType = {
      type: "Library",
      icon: "file-code",
    };
  } else if (topics.includes("api")) {
    projectType = {
      type: "API",
      icon: "server",
    };
  } else if (topics.includes("react-native") || topics.includes("flutter")) {
    projectType = {
      type: "Mobile app",
      icon: "mobile-alt",
    };
  } else if (topics.includes("discordjs")) {
    projectType = {
      type: "Bot",
      icon: "robot",
    };
  }

  return (
    <div className={styles.projectType}>
      <i className={`fas fa-${projectType.icon}`}></i>
      <p>&nbsp;{projectType.type}</p>
    </div>
  );
};

const ProjectPage = ({ project, readme }: PageProps) => {
  let {
    name,
    html_url,
    homepage,
    description,
    language,
    topics: oldTopics,
  } = project;

  let width = 1000;
  let height = (width * 9) / 16;

  // Splitting by titles in markdown
  let parsed = readme.split("#").filter((str) => str.length > 0);
  let intro = parsed[0].split("\n").filter((str) => str.length > 0);
  let title = intro[0];
  let fullDescription = intro[1];

  parsed = parsed.map((str) => `#${str}`);

  let rest = parsed.slice(1);
  rest = filterArray(rest, ["Instal", "TODO", "todo"]);

  // Filtering unnecessary info
  let topics = removeAndRename(oldTopics);
  // console.log(parsed);
  // console.log(rest);
  // console.log(fullDescription);
  // console.log(homepage);
  // console.log(topics);

  return (
    <>
      <Head>
        <title>{`${name} - Diego Melo's Portfolio`}</title>
        <meta name="description" content="Some of my portfolio projects" />
      </Head>

      <main className={styles.mainContainer}>
        <h1 className="caret-underscore">
          {title}
          <span>&nbsp;</span>
        </h1>
        <div className={styles.projectsContainer}>
          <Image
            src={`/projects/${name}.png`}
            width={width}
            height={height}
            priority
            alt={`Preview of the ${name} project`}
          />
          <div className={styles.projectIntroContainer}>
            <div className={styles.projectIntro}>
              {renderProjectType(oldTopics)}
              <ReactMarkdown>{fullDescription}</ReactMarkdown>
              {homepage && (
                <a href={homepage} target="_blank" rel="noreferrer">
                  Live link here! <i className="fas fa-link"></i>
                </a>
              )}
            </div>

            <div className={styles.techStack}>
              <h3>Tech stack</h3>
              <div>
                {topics.map((topic) => (
                  <p key={`skill-${topic}`}>{topic}</p>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.projectDescription}>
            <ReactMarkdown>{rest.join("\n")}</ReactMarkdown>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectPage;

interface Project {
  name: string;
  html_url: string;
  homepage: string | null;
  description: string;
  language: string;
  topics: string[];
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getStaticPaths() {
  // let res = await fetch(
  //   "https://api.github.com/users/POWRFULCOW89/repos?per_page=100",
  //   {
  //     headers: {
  //       Authorization: `Basic ${process.env.GITHUB_TOKEN}`,
  //     },
  //   }
  // );

  // let projects = await res.json();
  const { data: projects } = await octokit.request(
    `GET /users/POWRFULCOW89/repos?per_page_100`,
    {
      per_page: 100,
    }
  );

  const paths = projects.map((project: Project) => ({
    params: { project: project.name },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const { data: project } = await octokit.request(
    `GET /repos/POWRFULCOW89/${params.project}`
  );

  const { data: readme } = await octokit.request(
    `GET /repos/POWRFULCOW89/${params.project}/readme`,
    {
      headers: {
        Accept: "application/vnd.github.v3.raw",
      },
    }
  );

  let { name, html_url, homepage, description, language, topics } = project;

  let newProject = {
    name,
    html_url,
    homepage,
    description,
    language,
    topics,
  };

  // Pass project data to the page via props
  return {
    props: { project: newProject, readme },
  };
}
