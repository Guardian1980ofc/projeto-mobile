import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';
import { CourseCard } from '../components/CourseCard';
import { courses } from '../constants/courses';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}><View><Text style={styles.brand}>Educa<Text style={styles.brandAccent}>+</Text></Text><Text style={styles.greeting}>Olá! Continue aprendendo.</Text></View><Text style={styles.avatar}>E</Text></View>
        <View style={styles.banner}><Text style={styles.bannerEyebrow}>SEU PRÓXIMO PASSO</Text><Text style={styles.bannerTitle}>Conhecimento que abre caminhos.</Text><Text style={styles.bannerText}>Explore cursos gratuitos e aprenda no seu ritmo.</Text><Button title="Explorar cursos" onPress={() => router.push('/explore')} style={styles.bannerButton} /></View>
        <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>Cursos em destaque</Text><Text style={styles.link} onPress={() => router.push('/explore')}>Ver todos</Text></View>
        {/* o cartão reutilizado mantém a lista com o mesmo visual */}
        {courses.slice(0, 3).map((course) => <CourseCard key={course.id} course={course} onPress={() => router.push({ pathname: '/course-detail', params: { id: course.id } })} />)}
        <Button title="Sair da conta" variant="secondary" onPress={() => router.replace('/')} style={styles.logout} />
      </ScrollView>
      <View style={styles.navBar}><Text style={styles.navActive} onPress={() => router.replace('/home')}>Início</Text><Text style={styles.navItem} onPress={() => router.push('/explore')}>Explorar</Text><Text style={styles.navItem} onPress={() => router.push('/saved')}>Salvos</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' }, content: { padding: 24, paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }, brand: { fontSize: 26, fontWeight: '800', color: '#1F2937' }, brandAccent: { color: '#2563EB' }, greeting: { color: '#6B7280', marginTop: 3, fontSize: 14 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#DBEAFE', color: '#2563EB', textAlign: 'center', textAlignVertical: 'center', overflow: 'hidden', fontSize: 18, fontWeight: '700' },
  banner: { backgroundColor: '#1D4ED8', borderRadius: 18, padding: 22, marginBottom: 28 }, bannerEyebrow: { color: '#BFDBFE', fontWeight: '700', fontSize: 11, letterSpacing: 1 }, bannerTitle: { color: '#FFFFFF', fontSize: 24, lineHeight: 30, fontWeight: '800', marginTop: 10 }, bannerText: { color: '#DBEAFE', fontSize: 14, lineHeight: 21, marginTop: 8 }, bannerButton: { backgroundColor: '#FFFFFF', marginTop: 14 },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }, sectionTitle: { fontSize: 19, fontWeight: '700', color: '#1F2937' }, link: { color: '#2563EB', fontWeight: '600' }, logout: { marginTop: 12 },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 14, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#E5E7EB' }, navActive: { color: '#2563EB', fontWeight: '700', padding: 4 }, navItem: { color: '#6B7280', fontWeight: '600', padding: 4 },
});
