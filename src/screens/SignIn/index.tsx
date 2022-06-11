import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import logoImg from "../../assets/logo.png";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Content,
  Title,
  Logo,
  ForgotPasswordLabel,
  ForgotPasswordButton,
} from "./styles";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, sendForgotPasswordEmail, isLogging } = useAuth();

  function handleSignIn() {
    signIn(email, password);
  }

  function handleSendForgotPasswordEmail() {
    sendForgotPasswordEmail(email);
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <Logo source={logoImg} />
          <Title>Login</Title>
          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            placeholder="Senha"
            type="secondary"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <ForgotPasswordButton onPress={handleSendForgotPasswordEmail}>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            title="Entrar"
            type="secondary"
            onPress={handleSignIn}
            isLoading={isLogging}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
