'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import navigations from '../navigation-list/navigation';

const PrivacyPolicy: React.FC = () => {
    const router = useRouter();
    useEffect(() => {
        router.prefetch(navigations.home);
        router.prefetch(navigations.blogList);
      }, []);

    return (
        <div className="custom-container relative z-0 py-8 lg:py-10 px-0 mt-20 mb-5">
            <div className="flex  flex-col items-start justify-center text-left mb-5 md:mb-6 lg:mb-10">
                <h4 className="pagebanner-title">Privacy Policy</h4>
                <p className="para-text text-[#71717A]">
                Last updated: September 20th, 2024</p>
            </div>
            <ul className="flex  flex-col gap-5 md:gap-6 lg:gap-10 text-left">
                <li>
                    <h3 className="content-lable">Introduction</h3>
                    <p className="para-text text-[#525252]">
                    PostReach AI (“we,” “our,” or “us”) operates the <a className="text-themeblue" href="#">https://postreach.ai</a> website and provides associated services (collectively, the “Platform”) to users (“you” or “your”). This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you interact with our Platform. Please review this Privacy Policy carefully to understand our practices regarding your personal data and how we protect it.
                    </p>
                   
                </li>

                <li>
                    <h3 className="content-lable">2. Data Controller</h3>
                    <p className="para-text text-[#525252]">
                    PostReach AI is the data controller of the personal data you provide through this Platform, meaning we determine the purposes and means of processing your personal information. By using our Platform, you agree to this Privacy Policy and consent to the data practices described.
                    </p>
                </li>

                <li>
                    <h3 className="content-lable">3. Personal Information We Collect</h3>
                    <p className="para-text text-[#525252]">
                    When you use our Platform, we may collect and process the following types of personal information:
                    </p>
                    <ul className="my-4 gap-3 flex flex-col list-inside list-disc para-text text-[#525252]">
                        <li>
                        <b>Device Information:</b> We collect information about your device, such as IP address, browser type, time zone, referring/exit pages, and certain cookies installed on your device.
                        </li>
                        <li>
                        <b>Usage Information:</b> We gather information on the individual web pages or products you view, websites or search terms that referred you to the Platform, and your interactions with the Platform.
                        </li>
                        <li>
                        <b>Personal Data Provided by You:</b> When you register or use certain features, you may provide personal information, such as your name, email, address, phone number, payment details, and organization information.
                        </li>
                        <li>
                        <b>Log Files:</b> In line with industry practices, our Platform logs certain data for operational and security purposes, including IP addresses, ISP, and other data used for analytics. This data is not linked to identifiable users.
                        </li>
                        
                    </ul>
                    <p className="para-text text-[#525252]">
                    While we generally do not monitor user content, we reserve the right to remove any material that does not comply with these Terms or is deemed harmful, objectionable, or inaccurate. By posting content, you waive any claims against us regarding content removal. We may suspend or terminate your access to the Platform, without notice, if you violate these Terms and may cooperate with law enforcement regarding violations of security or suspected illegal activities.
                     </p>
                </li>
                <li>
                    <h3 className="content-lable">4. Use of Collected Information</h3>
                    <p className="para-text text-[#525252]">
                    We use your personal data to:
                    </p>
                    <ul className="my-4 gap-3 flex flex-col list-inside list-disc para-text text-[#525252]">
                        <li>
                        <b>Provide and Improve Services:</b> Facilitate account setup, process payments, respond to inquiries, and deliver services.
                        </li>
                        <li>
                        <b>Security and Fraud Prevention:</b>  Identify potential cases of abuse and enhance security.
                        </li>
                        <li>
                        <b>Analysis and Research:</b>  Conduct analysis and generate statistical information to improve our Platform’s performance and user experience.
                        </li>
                        
                    </ul>
                    <p className="para-text text-[#525252]">
                    Your information may be processed based on fulfilling a contract, consent, legal compliance, or our legitimate business interests.
                     </p>
                </li>
                <li>
                    <h3 className="content-lable">5. Cookies and Tracking Technologies</h3>
                    <p className="para-text text-[#525252]">
                    We use cookies and similar tracking technologies to provide a personalized browsing experience, store your preferences, and gather data on how users engage with our Platform. You can adjust your browser settings to refuse cookies; however, this may impact certain Platform features. For more information on cookies, please refer to [insert link or brief explanation].
                    </p>
                   
                </li>
                <li>
                    <h3 className="content-lable">6. Your Rights (for EEA Residents)</h3>
                    <p className="para-text text-[#525252]">
                    If you are a resident of the European Economic Area (EEA), you have the following data protection rights under the General Data Protection Regulation (GDPR):
                    </p>
                    <ul className="my-4 gap-3 flex flex-col list-inside list-disc para-text text-[#525252]">
                        <li>
                        The right to be informed about our data processing practices.
                        </li>
                        <li>
                        The right to access your personal data.
                        </li>
                        <li>
                        The right to correct or delete your personal data.
                        </li>
                        <li>
                        The right to restrict or object to data processing.
                        </li>
                        <li>
                        The right to data portability.
                        </li>
                        <li>
                        The right to withdraw consent where data is processed based on consent.
                        </li>
                        
                    </ul>
                    <p className="para-text text-[#525252]">
                    To exercise these rights, please contact us at <a className="text-themeblue" href="#">support@postreach.ai</a>. If you are not in the EEA, these rights may vary depending on your location.
                     </p>
                </li>
                <li>
                    <h3 className="content-lable">7. Third-Party Links and External Websites</h3>
                    <p className="para-text text-[#525252]">
                    Our Platform may link to third-party sites or services, such as social media platforms or analytics services. We do not control or endorse the privacy practices of these third parties. We advise you to review their privacy policies to understand how they handle your data.
                    </p>
                   
                </li>
                <li>
                    <h3 className="content-lable">8. Children’s Privacy</h3>
                    <p className="para-text text-[#525252]">
                    Our Platform is not intended for children under the age of 13, and we do not knowingly collect data from children. If you believe we have collected such information, please contact us, and we will promptly remove it.
                    </p>
                   
                </li>
                <li>
                    <h3 className="content-lable">9. Information Security</h3>
                    <p className="para-text text-[#525252]">
                    We are committed to safeguarding your data and implement reasonable administrative, technical, and physical measures to protect against unauthorized access, use, and disclosure of your personal data. However, data transmitted over the internet cannot be guaranteed to be 100% secure, and we cannot fully eliminate security risks associated with data transmission.
                    </p>
                   
                </li>
                <li>
                    <h3 className="content-lable">10. Data Retention</h3>
                    <p className="para-text text-[#525252]">
                    We retain your personal information only for as long as is necessary for the purposes outlined in this Privacy Policy. We may retain and use your data to comply with legal obligations, resolve disputes, and enforce our policies. Once no longer required, your data will be securely deleted.
                    </p>
                   
                </li>
                <li>
                    <h3 className="content-lable">11. Legal Disclosures</h3>
                    <p className="para-text text-[#525252]">
                    We may disclose your data if required by law, in response to valid legal processes, or in cases where we believe disclosure is necessary to protect our rights, investigate fraud, or comply with government requests.
                    </p>
                   
                </li>
                <li>
                    <h3 className="content-lable">12. Updates to This Privacy Policy</h3>
                    <p className="para-text text-[#525252]">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any changes will be posted on this page, and if the changes are material, we will notify you by email or through the Platform. Your continued use of the Platform after such updates constitutes acceptance of the revised Privacy Policy.
                    </p>
                   
                </li>
                <li>
                    <h3 className="content-lable">13. Contact Information</h3>
                    <p className="para-text text-[#525252]">
                    For questions or concerns about this Privacy Policy or to exercise your rights regarding your personal data, please contact us at: <a className="text-themeblue" href="#">support@postreach.ai</a>
                    </p>
                   
                </li>
                <li>
                    <h3 className="content-lable">14. Consent</h3>
                    <p className="para-text text-[#525252]">
                    By using the Platform, you consent to this Privacy Policy and agree to its terms.
                    </p>
                   
                </li>
                
            </ul>
          
        </div>
    );
};

export default PrivacyPolicy;
