'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { toPng } from 'html-to-image'
import { TEMPLATE_BY_ID, getTemplatesByCategory } from './templates/registry'
import { CATEGORY_LABELS, DEFAULT_BRAND, type BrandOverrides, isCarousel } from './templates/types'
import { BrandProvider } from './BrandContext'
import { TemplateThumbnail } from './TemplateThumbnail'
import { autoSave, loadAutoSave, saveDraft as localSaveDraft, loadDrafts as localLoadDrafts, deleteDraft as localDeleteDraft, type Draft } from './drafts'
import { getDrafts as supaGetDrafts, createDraft as supaCreateDraft, deleteDraft as supaDeleteDraft, type SupabaseDraft } from '@/lib/db/drafts'
import { getSupabase } from '@/lib/supabase'
import { AIChatPanel } from './AIChatPanel'
import { SettingsPanel } from './SettingsPanel'
import type { ChatAction } from '@/app/api/chat/route'

// Convert Supabase draft to local Draft shape
function toLocalDraft(d: SupabaseDraft): Draft {
  return {
    id: d.id,
    name: d.name,
    templateId: d.template_id,
    formData: d.form_data,
    brandOverrides: d.brand_overrides,
    savedAt: new Date(d.created_at).getTime(),
  }
}

const grouped = getTemplatesByCategory()
const defaultId = grouped[0]?.templates[0]?.id || 'brand-statement'

type SidebarTab = 'templates' | 'edit'

