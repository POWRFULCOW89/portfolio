import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Contact.module.scss";
import { useState } from "react";

import { useFormik } from "formik";

const Contact: NextPage = () => {
  const [emailResponse, setEmailResponse] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      subject: "",
      name: "",
      message: "",
    },
    onSubmit: async (values) => {
      setEmailResponse(null);
      setLoading(true);
      await new Promise((r) => setTimeout(r, 3000));
      let content = await fetch("/api/mail", {
        method: "POST",
        body: JSON.stringify(values),
      });
      setLoading(false);
      setEmailResponse(content.status);
    },
  });

  return (
    <>
      <Head>
        <title>Diego Melo's Portfolio - Contact</title>
        <meta
          name="description"
          content="Get in touch and let's get down to business!"
        />
      </Head>

      <main className={styles.mainContainer}>
        <h1 className="caret-underscore">
          Contact<span>&nbsp;</span>
        </h1>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <label htmlFor="name">Name</label>
          <input
            required
            id="name"
            name="name"
            type="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <label htmlFor="email">Email</label>
          <input
            required
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <label htmlFor="subject">Subject</label>
          <input
            required
            id="subject"
            name="subject"
            type="subject"
            onChange={formik.handleChange}
            value={formik.values.subject}
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            // type="message"
            // contentEditable
            // minLength={100}
            onChange={formik.handleChange}
            value={formik.values.message}
          />

          {/* <AutoTextArea
            id="message"
            name="message"
            onChange={formik.handleChange}
            value={formik.values.message}
          /> */}

          <button type="submit">
            {loading ? (
              <i className={`${styles.spinner} fas fa-spinner`} style={{}}></i>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        {emailResponse === 200 && (
          <div className={styles.success}>Email sent succesfully!</div>
        )}
        {emailResponse === 400 && (
          <div className={styles.error}>
            There was an error sending the email.
          </div>
        )}
        {emailResponse === 500 && (
          <div className={styles.error}>
            There was an error sending the email. Please try again later.
          </div>
        )}
      </main>
    </>
  );
};

export default Contact;
