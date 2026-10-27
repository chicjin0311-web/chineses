'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Download, FilePenLine, Plus } from 'lucide-react';
import { writingCategories } from '@/lib/site';
import { draftStorageKey, draftToText, parseDrafts, type Draft } from '@/lib/drafts';

const categoryIds = writingCategories.map(item => item.id);

function readDrafts() {
  return parseDrafts(localStorage.getItem(draftStorageKey), categoryIds);
}

export function DraftWorkspace({ initialCategory }: { initialCategory: string }) {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const category = writingCategories.find(item => item.id === categoryId)!;
  const selected = drafts.find(item => item.id === selectedId);
  const visibleDrafts = drafts.filter(item => item.category === categoryId).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  useEffect(() => {
    try {
      setDrafts(readDrafts());
      setReady(true);
    } catch {
      setError('저장된 초안을 읽을 수 없어요. 기존 내용은 그대로 두었습니다. 이 브라우저의 저장 공간 설정을 확인해 주세요.');
    }
  }, []);

  useEffect(() => {
    if (!error || !selected) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [error, selected]);

  function persist(draft: Draft) {
    // Merge with current storage so editing one draft does not remove drafts from another tab.
    try {
      const latest = readDrafts();
      const next = [draft, ...latest.filter(item => item.id !== draft.id)];
      localStorage.setItem(draftStorageKey, JSON.stringify(next));
      setDrafts(next);
      setError('');
      setStatus('이 브라우저에 저장했어요.');
    } catch {
      setDrafts(previous => [draft, ...previous.filter(item => item.id !== draft.id)]);
      setError('저장하지 못했어요. 화면을 닫기 전에 파일로 내려받아 보관해 주세요.');
      setStatus('');
    }
  }

  function createDraft() {
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const draft: Draft = { id: crypto.randomUUID(), category: categoryId, title: '', date, content: category.prompts.map(prompt => `${prompt}\n\n`).join('\n'), updatedAt: now.toISOString() };
    persist(draft);
    setSelectedId(draft.id);
  }

  function updateDraft(changes: Partial<Pick<Draft, 'title' | 'date' | 'content'>>) {
    if (selected) persist({ ...selected, ...changes, updatedAt: new Date().toISOString() });
  }

  function downloadDraft() {
    if (!selected) return;
    const blob = new Blob(['\uFEFF', draftToText(selected, category.title)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(selected.title.trim() || category.title).replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').slice(0, 80)}-${selected.date || '초안'}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('초안 파일을 내려받았습니다.');
  }

  function canSwitch() {
    return !error || !selected || window.confirm('아직 저장하지 못한 내용이 있어요. 파일로 내려받지 않았다면 내용이 사라질 수 있어요. 이동할까요?');
  }

  return <>
    <div className="draft-notice"><FilePenLine size={21} aria-hidden="true" /><div><strong>기록을 준비하는 초안 공간이에요.</strong><p>입력한 내용은 이 브라우저에 저장되며 홈페이지에 공개되지 않습니다. 다른 기기로 옮기거나 보관하려면 파일로 내려받아 주세요.</p></div></div>
    {error && <p className="draft-error" role="alert">{error}</p>}
    <div className="draft-workspace">
      <aside className="draft-list-panel" aria-label="초안 목록">
        <label htmlFor="draft-category">기록할 폴더</label>
        <select id="draft-category" value={categoryId} disabled={!ready} onChange={event => { if (!canSwitch()) return; setCategoryId(event.target.value); setSelectedId(null); setStatus(''); }}>
          {writingCategories.map(item => <option key={item.id} value={item.id}>{item.group === item.title ? item.title : `${item.group} · ${item.title}`}</option>)}
        </select>
        <button className="button primary new-draft" disabled={!ready} onClick={() => { if (canSwitch()) createDraft(); }}><Plus size={16} aria-hidden="true" />새 초안</button>
        <p className="draft-count">{ready ? `${category.title} 초안 ${visibleDrafts.length}개` : error ? '저장 공간을 확인해 주세요.' : '초안을 불러오는 중…'}</p>
        <div className="draft-list">{visibleDrafts.map(draft => <button key={draft.id} className={selectedId === draft.id ? 'selected' : ''} aria-pressed={selectedId === draft.id} onClick={() => { if (canSwitch()) { setSelectedId(draft.id); setStatus(''); } }}><strong>{draft.title.trim() || '제목 없는 초안'}</strong><span>{draft.date || '날짜 미입력'}</span></button>)}</div>
        {ready && !visibleDrafts.length && <p className="draft-list-empty">이 폴더의 첫 초안을<br />시작해 보세요.</p>}
        <Link className="text-button draft-folder-link" href={category.href} onClick={event => { if (!canSwitch()) event.preventDefault(); }}>폴더 둘러보기 <ArrowUpRight size={14} aria-hidden="true" /></Link>
      </aside>
      {selected ? <section className="draft-editor" aria-label="초안 편집">
        <div className="draft-editor-top"><span className="small-pill">{category.title} · 초안</span><button className="button soft" onClick={downloadDraft}><Download size={16} aria-hidden="true" />파일로 받기</button></div>
        <label htmlFor="draft-title">제목</label><input id="draft-title" className="draft-title" value={selected.title} maxLength={120} placeholder="이 기록에 제목을 붙여 주세요" onChange={event => updateDraft({ title: event.target.value })} />
        <label htmlFor="draft-date">기록 날짜</label><input id="draft-date" className="draft-date" type="date" value={selected.date} onChange={event => updateDraft({ date: event.target.value })} />
        <label htmlFor="draft-content">내용 <span>질문은 지우거나 바꾸어도 좋아요.</span></label><textarea id="draft-content" value={selected.content} rows={18} maxLength={50000} onChange={event => updateDraft({ content: event.target.value })} />
        <div className="draft-save-status"><span role="status" aria-live="polite">{status || '입력하면 이 브라우저에 자동 저장됩니다.'}</span>{error && <button className="text-button" onClick={() => persist(selected)}>저장 다시 시도</button>}<span>{selected.content.length.toLocaleString()}자</span></div>
      </section> : <section className="draft-start"><FilePenLine size={35} strokeWidth={1.3} aria-hidden="true" /><p className="eyebrow">{category.group}</p><h2>{category.title}, 한 편의 기록부터.</h2><p>새 초안을 만들면 폴더에 맞는 질문이 준비돼요.<br />저장한 초안은 왼쪽 목록에서 다시 열 수 있어요.</p><button className="button soft" disabled={!ready} onClick={createDraft}>첫 문장 시작하기 <Plus size={16} aria-hidden="true" /></button></section>}
    </div>
  </>;
}
