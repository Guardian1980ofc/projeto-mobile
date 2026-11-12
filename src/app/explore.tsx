import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

// lista de exemplo usada para preencher a busca
const courses = [
  { title: 'Introdução à Programação', area: 'Tecnologia', detail: 'Aprenda lógica e crie seus primeiros programas.', duration: '8 semanas', level: 'Iniciante' },
  { title: 'Desenvolvimento Web', area: 'Tecnologia', detail: 'Construa páginas e aplicações para a internet.', duration: '12 semanas', level: 'Intermediário' },
  { title: 'Design para Iniciantes', area: 'Design', detail: 'Conheça cores, tipografia e composição visual.', duration: '6 semanas', level: 'Iniciante' },
  { title: 'Inglês para o Dia a Dia', area: 'Idiomas', detail: 'Pratique vocabulário e conversação.', duration: '10 semanas', level: 'Todos os níveis' },
  { title: 'Educação Financeira', area: 'Negócios', detail: 'Organize seu dinheiro e planeje seus objetivos.', duration: '4 semanas', level: 'Iniciante' },
];
const categories = ['Todos', 'Tecnologia', 'Design', 'Idiomas', 'Negócios'];

export default function ExploreScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  // combina o texto digitado com a categoria escolhida
  const filteredCourses = useMemo(() => courses.filter((course) => {
    const matchesCategory = selectedCategory === 'Todos' || course.area === selectedCategory;
    const searchText = `${course.title} ${course.area} ${course.detail}`.toLocaleLowerCase();
    return matchesCategory && searchText.includes(query.trim().toLocaleLowerCase());
  }), [query, selectedCategory]);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>Educa<Text style={styles.brandAccent}>+</Text></Text>
        <Text style={styles.title}>Explore cursos</Text>
        <Text style={styles.subtitle}>Encontre um assunto novo para aprender.</Text>

        <TextInput
          style={styles.search}
          placeholder="Buscar cursos ou áreas"
          placeholderTextColor="#9CA3AF"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          returnKeyType="search"
          accessibilityLabel="Buscar cursos ou áreas"
        />

        <Text style={styles.sectionTitle}>Categorias</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
          {categories.map((category) => {
            const selected = category === selectedCategory;
            return (
              <Text
                key={category}
                onPress={() => setSelectedCategory(category)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[styles.category, selected && styles.categorySelected]}
              >
                {category}
              </Text>
            );
          })}
        </ScrollView>

        <View style={styles.resultHeading}>
          <Text style={styles.sectionTitle}>Cursos disponíveis</Text>
          <Text style={styles.count}>{filteredCourses.length}</Text>
        </View>
        {filteredCourses.length > 0 ? filteredCourses.map((course) => (
          <View key={course.title} style={styles.courseCard}>
            <View style={styles.courseTop}>
              <Text style={styles.courseArea}>{course.area}</Text>
              <Text style={styles.duration}>{course.duration}</Text>
            </View>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDetail}>{course.detail}</Text>
            <View style={styles.courseBottom}>
              <Text style={styles.level}>{course.level}</Text>
              <Text style={styles.courseLink}>Ver curso →</Text>
            </View>
          </View>
        )) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nenhum curso encontrado</Text>
            <Text style={styles.emptyText}>Tente outra busca ou escolha uma categoria diferente.</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.navBar}>
        <Text style={styles.navItem} onPress={() => router.replace('/home')}>Início</Text>
        <Text style={styles.navActive} onPress={() => router.replace('/explore')}>Explorar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 24, paddingBottom: 32 },
  brand: { fontSize: 22, fontWeight: '800', color: '#1F2937', marginBottom: 24 },
  brandAccent: { color: '#2563EB' },
  title: { fontSize: 28, fontWeight: '800', color: '#1F2937' },
  subtitle: { fontSize: 15, color: '#6B7280', marginTop: 5, marginBottom: 22 },
  search: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 11, height: 50, paddingHorizontal: 15, fontSize: 15, color: '#1F2937', marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  categoryList: { paddingVertical: 13, paddingRight: 20, gap: 8 },
  category: { color: '#4B5563', backgroundColor: '#FFFFFF', borderColor: '#E5E7EB', borderWidth: 1, borderRadius: 20, overflow: 'hidden', paddingHorizontal: 13, paddingVertical: 8, fontSize: 13, fontWeight: '600' },
  categorySelected: { color: '#FFFFFF', backgroundColor: '#2563EB', borderColor: '#2563EB' },
  resultHeading: { flexDirection: 'row', alignItems: 'center', gap: 9, marginTop: 15, marginBottom: 12 },
  count: { color: '#2563EB', backgroundColor: '#DBEAFE', overflow: 'hidden', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 3, fontSize: 12, fontWeight: '700' },
  courseCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 17, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  courseTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  courseArea: { color: '#2563EB', backgroundColor: '#EFF6FF', overflow: 'hidden', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, fontSize: 12, fontWeight: '700' },
  duration: { color: '#6B7280', fontSize: 12 },
  courseTitle: { fontSize: 17, fontWeight: '700', color: '#1F2937' },
  courseDetail: { fontSize: 14, color: '#6B7280', lineHeight: 20, marginTop: 5 },
  courseBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 13 },
  level: { color: '#6B7280', fontSize: 12 },
  courseLink: { color: '#2563EB', fontSize: 14, fontWeight: '700' },
  emptyState: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 24, marginTop: 4 },
  emptyTitle: { color: '#1F2937', fontSize: 16, fontWeight: '700' },
  emptyText: { color: '#6B7280', textAlign: 'center', lineHeight: 20, marginTop: 6 },
  navBar: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 14, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#E5E7EB' },
  navActive: { color: '#2563EB', fontWeight: '700', padding: 4 },
  navItem: { color: '#6B7280', fontWeight: '600', padding: 4 },
});
