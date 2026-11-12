import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';

// cursos de exemplo que aparecem na tela inicial
const courses = [
  { title: 'Introdução à Programação', area: 'Tecnologia', detail: 'Comece a criar seus primeiros programas.', duration: '8 semanas' },
  { title: 'Design para Iniciantes', area: 'Design', detail: 'Aprenda fundamentos visuais e composição.', duration: '6 semanas' },
  { title: 'Inglês para o Dia a Dia', area: 'Idiomas', detail: 'Pratique conversação em situações reais.', duration: '10 semanas' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>Educa<Text style={styles.brandAccent}>+</Text></Text>
            <Text style={styles.greeting}>Olá! Continue aprendendo.</Text>
          </View>
          <Text style={styles.avatar}>E</Text>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerEyebrow}>SEU PRÓXIMO PASSO</Text>
          <Text style={styles.bannerTitle}>Conhecimento que abre caminhos.</Text>
          <Text style={styles.bannerText}>Explore cursos gratuitos e aprenda no seu ritmo.</Text>
          <Button title="Explorar cursos" onPress={() => router.push('/explore')} style={styles.bannerButton} />
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Cursos em destaque</Text>
          <Text style={styles.link} onPress={() => router.push('/explore')}>Ver todos</Text>
        </View>
        {/* cada cartão mostra um curso em destaque */}
        {courses.map((course) => (
          <View key={course.title} style={styles.courseCard}>
            <View style={styles.courseTop}>
              <Text style={styles.courseArea}>{course.area}</Text>
              <Text style={styles.duration}>{course.duration}</Text>
            </View>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDetail}>{course.detail}</Text>
            <Text style={styles.courseLink} onPress={() => router.push('/explore')}>Conhecer curso →</Text>
          </View>
        ))}
        <Button title="Sair da conta" variant="secondary" onPress={() => router.replace('/')} style={styles.logout} />
      </ScrollView>
      <View style={styles.navBar}>
        <Text style={styles.navActive} onPress={() => router.replace('/home')}>Início</Text>
        <Text style={styles.navItem} onPress={() => router.push('/explore')}>Explorar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 24, paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  brand: { fontSize: 26, fontWeight: '800', color: '#1F2937' },
  brandAccent: { color: '#2563EB' },
  greeting: { color: '#6B7280', marginTop: 3, fontSize: 14 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#DBEAFE', color: '#2563EB', textAlign: 'center', textAlignVertical: 'center', overflow: 'hidden', fontSize: 18, fontWeight: '700' },
  banner: { backgroundColor: '#1D4ED8', borderRadius: 18, padding: 22, marginBottom: 28 },
  bannerEyebrow: { color: '#BFDBFE', fontWeight: '700', fontSize: 11, letterSpacing: 1 },
  bannerTitle: { color: '#FFFFFF', fontSize: 24, lineHeight: 30, fontWeight: '800', marginTop: 10 },
  bannerText: { color: '#DBEAFE', fontSize: 14, lineHeight: 21, marginTop: 8 },
  bannerButton: { backgroundColor: '#FFFFFF', marginTop: 14 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 19, fontWeight: '700', color: '#1F2937' },
  link: { color: '#2563EB', fontWeight: '600' },
  courseCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 17, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  courseTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  courseArea: { color: '#2563EB', backgroundColor: '#EFF6FF', overflow: 'hidden', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, fontSize: 12, fontWeight: '700' },
  duration: { color: '#6B7280', fontSize: 12 },
  courseTitle: { fontSize: 17, fontWeight: '700', color: '#1F2937' },
  courseDetail: { fontSize: 14, color: '#6B7280', lineHeight: 20, marginTop: 5 },
  courseLink: { color: '#2563EB', fontSize: 14, fontWeight: '700', marginTop: 13 },
  logout: { marginTop: 12 },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 14, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#E5E7EB' },
  navActive: { color: '#2563EB', fontWeight: '700', padding: 4 },
  navItem: { color: '#6B7280', fontWeight: '600', padding: 4 },
});
