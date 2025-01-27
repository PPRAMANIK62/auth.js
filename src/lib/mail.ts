import { env } from "@/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${env.NEXT_PUBLIC_FRONTEND_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email address",
    html: `
      <p>Click the link below to verify your email address:</p>
      <a href="${confirmLink}">Verification Link</a>
    `,
  });
};
