import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default function RegisterScreen() {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cursoInteresse, setCursoInteresse] = useState('');

  const handleRegister = () => {
    if (!nome || !email || !senha) {
      alert('Por favor, preencha os campos obrigatórios!');
      return;
    }

    router.push('/home' as any);
  };

  if (!isClient) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Educa+</Text>
      <Text style={styles.subtitle}>Crie sua conta para começar a aprender</Text>

      <Input
        label="Nome Completo"
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Input
        label="E-mail"
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        label="Senha"
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Input
        label="Área de Interesse (Ex: TI, Design)"
        placeholder="Qual curso você procura?"
        value={cursoInteresse}
        onChangeText={setCursoInteresse}
      />

      <Button title="Cadastrar" onPress={handleRegister} />

      <Button
        title="Já tenho uma conta (Entrar)"
        variant="secondary"
        onPress={() => router.push('/login' as any)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
});