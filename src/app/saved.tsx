import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CourseCard } from '../components/CourseCard';
import { courses } from '../constants/courses';

export default function SavedScreen() {
  const router = useRouter();
  // o estado guarda a seleção e permite remover itens da lista
  const [savedIds, setSavedIds] = useState<string[]>(['programacao', 'design']);
  const savedCourses = courses.filter((course) => savedIds.includes(course.id));

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.back} onPress={() => router.back()}>voltar</Text>
        <Text style={styles.brand}>Educa<Text style={styles.accent}>+</Text></Text>
        <Text style={styles.title}>cursos salvos</Text>
        <Text style={styles.subtitle}>guarde aqui os cursos que quer conhecer melhor.</Text>
        {savedCourses.length ? savedCourses.map((course) => (
          <CourseCard key={course.id} course={course} onPress={() => router.push({ pathname: '/course-detail', params: { id: course.id } })} actionLabel="remover dos salvos" onActionPress={() => setSavedIds((ids) => ids.filter((id) => id !== course.id))} />
        )) : <Text style={styles.empty}>nenhum curso salvo. explore os cursos para escolher um.</Text>}
        <Text style={styles.explore} onPress={() => router.push('/explore')}>explorar cursos</Text>
      </ScrollView>
      <View style={styles.nav}><Text style={styles.navItem} onPress={() => router.replace('/home')}>início</Text><Text style={styles.navItem} onPress={() => router.push('/explore')}>explorar</Text><Text style={styles.navSelected}>salvos</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' }, content: { padding: 24, paddingBottom: 32 },
  back: { color: '#2563EB', fontWeight: '600', marginBottom: 18 }, brand: { fontSize: 22, fontWeight: '800', color: '#1F2937' }, accent: { color: '#2563EB' },
  title: { fontSize: 28, fontWeight: '800', color: '#1F2937', marginTop: 18 }, subtitle: { fontSize: 15, color: '#6B7280', marginTop: 5, marginBottom: 20 },
  empty: { color: '#6B7280', textAlign: 'center', backgroundColor: '#FFFFFF', padding: 24, borderRadius: 14, lineHeight: 21 }, explore: { color: '#2563EB', fontWeight: '700', textAlign: 'center', marginTop: 16 },
  nav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 14, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#E5E7EB' }, navItem: { color: '#6B7280', fontWeight: '600', padding: 4 }, navSelected: { color: '#2563EB', fontWeight: '700', padding: 4 },
});
