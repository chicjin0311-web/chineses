import { cache } from 'react';
import { getSupabase } from './supabase';
import type { Resource, Project } from './types';
export const getResources = cache(async (): Promise<Resource[]> => {
  const db = getSupabase();
  if (!db) throw new Error('학습 자료 연결 설정이 필요합니다.');
  const { data, error } = await db.from('resources').select('*').eq('published', true).order('sort_order');
  if (error) throw new Error('학습 자료를 불러오지 못했습니다.');
  return data as Resource[];
});
export const getProjects = cache(async (): Promise<Project[]> => {
  const db = getSupabase();
  if (!db) throw new Error('프로젝트 연결 설정이 필요합니다.');
  const { data, error } = await db.from('project_templates').select('*').eq('published', true).order('sort_order');
  if (error) throw new Error('프로젝트를 불러오지 못했습니다.');
  return data as Project[];
});
