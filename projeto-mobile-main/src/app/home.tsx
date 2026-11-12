
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Tab = 'home' | 'professor' | 'activities' | 'profile';

export default function HomeScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();
  const { width } = useWindowDimensions();

  const isProfessor = role === 'professor';
  const compact = width < 380;

  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [menuVisible, setMenuVisible] = useState(false);
  const [accessVisible, setAccessVisible] = useState(false);

  const handleTabPress = (tab: Tab) => {
    if (tab === 'professor' && !isProfessor) {
      setAccessVisible(true);
      return;
    }

    setActiveTab(tab);
  };

  const renderPlaceholder = (title: string, description: string) => (
    <View style={styles.placeholder}>
      <Ionicons
        name="construct-outline"
        size={48}
        color="#8FA7D8"
      />
      <Text style={styles.placeholderTitle}>{title}</Text>
      <Text style={styles.placeholderDescription}>
        {description}
      </Text>
    </View>
  );

  const renderHome = () => (
    <>
      <Text style={styles.sectionTitle}>Olá, seja bem-vindo!</Text>
      <Text style={styles.sectionSubtitle}>
        Sua jornada de aprendizado começa aqui.
      </Text>

      {/* Card de cursos */}
      <Pressable style={styles.courseCard}>
        <View style={styles.cardContent}>
          <Text style={styles.courseTitle}>CURSOS</Text>
          <Text style={styles.cardDescription}>
            Descubra novos conhecimentos e desenvolva suas habilidades.
          </Text>
          <View style={styles.cardIcon}>
            <Ionicons
              name="school"
              size={compact ? 42 : 55}
              color="#FFFFFF"
            />
          </View>
        </View>
      </Pressable>

      {/* Card da jornada */}
      <Pressable style={styles.journeyCard}>
        <View style={styles.journeyContent}>
          <Text style={styles.journeyTitle}>
            SUA{'\n'}JORNADA
          </Text>
          <Text style={styles.journeyDescription}>
            Continue evoluindo e conquiste seus objetivos!
          </Text>
          <Ionicons
            name="walk-outline"
            size={compact ? 48 : 58}
            color="#03123D"
          />
        </View>
      </Pressable>

      {/* Área preparada para novos conteúdos */}
      <View style={styles.extraSection}>
        <Text style={styles.sectionTitle}>Continue aprendendo</Text>

        <View style={styles.infoCard}>
          <Ionicons name="trophy-outline" size={30} color="#03123D" />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Ranking</Text>
            <Text style={styles.infoDescription}>
              Em breve você poderá acompanhar sua evolução.
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="star-outline" size={30} color="#03123D" />
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Suas conquistas</Text>
            <Text style={styles.infoDescription}>
              Complete atividades e acumule pontos.
            </Text>
          </View>
        </View>
      </View>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHome();

      case 'professor':
        return renderPlaceholder(
          'Área do Professor',
          'Em breve você terá acesso às ferramentas de ensino.'
        );

      case 'activities':
        return renderPlaceholder(
          'Atividades',
          'Aqui ficarão os desafios, exercícios e atividades para ganhar pontos.'
        );

      case 'profile':
        return renderPlaceholder(
          'Meu Perfil',
          'Aqui ficarão suas informações, conquistas e configurações.'
        );

      default:
        return renderHome();
    }
  };

  const tabs: {
    key: Tab;
    outline: keyof typeof Ionicons.glyphMap;
    filled: keyof typeof Ionicons.glyphMap;
    label: string;
  }[] = [
    {
      key: 'home',
      outline: 'home-outline',
      filled: 'home',
      label: 'Início',
    },
    {
      key: 'professor',
      outline: 'school-outline',
      filled: 'school',
      label: 'Professor',
    },
    {
      key: 'activities',
      outline: 'book-outline',
      filled: 'book',
      label: 'Atividades',
    },
    {
      key: 'profile',
      outline: 'person-circle-outline',
      filled: 'person-circle',
      label: 'Perfil',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#101010" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.headerSide} />

        <Text style={styles.logo}>EDUCA+</Text>

        <Pressable
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
          accessibilityRole="button"
          accessibilityLabel="Abrir menu"
        >
          <Ionicons name="menu" size={34} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {renderContent()}
        </View>
      </ScrollView>

      {/* Navegação inferior fixa */}
      <View style={styles.bottomBar}>
        {tabs.map((tab) => {
          const selected = activeTab === tab.key;

          return (
            <Pressable
              key={tab.key}
              style={styles.tabButton}
              onPress={() => handleTabPress(tab.key)}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              accessibilityState={{ selected }}
            >
              <Ionicons
                name={selected ? tab.filled : tab.outline}
                size={compact ? 30 : 35}
                color="#FFFFFF"
              />
            </Pressable>
          );
        })}
      </View>

      {/* Menu lateral */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalBackground}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setMenuVisible(false)}
          />

          <View style={styles.drawer}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>EDUCA+</Text>

              <Pressable onPress={() => setMenuVisible(false)}>
                <Ionicons name="close" size={28} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.drawerContent}>
              <Text style={styles.drawerMessage}>
                Menu lateral
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Aviso de acesso para estudantes */}
      <Modal
        visible={accessVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAccessVisible(false)}
      >
        <View style={styles.accessOverlay}>
          <View style={styles.accessCard}>
            <Ionicons
              name="lock-closed-outline"
              size={46}
              color="#03123D"
            />

            <Text style={styles.accessTitle}>Acesso restrito</Text>

            <Text style={styles.accessDescription}>
              Esta área é exclusiva para professores.
              Sua conta de estudante não possui permissão para acessar
              esta opção.
            </Text>

            <Pressable
              style={styles.accessButton}
              onPress={() => setAccessVisible(false)}
            >
              <Text style={styles.accessButtonText}>ENTENDI</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101010',
  },

  header: {
    height: 66,
    backgroundColor: '#101010',
    borderBottomWidth: 1,
    borderBottomColor: '#777777',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  headerSide: {
    width: 40,
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: '900',
    letterSpacing: -1.5,
  },

  menuButton: {
    width: 40,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  content: {
    width: '100%',
    maxWidth: 650,
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingTop: 28,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: '#B8B8B8',
    marginBottom: 24,
  },

  courseCard: {
    width: '100%',
    minHeight: 185,
    backgroundColor: '#03123D',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 35,
    overflow: 'hidden',
    justifyContent: 'center',
    marginBottom: 35,
  },

  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  courseTitle: {
    fontSize: 25,
    color: '#FFFFFF',
    fontWeight: '800',
  },

  cardDescription: {
    fontSize: 12,
    color: '#DCE4F5',
    maxWidth: '60%',
    marginTop: 8,
    lineHeight: 18,
  },

  cardIcon: {
    position: 'absolute',
    right: 24,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },

  journeyCard: {
    width: '100%',
    minHeight: 185,
    backgroundColor: '#DCE7D6',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 35,
    overflow: 'hidden',
    justifyContent: 'center',
    marginBottom: 35,
  },

  journeyContent: {
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  journeyTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: '#03123D',
  },

  journeyDescription: {
    fontSize: 12,
    color: '#263B57',
    maxWidth: '65%',
    marginTop: 8,
    marginBottom: 12,
  },

  extraSection: {
    marginTop: 5,
    marginBottom: 25,
    gap: 14,
  },

  infoCard: {
    width: '100%',
    minHeight: 85,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  infoText: {
    flex: 1,
  },

  infoTitle: {
    color: '#03123D',
    fontWeight: '800',
    fontSize: 16,
  },

  infoDescription: {
    color: '#69758B',
    fontSize: 12,
    marginTop: 4,
  },

  bottomBar: {
    height: 66,
    backgroundColor: '#101010',
    borderTopWidth: 1,
    borderTopColor: '#777777',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },

  tabButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholder: {
    minHeight: 400,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  placeholderTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 20,
    textAlign: 'center',
  },

  placeholderDescription: {
    color: '#B8B8B8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },

  modalBackground: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.55)',
  },

  modalOverlay: {
    flex: 1,
  },

  drawer: {
    width: '78%',
    maxWidth: 330,
    height: '100%',
    backgroundColor: '#03123D',
    padding: 24,
  },

  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#526078',
  },

  drawerTitle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '900',
  },

  drawerContent: {
    flex: 1,
    paddingTop: 25,
  },

  drawerMessage: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  accessOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
  },

  accessCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 26,
    alignItems: 'center',
  },

  accessTitle: {
    fontSize: 23,
    color: '#03123D',
    fontWeight: '900',
    marginTop: 15,
  },

  accessDescription: {
    color: '#596579',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
    marginBottom: 22,
  },

  accessButton: {
    width: '100%',
    minHeight: 50,
    backgroundColor: '#03123D',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  accessButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
});
