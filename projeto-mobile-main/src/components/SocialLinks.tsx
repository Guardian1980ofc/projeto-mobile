
import {
    Linking,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const socialApps = [
  {
    name: 'WhatsApp',
    scheme: 'whatsapp://send',
    androidId: 'com.whatsapp',
    iosId: '310633997',
    color: '#25D366',
    icon: 'logo-whatsapp',
  },
  {
    name: 'Facebook',
    scheme: 'fb://',
    androidId: 'com.facebook.katana',
    iosId: '284882215',
    color: '#1877F2',
    icon: 'logo-facebook',
  },
  {
    name: 'X',
    scheme: 'twitter://',
    androidId: 'com.twitter.android',
    iosId: '333903271',
    color: '#111111',
    icon: '',
  },
  {
    name: 'Instagram',
    scheme: 'instagram://',
    androidId: 'com.instagram.android',
    iosId: '389801252',
    color: '#E4405F',
    icon: 'logo-instagram',
  },
];

async function openSocialApp(app: typeof socialApps[number]) {
  const storeUrl =
    Platform.OS === 'ios'
      ? `https://apps.apple.com/app/id${app.iosId}`
      : `https://play.google.com/store/apps/details?id=${app.androidId}`;

  try {
    const supported = await Linking.canOpenURL(app.scheme);

    if (supported) {
      await Linking.openURL(app.scheme);
      return;
    }
  } catch {
    // Continua para a loja caso não consiga abrir o aplicativo.
  }

  try {
    await Linking.openURL(storeUrl);
  } catch {
    console.log('Não foi possível abrir o aplicativo ou a loja.');
  }
}

export function SocialLinks() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nossas Redes Sociais</Text>

      <View style={styles.icons}>
        {socialApps.map((app) => (
          <Pressable
            key={app.name}
            style={({ pressed }) => [
              styles.socialButton,
              { backgroundColor: app.color },
              pressed && styles.pressed,
            ]}
            onPress={() => openSocialApp(app)}
            accessibilityRole="button"
            accessibilityLabel={`Abrir ${app.name}`}
          >
            {app.name === 'X' ? (
              <Text style={styles.xIcon}>𝕏</Text>
            ) : (
              <Ionicons
                name={app.icon as any}
                size={23}
                color="#FFFFFF"
              />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 28,
  },
  title: {
    fontSize: 19,
    color: '#03123D',
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  icons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    flexWrap: 'wrap',
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  xIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.94 }],
  },
});
