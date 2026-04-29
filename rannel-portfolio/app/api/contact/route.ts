import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    } = body;

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
