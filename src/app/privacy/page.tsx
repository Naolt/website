import { Container } from '@/components/ui/Container'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Aurora Solutions',
  description: 'Privacy Policy for Aurora Solutions - How we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-500 dark:text-white/60 mb-8">
            Last updated: February 2026
          </p>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Introduction</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Aurora Solutions (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                you visit our website or use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Personal Information</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-2 ml-4">
                <li>Fill out our contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Request a quote or consultation</li>
                <li>Communicate with us via email, WhatsApp, or phone</li>
              </ul>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mt-3">
                This information may include: name, email address, phone number, company name, and project details.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-2 ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website</li>
                <li>Device information (operating system, screen size)</li>
              </ul>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mt-3">
                We use Google Analytics to collect and analyze this data to improve our website and services.
              </p>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-2 ml-4">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you information about our services and updates</li>
                <li>Improve our website and user experience</li>
                <li>Analyze usage patterns and trends</li>
                <li>Prevent fraud and ensure security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                We do not sell, trade, or rent your personal information to third parties. We may share your
                information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-2 ml-4">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service
                providers who assist us in operating our website and conducting our business (e.g., email service
                providers, analytics providers)</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in
                response to valid requests by public authorities</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets,
                your information may be transferred</li>
              </ul>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                We use cookies and similar tracking technologies to track activity on our website and store
                certain information. Cookies are files with small amount of data that are sent to your browser
                from a website and stored on your device.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                We use Google Analytics, which uses cookies to collect and analyze information about website usage.
                You can opt-out of Google Analytics by installing the Google Analytics opt-out browser add-on.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Data Security</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. However, no
                method of transmission over the Internet or electronic storage is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Data Retention</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined
                in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Your Rights</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-2 ml-4">
                <li>Access: Request access to your personal information</li>
                <li>Correction: Request correction of inaccurate or incomplete information</li>
                <li>Deletion: Request deletion of your personal information</li>
                <li>Objection: Object to processing of your personal information</li>
                <li>Portability: Request transfer of your information to another service</li>
                <li>Withdraw Consent: Withdraw consent for processing where consent was the basis</li>
              </ul>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mt-3">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Third-Party Links</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy
                practices or content of these external sites. We encourage you to review the privacy policies
                of any third-party sites you visit.
              </p>
            </section>

            {/* International Data Transfers */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">International Data Transfers</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Your information may be transferred to and maintained on servers located outside of your country,
                where data protection laws may differ. By using our services, you consent to the transfer of your
                information to Ethiopia and other countries where we operate.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Children&apos;s Privacy</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect
                personal information from children. If you believe we have collected information from a child,
                please contact us immediately.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to
                review this Privacy Policy periodically for any changes.
              </p>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-6 space-y-2">
                <p className="text-gray-800 dark:text-white/90">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:AuroraSolutions11@gmail.com" className="text-gray-900 dark:text-primary hover:underline">
                    AuroraSolutions11@gmail.com
                  </a>
                </p>
                <p className="text-gray-800 dark:text-white/90">
                  <strong>Phone:</strong> +251 9 10940419 / +251 9 10168641
                </p>
                <p className="text-gray-800 dark:text-white/90">
                  <strong>Address:</strong> Addis Ababa, Ethiopia
                </p>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
