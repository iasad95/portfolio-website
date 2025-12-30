import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, recipientEmail } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simple email sending logic - you can integrate with services like SendGrid, Resend, or Nodemailer
    // For now, this logs the email data (in production, integrate with an email service)
    console.log("Contact form submission:", {
      senderName: name,
      senderEmail: email,
      message,
      recipientEmail,
      timestamp: new Date().toISOString(),
    })

    // TODO: Integrate with email service (SendGrid, Resend, AWS SES, etc.)
    // Example with Resend (uncomment when set up):
    // const response = await resend.emails.send({
    //   from: 'noreply@asadcodes.com',
    //   to: recipientEmail,
    //   replyTo: email,
    //   subject: `New message from ${name}`,
    //   html: `<p>${message}</p><p>From: ${senderEmail}</p>`,
    // })

    return NextResponse.json({ success: true, message: "Email received" }, { status: 200 })
  } catch (error) {
    console.error("Error processing form submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
