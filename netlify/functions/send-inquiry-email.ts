import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: Request) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    const {
      inquiryId,
      team_slug,
      company_name,
      contact_person,
      email,
      message,
      consent,
    } = body;

    const toEmail = process.env.NOTIFICATION_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const data = await resend.emails.send({
      from: fromEmail,
      to: [toEmail as string],
      subject: `[AI-WEB-2026] ${team_slug}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Inquiry ID:</strong> ${inquiryId}</p>
        <p><strong>Team Slug:</strong> ${team_slug}</p>
        <p><strong>Source:</strong> ai-web-2026</p>
        <hr />
        <p><strong>Company Name:</strong> ${company_name}</p>
        <p><strong>Contact Person:</strong> ${contact_person}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Consent:</strong> ${consent ? "Yes" : "No"}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email send failed:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};