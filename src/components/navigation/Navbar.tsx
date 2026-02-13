'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/ThemeProvider'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Contact', href: '/#contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Simple scroll spy - only on homepage
      if (isHomePage) {
        const sections = ['home', 'services', 'portfolio', 'testimonials', 'contact']
        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section)
              break
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)

    if (href === '/') {
      router.push('/')
      return
    }

    // If we're on homepage, scroll to section
    if (isHomePage) {
      const sectionId = href.substring(2) // Remove '/#'
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 80 // Account for navbar height
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    } else {
      // If on other page, navigate to homepage with hash
      router.push(href)
    }
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg shadow-primary/5 border-b border-gray-200 dark:border-white/10'
          : 'bg-white/30 dark:bg-black/30 backdrop-blur-sm'
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={theme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png'}
              alt="Aurora Solutions"
              width={600}
              height={180}
              className="h-32 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => {
              let isActive = false
              if (item.href === '/') {
                // Home is active only when on homepage and at the top
                isActive = pathname === '/' && activeSection === 'home'
              } else {
                // Other items active when on homepage and section matches
                isActive = isHomePage && activeSection === item.href.substring(2)
              }

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'text-sm font-medium transition-all px-3 py-1.5 rounded-md',
                    isActive
                      ? 'text-black bg-primary/20 dark:text-primary dark:bg-primary/10'
                      : 'text-black dark:text-white hover:bg-primary/20 dark:hover:bg-primary/10 dark:hover:text-primary'
                  )}
                >
                  {item.name}
                </button>
              )
            })}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-black dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 hover:text-black dark:hover:text-primary transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <Button
              onClick={() => handleNavClick('/#contact')}
              className="bg-primary text-black font-semibold hover:bg-primary/90 shadow-lg"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-black dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 hover:text-black dark:hover:text-primary transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              className="p-2 rounded-md transition-colors text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
          <Container>
            <div className="py-6 space-y-4">
              {navigation.map((item) => {
                let isActive = false
                if (item.href === '/') {
                  // Home is active only when on homepage and at the top
                  isActive = pathname === '/' && activeSection === 'home'
                } else {
                  // Other items active when on homepage and section matches
                  isActive = isHomePage && activeSection === item.href.substring(2)
                }

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'block w-full text-left px-4 py-2 text-base font-medium rounded-md transition-colors',
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                    )}
                  >
                    {item.name}
                  </button>
                )
              })}
              <div className="px-4 pt-2">
                <Button
                  onClick={() => handleNavClick('/#contact')}
                  className="w-full bg-primary text-black hover:bg-primary/90"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </nav>
  )
}
