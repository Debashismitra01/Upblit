import { Resend } from "resend";

export default async function sendEmail(emails, subject, html) {

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing in environment variables");
  }

  const resend = new Resend(apiKey);

  try {
    const response = await resend.emails.send({
      from: "Debashis Mitra <debashis.mitra@upblit.dev>",
      to: emails,
      subject,
      html,
    });

    console.log("EMAIL SENT:", response);
    return response;

  } catch (error) {
    console.error("RESEND ERROR:", error);
    throw error;
  }
}
