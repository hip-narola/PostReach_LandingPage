'use client'
// import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import navigations from '../navigation-list/navigation';
import { Accordion, AccordionItem } from "@nextui-org/react";
import { AccCloseIcon } from './AccCloseIcon';
import { AccOpenIcon } from './AccOpenIcon';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { motion } from 'framer-motion';
import { DataContext } from '../context/shareData';
import routes from '../navigation-list/route-list';
import { client } from "../../sanity/client";
import { BlogType } from '../response/responseType';
import moment from 'moment';
import { urlFor } from '../../sanity/client';
import { useLoading } from '../context/LoadingContext';
import { customerReview } from '../JSON-data/client-review';


const MainLayout: React.FC = () => {
  const router = useRouter();
  const options = { next: { revalidate: 30 } };
  const context = useContext(DataContext);
  const [animationSide, setAnimationSide] = useState(-100)
  const [currentTab, setCurrentTab] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);
  const { setIsLoading } = useLoading();


  const [latestBlog, setLatest] = useState<BlogType[]>([]);
  if (!context) {
    throw new Error('DataContext must be used within a DataProvider');
  }

    // Group products in sets of 3 for mobile
    const groupedProducts = [];
    for (let i = 0; i < customerReview.length; i += 3) {
      groupedProducts.push(customerReview.slice(i, i + 3));
    }
  

  const itemClasses = {
    base: "accordion",
    trigger: "p-0 gap-6",
    indicator: "text-medium",
    content: "pb-0 text-base text-[#525252] font-normal text-left",
  };

  useEffect(() => {
    setIsLoading(false);
    getLatestdBlogs();
  }, [])

  useEffect(() => {
    handleScroll(context.getData);
  }, [context.getData]);

  const handleViewBlog = () => {
    router.push(navigations.blogList)
  }

  const handleBlogDetail = (slug: string) => {
    router.push(`${navigations.blogDetail}/${slug}`)
  }

  const homeRef = useRef<HTMLDivElement | null>(null);
  const featureRef = useRef<HTMLDivElement | null>(null);
  const integrationRef = useRef<HTMLDivElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (activeTab: string) => {
    setIsLoading(false);
    const offset = 100;
    let ref: HTMLElement | null = null;
    if (activeTab == 'home' && homeRef.current) {
      ref = homeRef.current
    }

    if (activeTab == 'feature' && featureRef.current) {
      ref = featureRef.current;
    }

    if (activeTab == 'integration' && integrationRef.current) {
      ref = integrationRef.current
    }

    if (activeTab == 'pricing' && pricingRef.current) {
      ref = pricingRef.current
    }

    setTimeout(() => {
      if(ref){
        const elementPosition = ref.getBoundingClientRect().top; 
        const offsetPosition = elementPosition + window.scrollY - offset; // Adjust for header offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  
  const getLatestdBlogs = async () => {
    const feature = await client.fetch(routes.LatestBlog, {}, options);
    setLatest(feature)
  }

  const handleTabChange = (key: React.Key) => {
    const newTabIndex: number = parseInt(key as string);

    // Update animation direction
    setAnimationSide(newTabIndex > currentTab ? 100 : -100);

    // Update the active tab index
    setCurrentTab(newTabIndex);
  };

  const handleClose =() => {
    setIsOpen(false)
  }

  return (
    <div className="">

      {/* <!-- Section Banner --> */}
      <div className="mx-auto   relative z-0 px-4 lg:px-0 pt-24 pb-12 lg:pt-28 lg:pb-0 xl:pt-40 overflow-hidden" ref={homeRef}>
        <div className="absolute max-[375px]:-bottom-28 max-[767px]:bottom-0  md:top-0 left-0 -z-10 flex justify-center w-full text-center">
          <img src="../assets/images/banner-bg.webp" className="" alt="banner-bg" />
          {/* <img src="../assets/images/banner375.webp" className="max-[375px]:block hidden"  alt="banner-bg" /> */}
        </div>
        <div className="text-center max-w-full md:max-w-[calc(100%-2rem)] min-[1365px]:max-w-[1200px] mx-auto">
          <h1 className="banner-title max-[600px]:hidden block relative">Automate Your
            <span className="inline md:block"> Social Media
              <span className="gradient-title relative max-[767px]:max-w-max max-[767px]:m-auto max-[767px]:block"> Effortlessly
                <div className="absolute -top-2 -right-10 max-[767px]:top-0 max-[767px]:-right-5 max-[767px]:max-w-5">
                  <img src="../assets/icons/banner-title-icon.svg" alt="banner-title-icon" />

                </div>
              </span>
            </span>

          </h1>
          <h1 className="banner-title max-[600px]:block hidden relative">Automate
            <span className="block">Your Social Media
              <span className="gradient-title relative max-[767px]:max-w-max max-[767px]:m-auto max-[767px]:block"> Effortlessly
                <div className="absolute -top-2 -right-10 max-[767px]:top-0 max-[767px]:-right-5 max-[767px]:max-w-5">
                  <img src="../assets/icons/banner-title-icon.svg" alt="banner-title-icon" />

                </div>
              </span>
            </span>

          </h1>

          <p className="mt-4 lg:mt-6 text-sm md:text-base lg:text-lg  text-textlight max-w-[985px] mx-auto">Elevate your social media presence with PostReach. Our intelligent AI engine understands your business goals and audience preferences, delivering engaging content and automating your entire social media workflow.</p>
          <div className="flex items-center justify-center gap-2 mt-6  text-sm md:text-base text-textdark font-semibold">
            <img src="../assets/icons/banner-members.svg" alt="banner-title-icon" />
            500+ members in our waitlist
          </div>
          <div className="mt-6 flex items-center flex-col justify-center gap-x-6">
            <a  className="cursor-pointer min-w-48 bg-themeblue text-sm md:text-base leading-6 font-semibold px-6 py-3 rounded-full text-white border border-themeblue hover:border-textdark hover:text-textdark hover:bg-white"
            onClick={() => {
              if (window.ml) {
                window.ml('show', 'n1oinc', true);
              } else {
                console.error("MailerLite is not initialized.");
              }
            }} >Join our waitlist</a>
            <p className="text-sm text-textlight font-normal text-center mt-2">Credit Card not required, Cancel anytime.</p>
          </div>

          {/* banner image */}
          <div className="relative mt-20 md:mt-10">
            <div className="absolute -top-14 md:-top-24 -right-4 md:-right-5 max-[767px]:max-w-40">
              <img src="../assets/icons/just-few-steps-arrow.svg" alt="just-few-steps-arrow.svg" />
            </div>
            <a onClick={() => setIsOpen(true)} className="abosolute-div-center video-play-button absolute cursor-pointer">
              <img src="../assets/icons/play-icon.png" alt="play-icon" />
            </a>
            <img src="../assets/images/video-banner.webp" alt="video-banner" />

            <div className="banner-fb-icon absolute -left-6 xl:-left-14 top-1/2 -mt-12 lg:-mt-16 max-w-14 xl:max-w-20">
              <img src="../assets/images/banner-fb.png" alt="banner-fb-icon" />
            </div>
            <div className="banner-insta-icon absolute -right-6 xl:-right-16 top-1/2 -mt-12 lg:-mt-16 max-w-16 xl:max-w-[95px]">
              <img src="../assets/images/banner-insta.png" alt="banner-insta-icon" />
            </div>
            <div className="banner-like-icon absolute -left-5 top-1/2 mt-10 lg:mt-20 max-[767px]:max-w-20 max-[1280px]:max-w-24">
              <img src="../assets/images/banner-like.png" alt="banner-like-icon" />
            </div>
            <div className="banner-thumb-icon absolute -right-5 xl:-right-9 top-1/2 mt-12 lg:mt-20 max-[1280px]:max-w-16">
              <img src="../assets/images/banner-thumb.png" alt="banner-thumb-icon" />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Section Banner --> */}
      {/* <!-- Section Video --> */}

      {/* <!-- End Section Video --> */}
      {/* <!-- Section Why Choose PostReach? --> */}
      <div className="custom-container container-lg bg-[#F1F6FC] rounded-[32px] relative z-0 p-5 lg:p-10 xl:p-16 my-12">
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden -z-10 ">
          <img src="../assets/images/dot-bg.png" className="max-w-[1440px]" alt="dot-bg" />
        </div>
        <div className="grid grid-cols-1 items-center justify-center mb-6 lg:mb-8 xl:mb-14">
          <div className="flex  flex-col items-start justify-center text-center">
            <h4 className="sec-title  w-full">Why Choose   <span className="text-themeblue">PostReach?</span></h4>
            <p className="para-text max-w-[590px] mx-auto">
              Simplify social media management with smart automation, seamless integrations, and an intuitive design tailored for SMBs.</p>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} viewport={{ once: false, amount: 0.3 }} className="my-section">
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6 ">

            <div className="flex  flex-col items-start bg-white rounded-2xl p-4 lg:p-6">
              <div className="max-w-10 lg:max-w-14">
                <img src="../assets/icons/why-choose-us/SocialMediaExpert.webp" alt="SocialMediaExpert" />
              </div>
              <h4 className="text-base lg:text-xl font-bold text-textdark mt-3 lg:mt-4 mb-1 lg:mb-2">Social Media Expert</h4>
              <p className="para-text">Our AI engine crafts personalised posts tailored to your goals, audience, and brand voice.</p>
            </div>
            <div className="flex  flex-col items-start bg-white rounded-2xl p-4 lg:p-6">
              <div className="max-w-10 lg:max-w-14">
                <img src="../assets/icons/why-choose-us/Automated-Scheduling.webp" alt="Automated-Scheduling" />
              </div>
              <h4 className="text-base lg:text-xl font-bold text-textdark mt-3 lg:mt-4 mb-1 lg:mb-2">Automated Scheduling</h4>
              <p className="para-text">Save time with fully automated content creation, scheduling, and posting to ensure effortless consistency for your business.</p>
            </div>
            <div className="flex  flex-col items-start bg-white rounded-2xl p-4 lg:p-6">
              <div className="max-w-10 lg:max-w-14">
                <img src="../assets/icons/why-choose-us/built-for-you.webp" alt="built-for-you" />
              </div>
              <h4 className="text-base lg:text-xl font-bold text-textdark mt-3 lg:mt-4 mb-1 lg:mb-2">Built for You</h4>
              <p className="para-text">Affordable, easy to use, and designed to simplify social media for busy businesses and creators.</p>
            </div>

          </div>
        </motion.div>

        <div className="grid md:hidden grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} viewport={{ once: false, amount: 0.3 }} className="my-section">
            <div className="flex  flex-col items-start bg-white rounded-2xl p-4 lg:p-6">
              <div className="max-w-10 lg:max-w-14">
                <img src="../assets/icons/SocialMediaExpert.svg" alt="SocialMediaExpert" />
              </div>
              <h4 className="text-base lg:text-xl font-bold text-textdark mt-3 lg:mt-4 mb-1 lg:mb-2">Social Media Expert</h4>
              <p className="para-text">Our AI engine crafts personalised posts tailored to your goals, audience, and brand voice.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} viewport={{ once: false, amount: 0.3 }} className="my-section">
            <div className="flex  flex-col items-start bg-white rounded-2xl p-4 lg:p-6">
              <div className="max-w-10 lg:max-w-14">
                <img src="../assets/icons/Automated-Scheduling.svg" alt="Automated-Scheduling" />
              </div>
              <h4 className="text-base lg:text-xl font-bold text-textdark mt-3 lg:mt-4 mb-1 lg:mb-2">Automated Scheduling</h4>
              <p className="para-text">Save time with fully automated content creation, scheduling, and posting to ensure effortless consistency for your business.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }} viewport={{ once: false, amount: 0.3 }} className="my-section">
            <div className="flex  flex-col items-start bg-white rounded-2xl p-4 lg:p-6">
              <div className="max-w-10 lg:max-w-14">
                <img src="../assets/icons/built-for-you.svg" alt="built-for-you" />
              </div>
              <h4 className="text-base lg:text-xl font-bold text-textdark mt-3 lg:mt-4 mb-1 lg:mb-2">Built for You</h4>
              <p className="para-text">Affordable, easy to use, and designed to simplify social media for busy businesses and creators.</p>
            </div>
          </motion.div>
        </div>

      </div>
      {/* <!-- End Section Why Choose PostReach? --> */}

      {/* <!-- Section Features --> */}
      <div className="custom-container container-lg relative mb-12 lg:mb-0 z-0 p-0 lg:p-10 xl:p-16" ref={featureRef}>
        <div className="grid grid-cols-1 items-center justify-center my-8 lg:my-12">
          <div className="flex flex-col  lg:flex-row items-start justify-center text-left gap-0 lg:gap-12 xl:gap-20">
            <h4 className="sec-title  w-full"><span className="text-themeblue">Powerful Features</span> for Effortless Social Media Management   </h4>
            <p className="para-text max-w-full lg:max-w-[465px] mx-auto">
              PostReach AI offers a suite of powerful tools designed to make social media management seamless and efficient. From fully automated posting to insightful analytics, we help you stay in control while saving time and boosting your online presence. </p>
          </div>
        </div>
        {/* tab */}

        <Tabs fullWidth aria-label="Options" color="primary" variant="bordered" radius="full" onSelectionChange={handleTabChange}
          classNames={{
            tabList: "feature-tabs w-full border-none shadow-none bg-white p-[2px] mb-4",
            cursor: "",
            tab: "text-base font-bold text-[#292929] h-12 px-6 lg:px-7 border border-[#292929] min-w-48",
            tabContent: ""
          }}>


          <Tab key="1" title={
            <div className="flex items-center space-x-2">
              <img src="../assets/icons/tabs/Tab1.svg" alt="AutopilotMode" />
              <span className="text-base font-bold text-[#292929]">Autopilot Mode</span>
            </div>
          } >
            <Card className="shadow-none">
              <CardBody className=" p-0">
                {/* Autopilot Mode tabs content */}

                <div className="grid md:hidden grid-cols-1 md:grid-cols-2 xl:grid-cols-[385px,1fr] gap-5 overflow-x-hidden">
                  {/* <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section"> */}
                  <motion.div initial={{ opacity: 0, x: (animationSide) }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex justify-center">
                      <img src="../assets/images/autopilot-mode.webp" className="max-w-full object-contain" alt="autopilot-mode" />
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: animationSide }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex  flex-col items-start max-[767px]:order-2">
                      <p className="para-text text-textdark">
                        Automate your social media completely, ensuring consistent posting without the hassle.
                      </p>
                      <ul className="flex flex-col gap-6 md:gap-7 mt-10">
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/fully-automated-icon.webp" className="w-12" alt="fully-automated-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Fully Automated Content Creation</h4>
                            <p className="small-text">Our AI learns your business goals and audience, crafting engaging posts.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/IntelligentScheduling-icon.webp" className="w-12" alt="IntelligentScheduling-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Intelligent Scheduling</h4>
                            <p className="small-text">Posts are automatically scheduled at the optimal times for maximum reach and engagement.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/Hands-FreePosting-icon.webp" className="w-12" alt="Hands-Free Posting-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Hands-Free Posting</h4>
                            <p className="small-text">Enjoy a consistent online presence while PostReach handles the entire posting process.</p>
                          </div>
                        </li>

                      </ul>
                    </div>
                  </motion.div>

                </div>
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[385px,1fr] gap-5 overflow-x-hidden">
                  <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    {/* <motion.div initial={{ opacity: 0, x: animationSide}} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section"> */}
                    <div className="flex  flex-col items-start max-[767px]:order-2">
                      <p className="para-text text-textdark">
                        Automate your social media completely, ensuring consistent posting without the hassle.
                      </p>
                      <ul className="flex flex-col gap-6 md:gap-7 mt-10">
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/fully-automated-icon.webp" className="w-12" alt="fully-automated-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Fully Automated Content Creation</h4>
                            <p className="small-text">Our AI learns your business goals and audience, crafting engaging posts.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/IntelligentScheduling-icon.webp" className="w-12" alt="IntelligentScheduling-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Intelligent Scheduling</h4>
                            <p className="small-text">Posts are automatically scheduled at the optimal times for maximum reach and engagement.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/Hands-FreePosting-icon.webp" className="w-12" alt="Hands-Free Posting-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Hands-Free Posting</h4>
                            <p className="small-text">Enjoy a consistent online presence while PostReach handles the entire posting process.</p>
                          </div>
                        </li>

                      </ul>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    {/* <motion.div initial={{ opacity: 0, x:(animationSide) }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section"> */}
                    <div className="flex justify-center">
                      <img src="../assets/images/autopilot-mode.webp" className="max-w-full object-contain" alt="autopilot-mode" />
                    </div>
                  </motion.div>
                </div>
                {/* End Autopilot Mode tabs content */}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="2" title={
            <div className="flex items-center space-x-2">
              <img src="../assets/icons/tabs/Tab2.svg" alt="AutopilotMode" />

              <span className="text-base font-bold text-[#292929]">Approval Queue</span>
            </div>
          }>
            <Card className="shadow-none">
              <CardBody className=" p-0">
                {/* ApprovalQueue tabs content */}
                <div className="grid md:hidden grid-cols-1 md:grid-cols-2 xl:grid-cols-[385px,1fr] gap-5 overflow-x-hidden">

                  <motion.div initial={{ opacity: 0, x: animationSide }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex justify-center">
                      <img src="../assets/images/ApprovalQueue.webp" className="max-w-full object-contain" alt="ApprovalQueue" />

                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: animationSide }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex  flex-col items-start max-[767px]:order-2">
                      <p className="para-text text-textdark">
                        Review, edit, or approve posts before publishing to control over your content.
                      </p>
                      <ul className="flex flex-col gap-6 md:gap-7 mt-10">
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/FullControlOverContent.webp" className="w-12" alt="FullControlOverContent" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Full Control Over Content</h4>
                            <p className="small-text">Review and approve AI-generated posts to ensure they align perfectly with your brand.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/PreviewYourPosts.webp" className="w-12" alt="PreviewYourPosts" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Preview Your Posts</h4>
                            <p className="small-text">Visualise your post before it’s scheduled to go live.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/StreamlinedWorkflow.webp" className="w-12" alt="StreamlinedWorkflow" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Streamlined Workflow</h4>
                            <p className="small-text">Manage approvals effortlessly in one centralised location, saving you time. </p>
                          </div>
                        </li>

                      </ul>
                    </div>
                  </motion.div>
                </div>

                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[385px,1fr] gap-5 overflow-x-hidden">
                  <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex  flex-col items-start max-[767px]:order-2">
                      <p className="para-text text-textdark">
                        Review, edit, or approve posts before publishing to control over your content.
                      </p>
                      <ul className="flex flex-col gap-6 md:gap-7 mt-10">
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/FullControlOverContent.webp" className="w-12" alt="FullControlOverContent" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Full Control Over Content</h4>
                            <p className="small-text">Review and approve AI-generated posts to ensure they align perfectly with your brand.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/PreviewYourPosts.webp" className="w-12" alt="PreviewYourPosts" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Preview Your Posts</h4>
                            <p className="small-text">Visualise your post before it’s scheduled to go live.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/StreamlinedWorkflow.webp" className="w-12" alt="StreamlinedWorkflow" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Streamlined Workflow</h4>
                            <p className="small-text">Manage approvals effortlessly in one centralised location, saving you time. </p>
                          </div>
                        </li>

                      </ul>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex justify-center">
                      <img src="../assets/images/ApprovalQueue.webp" className="max-w-full object-contain" alt="ApprovalQueue" />

                    </div>
                  </motion.div>
                </div>
                {/* End ApprovalQueue tabs content */}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="3" title={
            <div className="flex items-center space-x-2">
              <img src="../assets/icons/tabs/Tab3.svg" alt="AutopilotMode" />

              <span className="text-base font-bold text-[#292929]">Calendar View</span>
            </div>
          } >
            <Card className="shadow-none">
              <CardBody className=" p-0">
                {/* Calendar View tabs content */}
                <div className="grid md:hidden grid-cols-1 md:grid-cols-2 xl:grid-cols-[385px,1fr] gap-5 overflow-x-hidden">

                  <motion.div initial={{ opacity: 0, x: animationSide }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex justify-center">
                      <img src="../assets/images/calendar-view.webp" className="max-w-full object-contain" alt="calendar-view" />
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: animationSide }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex  flex-col items-start max-[767px]:order-2">
                      <p className="para-text text-textdark">
                        Visualize your posting schedule with an intuitive calendar to plan ahead and stay organized.
                      </p>
                      <ul className="flex flex-col gap-6 md:gap-7 mt-10">
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/ClearScheduleOverview.webp" className="w-12" alt="Clear Schedule Overview" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Clear Schedule Overview</h4>
                            <p className="small-text">See all your scheduled posts in one clear, easy-to-navigate calendar.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/Platform-SpecificInsights.webp" className="w-12" alt="Platform-Specific Insights-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Platform-Specific Insights</h4>
                            <p className="small-text">Quickly identify which posts are scheduled for each platform. </p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/PlanWeeksAdvance.webp" className="w-12" alt="Plan Weeks in Advance" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Plan Weeks in Advance</h4>
                            <p className="small-text">Maintain a consistent posting schedule by mapping out your content weeks in advance.</p>
                          </div>
                        </li>

                      </ul>
                    </div>
                  </motion.div>
                </div>
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[385px,1fr] gap-5 overflow-x-hidden">
                  <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex  flex-col items-start max-[767px]:order-2">
                      <p className="para-text text-textdark">
                        Visualize your posting schedule with an intuitive calendar to plan ahead and stay organized.
                      </p>
                      <ul className="flex flex-col gap-6 md:gap-7 mt-10">
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/ClearScheduleOverview.webp" className="w-12" alt="Clear Schedule Overview" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Clear Schedule Overview</h4>
                            <p className="small-text">See all your scheduled posts in one clear, easy-to-navigate calendar.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/Platform-SpecificInsights.webp" className="w-12" alt="Platform-Specific Insights-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Platform-Specific Insights</h4>
                            <p className="small-text">Quickly identify which posts are scheduled for each platform. </p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/PlanWeeksAdvance.webp" className="w-12" alt="Plan Weeks in Advance" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Plan Weeks in Advance</h4>
                            <p className="small-text">Maintain a consistent posting schedule by mapping out your content weeks in advance.</p>
                          </div>
                        </li>

                      </ul>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex justify-center">
                      <img src="../assets/images/calendar-view.webp" className="max-w-full object-contain" alt="calendar-view" />
                    </div>
                  </motion.div>
                </div>
                {/* End Calendar View tabs content */}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="4" title={
            <div className="flex items-center space-x-2">
              <img src="../assets/icons/tabs/Tab4.svg" alt="AutopilotMode" />
              <span className="text-base font-bold text-[#292929]">Analytics</span>
            </div>
          } >
            <Card className="shadow-none">
              <CardBody className=" p-0">
                {/* analytics tabs content */}
                <div className="grid md:hidden grid-cols-1 md:grid-cols-2 xl:grid-cols-[385px,1fr] gap-5 overflow-x-hidden">

                  <motion.div initial={{ opacity: 0, x: animationSide }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex justify-center">
                      <img src="../assets/images/analytics.webp" className="max-w-full object-contain" alt="analytics" />

                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: animationSide }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex  flex-col items-start max-[767px]:order-2">
                      <p className="para-text text-textdark">
                        See your social media growth in one easy-to-read dashboard and optimize your strategy.
                      </p>
                      <ul className="flex flex-col gap-6 md:gap-7 mt-10">
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/ActionableInsights.webp" className="w-12" alt="Actionable Insights-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Actionable Insights</h4>
                            <p className="small-text">Track key metrics like reach, engagement, and audience growth to understand what’s working.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/Data-DrivenOptimisation.webp" className="w-12" alt="Data-Driven Optimisation-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Data-Driven Optimisation</h4>
                            <p className="small-text">Our AI engine learns from your data and analytics, continuously improving the content.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/SimplifiedReporting-icon.webp" className="w-12" alt="Simplified Reporting-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Simplified Reporting</h4>
                            <p className="small-text">Access easy-to-read reports that help you measure success and plan your next move.</p>
                          </div>
                        </li>


                      </ul>
                    </div>
                  </motion.div>
                </div>
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[385px,1fr] gap-5 overflow-x-hidden">
                  <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex  flex-col items-start max-[767px]:order-2">
                      <p className="para-text text-textdark">
                        See your social media growth in one easy-to-read dashboard and optimize your strategy.
                      </p>
                      <ul className="flex flex-col gap-6 md:gap-7 mt-10">
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/ActionableInsights.webp" className="w-12" alt="Actionable Insights-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Actionable Insights</h4>
                            <p className="small-text">Track key metrics like reach, engagement, and audience growth to understand what’s working.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/Data-DrivenOptimisation.webp" className="w-12" alt="Data-Driven Optimisation-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Data-Driven Optimisation</h4>
                            <p className="small-text">Our AI engine learns from your data and analytics, continuously improving the content.</p>
                          </div>
                        </li>
                        <li className="flex gap-4">
                          <div className="min-w-12">
                            <img src="../assets/icons/tabs/SimplifiedReporting-icon.webp" className="w-12" alt="Simplified Reporting-icon" />
                          </div>
                          <div className="">
                            <h4 className="text-base  font-semibold text-textdark mb-1">Simplified Reporting</h4>
                            <p className="small-text">Access easy-to-read reports that help you measure success and plan your next move.</p>
                          </div>
                        </li>


                      </ul>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                    <div className="flex justify-center">
                      <img src="../assets/images/analytics.webp" className="max-w-full object-contain" alt="analytics" />

                    </div>
                  </motion.div>
                </div>
                {/* End analytics tabs content */}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
        {/* tab */}

      </div>
      {/* <!-- End Section features --> */}



      {/* <!-- Section Getting Started --> */}
      <div className="custom-container min-[1232px]:max-w-[1200px] container-lg relative z-0 max-[640px]:my-2  p-0 lg:py-10 xl:py-16" >
        <div className="getting-stareted-after">
        </div>
        <div className="grid grid-cols-1 items-center justify-center mb-0 md:mb-8 lg:mb-12">
          <div className="flex  flex-col items-start justify-center text-center">
            <h4 className="sec-title  w-full">Getting Started is<span className="text-themeblue max-[575px]:block"> Simple and Easy</span></h4>
            <p className="para-text  mx-auto">
              Get started in minutes and let PostReach handle the rest – Social Media has never been this easy. </p>
          </div>
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-[620px,1fr]  xl:grid-cols-[1fr,508px]  gap-5 lg:gap-2 xl:gap-8 max-[640px]:w-[calc(100%+2rem)] max-[640px]:max-w-[calc(100%+2rem)]  max-[640px]:-ml-4 getting-stareted-main">
          <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} viewport={{ once: false, amount: 0.1 }} className="my-section">
            <div className="flex max-[640px]:justify-center lg:mt-5 relative max-[1023px]:max-w-[620px] max-[640px]:max-w-[375px] max-[1023px]:m-auto max-[1280px]:overflow-hidden">
              <div className="hidden sm:block" >
              <img src="../assets/images/getting-started-img.svg" alt="about" />
{/* <Gettingstartedsvg /> */}
              </div>
              <div className="block sm:hidden" >
              <img src="../assets/images/getting-started-img-sm.svg" alt="about" />
{/* <Gettingstartedsvg /> */}
              </div>
              {/* <div className="block sm:hidden">
              <img src="../assets/images/getting-started-img-mobile-new.svg.svg" alt="about" />
              </div> */}
              {/* <img src="../assets/images/getting-started-img.svg" className="max-w-full w-full z-10 hidden sm:block" alt="about" /> */}
              {/* <img src="../assets/images/getting-started-img-mobile.png" className="max-w-full w-full z-10 block sm:hidden " alt="about" /> */}
              <div className="absolute max-[640px]:max-w-12 left-12 max-[640px]:-top-2 max-[640px]:left-8 sm:left-4 xl:left-10 top-4 z-10 animate-updown">
                <img src="../assets/images/cursor.png" className="" alt="Cursor" />
              </div>
              <div className="absolute max-[640px]:max-w-16  max-[640px]:top-10  max-[640px]:right-16 top-24 right-16 xl:right-16 z-10 animate-updown">
                <img src="../assets/images/insta-gs.png" className="" alt="instagram" />
              </div>
              <div className="absolute max-[640px]:max-w-[70px] max-[640px]:bottom-16  max-[640px]:-ml-24 left-1/2 -translate-x-1/2 bottom-20 xl:bottom-20 -ml-20 sm:-ml-36 z-10 animate-downup">
                <img src="../assets/images/linkedin-gs.png" className="" alt="Linkedin" />
              </div>
              <div className="absolute -left-20 -bottom-20 -z-10  max-[640px]:hidden">
                <img src="../assets/images/getting-started-shadow.webp" className="" alt="getting-started-shadow" />
              </div>
              <div className="absolute left-5 -top-[26px] -z-10 max-[640px]:hidden">
              <div className="animatedsvg-wrapper">
              <svg
        width="512"
        height="485"
        viewBox="0 0 512 485"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Motion Path for First Circle */}
        <path
          id="theMotionPathcircle"
          d="M11 399V170C11 149.565 27.5655 133 48 133H141.095C146.948 133 152.718 134.388 157.93 137.051L371.07 245.949C376.282 248.612 382.052 250 387.905 250H463.694C484.052 250 500.586 266.447 500.693 286.806L501.5 440.5"
          stroke="#B3B3B3"
          strokeDasharray="5 5"
          className="path-circle"
        />

        {/* Motion Path for Second Circle */}
        <path
          id="theMotionPathline"
          d="M268 485V0"
          stroke="#B3B3B3"
          strokeDasharray="5 5"
          className="path-line"
        />

        {/* Moving Circle 1 */}
        <circle cx="0" cy="0" r="6" fill="url(#grad1)">
          <animateMotion dur="10s" begin="0s" fill="freeze" repeatCount="indefinite">
            <mpath href="#theMotionPathline" />
          </animateMotion>
        </circle>

        {/* Gradient for Second Circle */}
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#717AF5" />
            <stop offset="100%" stopColor="#DCD8F6" />
          </linearGradient>
        </defs>

        {/* Moving Circle 2 with Gradient */}
        <circle cx="0" cy="0" r="6" fill="url(#grad1)">
          <animateMotion dur="12s" begin="0s" fill="freeze" repeatCount="indefinite">
            <mpath href="#theMotionPathcircle" />
          </animateMotion>
        </circle>
      </svg>

