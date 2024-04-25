import { NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeTemplate from "@/emails/welcomeTemplate";
import { auth } from "@/auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({
      error: "Can not send email, user not logged in",
    });
  }

  // using testing domain onboarding@resend.dev
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "ekos.sv@gmail.com",
    subject: "Welcome abroad!",
    react: WelcomeTemplate({ name: session?.user.name! }),
  });

  return NextResponse.json({});
}
