// // Follow this setup guide to integrate the Deno language server with your editor:
// // https://deno.land/manual/getting_started/setup_your_environment
// // This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

const client = new SmtpClient();

serve(async (_req: any) => {
  await client.connectTLS({
    hostname: "smtp.zoho.com",
    port: 465,
    username: "support@itxgear.com",
    password: "Void2412@123",
  });

  await client.send({
    from: "support@itxgear.com",
    to: "truongpham2412.nd@gmail.com",
    subject: "Thank you for signing up",
    content: "We sell the best roadrunner traps in the world!",
  });

  return new Response("ok", { status: 200 });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/send-email-smtp' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
