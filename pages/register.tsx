import React, { useState } from "react";
import { useRouter } from "next/router";
import { Container, TextInput, Button, Paper, Grid, Col, Text} from "@mantine/core";
import axios from "axios";

interface RegisterResponse {
  created: boolean;
  message: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post<RegisterResponse>("/api/register", {
        username,
        email,
        password,
        isAdmin,
      });
      if (response.data.created) {
        alert("登録成功");
        router.push("/login");
      } else {
        setError(response.data.message);
      }
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <Container>
      <Grid justify="center" style={{ paddingTop: "2rem" }}>
        <Col md={6} lg={6}>
            <Paper p="md" shadow="xs" radius="md">
                <form onSubmit={handleSubmit}>
                <TextInput
                    label="名前"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(event) => setUsername(event.currentTarget.value)}
                    required
                />
                <TextInput
                    label="メールアドレス"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    style={{ marginTop: "1rem" }}
                    required
                />
                <TextInput
                    label="パスワード"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                    style={{ marginTop: "1rem" }}
                    required
                />
                {error && (
                    <Text color="red" size="sm" style={{ marginTop: "0.5rem" }}>
                    {error}
                    </Text>
                )}
                <Button
                    fullWidth
                    type="submit"
                    style={{ marginTop: "1rem" }}
                    radius="md"
                >
                    登録
                </Button>
                </form>
            </Paper>
         </Col>
      </Grid>
    </Container>
  );
};

export default Register;
