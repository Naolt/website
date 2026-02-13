import { Container } from '@/components/ui/Container'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Aurora Solutions',
  description: 'Terms of Service for Aurora Solutions - Terms and conditions for using our website and services.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-500 dark:text-white/60 mb-8">
            Last updated: February 2026
          </p>

          <div className="prose prose-invert prose-lg max-w-none space-y-8">
            {/* Agreement to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Agreement to Terms</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                These Terms of Service (&quot;Terms&quot;) govern your access to and use of Aurora Solutions&apos; website
                and services. By accessing our website or using our services, you agree to be bound by these Terms.
                If you do not agree to these Terms, please do not use our services.
              </p>
            </section>

            {/* Services Description */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Services Description</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                Aurora Solutions provides digital solutions including, but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-2 ml-4">
                <li>Web development and design</li>
                <li>Mobile application development</li>
                <li>ERP/CRM systems development and integration</li>
                <li>Branding and strategy consulting</li>
                <li>Digital marketing services</li>
                <li>Design and creative services</li>
                <li>Video production</li>
              </ul>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mt-3">
                The specific scope, deliverables, timeline, and pricing for each project will be defined in
                a separate project agreement or statement of work.
              </p>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">User Responsibilities</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                When using our website and services, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-2 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not interfere with or disrupt our services or servers</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not use our services to transmit malicious code or spam</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </section>

            {/* Project Engagement */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Project Engagement Process</h2>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Consultation and Proposal</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                We provide a free initial consultation to understand your requirements. Based on this consultation,
                we will provide a detailed proposal outlining scope, timeline, deliverables, and pricing. The
                proposal does not constitute a binding agreement until both parties sign a formal contract.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Payment Terms</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                Unless otherwise specified in the project agreement:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-2 ml-4">
                <li>Projects may require an upfront deposit (typically 30-50% of total cost)</li>
                <li>Milestone-based payments may be arranged for larger projects</li>
                <li>Final payment is due upon project completion and delivery</li>
                <li>Late payments may result in project delays or suspension of services</li>
                <li>All fees are quoted in USD, EUR, or ETB as specified in the agreement</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Project Timeline</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Project timelines are estimates based on the scope of work and assume timely client feedback and
                approvals. Delays in client response, scope changes, or unforeseen technical challenges may
                extend the timeline. We will communicate any timeline changes promptly.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Revisions and Changes</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Each project agreement will specify the number of included revisions. Additional revisions or
                changes to the agreed scope may incur additional charges. Major scope changes may require a
                new proposal and contract amendment.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Intellectual Property Rights</h2>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Client Materials</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                You retain ownership of any content, materials, or intellectual property you provide to us
                (&quot;Client Materials&quot;). By providing Client Materials, you grant us a license to use them for
                the purpose of delivering the agreed services.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Deliverables</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Upon full payment, you will receive ownership rights to the final deliverables as specified in
                the project agreement. This typically includes source code, design files, and documentation.
                Aurora Solutions retains the right to use the project in our portfolio unless otherwise agreed.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Third-Party Components</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Projects may include third-party libraries, frameworks, or components. These remain subject to
                their respective licenses. We will inform you of any significant third-party dependencies.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Aurora Solutions Property</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Aurora Solutions retains ownership of our proprietary tools, processes, methodologies, and
                any pre-existing intellectual property used in delivering services.
              </p>
            </section>

            {/* Warranties and Disclaimers */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Warranties and Disclaimers</h2>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Service Warranty</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                We warrant that services will be performed with reasonable skill and care consistent with
                industry standards. We will correct any material defects in our work at no additional charge
                within 30 days of project delivery (unless otherwise specified).
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Disclaimer</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                Except as expressly stated, our services are provided &quot;as is&quot; without warranties of any kind,
                either express or implied. We do not warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-2 ml-4">
                <li>Our services will meet all your requirements</li>
                <li>Our services will be uninterrupted, timely, or error-free</li>
                <li>Results obtained from our services will be accurate or reliable</li>
                <li>Third-party services or platforms will remain available or compatible</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                To the maximum extent permitted by law, Aurora Solutions shall not be liable for:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-2 ml-4">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Damages arising from third-party services or platforms</li>
                <li>Damages resulting from your misuse of deliverables</li>
              </ul>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mt-3">
                Our total liability for any claim arising from our services shall not exceed the amount paid
                by you for the specific service giving rise to the claim.
              </p>
            </section>

            {/* Confidentiality */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Confidentiality</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                We will maintain the confidentiality of any proprietary or confidential information you share
                with us during the project. We will not disclose such information to third parties without your
                consent, except as required by law or as necessary to deliver the services (e.g., to our
                subcontractors under similar confidentiality obligations).
              </p>
            </section>

            {/* Support and Maintenance */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Support and Maintenance</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                Unless otherwise agreed, our services do not include ongoing support or maintenance after project
                delivery. We offer separate maintenance and support packages that can be purchased. Emergency
                support may be available at our then-current hourly rates.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Termination</h2>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Termination by Client</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                You may terminate a project at any time by providing written notice. You will be responsible
                for payment for all work completed up to the termination date, plus any non-refundable expenses
                incurred.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-3 mt-6">Termination by Aurora Solutions</h3>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                We may terminate our services if:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-white/70 space-y-2 ml-4">
                <li>You fail to make required payments</li>
                <li>You breach these Terms or the project agreement</li>
                <li>You fail to provide necessary materials or feedback for an extended period</li>
                <li>Continuing the project becomes impractical or impossible</li>
              </ul>
            </section>

            {/* Force Majeure */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Force Majeure</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                We shall not be liable for any delay or failure to perform our obligations due to circumstances
                beyond our reasonable control, including but not limited to natural disasters, war, terrorism,
                riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics,
                strikes, or shortages of transportation, fuel, energy, labor, or materials.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Dispute Resolution</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                In the event of any dispute arising from these Terms or our services, both parties agree to
                first attempt to resolve the matter through good faith negotiation. If negotiation fails, the
                dispute shall be resolved through mediation or arbitration in Addis Ababa, Ethiopia, in
                accordance with Ethiopian law.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Governing Law</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Ethiopia,
                without regard to its conflict of law provisions.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Severability</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall
                be limited or eliminated to the minimum extent necessary, and the remaining provisions shall
                remain in full force and effect.
              </p>
            </section>

            {/* Entire Agreement */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Entire Agreement</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                These Terms, together with any project agreement or statement of work, constitute the entire
                agreement between you and Aurora Solutions regarding our services and supersede all prior
                agreements and understandings.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Changes to These Terms</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any material
                changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date. Your
                continued use of our services after such changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Contact Information</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-3">
                If you have any questions about these Terms, please contact us:
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

            {/* Acknowledgment */}
            <section>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Acknowledgment</h2>
              <p className="text-gray-600 dark:text-white/70 leading-relaxed">
                By using our website or services, you acknowledge that you have read, understood, and agree
                to be bound by these Terms of Service.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  )
}
