import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  email: string;
  password: string;
}

export default function WelcomeEmail({
  name,
  email,
  password,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />

      <Preview>Welcome to Alumni Association</Preview>

      <Body>
        <Container>
          <Heading>Welcome, {name}!</Heading>

          <Text>
            Your account has been successfully created.
          </Text>

          <Text>
            Email: {email}
          </Text>

          <Text>
            Password: {password}
          </Text>

          <Text>
            Please change your password after signing in.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}