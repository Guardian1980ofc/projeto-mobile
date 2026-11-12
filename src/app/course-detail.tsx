import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '../components/Button';
import { courses } from '../constants/courses';

export default function CourseDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const course = courses.find((item) => item.id === id) ?? courses[0];

  // esta tela mostra informações curtas para ajudar a conhecer o curso
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.back} onPress={() => router.back()}>← voltar</Text>
      <Text style={styles.brand}>Educa<Text style={styles.accent}>+</Text></Text>
      <View style={styles.card}>
        <Text style={styles.area}>{course.area}</Text>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.detail}>{course.detail}</Text>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>duração</Text><Text style={styles.infoValue}>{course.duration}</Text></View>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>nível</Text><Text style={styles.infoValue}>{course.level}</Text></View>
        <Text style={styles.sectionTitle}>o que você vai aprender</Text>
        <Text style={styles.detail}>• conceitos básicos do assunto{'\n'}• atividades simples para praticar{'\n'}• como continuar aprendendo no seu ritmo</Text>
      </View>
      <Button title="ver cursos salvos" variant="secondary" onPress={() => router.push('/saved')} />
      <Button title="voltar para explorar" onPress={() => router.push('/explore')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' }, content: { padding: 24, paddingBottom: 36 }, back: { color: '#2563EB', fontSize: 15, fontWeight: '600', marginBottom: 18 },
  brand: { fontSize: 22, fontWeight: '800', color: '#1F2937', marginBottom: 22 }, accent: { color: '#2563EB' }, card: { backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', padding: 20, marginBottom: 16 },
  area: { color: '#2563EB', fontWeight: '700', marginBottom: 10 }, title: { color: '#1F2937', fontSize: 25, lineHeight: 31, fontWeight: '800' }, detail: { color: '#6B7280', fontSize: 15, lineHeight: 23, marginTop: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#E5E7EB', paddingVertical: 13, marginTop: 12 }, infoLabel: { color: '#6B7280' }, infoValue: { color: '#1F2937', fontWeight: '700' }, sectionTitle: { color: '#1F2937', fontSize: 17, fontWeight: '700', marginTop: 12 },
});
