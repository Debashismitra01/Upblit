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
          <div>
            <h1 className={styles.heading}>Get in Touch</h1>
            <p className={styles.subheading}>
              We’d love to hear your feedback, bug reports, or partnership
              ideas!
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <label>
              Name
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name..."
              />
            </label>

            <label>
              Email
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
              Type
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="feedback">Feedback</option>
                <option value="issue">Report an Issue</option>
                <option value="partnership">Partnership</option>
              </select>
            </label>

            <label>
              Message
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
