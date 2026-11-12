
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from '../components/Input';
import { SocialLinks } from '../components/SocialLinks';

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

const isValidPassword = (password: string) =>
  /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function RegisterScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const compact = width < 380;

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [professor, setProfessor] = useState(false);

  const handleRegister = () => {
    if (!nome.trim()) {
      Alert.alert('Nome obrigatório', 'Digite seu nome.');
      return;
    }

    const phoneDigits = telefone.replace(/\D/g, '');

    if (phoneDigits.length !== 10 && phoneDigits.length !== 11) {
      Alert.alert(
        'Telefone inválido',
        'Digite um telefone com DDD e número completo.'
      );
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('E-mail inválido', 'Digite um e-mail válido.');
      return;
    }

    if (!isValidPassword(senha)) {
      Alert.alert(
        'Senha inválida',
        'A senha deve ter pelo menos 8 caracteres, incluindo letras e números.'
      );
      return;
    }

    router.replace({
      pathname: '/home',
      params: { role: professor ? 'professor' : 'student' },
    } as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#03123D" />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={[styles.logo, compact && styles.logoCompact]}>
                EDUCA+
              </Text>

              <Text style={styles.headerSubtitle}>
                Crie sua conta e comece a aprender.
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.heading}>CRIAR CONTA</Text>

              <View style={styles.form}>
                <Input
                  label="Nome completo"
                  placeholder="Digite seu nome"
                  autoCapitalize="words"
                  value={nome}
                  onChangeText={setNome}
                  style={styles.input}
                />

                <Input
                  label="Telefone"
                  placeholder="(00) 00000-0000"
                  keyboardType="phone-pad"
                  value={telefone}
                  onChangeText={(value) => setTelefone(formatPhone(value))}
                  style={styles.input}
                />

                <Input
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                />

                <View style={styles.passwordContainer}>
                  <Text style={styles.label}>Senha</Text>

                  <View style={styles.passwordBox}>
                    <Input
                      label=""
                      placeholder="Crie uma senha"
                      secureTextEntry={!mostrarSenha}
                      autoCapitalize="none"
                      value={senha}
                      onChangeText={setSenha}
                      style={styles.passwordInput}
                    />

                    <Pressable
                      style={styles.eyeButton}
                      onPress={() => setMostrarSenha(!mostrarSenha)}
                      accessibilityRole="button"
                      accessibilityLabel={
                        mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'
                      }
                    >
                      <Ionicons
                        name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                        size={23}
                        color="#03123D"
                      />
                    </Pressable>
                  </View>

                  <Text style={styles.passwordHint}>
                    Mínimo de 8 caracteres, com letras e números.
                  </Text>
                </View>

                <Pressable
                  style={styles.checkboxArea}
                  onPress={() => setProfessor(!professor)}
                >
                  <View style={[
                    styles.checkbox,
                    professor && styles.checkboxChecked,
                  ]}>
                    {professor && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </View>

                  <Text style={styles.checkboxText}>Sou professor</Text>
                </Pressable>

                <Pressable
                  style={styles.primaryButton}
                  onPress={handleRegister}
                >
                  <Text style={styles.primaryButtonText}>
                    CADASTRAR-SE
                  </Text>
                </Pressable>

                <View style={styles.accountArea}>
                  <Text style={styles.accountText}>
                    Já tem uma conta?
                  </Text>

                  <Pressable
                    style={styles.outlineButton}
                    onPress={() => router.replace('/login' as any)}
                  >
                    <Text style={styles.outlineButtonText}>ENTRAR</Text>
                  </Pressable>
                </View>

                <SocialLinks />
              </View>
            </View>

            <Pressable
              onPress={() => router.replace('/')}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={17} color="#FFFFFF" />
              <Text style={styles.backText}>Voltar ao início</Text>
            </Pressable>
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
  keyboard: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -2,
  },
  logoCompact: {
    fontSize: 35,
  },
  headerSubtitle: {
    color: '#DCE4F5',
    fontSize: 13,
    marginTop: 5,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  heading: {
    color: '#03123D',
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 25,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 52,
    backgroundColor: '#F3F5F9',
    borderColor: '#DDE2EC',
    borderRadius: 12,
    fontSize: 16,
    color: '#03123D',
  },
  passwordContainer: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#03123D',
    marginBottom: 6,
  },
  passwordBox: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    height: 52,
    paddingRight: 52,
    backgroundColor: '#F3F5F9',
    borderColor: '#DDE2EC',
    borderRadius: 12,
    fontSize: 16,
    color: '#03123D',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: 48,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordHint: {
    fontSize: 11,
    color: '#69758B',
    marginTop: 6,
  },
  checkboxArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    minHeight: 42,
    marginBottom: 18,
  },
  checkbox: {
    width: 23,
    height: 23,
    borderWidth: 1.5,
    borderColor: '#03123D',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#03123D',
  },
  checkboxText: {
    color: '#03123D',
    fontSize: 15,
  },
  primaryButton: {
    width: '100%',
    minHeight: 54,
    borderRadius: 13,
    backgroundColor: '#03123D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  accountArea: {
    alignItems: 'center',
    marginTop: 20,
  },
  accountText: {
    fontSize: 14,
    color: '#526078',
    marginBottom: 12,
  },
  outlineButton: {
    width: '100%',
    minHeight: 48,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#03123D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButtonText: {
    color: '#03123D',
    fontWeight: '700',
    fontSize: 14,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginTop: 22,
    padding: 10,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 13,
  },
});