</div>
              </div>
              <div className="max-[360px]:left-3  max-[360px]:top-7 absolute left-[26px] -top-[2px] -z-10 block sm:hidden">
              <div className="animatedsvg-wrapper">
          
              <svg width="272" height="250" viewBox="0 0 272 250" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="theMotionPathcirclesm"d="M9.0619 191.002V72.3513C9.0619 61.7636 17.6449 53.1806 28.2326 53.1806H76.5652C79.5355 53.1806 82.465 53.8708 85.1229 55.1966L198.959 111.984C201.617 113.31 204.546 114 207.516 114H243.829C254.417 114 263 122.583 263 133.171V212.5" stroke="#B3B3B3" stroke-width="0.518127" stroke-dasharray="2.59 2.59" className="path-circle-sm"/>
<path id="theMotionPathlinesm" d="M142.76 249.292V0" stroke="#B3B3B3" stroke-width="0.518127" stroke-dasharray="2.59 2.59"  className="path-line-sm"/>

 {/* Moving Circle 1 */}
 <circle cx="0" cy="0" r="3" fill="url(#grad2)">
          <animateMotion dur="10s" begin="0s" fill="freeze" repeatCount="indefinite">
            <mpath href="#theMotionPathlinesm" />
          </animateMotion>
        </circle>

        {/* Gradient for Second Circle */}
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#717AF5" />
            <stop offset="100%" stopColor="#DCD8F6" />
          </linearGradient>
        </defs>

        {/* Moving Circle 2 with Gradient */}
        <circle cx="0" cy="0" r="3" fill="url(#grad2)">
          <animateMotion dur="12s" begin="0s" fill="freeze" repeatCount="indefinite">
            <mpath href="#theMotionPathcirclesm" />
          </animateMotion>
        </circle>
