
import { useRouter } from 'expo-router';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.content}>
        <Text style={styles.logo}>EDUCA+</Text>

        <View style={styles.buttons}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.primaryButtonText}>ENTRAR</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push('/register')}
          >
            <Text style={styles.secondaryButtonText}>
              CRIAR CONTA
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  content: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
  },

  logo: {
    color: '#03123D',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -2.5,
    marginBottom: 48,
  },

  buttons: {
    width: '100%',
    gap: 14,
  },

  primaryButton: {
    height: 52,
    width: '100%',
    backgroundColor: '#03123D',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },

  secondaryButton: {
    height: 52,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.8,
    borderColor: '#03123D',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: '#03123D',
    fontSize: 18,
    fontWeight: '500',
  },
});
