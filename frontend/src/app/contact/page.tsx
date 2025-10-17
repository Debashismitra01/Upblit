"use client";

import { useState } from "react";
import styles from "./contact.module.css";
import BG from "../component/background/background";
import Navbar from "../component/navbar/navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "feedback",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // FUTURE: Backend Connection to confirm if feedback is sent
  };

  return (
    <>
      <BG />
      <Navbar />
      <section className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.copy}>
            <h1 className={styles.title}>Contact Us</h1>
            <div className={styles.subheading}>
              <p className={styles.subheadingText}>Let us build something</p>
              <p className={styles.subheadingHighlight}>great together!</p>
            </div>
            <p className={styles.subtitle}>
              Connect with the Upblit team. Share your feedback, report an
              issue, or explore partnership opportunities to help shape the
              future of seamless deployment.
            </p>

            <a
              className={styles.emailButton}
              href="mailto:someone@example.com"
            >
              <svg
                className={styles.eamilIcon}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
              </svg>
              contact@upblit.dev
            </a>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              Name*
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name..."
              />
            </label>

            <label>
              Email*
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email address..."
              />
            </label>

            <label>
              Type*
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="feedback">Feedback</option>
                <option value="issue">Report an Issue</option>
                <option value="partnership">Partnership</option>
              </select>
            </label>

            <label>
              Message*
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us what’s on your mind..."
              />
            </label>

            <button
              type="submit"
              disabled={status === "loading"}
              className={styles.button}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className={styles.success}>
                Your message has been sent successfully!
              </p>
            )}

            {status === "error" && (
              <p className={styles.error}>Something went wrong. Try again.</p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
