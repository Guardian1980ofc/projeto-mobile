import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Course } from '../constants/courses';

type CourseCardProps = { course: Course; onPress: () => void; actionLabel?: string; onActionPress?: () => void };

// cartão reutilizado nas telas de início, busca e salvos
export function CourseCard({ course, onPress, actionLabel = 'ver curso →', onActionPress }: CourseCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.top}><Text style={styles.area}>{course.area}</Text><Text style={styles.duration}>{course.duration}</Text></View>
      <Pressable onPress={onPress}><Text style={styles.title}>{course.title}</Text></Pressable>
      <Text style={styles.detail}>{course.detail}</Text>
      <View style={styles.bottom}><Text style={styles.level}>{course.level}</Text><Pressable onPress={onActionPress ?? onPress}><Text style={styles.action}>{actionLabel}</Text></Pressable></View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 17, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  area: { color: '#2563EB', backgroundColor: '#EFF6FF', overflow: 'hidden', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, fontSize: 12, fontWeight: '700' },
  duration: { color: '#6B7280', fontSize: 12 }, title: { fontSize: 17, fontWeight: '700', color: '#1F2937' },
  detail: { fontSize: 14, color: '#6B7280', lineHeight: 20, marginTop: 5 }, bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 13 },
  level: { color: '#6B7280', fontSize: 12 }, action: { color: '#2563EB', fontSize: 14, fontWeight: '700' },
});
