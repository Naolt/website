'use client'

import { useState, useEffect } from 'react'
import { getSupabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthGateProps {
  children: React.ReactNode
}

export function AuthGate({ children }: AuthGateProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const supabase = getSupabase()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const { error } = await getSupabase().auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    } catch {
      setError('Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        color: 'rgba(255,255,255,0.4)',
        fontFamily: "'Lexend', sans-serif",
        fontSize: 13,
      }}>
        Loading...
      </div>
    )
  }

  if (user) {
    return <>{children}</>
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a',
      fontFamily: "'Lexend', sans-serif",
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          width: 360,
          padding: 40,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
        }}
      >
        <div style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: '#BFFF00',
          marginBottom: 4,
        }}>
          Aurora Solutions
        </div>
        <div style={{
          fontSize: 10,
          color: 'rgba(255,255,255,0.3)',
          marginBottom: 32,
        }}>
          Sign in to access Social Templates
        </div>

        {error && (
          <div style={{
            padding: '10px 14px',
            borderRadius: 8,
            background: 'rgba(255,68,68,0.1)',
            border: '1px solid rgba(255,68,68,0.2)',
            color: '#ff6b6b',
            fontSize: 11,
            marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{
            display: 'block',
            fontSize: 10,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            fontWeight: 500,
            marginBottom: 6,
          }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '10px 12px',
              color: '#fff',
              fontSize: 13,
              fontFamily: "'Lexend', sans-serif",
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{
            display: 'block',
            fontSize: 10,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            fontWeight: 500,
            marginBottom: 6,
          }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 8,
              padding: '10px 12px',
              color: '#fff',
              fontSize: 13,
              fontFamily: "'Lexend', sans-serif",
              outline: 'none',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '14px 0',
            background: submitting ? 'rgba(191,255,0,0.5)' : '#BFFF00',
            color: '#000',
            border: 'none',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "'Lexend', sans-serif",
            cursor: submitting ? 'wait' : 'pointer',
            letterSpacing: 0.5,
          }}
        >
          {submitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
