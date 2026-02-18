import { SocialEditor } from '@/components/social/SocialEditor'
import { AuthGate } from '@/components/social/AuthGate'

export const metadata = {
  title: 'Social Templates - Aurora Solutions',
  robots: 'noindex, nofollow',
}

export default function SocialPage() {
  return (
    <AuthGate>
      <SocialEditor />
    </AuthGate>
  )
}
