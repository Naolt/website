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
      className="text-sm text-gray-600 dark:text-white/60 hover:text-black hover:bg-primary/20 dark:hover:text-primary dark:hover:bg-transparent transition-all px-2 py-1 rounded -mx-2"
    >
      {children}
    </button>
  )
}
