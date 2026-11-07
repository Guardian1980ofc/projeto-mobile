import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default function LoginScreen() {
  const router = useRouter();

  // Utilizando State conforme pedido pelo professor
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }
    // Navega para a tela de catálogo/home após login
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Educa+</Text>
      <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>

      <Input
        label="E-mail"
        placeholder="digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        label="Senha"
        placeholder="digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Entrar" onPress={handleLogin} />

      <Button
        title="Criar Conta"
        variant="secondary"
        onPress={() => router.push('/register')}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
});