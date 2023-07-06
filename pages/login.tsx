import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Paper, Col, TextInput, PasswordInput, Button, Text, Container, Grid } from "@mantine/core";
import { setJwtToken } from "@/stores/ChatActions";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Move to the top page after login
  const router = useRouter();

  // Send request with form data to the API
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });

      // Receive response from the API
      const data = res.data;
      if (data.token) {
        alert("ログイン成功");
        console.log(data.token);
        setJwtToken(data.token);
        router.push("/");
      } else {
        setError(data.message);
      }
    } catch (error: any) {
        setError(error.response.data.message);
        console.error(error);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  return (
    <Container>
      <Grid justify="center" style={{ paddingTop: "2rem" }}>
        <Col md={6} lg={4}>
          <Paper p="md" shadow="xs">
            <form onSubmit={submitHandler}>
              <Text align="center" size="xl" weight={500}>
                ログイン
              </Text>
              <TextInput
                label="メールアドレス"
                placeholder="メールアドレスを入力"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                type="email"
                name="email"
                id="email"
                style={{ marginTop: "1rem" }}
              />
              <PasswordInput
                label="パスワード"
                placeholder="パスワードを入力"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                name="password"
                id="password"
                style={{ marginTop: "1rem" }}
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
                ログイン
              </Button>
            </form>
            <Button
                fullWidth
                type="submit"
                color="gray"
                style={{ marginTop: "1rem" }}
                radius="md"
                onClick={() => router.push("/register")}
              >
                サインアップ
            </Button>
          </Paper>
        </Col>
      </Grid>
    </Container>
  );
};

export default Login;
