
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../components/Input';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleRecovery = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      Alert.alert('E-mail inválido', 'Digite um e-mail válido.');
      return;
    }

    Alert.alert(
      'Solicitação recebida',
      'A recuperação de senha será implementada em uma próxima etapa.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.logo}>EDUCA+</Text>

            <View style={styles.card}>
              <Ionicons
                name="lock-open-outline"
                size={48}
                color="#03123D"
              />

              <Text style={styles.title}>Recuperar senha</Text>

              <Text style={styles.description}>
                Informe seu e-mail para iniciar a recuperação da sua conta.
              </Text>

              <Input
                label="E-mail"
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />

              <Pressable
                style={styles.button}
                onPress={handleRecovery}
              >
                <Text style={styles.buttonText}>CONTINUAR</Text>
              </Pressable>

              <Pressable
                onPress={() => router.back()}
                style={styles.back}
              >
                <Text style={styles.backText}>Voltar ao login</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#03123D',
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    padding: 18,
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 28,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#03123D',
    marginTop: 15,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#667085',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 21,
  },
  input: {
    height: 52,
    backgroundColor: '#F3F5F9',
    borderColor: '#DDE2EC',
    borderRadius: 12,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 54,
    backgroundColor: '#03123D',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  back: {
    marginTop: 22,
    padding: 10,
  },
  backText: {
    color: '#03123D',
    fontWeight: '600',
  },
});
