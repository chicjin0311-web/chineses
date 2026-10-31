import type { Metadata } from 'next';
import { Shell } from '@/components/shell';
import { site } from '@/lib/site';
import './globals.css';
import './workspace.css';
import './collections.css';
export const metadata: Metadata={title:{default:site.name,template:`%s | ${site.name}`},description:site.description,verification:{google:'zFyDRQy4wO1tGAvxNF6lcc4U5QURTmUt8qbhWpV9FWc'},icons:{icon:'/icon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body><Shell>{children}</Shell></body></html>;}