</svg>

              </div>
              </div>
            </div>
          </motion.div>
          {/* <div className="hidden sm:flex self-center  flex-col items-start ">
          <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} viewport={{ once: false, amount: 0.3 }} className="my-section">
       
            <ul className="flex flex-col gap-4  simple-easy-list ">
              <li className="flex gap-6">
                <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full border border-textdark text-textdark bg-white">
                  1
                </div>
                <div className="">
                  <h4 className="text-base  font-semibold text-textdark mb-1">Sign Up in Seconds</h4>
                  <p className="small-text">Create your account quickly and start your journey to effortless social media management.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full border border-textdark text-textdark bg-white">
                  2
                </div>
                <div className="">
                  <h4 className="text-base  font-semibold text-textdark mb-1">Complete a 5-Minute Questionnaire</h4>
                  <p className="small-text">Answer a few easy questions about your business and audience to help our AI understand your needs.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full border border-textdark text-textdark bg-white">
                  3
                </div>
                <div className="">
                  <h4 className="text-base  font-semibold text-textdark mb-1">Let the AI Work Its Magic</h4>
                  <p className="small-text">Watch as PostReach AI generates tailored posts designed to engage your audience.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full border border-textdark text-textdark bg-white">
                  4
                </div>
                <div className="">
                  <h4 className="text-base  font-semibold text-textdark mb-1">Review and Approve Content</h4>
                  <p className="small-text">Preview and approve your posts to ensure they align perfectly with your brand.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full">
                  <img src='../assets/icons/done.svg' alt="check" />
                </div>
                <div className="">
                  <h4 className="text-base  font-semibold text-textdark mb-1">Sit Back as Posts Go Live</h4>
                  <p className="small-text">Our AI schedules and publishes your approved content, keeping your social media active and consistent.</p>
                </div>
              </li>

            </ul>
            <a href="#" className="mt-7 w-full sm:w-auto min-w-40 inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-white bg-themeblue border border-themeblue hover:bg-white hover:border-textdark hover:text-textdark">Get Started
            </a>
            </motion.div>
          </div> */}
          <div className="flex  self-center  flex-col items-start ">

            <ul className="flex flex-col gap-0  simple-easy-list max-[767px]:px-3">
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: false, amount: 0.3 }} className="my-section">
                <li className="flex gap-6 list-dotted-line mb-4">
                  <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full border border-textdark text-textdark bg-white">
                    1
                  </div>
                  <div className="">
                    <h4 className="text-base  font-semibold text-textdark mb-1">Sign Up in Seconds</h4>
                    <p className="small-text">Create your account quickly and start your journey to effortless social media management.</p>
                  </div>
                </li>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: false, amount: 0.4 }} className="my-section">
                <li className="flex gap-6 list-dotted-line mb-4">
                  <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full border border-textdark text-textdark bg-white">
                    2
                  </div>
                  <div className="">
                    <h4 className="text-base  font-semibold text-textdark mb-1">Complete a 5-Minute Questionnaire</h4>
                    <p className="small-text">Answer a few easy questions about your business and audience to help our AI understand your needs.</p>
                  </div>
                </li>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                <li className="flex gap-6 list-dotted-line mb-4">
                  <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full border border-textdark text-textdark bg-white">
                    3
                  </div>
                  <div className="">
                    <h4 className="text-base  font-semibold text-textdark mb-1">Let the AI Work Its Magic</h4>
                    <p className="small-text">Watch as PostReach AI generates tailored posts designed to engage your audience.</p>
                  </div>
                </li>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: false, amount: 0.6 }} className="my-section">
                <li className="flex gap-6 list-dotted-line mb-4">
                  <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full border border-textdark text-textdark bg-white">
                    4
                  </div>
                  <div className="">
                    <h4 className="text-base  font-semibold text-textdark mb-1">Review and Approve Content</h4>
                    <p className="small-text">Preview and approve your posts to ensure they align perfectly with your brand.</p>
                  </div>
                </li>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 150 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                <li className="flex gap-6">
                  <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full">
                    <img src='../assets/icons/done.svg' alt="check" />
                  </div>
                  <div className="">
                    <h4 className="text-base  font-semibold text-textdark mb-1">Sit Back as Posts Go Live</h4>
                    <p className="small-text">Our AI schedules and publishes your approved content, keeping your social media active and consistent.</p>
                  </div>
                </li>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 150 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
                <li className="flex gap-6">
                  <a onClick={() => {
                    if (window.ml) {
                      window.ml('show', 'n1oinc', true);
                    } else {
                      console.error("MailerLite is not initialized.");
                    }
                  }}  className="cursor-pointer mt-7 w-full sm:w-auto min-w-[200px] inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-white bg-themeblue border border-themeblue hover:bg-white hover:border-textdark hover:text-textdark">
                    Join our waitlist
                  </a>
                </li>
              </motion.div>
            </ul>
            {/* <motion.div initial={{ opacity: 0, y: 150 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 , delay: 0.3 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
            <a href="#" className="mt-7 w-full sm:w-auto min-w-40 inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-white bg-themeblue border border-themeblue hover:bg-white hover:border-textdark hover:text-textdark">Get Started
            </a>
            </motion.div> */}

          </div>
        </div>

      </div>
      {/* <!-- End Section Getting Started --> */}

      {/* <!-- Section Generative AI --> */}
      <div className="custom-container">
        <div className="grid grid-cols-1 items-center gap-0 md:gap-6 md:grid-cols-2 xl:grid-cols-[495px,1fr] ">

          <div className="flex  flex-col items-start justify-between">
            <h4 className="sec-title">Stunning Visuals Powered by<span className="text-themeblue"> Generative AI</span></h4>
            <p className="para-text">
              Unlike other tools, PostReach leverages the most advanced generative AI technologies to craft captivating visuals, ensuring your posts stand out and engage with your audience.
            </p>
            <a className="cursor-pointer mt-7  w-full sm:w-auto min-w-[200px] inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-white bg-themeblue border border-themeblue hover:bg-white hover:border-textdark hover:text-textdark"
            onClick={() => {
              if (window.ml) {
                window.ml('show', 'n1oinc', true);
              } else {
                console.error("MailerLite is not initialized.");
              }
            }} >Join our waitlist
            </a>
          </div>

          <div className="hidden sm:flex  flex-col items-star max-[767px]:-order-1 max-[575px]:w-[calc(100%+2rem)] max-[575px]:-ml-4">
            <motion.div initial={{ opacity: 0, x: 160 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
              <div className=" w-full relative max-[767px]:pt-5 max-[1280px]:overflow-hidden">
                <img src="../assets/images/Generative-Ai.webp" alt="GenerativeAI" className="relative z-10" />
                <div className="absolute -right-20 -bottom-8 lg:-bottom-20">
                  <img src="../assets/images/generative-ai-shadow.webp" className="" alt="generative-ai-shadow" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex sm:hidden  flex-col items-star max-[767px]:-order-1 max-[575px]:w-[calc(100%+2rem)] max-[575px]:-ml-4">
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: false, amount: 0.3 }} className="my-section">
              <div className=" w-full relative max-[767px]:pt-5 max-[1280px]:overflow-hidden">
                <img src="../assets/images/Generative-Ai.webp" alt="GenerativeAI" className="relative z-10" />
                <div className="absolute -right-20 -bottom-8 lg:-bottom-20">
                  <img src="../assets/images/generative-ai-shadow.webp" className="" alt="generative-ai-shadow" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
      {/* <!-- End Section Generative AI --> */}

      {/* <!-- Section advance-AI-Engine --> */}
      <div className="custom-container">
        <div className="grid grid-cols-1 items-center max-[575px]:my-4 gap-8 lg:gap-14 md:grid-cols-2 xl:grid-cols-[550px,1fr]">
         
          <div className="hidden sm:flex  flex-col items-star relative">
            <div className="absolute -left-1/2 -bottom-6 w-full">
            <img src="../assets/images/advance-Ai-Engine-bg-lg.webp" alt="GenerativeAI Engine" />
            </div>
            <motion.div initial={{ opacity: 0, x: -160 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: false, amount: 0.5 }} className="my-section">
              <div className=" w-full">
                <img src="../assets/images/advance-Ai-Engine.png" alt="GenerativeAI Engine" />
              </div>
            </motion.div>
          </div>
          <div className="flex  sm:hidden flex-col items-star mt-20 relative">
            <div className="absolute -left-1/2 -top-32 bg-[#1877f24d] blur-[102px] h-[362px] w-[362px] rounded-full opacity-20 z-10">
              {/* <img src="../assets/images/smarter-bg.webp" alt="smarter-bg" /> */}
            </div>
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: false, amount: 0.3 }} className="my-section">

              <div className=" w-full">
                <img src="../assets/images/advance-Ai-Engine.png" alt="GenerativeAI Engine" />


              </div>
            </motion.div>
          </div>
          <div className="flex  flex-col items-start justify-between">
            <h4 className="sec-title max-[1023px]:text-[28px] max-[1023px]:leading-10">Smarter Social Media Powered by our <span className="text-themeblue"> Advanced AI Engine</span></h4>
            <p className="para-text">
              PostReach harnesses the most advanced large language models (LLMs), always updated to the latest versions for maximum performance. Unlike other tools, there’s no need to choose a model – we handle it all to deliver the best results effortlessly.
            </p>
            <a className=" cursor-pointer mt-7 w-full sm:w-auto min-w-[200px] inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-white bg-themeblue border border-themeblue hover:bg-white hover:border-textdark hover:text-textdark"
            onClick={() => {
              if (window.ml) {
                window.ml('show', 'n1oinc', true);
              } else {
                console.error("MailerLite is not initialized.");
              }
            }} >Join our waitlist
            </a>
          </div>



        </div>
      </div>
      {/* <!-- End Section advance-AI-Engine --> */}

      {/* <!-- Section What Our Happy Clients Say --> */}
      <div className="custom-container container-lg bg-[#F1F6FC] rounded-[32px] relative z-0 p-5 lg:p-10 xl:p-16 my-10 sm:my-12">
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden -z-10">
          <img src="../assets/images/dot-bg.png" className="max-w-[1440px]" alt="dot-bg" />
        </div>
        <div className="grid grid-cols-1 items-center justify-center mb-6 lg:mb-0">
          <div className="flex  flex-col items-start justify-center text-left">
            <h4 className="sec-title  w-full max-[1023px]:text-[28px] max-[1023px]:leading-10">What Our<span className="text-themeblue"> Happy Clients Say</span></h4>
            <p className="para-text">
              Hear why businesses and creators love PostReach</p>
          </div>
        </div>

        {/* desktop */}
        <div className=" grid-cols-1 gap-6 hidden sm:grid">
          <Carousel
            additionalTransfrom={0}
            arrows={customerReview.length > 1} // Only show arrows if more than 1 item
            autoPlaySpeed={3000}
            infinite={true}
            centerMode={false}
            className="our-customer-slider "
            containerClass="container-fluid"
            draggable
            focusOnSelect={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
              },
              tablet: { breakpoint: { max: 991, min: 640 }, items: 2 }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            sliderClass=""
            slidesToSlide={1}
            swipeable

          >
            {/* start slide-item */}
            {customerReview && customerReview.map((item, index) => (
              <div className="flex  relative z-10  px-[3px] md:px-2 xl:px-3 h-full" key={index}>

                <div className="flex  flex-col items-start bg-white rounded-3xl border border-[#EFEFEF] pt-6 pb-6 xl:pb-12 px-5 md:px-6 xl:px-8 h-full">
                  <div className="ml-auto -mr-1">
                    <img src={item.profileImage} className="max-w-[25px] md:max-w-9" alt="testimonial" />
                  </div>
                  <h4 className="text-[#292929] text-base font-bold">{item.title}</h4>
                  <p className=" text-sm sm:text-base text-[#656565] mt-1 mb-6">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="h-10 w-10 min-w-10 sm:w-12 sm:h-12 sm:min-w-12 rounded-full overflow-hidden">
                      <img
                        src={item.img}
                        style={{
                          display: 'block',
                          height: '100%',
                          margin: 'auto',
                          width: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%',
                          background: '#D9D9D9',
                        }}
                        alt='User Image'
                      />
                    </div>
                    <div>
                      <h4 className="text-sm  text-[#292929] font-semibold">{item.clientName}</h4>
                      <p className="text-sm  font-normal text-[#7C7C7C]">{item.designation}</p>
                    </div>
                  </div>
                </div>

              </div>

            ))}
          </Carousel>
        </div>
        {/* desktop */}


        {/* mobile - tablet */}
        <div className="grid grid-cols-1 gap-6  sm:hidden">
          <Carousel
            responsive={{
              mobile: { breakpoint: { max: 640, min: 0 }, items: 1 }
            }}
            arrows={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            ssr={true} 
            autoPlaySpeed={3000}
            infinite={true}
            centerMode={false}
            autoPlay={false}
            keyBoardControl={true}
            className="our-customer-slider our-customer-slider-mobile"
            containerClass="carousel-container"
            itemClass="carousel-item-vertical"
            customTransition="transform 300ms ease-in-out"
          >
            {groupedProducts.map((group, index) => (
              <div key={index} className="flex flex-col gap-3 h-full">
                {group.map((item,index1) => (
                 <div className="flex  relative z-10 px-[3px] md:px-3 h-full" key={index1}>

                <div className="flex  flex-col items-start bg-white rounded-3xl border border-[#EFEFEF] pt-4 pb-6 xl:pb-12 px-5 md:px-6 xl:px-8 h-full">
                  <div className="ml-auto -mr-1">
                    <img src={item.profileImage} className="max-w-[25px] md:max-w-9" alt="testimonial" />
                  </div>
                  <h4 className="text-[#292929] text-base font-bold">{item.title}</h4>
                  <p className=" text-sm sm:text-base text-[#656565] mt-1 mb-6">
                    {item.description}
                  </p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="h-10 w-10 min-w-10 sm:w-12 sm:h-12 sm:min-w-12 rounded-full overflow-hidden">
                      <img
                        src={item.img}
                        style={{
                          display: 'block',
                          height: '100%',
                          margin: 'auto',
                          width: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%',
                          background: '#D9D9D9',
                        }}
                        alt='User Image'
                      />
                    </div>
                    <div>
                      <h4 className="text-sm  text-[#292929] font-semibold">{item.clientName}</h4>
                      <p className="text-sm  font-normal text-[#7C7C7C]">{item.designation}</p>
                    </div>
                  </div>
                </div>

              </div>
                ))}
              </div>
            ))}
          </Carousel>
        </div>
        {/* mobile - tablet */}
        
      </div>
      {/* <!-- End Section What Our Happy Clients Say --> */}

      {/* <!-- Section As Featured In --> */}

      <div className="custom-container container-lg" >
        <div className="grid grid-cols-1 items-center gap-x-6 lg:gap-x-10 xl:gap-x-16">
          <div className="col-span-1 text-center">
            <h4 className="sec-title w-full max-[1023px]:text-[28px] max-[1023px]:leading-10">As Featured In</h4>
          </div>
          <div className="col-span-1 our-customer-slider mt-4">
            <div className="marquee-container flex relative z-10 px-0 sm:px-8">
              <div className="marquee marquee-on">
                <img src="../assets/images/featuredIn-slider/featuredIn1.webp" alt="featuredIn1" />
                <img src="../assets/images/featuredIn-slider/featuredIn2.webp" alt="featuredIn2" />
                <img src="../assets/images/featuredIn-slider/featuredIn3.webp" alt="featuredIn3" />
                <img src="../assets/images/featuredIn-slider/featuredIn4.webp" alt="featuredIn4" />
                <img src="../assets/images/featuredIn-slider/featuredIn5.webp" alt="featuredIn5" />
                {/* <img src="../assets/images/featuredIn-slider/featuredIn6.webp" alt="featuredIn6" /> */}
                {/* Duplicate the images for seamless scrolling */}
                <img src="../assets/images/featuredIn-slider/featuredIn1.webp" alt="featuredIn1" />
                <img src="../assets/images/featuredIn-slider/featuredIn2.webp" alt="featuredIn2" />
                <img src="../assets/images/featuredIn-slider/featuredIn3.webp" alt="featuredIn3" />
                <img src="../assets/images/featuredIn-slider/featuredIn4.webp" alt="featuredIn4" />
                <img src="../assets/images/featuredIn-slider/featuredIn5.webp" alt="featuredIn5" />
                {/* <img src="../assets/images/featuredIn-slider/featuredIn6.webp" alt="featuredIn6" /> */}

                <img src="../assets/images/featuredIn-slider/featuredIn1.webp" alt="featuredIn1" />
                <img src="../assets/images/featuredIn-slider/featuredIn2.webp" alt="featuredIn2" />
                <img src="../assets/images/featuredIn-slider/featuredIn3.webp" alt="featuredIn3" />
                <img src="../assets/images/featuredIn-slider/featuredIn4.webp" alt="featuredIn4" />
                <img src="../assets/images/featuredIn-slider/featuredIn5.webp" alt="featuredIn5" />
                {/* <img src="../assets/images/featuredIn-slider/featuredIn6.webp" alt="featuredIn6" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Section As Featured In --> */}

      {/* <!-- Section Seamless Integrations --> */}

      <div className="custom-container max-[767px]:max-w-[343px] min-[1232px]:max-w-[1200px] lg:pb-12 relative z-0 max-[575px]:pt-10 max-[575px]:pb-4  pt-7 my-12" ref={integrationRef}>
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden -z-10">
          <img src="../assets/images/SeamlessIntegrations-bg.webp" className="max-w-full max-[767px]:hidden block min-[1365px]:max-w-[1200px] mx-auto seamless-bg  h-full w-full object-cover rounded-3xl" alt="dot-bg" />
          <img src="../assets/images/SeamlessIntegrations-bg-mobile.webp" className="max-w-full max-[767px]:block hidden object-top min-[1365px]:max-w-[1200px] mx-auto  h-full w-full object-cover rounded-3xl" alt="dot-bg" />
        </div>
        <div className="grid grid-cols-1 items-center gap-x-6 lg:gap-x-10 xl:gap-x-16">
          <div className="col-span-1 text-center">
            <div className="mx-auto max-w-[520px] max-[767px]:px-5 max-[767px]:pt-6">
              <h4 className="sec-title lg:text-[40px] lg:leading-[52px] w-full text-white max-[640px]:leading-[29px] max[640px]:mb-3"><span className="text-[#1491FF]">Seamless Integrations</span> with Your Favorite Platforms</h4>
              <p className="para-text  mx-auto text-white max-[767px]:leading-[21px]">PostReach AI seamlessly integrates with your favorite social media platforms, simplifying your management and boosting efficiency.</p>
            </div>
          </div>
          <div className="col-span-1 text-center">
            <ul className="w-full inline-flex justify-center gap-x-0 gap-y-12 max-[767px]:max-w-[245px] max-[767px]:flex-wrap md:gap-12 lg:gap-20 xl:gap-24 items-center pt-14 pb-10 lg:pt-28 lg:pb-8 ">

              <li className="max-[767px]:text-center max-[767px]:w-1/2">
                <div className="h-[72px] w-[72px] sm:h-16 sm:w-16 rounded-full p-2 border-[0px] bg-white border-white  mx-auto animate-downup-sm delay-50">
                  <img className="h-full w-full" src="../assets/icons/Social-icons/facebook.svg" alt="facebook" />
                </div>
                <p className="text-white text-lg font-normal text-center mt-5">Facebook</p>
              </li>
              <li className="max-[767px]:text-center max-[767px]:w-1/2">
                <div className="h-[72px] w-[72px] sm:h-16 sm:w-16  rounded-full p-2 border-[0px] bg-white border-white  mx-auto animate-updown-sm delay-75">
                  <img className="h-full w-full" src="../assets/icons/Social-icons/instagram.svg" alt="instagram" />
                </div>
                <p className="text-white text-lg font-normal text-center mt-5">Instagram</p>
              </li>
              <li className="max-[767px]:text-center max-[767px]:w-1/2">
                <div className="h-[72px] w-[72px] sm:h-16 sm:w-16  rounded-full p-2 border-[0px] bg-white border-white  mx-auto animate-downup-sm delay-100">
                  <img className="h-full w-full" src="../assets/icons/Social-icons/twitter.svg" alt="twitter" />
                </div>
                <p className="text-white text-lg font-normal text-center mt-5">X</p>
              </li>
              <li className="max-[767px]:text-center max-[767px]:w-1/2">
                <div className="h-[72px] w-[72px] sm:h-16 sm:w-16  rounded-full p-2 border-[0px] bg-white border-white  mx-auto animate-updown-sm delay-0">
                  <img className="h-full w-full" src="../assets/icons/Social-icons/linkedIn.svg" alt="linkedin" />
                </div>
                <p className="text-white text-lg font-normal text-center mt-5">LinkedIn</p>
              </li>


              <li className="max-[767px]:text-center max-[767px]:w-full">
                <div className="h-12 w-12 sm:h-16 sm:w-16  rounded-full flex items-center justify-center  mx-auto">
                  <img src="../assets/icons/Social-icons/more.svg" alt="coming soon" />
                </div>
                <p className="text-white text-lg font-normal text-center mt-5">More coming soon</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- End Section Seamless Integrations --> */}

      {/* <!-- Section Pricing  --> */}

      <div className="custom-container relative max-[640px]:mt-10">
        <div className="absolute w-[398px] h-[530px] -top-56 -right-40 sm:hidden">
        <img src="../assets/images/blur-circle.webp" className="h-full w-full" alt="blur-circle" />
          </div>
        <div className="grid grid-cols-1 items-center gap-x-6 lg:gap-x-10 xl:gap-x-16" ref={pricingRef} >
          <div className="col-span-1 text-center">
            {/* <p className="sec-sub-title w-full">Pricing</p> */}
            <h4 className="sec-title w-full max-[640px]:text-[28px] max-[640px]:leading-[42px]">Choose the Plan That <span className="text-themeblue max-[640px]:block">Fits Your Needs</span></h4>
            <p className="para-text max-w-[520px] mx-auto max-[640px]:leading-5">
              Choose a plan that suits your business needs and unlock all the tools you need to grow your social media effortlessly. </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 items-center  gap-3 lg:gap-6 max-w-[1200px] mx-auto mt-8 lg:mt-10 xl:mt-20 ">

          <div className="col-span-1">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} viewport={{ once: false, amount: 0.1 }} className="my-section">
              <div className="flex flex-wrap flex-col p-4 lg:py-8 lg:px-6 rounded-[40px] border border-[#D9D9D9] relative z-10 mt-10 md:mb-0">
                <div className="absolute top-0 left-0 -z-10  h-full">
                  <img src="../assets/images/pro-package.webp" className="h-full w-full rounded-[40px]" alt="pro-package" />
                </div>
                <div className="w-max m-auto text-center -mt-9 lg:-mt-14">
                  <div className="flex flex-row items-center gap-2 py-2 px-6 text-base md:text-lg font-semibold rounded-[50px] border border-themeblue text-themeblue bg-white">
                    <img src="../assets/images/coming-soon-star.png" alt="coming-soon-icon" /> Coiming Soon
                  </div>
                </div>
                <div className="inline-flex max-w-max mt-8 lg:mt-6  text-2xl leading-9 lg:text-[28px] sm:leading-8 text-[#292929] font-bold rounded-lg">
                  Pro Package
                </div>
                <p className="text-[#7C7C7C]  text-sm md:text-base  font-normal mt-3 sm:mt-0">
                  Content Personalized to your brand
                </p>
                <ul className="w-full inline-flex justify-start gap-3 sm:gap-4 items-center mt-4 sm:mt-6">
                  <li>
                    <div className="h-6 w-6 lg:h-7 lg:w-7 mx-auto">
                      <img src="../assets/icons/facebook.svg" alt="facebook" />
                    </div>
                  </li>
                  <li>
                    <div className="h-6 w-6 lg:h-7 lg:w-7 mx-auto">
                      <img src="../assets/icons/instagram.svg" alt="instagram" />
                    </div>
                  </li>
                  <li>
                    <div className="h-6 w-6 lg:h-7 lg:w-7 mx-auto">
                      <img src="../assets/icons/twitter-black.svg" alt="twitter" />
                    </div>
                  </li>
                  <li>
                    <div className="h-6 w-6 lg:h-7 lg:w-7 mx-auto">
                      <img src="../assets/icons/linkedin.svg" alt="linkedin" />
                    </div>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-[#EFEFEF]">
                  <h4 className="text-[32px] max-[640px]:leading-[38px] lg:text-4xl xl:text-[48px] xl:leading-[56px] text-[#292929] font-bold mb-8 sm:mb-4">$29.00<span className="text-[#7C7C7C] font-normal text-base leading-5"> (Per Month)</span></h4>

                </div>
              </div>

            </motion.div>
          </div>
          <div className="col-span-1  max-[767px]:-order-1">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} viewport={{ once: false, amount: 0.1 }} className="my-section">
              <div className="flex flex-wrap flex-col p-4 lg:py-8 lg:px-6 rounded-[40px] z-10 relative">
                <div className="h-full w-full mx-auto absolute top-0 left-0 -z-10">
                  <img src="../assets/images/starter-package-bg.webp" className="h-full w-full rounded-[40px] " alt="package-bg" />
                </div>
                <div className="inline-flex max-w-max mt-8 lg:mt-6  text-2xl leading-9 lg:text-[28px] sm:leading-8 text-white font-bold rounded-lg">
                  Starter Package
                </div>
                <p className="text-[#EFEFEF] text-sm md:text-base  font-normal mt-3 sm:mt-0">
                  Content Personalized to your brand
                </p>
                <ul className="w-full inline-flex justify-start gap-3 sm:gap-4 items-center mt-4 sm:mt-6">
                  <li>
                    <div className="h-6 w-6 lg:h-7 lg:w-7 mx-auto">
                      <img src="../assets/icons/facebook.svg" alt="facebook" />
                    </div>
                  </li>
                  <li>
                    <div className="h-6 w-6 lg:h-7 lg:w-7 mx-auto">
                      <img src="../assets/icons/instagram.svg" alt="instagram" />
                    </div>
                  </li>
                  <li>
                    <div className="h-6 w-6 lg:h-7 lg:w-7 mx-auto">
                      <img src="../assets/icons/twitter-white.svg" alt="twitter" />
                    </div>
                  </li>
                  <li>
                    <div className="h-6 w-6 lg:h-7 lg:w-7 mx-auto">
                      <img src="../assets/icons/linkedin.svg" alt="linkedin" />
                    </div>
                  </li>
                </ul>
                <div className="my-6 py-6 border-t border-b border-[#EFEFEF]">
                  <h4 className=" text-[32px] max-[640px]:leading-[38px] lg:text-4xl xl:text-[48px] xl:leading-[56px] text-white font-bold mb-4">$20.00<span className="opacity-80 font-normal text-base leading-5"> (Per Month)</span></h4>
                  <a  className="cursor-pointer theme-primary-btn block  bg-white hover:bg-white font-bold text-textdark mt-auto w-full text-center py-3 leading-[22px]"
                  onClick={() => {
                    if (window.ml) {
                      window.ml('show', 'n1oinc', true);
                    } else {
                      console.error("MailerLite is not initialized.");
                    }
                  }} >Join our waitlist</a>

                </div>
                <ul className="flex flex-wrap flex-col gap-4 mb-8 xl:mb-16">
                  <li className="flex items-center gap-2 text-white">
                    <img src="../assets/icons/check-fill-fff.svg" alt="check" /> 7-Day Free Trial
                  </li>
                  <li className="flex items-center gap-2 text-white">
                    <img src="../assets/icons/check-fill-fff.svg" alt="check" /> 15 Post Credits in Autopilot
                  </li>
                  <li className="flex items-center gap-2 text-white">
                    <img src="../assets/icons/check-fill-fff.svg" alt="check" /> Post Preview & Approval
                  </li>
                  <li className="flex items-center gap-2 text-white">
                    <img src="../assets/icons/check-fill-fff.svg" alt="check" /> Calendar View
                  </li>
                  <li className="flex items-center gap-2 text-white">
                    <img src="../assets/icons/check-fill-fff.svg" alt="check" /> Analytics
                  </li>

                </ul>
              </div>
            </motion.div>
          </div>
          <div className="col-span-1">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} viewport={{ once: false, amount: 0.1 }} className="my-section">
              <div className="flex flex-wrap flex-col p-4 lg:py-8 lg:px-6 rounded-[40px] border border-[#D9D9D9] relative z-10 mt-10 md:mb-0">
                <div className="absolute top-0 right-0 -z-10 h-full">
                  <img src="../assets/images/unlimited-package.webp" className="h-full w-full rounded-[40px]" alt="unlimited-package" />
                </div>
                <div className="w-max m-auto text-center -mt-9 lg:-mt-14">
                  <div className="flex flex-row items-center gap-2 py-2 px-6 text-lg font-semibold rounded-[50px] border border-themeblue text-themeblue bg-white">
                    <img src="../assets/images/coming-soon-star.png" alt="coming-soon-icon" /> Coiming Soon
                  </div>
                </div>
                <div className="inline-flex max-w-max mt-8 lg:mt-6  text-2xl leading-9 lg:text-[28px] sm:leading-8 text-[#292929] font-bold rounded-lg">
                  Ultimate Package
                </div>
                <p className="text-[#7C7C7C]  text-sm md:text-base  font-normal mt-3 sm:mt-0">
                  Content Personalized to your brand
                </p>
                <ul className="w-full inline-flex justify-start gap-3 sm:gap-4 items-center mt-4 sm:mt-6">
                  <li>
                    <div className="h-6 w-6 lg:h-7 lg:w-7 mx-auto">
                      <img src="../assets/icons/facebook.svg" alt="facebook" />
                    </div>
                  </li>
                  <li>
                    <div className="h-6 w-6 lg:h-7 lg:w-7 mx-auto">
                      <img src="../assets/icons/instagram.svg" alt="instagram" />
                    </div>
                  </li>
                  <li>
                    <div className="h-6 w-6 lg:h-7 lg:w-7 mx-auto">
                      <img src="../assets/icons/twitter-black.svg" alt="twitter" />
                    </div>
                  </li>
                  <li>
                    <div className="h-6 w-6 lg:h-7 lg:w-7 mx-auto">
                      <img src="../assets/icons/linkedin.svg" alt="linkedin" />
                    </div>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-[#EFEFEF]">
                  <h4 className="text-[32px] max-[640px]:leading-[38px] lg:text-4xl xl:text-[48px] xl:leading-[56px] text-[#292929] font-bold mb-8 sm:mb-4">$49.00<span className="text-[#7C7C7C] font-normal text-base leading-5">(Per Month)</span></h4>

                </div>
              </div>

            </motion.div>
          </div>
        </div>

      </div>
      {/* <!-- End Section Pricing --> */}

      {/* <!-- Section We Are Here To Help --> */}
      <div className="custom-container max-[767px]:mt-4">

        <div className="items-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-[485px,1fr] gap-x-4 lg:gap-x-6 xl:gap-x-14 z-10 relative">
          <div className="max-[575px]:hidden block absolute top-12 -left-16 -z-10  h-full max-w-[400px]">
            <img src="../assets/images/blur-circle.webp" className="h-full w-full" alt="blur-circle" />
          </div>
          <div className="max-[575px]:block hidden absolute -bottom-1/2 -left-[7rem] -z-10  h-full max-w-full">
            <img src="../assets/images/blur-circle.webp" className="h-full w-full" alt="blur-circle" />
          </div>
          <div className="flex  flex-col items-start justify-between gap-3 text-left">
            <h4 className="sec-title w-full mb-0">We Are Here <span className="text-themeblue"> To Help</span></h4>
            <p className="para-text max-w-[520px] mb-3">
              Got questions? We’ve got answers! Here are some of the most common queries about PostReach AI. </p>
            <a href="mailto:info@postreach.ai" className="mt-0 w-full sm:w-auto mb-8 min-w-40 inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-white bg-themeblue border border-themeblue hover:bg-white hover:border-textdark hover:text-textdark">
              Contact us
            </a>
          </div>

          <div className="flex  flex-col items-start justify-start max-[575px]:-mx-2">
            <Accordion showDivider={false}
              disableIndicatorAnimation={true}
              itemClasses={itemClasses}>
              <AccordionItem className="" key="1" aria-label="Accordion 1" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="I don’t have time. Is this tool for me?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C] max-[640px]:pr-7 ">Yes, PostReach AI was created specifically for busy businesses and creators. It automates the entire social media workflow, saving you time while maintaining a consistent online presence.</p>
              </AccordionItem>
              <AccordionItem className="" key="2" aria-label="Accordion 2" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="Why not use an agency or hire a freelancer?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C] max-[640px]:pr-7">Hiring agencies or freelancers often comes with high costs and requires ongoing management. PostReach AI is affordable, efficient, and requires no supervision, making it a hassle-free alternative.</p>
              </AccordionItem>
              <AccordionItem className="" key="3" aria-label="Accordion 3" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="Is the content generated compliant with community guidelines?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C] max-[640px]:pr-7">Absolutely. Our AI engine is always up to date with the latest community guidelines to ensure all generated content is safe for posting and fully compliant.</p>
              </AccordionItem>
              <AccordionItem className="" key="4" aria-label="Accordion 4" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="Can I control what gets posted on my social media?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C] max-[640px]:pr-7">Yes! With our Approval Queue feature, you can preview and approve all content before it’s posted, ensuring everything aligns with your brand.</p>
              </AccordionItem>
              <AccordionItem className="" key="5" aria-label="Accordion 5" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="What platforms does PostReach AI support?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C] max-[640px]:pr-7">PostReach AI seamlessly integrates with Facebook, Instagram, LinkedIn, and X (formerly Twitter), with more platforms planned for the future.</p>
              </AccordionItem>
              <AccordionItem className="" key="6" aria-label="Accordion 6" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="How does the AI know what content to create?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C] max-[640px]:pr-7">Our AI engine learns about your business through a simple onboarding questionnaire. It uses this information to craft content tailored to your brand, audience, and goals.</p>
              </AccordionItem>
              <AccordionItem className="" key="7" aria-label="Accordion 7" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="Can I edit the generated content or posts?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C] max-[640px]:pr-7">In this initial version, editing is not available. PostReach&apos;s Social Media Expert AI uses advanced SEO techniques, adheres to community guidelines, and leverages data to maximise post performance. Trust our AI to handle the hard work and deliver optimised, engaging content tailored to your needs.</p>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      {/* <!-- End Section We Are Here To Help --> */}

      {/* <!-- Section Insights & Tips to Grow Your Social Media --> */}
      <div>
        <div className="custom-container relative z-0 my-4 sm:my-12 delay-[300ms] duration-[600ms]" >
          <div className="grid grid-cols-1 items-center justify-center mb-10">
            <div className="flex  flex-col items-start justify-center text-center">
              <h4 className="sec-title  w-full"><span className="text-themeblue">Insights & Tips </span>to Grow Your Social Media</h4>
              <p className="para-text max-[575px]:text-base mx-auto">
                Got questions? We’ve got answers! Here are some of the most common queries about PostReach AI.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-8 xl:mb-10">

            {latestBlog.map((item, index) => (
              <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.1 }} className="my-section"  key={index}>
                <div className="blog-col" onClick={() => handleBlogDetail(item.slug.current)}>
                  <div className="blog-img-thumb">
                    <img src={urlFor(item.blog_image).url()} className="h-full w-full rounded-xl" alt="blog-1" />
                  </div>
                  <p className="blog-category-tag">{item.category_id.name}</p>
                  <h4 className="blog-title max-[640px]:line-clamp-1">{item.title}</h4>
                  <p className="blog-content-p">{item.description}</p>
                  <div className="blog-footer">
                    <div className="blog-u-img">
                      <img src={urlFor(item.author_image_url).url()} className="h-full w-full rounded-xl" alt="blog-1" />
                    </div>
                    <div className="blog-author">
                      <h4 className="blog-username">{item.author_name}</h4>
                      <div className="seprator-round"></div>
                      <p className="blog-date">{moment(new Date(item._createdAt), ('DD/MM/yyyy')).format('DD MMMM, yyyy')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
          <div className="grid grid-cols-1 items-center justify-center">
            <a onClick={handleViewBlog} className="mx-auto w-full sm:w-auto min-w-40 sm:max-w-max inline-flex items-center justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-white bg-themeblue border border-themeblue hover:bg-white hover:border-textdark hover:text-textdark cursor-pointer">View more </a>
          </div>

        </div>
      </div>
      {/* <!-- End Section Insights & Tips to Grow Your Social Media --> */}
      {/* <!-- Section Ready to Boost Your Social Media? --> */}
      <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: false, amount: 0.2 }} className="my-section">
        <div className="custom-container  relative z-0 pl-0 md:pl-6 lg:pl-16 pt-8 lg:pt-12 pb-0 my-4 max-[640px]:mb-12 sm:my-12">

          <div className="hidden sm:block absolute left-0 top-0 h-full w-full rounded-3xl overflow-hidden -z-10">
            <img src="../assets/images/maskbg.webp" className="max-w-[1200px] h-full w-full" alt="mask-bg" />
          </div>
          <div className="block sm:hidden absolute left-0 top-0 h-full w-full rounded-3xl overflow-hidden -z-10">
            <img src="../assets/images/cta-mobile.webp" className="max-w-[1200px] h-full w-full" alt="mask-bg" />
          </div>
          <div className="items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[400px,1fr] gap-x-10 mb-0 md:mb-12 lg:mb-24  relative max-[767px]:pl-5">
            {/* <div className="absolute h-[530px] w-[398px] bg-[#ACE1F333] backdrop-blur-2xl rounded-full"></div> */}
            <div className="flex  flex-col items-start justify-between gap-3 text-left pr-5 lg:pr-0">
              <h4 className="sec-title max-[575px]:text-[32px] max-[575px]:leading-[48px] w-full mb-0 text-white">Ready to Boost Your Social Media?</h4>
              <p className="para-text max-w-[520px] mb-3 text-white">
                Start your free trial today and experience the power of PostReach AI. Simplify your social media management, save time, and grow your Business or Brand effortlessly. </p>
              <a  className="cursor-pointer max-[640px]:mt-3 my-6 lg:my-0 w-full sm:w-auto  min-w-40 inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-[#0A2761] bg-white  hover:bg-[#0A2761] hover:border-white hover:text-white" 
              onClick={() => {
                if (window.ml) {
                  window.ml('show', 'n1oinc', true);
                } else {
                  console.error("MailerLite is not initialized.");
                }
              }} >Join our waitlist!
              </a>

            </div>

            <div className="flex  flex-col items-start justify-start relative max-[640px]:mt-4">
              <div className="">
                <img src="../assets/images/freetrial-img.webp" className="h-full w-full max-w-full" alt="" />
              </div>
              <div className="absolute bottom-5 max-[767px]:max-w-14 -left-4 md:-left-8">
                <img src="../assets/images/heart-freetrial.png" className="h-full w-full max-w-full" alt="" />
              </div>
            </div>
          </div>

        </div>
      </motion.div>
      {/* <!-- End Section Ready to Boost Your Social Media? --> */}

      {/* Video Modal */}
       {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="relative w-[calc(100%-2rem)] max-w-[1200px]">
            <button className="z-10 absolute -top-4 -right-3 text-white text-xl  py-1 cursor-pointer invert" onClick={handleClose}>
              <img className="max-w-6"  src='../assets/icons/filter-close-btn.svg'  />
            </button>
            {/* Video Player */}
            <div className='player'>
              <iframe className='inside-player' src="https://player.vimeo.com/video/1036601120?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" title="PostReachAI - Intro">
              </iframe>
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

export default MainLayout;