export function SocialEditor() {
  const [activeId, setActiveId] = useState(defaultId)
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({})
  const [exporting, setExporting] = useState(false)
  const [brand, setBrand] = useState<BrandOverrides>({ ...DEFAULT_BRAND })
  const previewRef = useRef<HTMLDivElement>(null)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [showDrafts, setShowDrafts] = useState(false)
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('templates')
  const [showChat, setShowChat] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [batchPosts, setBatchPosts] = useState<NonNullable<ChatAction['posts']>>([])

  // Restore auto-save on mount + load drafts from Supabase (fallback to localStorage)
  useEffect(() => {
    const saved = loadAutoSave()
    if (saved) {
      if (TEMPLATE_BY_ID[saved.activeId]) setActiveId(saved.activeId)
      setFormData(saved.formData)
      setBrand(saved.brand)
    }
    // Try Supabase first, fall back to localStorage
    supaGetDrafts()
      .then((supaDrafts) => setDrafts(supaDrafts.map(toLocalDraft)))
      .catch(() => setDrafts(localLoadDrafts()))
  }, [])

  // Auto-save on changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      autoSave({ activeId, formData, brand, savedAt: Date.now() })
    }, 500)
    return () => clearTimeout(timer)
  }, [activeId, formData, brand])

  const template = TEMPLATE_BY_ID[activeId]
  const currentData = { ...template.defaults, ...formData[activeId] }
  const carousel = isCarousel(template)
  const totalSlides = carousel ? template.slides.length : 1
  const SlideComponent = carousel ? template.slides[currentSlide].component : template.component

  // Reset slide index when switching templates
  useEffect(() => { setCurrentSlide(0) }, [activeId])

  const updateField = useCallback(
    (key: string, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [activeId]: { ...prev[activeId], [key]: value },
      }))
    },
    [activeId]
  )

  // ── Chat panel callbacks ──

  const handleChatSelectTemplate = useCallback((id: string) => {
    if (TEMPLATE_BY_ID[id]) {
      setActiveId(id)
      setSidebarTab('edit')
    }
  }, [])

  const handleChatFillContent = useCallback((templateId: string, content: Record<string, string>) => {
    if (TEMPLATE_BY_ID[templateId]) {
      setActiveId(templateId)
      setFormData((prev) => ({
        ...prev,
        [templateId]: { ...prev[templateId], ...content },
      }))
      setSidebarTab('edit')
    }
  }, [])

  const handleChatPlanWeek = useCallback((posts: NonNullable<ChatAction['posts']>) => {
    setBatchPosts(posts)
  }, [])

  const loadBatchPost = useCallback((post: { templateId: string; content: Record<string, string> }) => {
    if (TEMPLATE_BY_ID[post.templateId]) {
      setActiveId(post.templateId)
      setFormData((prev) => ({
        ...prev,
        [post.templateId]: { ...prev[post.templateId], ...post.content },
      }))
      setSidebarTab('edit')
    }
  }, [])

  // ── Export ──

  const exportSlide = useCallback(async (suffix?: string) => {
    if (!previewRef.current) return
    const dataUrl = await toPng(previewRef.current, {
      width: 1080,
      height: 1080,
      pixelRatio: 1,
      canvasWidth: 1080,
      canvasHeight: 1080,
    })
    const link = document.createElement('a')
    link.download = `aurora-${activeId}${suffix || ''}-${Date.now()}.png`
    link.href = dataUrl
    link.click()
  }, [activeId])

  const handleExport = useCallback(async () => {
    setExporting(true)
    try {
      if (!carousel) {
        await exportSlide()
      } else {
        const original = currentSlide
        for (let i = 0; i < totalSlides; i++) {
          setCurrentSlide(i)
          await new Promise((r) => setTimeout(r, 200))
          await exportSlide(`-slide${i + 1}`)
        }
        setCurrentSlide(original)
      }
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
    }
  }, [activeId, carousel, totalSlides, currentSlide, exportSlide])

  // ── Tab button style helper ──

  const tabStyle = (tab: SidebarTab) => ({
    flex: 1,
    padding: '10px 0',
    background: sidebarTab === tab ? 'rgba(191,255,0,0.1)' : 'transparent',
    color: sidebarTab === tab ? '#BFFF00' : 'rgba(255,255,255,0.35)',
    border: 'none',
    borderBottom: sidebarTab === tab ? '2px solid #BFFF00' : '2px solid transparent',
    fontSize: 11,
    fontWeight: 600 as const,
    fontFamily: "'Lexend', sans-serif",
    cursor: 'pointer' as const,
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
    transition: 'all 0.15s',
  })

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: '#0a0a0a',
        color: '#fff',
        fontFamily: "'Lexend', sans-serif",
      }}
    >
      {/* ═══ LEFT SIDEBAR ═══ */}
      <div
        style={{
          width: 360,
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px 24px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#BFFF00', margin: 0 }}>
              Social Templates
            </h1>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2, margin: 0 }}>
              Aurora Solutions
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button
              onClick={() => setShowChat(!showChat)}
              style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: showChat ? '1px solid rgba(191,255,0,0.3)' : '1px solid rgba(255,255,255,0.1)',
                background: showChat ? 'rgba(191,255,0,0.1)' : 'rgba(255,255,255,0.04)',
                color: showChat ? '#BFFF00' : 'rgba(255,255,255,0.5)',
                fontSize: 10,
                fontWeight: 600,
                fontFamily: "'Lexend', sans-serif",
                cursor: 'pointer',
                letterSpacing: 1,
                textTransform: 'uppercase',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {showChat ? 'Close AI' : 'AI Chat'}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              style={{
                padding: '6px 10px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.35)',
                fontSize: 13,
                fontFamily: "'Lexend', sans-serif",
                cursor: 'pointer',
                lineHeight: 1,
                flexShrink: 0,
              }}
              title="AI Settings"
            >
              &#9881;
            </button>
            <button
              onClick={() => getSupabase().auth.signOut()}
              style={{
                padding: '6px 10px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.35)',
                fontSize: 13,
                fontFamily: "'Lexend', sans-serif",
                cursor: 'pointer',
                lineHeight: 1,
                flexShrink: 0,
              }}
              title="Sign Out"
            >
              &#x2192;
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => setSidebarTab('templates')} style={tabStyle('templates')}>
            Templates
          </button>
          <button onClick={() => setSidebarTab('edit')} style={tabStyle('edit')}>
            Edit
          </button>
        </div>

        {/* ── Templates tab ── */}
        {sidebarTab === 'templates' && (
          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            {/* Brand controls */}
            <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontWeight: 600, marginBottom: 8 }}>
                Brand
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <label style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
                  <input
                    type="color"
                    value={brand.primaryColor}
                    onChange={(e) => setBrand((b) => ({ ...b, primaryColor: e.target.value }))}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                  />
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: brand.primaryColor, border: '2px solid rgba(255,255,255,0.1)' }} />
                </label>
                <select
                  value={brand.fontFamily}
                  onChange={(e) => setBrand((b) => ({ ...b, fontFamily: e.target.value }))}
                  style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '6px 8px', color: '#fff', fontSize: 11, fontFamily: "'Lexend', sans-serif", outline: 'none' }}
                >
                  <option value="'Lexend', sans-serif">Lexend</option>
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Space Grotesk', sans-serif">Space Grotesk</option>
                  <option value="'DM Sans', sans-serif">DM Sans</option>
                </select>
                <input
                  type="text"
                  value={brand.brandName}
                  onChange={(e) => setBrand((b) => ({ ...b, brandName: e.target.value }))}
                  placeholder="Brand Name"
                  style={{ width: 100, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '6px 8px', color: '#fff', fontSize: 11, fontFamily: "'Lexend', sans-serif", outline: 'none' }}
                />
              </div>
            </div>

            {/* Template picker */}
            <div style={{ flex: 1, overflow: 'auto', padding: '12px 24px 16px' }}>
              {grouped.map(({ category, templates }) => (
                <div key={category} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontWeight: 600, marginBottom: 8, paddingLeft: 2 }}>
                    {CATEGORY_LABELS[category]}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {templates.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => { setActiveId(t.id); setSidebarTab('edit') }}
                        style={{
                          padding: 0,
                          border: activeId === t.id ? '2px solid #BFFF00' : '2px solid transparent',
                          borderRadius: 8,
                          cursor: 'pointer',
                          background: 'rgba(255,255,255,0.04)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          width: 92,
                          overflow: 'hidden',
                          transition: 'border-color 0.15s',
                        }}
                      >
                        <div style={{ padding: 4 }}>
                          <TemplateThumbnail template={t} brand={brand} />
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 500, fontFamily: "'Lexend', sans-serif", color: activeId === t.id ? '#BFFF00' : 'rgba(255,255,255,0.5)', padding: '4px 4px 6px', lineHeight: 1.2, textAlign: 'center', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {t.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Edit tab ── */}
        {sidebarTab === 'edit' && (
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Current template name */}
            <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                {template.name}
              </div>
              <button
                onClick={() => setSidebarTab('templates')}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 10, cursor: 'pointer', fontFamily: "'Lexend', sans-serif", textDecoration: 'underline' }}
              >
                Change
              </button>
            </div>

            {/* Batch posts (from AI Plan My Week) */}
            {batchPosts.length > 0 && (
              <div style={{ padding: '10px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontWeight: 600 }}>
                    Weekly Plan ({batchPosts.length} posts)
                  </span>
                  <button
                    onClick={() => setBatchPosts([])}
                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', fontSize: 12, cursor: 'pointer', fontFamily: "'Lexend', sans-serif" }}
                  >
                    &times;
                  </button>
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {batchPosts.map((post, i) => (
                    <button
                      key={i}
                      onClick={() => loadBatchPost(post)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 6,
                        border: activeId === post.templateId ? '1px solid rgba(191,255,0,0.3)' : '1px solid rgba(255,255,255,0.08)',
                        background: activeId === post.templateId ? 'rgba(191,255,0,0.08)' : 'rgba(255,255,255,0.03)',
                        color: activeId === post.templateId ? '#BFFF00' : 'rgba(255,255,255,0.5)',
                        fontSize: 10,
                        fontWeight: 600,
                        fontFamily: "'Lexend', sans-serif",
                        cursor: 'pointer',
                      }}
                    >
                      {post.day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Fields */}
            <div style={{ flex: 1, overflow: 'auto', padding: '16px 24px' }}>
              {template.fields.map((field) => (
                <div key={field.key} style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontWeight: 500, marginBottom: 6 }}>
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={currentData[field.key] || ''}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 13, fontFamily: "'Lexend', sans-serif", resize: 'vertical', outline: 'none' }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={currentData[field.key] || ''}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 13, fontFamily: "'Lexend', sans-serif", outline: 'none' }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Drafts + Export */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {/* Drafts row */}
              <div style={{ padding: '8px 24px' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={async () => {
                      const name = prompt('Draft name:', `${template.name} — ${new Date().toLocaleDateString()}`)
                      if (!name) return
                      // Save to localStorage immediately
                      localSaveDraft({ name, templateId: activeId, formData: formData[activeId] || {}, brandOverrides: brand })
                      // Save to Supabase, then refresh list
                      try {
                        await supaCreateDraft({ name, template_id: activeId, form_data: formData[activeId] || {}, brand_overrides: brand })
                        const supaDrafts = await supaGetDrafts()
                        setDrafts(supaDrafts.map(toLocalDraft))
                      } catch {
                        setDrafts(localLoadDrafts())
                      }
                    }}
                    style={{ flex: 1, padding: '8px 0', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 11, fontWeight: 600, fontFamily: "'Lexend', sans-serif", cursor: 'pointer', letterSpacing: 0.5 }}
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={() => setShowDrafts(!showDrafts)}
                    style={{
                      flex: 1, padding: '8px 0',
                      background: showDrafts ? 'rgba(191,255,0,0.1)' : 'rgba(255,255,255,0.06)',
                      color: showDrafts ? '#BFFF00' : 'rgba(255,255,255,0.6)',
                      border: `1px solid ${showDrafts ? 'rgba(191,255,0,0.2)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: 8, fontSize: 11, fontWeight: 600, fontFamily: "'Lexend', sans-serif", cursor: 'pointer', letterSpacing: 0.5,
                    }}
                  >
                    Load {drafts.length > 0 ? `(${drafts.length})` : ''}
                  </button>
                </div>
                {showDrafts && (
                  <div style={{ marginTop: 8, maxHeight: 140, overflowY: 'auto' }}>
                    {drafts.length === 0 ? (
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', padding: '8px 0', textAlign: 'center' }}>
                        No saved drafts yet
                      </div>
                    ) : (
                      drafts.map((d) => (
                        <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <button
                            onClick={() => {
                              if (TEMPLATE_BY_ID[d.templateId]) setActiveId(d.templateId)
                              setFormData((prev) => ({ ...prev, [d.templateId]: d.formData }))
                              setBrand(d.brandOverrides)
                              setShowDrafts(false)
                            }}
                            style={{ flex: 1, background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: "'Lexend', sans-serif", cursor: 'pointer', textAlign: 'left', padding: 0 }}
                          >
                            <div>{d.name}</div>
                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{new Date(d.savedAt).toLocaleString()}</div>
                          </button>
                          <button
                            onClick={async () => {
                              localDeleteDraft(d.id)
                              try {
                                await supaDeleteDraft(d.id)
                                const supaDrafts = await supaGetDrafts()
                                setDrafts(supaDrafts.map(toLocalDraft))
                              } catch {
                                setDrafts(localLoadDrafts())
                              }
                            }}
                            style={{ background: 'none', border: 'none', color: 'rgba(255,68,68,0.5)', fontSize: 14, cursor: 'pointer', padding: '2px 4px', fontFamily: "'Lexend', sans-serif" }}
                          >
                            &times;
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Export button */}
              <div style={{ padding: '8px 24px 16px' }}>
                <button
                  onClick={handleExport}
                  disabled={exporting}
                  style={{
                    width: '100%', padding: '14px 0',
                    background: exporting ? 'rgba(191,255,0,0.5)' : '#BFFF00',
                    color: '#000', border: 'none', borderRadius: 10,
                    fontSize: 14, fontWeight: 700, fontFamily: "'Lexend', sans-serif",
                    cursor: exporting ? 'wait' : 'pointer', letterSpacing: 0.5,
                  }}
                >
                  {exporting ? 'Exporting...' : carousel ? `Export All ${totalSlides} Slides` : 'Export as PNG'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══ PREVIEW AREA ═══ */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          background: '#111',
          position: 'relative',
        }}
      >
        <div
          style={{
            transform: 'scale(0.45)',
            transformOrigin: 'center center',
            flexShrink: 0,
          }}
        >
          <div
            ref={previewRef}
            style={{
              width: 1080, height: 1080,
              minWidth: 1080, minHeight: 1080,
              maxWidth: 1080, maxHeight: 1080,
              overflow: 'hidden',
            }}
          >
            <BrandProvider value={brand}>
              <SlideComponent data={currentData} />
            </BrandProvider>
          </div>
        </div>

        {/* Carousel overlay controller */}
        {carousel && (
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              padding: '10px 20px',
              borderRadius: 40,
            }}
          >
            <button
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                border: 'none',
                background: currentSlide === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                color: currentSlide === 0 ? 'rgba(255,255,255,0.2)' : '#fff',
                fontSize: 16, cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Lexend', sans-serif",
              }}
            >
              &#8249;
            </button>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {template.slides.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(i)}
                  style={{
                    width: currentSlide === i ? 20 : 8, height: 8,
                    borderRadius: 4, border: 'none',
                    background: currentSlide === i ? '#BFFF00' : 'rgba(255,255,255,0.25)',
                    cursor: 'pointer', transition: 'all 0.2s', padding: 0,
                  }}
                  title={slide.name}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentSlide((s) => Math.min(totalSlides - 1, s + 1))}
              disabled={currentSlide === totalSlides - 1}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                border: 'none',
                background: currentSlide === totalSlides - 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                color: currentSlide === totalSlides - 1 ? 'rgba(255,255,255,0.2)' : '#fff',
                fontSize: 16, cursor: currentSlide === totalSlides - 1 ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Lexend', sans-serif",
              }}
            >
              &#8250;
            </button>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 4 }}>
              {currentSlide + 1}/{totalSlides}
            </span>
          </div>
        )}
      </div>

      {/* ═══ RIGHT AI CHAT PANEL ═══ */}
      {showChat && (
        <AIChatPanel
          currentTemplateId={activeId}
          onSelectTemplate={handleChatSelectTemplate}
          onFillContent={handleChatFillContent}
          onPlanWeek={handleChatPlanWeek}
          onClose={() => setShowChat(false)}
        />
      )}

      {/* ═══ SETTINGS MODAL ═══ */}
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  )
}
