import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  name: string;
  resetUrl: string;
}

export default function ResetPasswordEmail({
  name,
  resetUrl,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Reset your password</Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>
            Reset your password
          </Heading>

          <Text style={styles.text}>
            Hi {name},
          </Text>

          <Text style={styles.text}>
            We received a request to reset the password for your
            account. Click the button below to choose a new password.
          </Text>

          <Section style={styles.buttonSection}>
            <Button href={resetUrl} style={styles.button}>
              Reset Password
            </Button>
          </Section>

          <Text style={styles.text}>
            If you didn&apos;t request a password reset, you can safely
            ignore this email.
          </Text>

          <Text style={styles.footer}>
            This link is only valid for a limited time.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: "40px 0",
  },

  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "40px",
    maxWidth: "560px",
    borderRadius: "8px",
  },

  heading: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#111827",
    margin: "0 0 24px",
  },

  text: {
    fontSize: "15px",
    lineHeight: "24px",
    color: "#374151",
    margin: "0 0 16px",
  },

  buttonSection: {
    margin: "28px 0",
  },

  button: {
    backgroundColor: "#111827",
    color: "#ffffff",
    padding: "12px 20px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
  },

  footer: {
    fontSize: "13px",
    lineHeight: "20px",
    color: "#6b7280",
    marginTop: "24px",
  },
};
