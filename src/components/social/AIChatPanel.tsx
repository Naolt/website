'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ALL_TEMPLATES } from './templates/registry'
import type { ChatAction } from '@/app/api/chat/route'
import {
  getConversations,
  createConversation,
  updateConversation,
  deleteConversation,
  type Conversation,
} from '@/lib/db/conversations'

// Stripped-down template info for the API
const templateInfoForAPI = ALL_TEMPLATES.map((t) => ({
  id: t.id,
  name: t.name,
  category: t.category,
  fields: t.fields.map((f) => ({
    key: f.key,
    label: f.label,
    type: f.type,
    placeholder: f.placeholder,
  })),
}))

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AIChatPanelProps {
  currentTemplateId: string
  onSelectTemplate: (id: string) => void
  onFillContent: (templateId: string, content: Record<string, string>) => void
  onPlanWeek: (posts: NonNullable<ChatAction['posts']>) => void
  onClose: () => void
}

export function AIChatPanel({
  currentTemplateId,
  onSelectTemplate,
  onFillContent,
  onPlanWeek,
  onClose,
}: AIChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Conversation persistence state
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)

  // Load conversation list on mount
  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      const list = await getConversations()
      setConversations(list)
    } catch {
      // Supabase not configured — silently ignore
    }
  }

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleNewChat = useCallback(() => {
    setMessages([])
    setConversationId(null)
    setShowHistory(false)
    inputRef.current?.focus()
  }, [])

  const handleLoadConversation = useCallback(async (conv: Conversation) => {
    setConversationId(conv.id)
    setMessages(conv.messages)
    setShowHistory(false)
    inputRef.current?.focus()
  }, [])

  const handleDeleteConversation = useCallback(async (id: string) => {
    try {
      await deleteConversation(id)
      setConversations((prev) => prev.filter((c) => c.id !== id))
      if (conversationId === id) {
        setMessages([])
        setConversationId(null)
      }
    } catch {
      // Ignore deletion errors
    }
  }, [conversationId])

  const persistMessages = useCallback(async (allMessages: Message[]) => {
    try {
      if (conversationId) {
        await updateConversation(conversationId, allMessages)
      } else if (allMessages.length >= 2) {
        // Create new conversation — title from first user message
        const firstUserMsg = allMessages.find((m) => m.role === 'user')
        const title = firstUserMsg
          ? firstUserMsg.content.slice(0, 50) + (firstUserMsg.content.length > 50 ? '...' : '')
          : 'New conversation'
        const conv = await createConversation(title, allMessages)
        setConversationId(conv.id)
        setConversations((prev) => [conv, ...prev])
      }
    } catch {
      // Supabase not configured — silently ignore
    }
  }, [conversationId])

  const handleSend = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          templates: templateInfoForAPI,
          currentTemplateId,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Chat failed')
      }

      const { reply, actions } = await res.json()

      // Execute actions
      if (actions && Array.isArray(actions)) {
        for (const action of actions as ChatAction[]) {
          switch (action.type) {
            case 'select_template':
              if (action.templateId) onSelectTemplate(action.templateId)
              break
            case 'fill_content':
              if (action.templateId && action.content) onFillContent(action.templateId, action.content)
              break
            case 'plan_week':
              if (action.posts) onPlanWeek(action.posts)
              break
          }
        }
      }

      const finalMessages = [...updatedMessages, { role: 'assistant' as const, content: reply }]
      setMessages(finalMessages)
      await persistMessages(finalMessages)
    } catch (err) {
      const errorMessages = [
        ...updatedMessages,
        { role: 'assistant' as const, content: `Error: ${err instanceof Error ? err.message : 'Something went wrong'}` },
      ]
      setMessages(errorMessages)
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages, currentTemplateId, onSelectTemplate, onFillContent, onPlanWeek, persistMessages])

  return (
    <div
      style={{
        width: 380,
        height: '100%',
        borderLeft: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        background: '#0a0a0a',
        fontFamily: "'Lexend', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', color: '#BFFF00' }}>
              AI Assistant
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>
              {conversationId ? 'Conversation saved' : 'New conversation'}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <button
            onClick={() => {
              if (!showHistory) {
                setHistoryLoading(true)
                loadConversations().finally(() => setHistoryLoading(false))
              }
              setShowHistory(!showHistory)
            }}
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              border: showHistory ? '1px solid rgba(191,255,0,0.2)' : '1px solid rgba(255,255,255,0.08)',
              background: showHistory ? 'rgba(191,255,0,0.08)' : 'rgba(255,255,255,0.04)',
              color: showHistory ? '#BFFF00' : 'rgba(255,255,255,0.4)',
              fontSize: 9,
              fontWeight: 600,
              fontFamily: "'Lexend', sans-serif",
              cursor: 'pointer',
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            History
          </button>
          <button
            onClick={handleNewChat}
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 9,
              fontWeight: 600,
              fontFamily: "'Lexend', sans-serif",
              cursor: 'pointer',
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            New
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.3)',
              fontSize: 18,
              cursor: 'pointer',
              padding: '2px 6px',
              fontFamily: "'Lexend', sans-serif",
            }}
          >
            &times;
          </button>
        </div>
      </div>

      {/* Conversation history dropdown */}
      {showHistory && (
        <div
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            maxHeight: 200,
            overflowY: 'auto',
          }}
        >
          {historyLoading ? (
            <div style={{ padding: '16px 20px', fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
              Loading...
            </div>
          ) : conversations.length === 0 ? (
            <div style={{ padding: '16px 20px', fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center' }}>
              No past conversations
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 20px',
                  gap: 8,
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  background: conversationId === conv.id ? 'rgba(191,255,0,0.05)' : 'transparent',
                }}
              >
                <button
                  onClick={() => handleLoadConversation(conv)}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    color: conversationId === conv.id ? '#BFFF00' : 'rgba(255,255,255,0.6)',
                    fontSize: 11,
                    fontFamily: "'Lexend', sans-serif",
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: 0,
                    lineHeight: 1.4,
                  }}
                >
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {conv.title}
                  </div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', marginTop: 2 }}>
                    {conv.messages.length} messages &middot; {new Date(conv.updated_at).toLocaleDateString()}
                  </div>
                </button>
                <button
                  onClick={() => handleDeleteConversation(conv.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,68,68,0.4)',
                    fontSize: 14,
                    cursor: 'pointer',
                    padding: '2px 4px',
                    fontFamily: "'Lexend', sans-serif",
                    flexShrink: 0,
                  }}
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 32, marginBottom: 16, opacity: 0.3 }}>&#9733;</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
              Tell me what kind of post you want to create. I can pick templates and generate content for you.
            </div>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'Create a tips post about website speed',
                'Make a testimonial from a restaurant client',
                'Plan my week around web development',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion)
                    inputRef.current?.focus()
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    padding: '10px 14px',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 11,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: "'Lexend', sans-serif",
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
            }}
          >
            <div
              style={{
                padding: '10px 14px',
                borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: msg.role === 'user' ? 'rgba(191,255,0,0.15)' : 'rgba(255,255,255,0.06)',
                color: msg.role === 'user' ? '#BFFF00' : 'rgba(255,255,255,0.8)',
                fontSize: 12,
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '14px 14px 14px 4px',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.4)',
                fontSize: 12,
              }}
            >
              Thinking...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: '12px 20px 16px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me to create a post..."
            rows={1}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10,
              padding: '10px 14px',
              color: '#fff',
              fontSize: 12,
              fontFamily: "'Lexend', sans-serif",
              resize: 'none',
              outline: 'none',
              maxHeight: 80,
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              border: 'none',
              background: loading || !input.trim() ? 'rgba(255,255,255,0.06)' : '#BFFF00',
              color: loading || !input.trim() ? 'rgba(255,255,255,0.2)' : '#000',
              fontSize: 18,
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontFamily: "'Lexend', sans-serif",
            }}
          >
            &#8593;
          </button>
        </div>
      </div>
    </div>
  )
}
