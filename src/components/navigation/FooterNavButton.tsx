'use client'

interface FooterNavButtonProps {
  href: string
  children: React.ReactNode
}

export function FooterNavButton({ href, children }: FooterNavButtonProps) {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1))
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <button
      onClick={() => scrollToSection(href)}
      className="text-sm text-white/60 hover:text-primary transition-colors"
    >
      {children}
    </button>
  )
}
