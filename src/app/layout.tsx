import type { Metadata } from 'next';
import { Shell } from '@/components/shell';
import './globals.css';
export const metadata: Metadata={title:{default:'혜진의 중국어 교실 | 함께 배우는 중국어',template:'%s | 혜진의 중국어 교실'},description:'한마디씩, 함께 배우는 중국어. 중국어 학습 자료, 수업 도구, 우리 반 프로젝트가 모이는 혜진 선생님의 교실입니다.',icons:{icon:'/icon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body><Shell>{children}</Shell></body></html>;}
