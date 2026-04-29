import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      availableTime,
      projectName,
      frontendTech,
      backendTech,
      databaseTech,
      authMethod,
      coreFeatures,
      securityCompliance,
      deploymentTarget,
      description,
      captchaToken,
    } = body;

    // Verify reCAPTCHA
    if (!captchaToken) {
      return NextResponse.json({ error: "reCAPTCHA token missing" }, { status: 400 });
    }

    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${captchaToken}`,
    });

    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Rannel Portfolio <onboarding@resend.dev>",
      to: ["jenelesteron01@gmail.com"],
      subject: `[Rannel] Project Inquiry: ${projectName}`,
      html: `
        <h2>Rannel - Project Inquiry</h2>
        <p><strong>User Email:</strong> ${email}</p>
        <p><strong>Available Time:</strong> ${availableTime}</p>
        <hr/>
        <p><strong>Project Name:</strong> ${projectName}</p>
        <p><strong>Frontend Tech:</strong> ${frontendTech || "Not specified"}</p>
        <p><strong>Backend Tech:</strong> ${backendTech || "Not specified"}</p>
        <p><strong>Database Tech:</strong> ${databaseTech || "Not specified"}</p>
        <p><strong>Auth Method:</strong> ${authMethod || "Not specified"}</p>
        <p><strong>Core Features:</strong> ${coreFeatures || "Not specified"}</p>
        <p><strong>Security Compliance:</strong> ${securityCompliance || "Standard OWASP Top 10"}</p>
        <p><strong>Deployment Target:</strong> ${deploymentTarget || "Not specified"}</p>
        <p><strong>Additional Details:</strong> ${description || "None"}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
