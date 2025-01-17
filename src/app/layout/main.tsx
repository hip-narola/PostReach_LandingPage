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
import { BlogType } from '../response/responseTyep';
import moment from 'moment';
import { urlFor } from '../../sanity/client';
import { useLoading } from '../context/LoadingContext';

const MainLayout: React.FC = () => {
  const router = useRouter();
  const options = { next: { revalidate: 30 } };
  const context = useContext(DataContext);
  const { setIsLoading } = useLoading();

  const [latestBlog , setLatest] = useState<BlogType[]>([]);
  if (!context) {
      throw new Error('DataContext must be used within a DataProvider');
  }

  const itemClasses = {
    base: "accordion",
    trigger: "p-0",
    indicator: "text-medium",
    content: "pb-0 text-base text-[#525252] font-normal text-left",
  };

  useEffect(() => {
    setIsLoading(false);
    getLatestdBlogs();
  },[])
 
  useEffect(() => {
    handleScroll(context.getData);
  }, [context.getData]);

  const customerReview = [
    { img: '../assets/images/ricky.png' },
    { img: '../assets/images/ricky.png' },
    { img: '../assets/images/ricky.png' },
    { img: '../assets/images/ricky.png' },
    { img: '../assets/images/ricky.png' },
  ]

  const handleViewBlog = () => {
    router.push(navigations.blogList)
  }

  const handleBlogDetail = (postId :string ) => {
    router.push(`${navigations.blogDetail}/${postId}`)
  }

  const featureRef = useRef<HTMLDivElement | null>(null);
  const integrationRef = useRef<HTMLDivElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);
  const blogRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (activeTab: string) => {
    setIsLoading(false);
    const offset = 100;
    let ref;

    if(activeTab == 'feature' && featureRef.current){
      ref =   featureRef.current;
    // featureRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if(activeTab == 'integration' && integrationRef.current){
      ref = integrationRef.current
    }

    if(activeTab == 'pricing' && pricingRef.current){
     ref = pricingRef.current
    }

    if(activeTab == 'blog' && blogRef.current){
      ref = blogRef.current;
    }
    if(ref){
      const elementPosition = ref.getBoundingClientRect().top; 
      const offsetPosition = elementPosition + window.scrollY - offset; // Adjust for header offset
    
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    
  };

  const getLatestdBlogs = async() => {
    const feature =  await client.fetch(routes.LatestBlog, {}, options);
    setLatest(feature)
  }
  


  return (
    <div className="">

      {/* <!-- Section Banner --> */}
      <div className="mx-auto   relative z-0 px-6 lg:px-0 pt-24 pb-12 lg:pt-28 lg:pb-0 xl:pt-40 overflow-hidden">
        <div className="absolute max-[767px]:bottom-0  md:top-0 left-0 -z-10 flex justify-center w-full text-center">
          <img src="../assets/images/banner-bg.png" alt="banner-bg" />
        </div>
        <div className="text-center max-w-[calc(100%-2rem)] min-[1365px]:max-w-[1200px] mx-auto">
          <h1 className="banner-title relative">Automate Your
            <span className="inline md:block">Social Media
              <span className="gradient-title relative max-[767px]:max-w-max max-[767px]:m-auto max-[767px]:block"> Effortlessly
                <div className="absolute -top-2 -right-10 max-[767px]:top-0 max-[767px]:-right-5 max-[767px]:max-w-5">
                  <img src="../assets/icons/banner-title-icon.svg" alt="banner-title-icon" />

                </div>
              </span>
            </span>

          </h1>

          <p className="mt-6 text-base lg:text-lg  text-textlight max-w-[985px] mx-auto">Elevate your social media presence with PostReach. Our intelligent AI engine understands your business goals and audience preferences, delivering engaging content and automating your entire social media workflow.</p>
          <div className="flex items-center justify-center gap-2 mt-6   text-base text-textdark font-semibold">
            <img src="../assets/icons/banner-members.svg" alt="banner-title-icon" />
            500+ members in our waitlist
          </div>
          <div className="mt-6 flex items-center flex-col justify-center gap-x-6">
            <a href="#" className="min-w-48 bg-themeblue text-sm md:text-base leading-6 font-semibold px-6 py-3 rounded-full text-white border border-themeblue hover:border-textdark hover:text-textdark hover:bg-white">Start Your Free Trial</a>
            <p className="text-sm text-textlight font-normal text-center mt-2">Credit Card not required, Cancel anytime.</p>
          </div>

          {/* banner image */}
          <div className="relative mt-20 md:mt-10">
            <div className="absolute -top-14 md:-top-24 -right-6 md:-right-5 max-[767px]:max-w-40">
              <img src="../assets/icons/just-few-steps-arrow.svg" alt="just-few-steps-arrow.svg" />
            </div>
            <a href="#" className="abosolute-div-center video-play-button absolute">
              <img src="../assets/icons/play-icon.png" alt="play-icon" />
            </a>
            <img src="../assets/images/video-banner.png" alt="video-banner" />
           
            <div className="banner-fb-icon absolute -left-6 xl:-left-14 top-1/2 -mt-12 lg:-mt-16 max-w-14 xl:max-w-20">
              <img src="../assets/images/banner-fb.png" alt="banner-fb-icon" />
            </div>
            <div className="banner-insta-icon absolute -right-6 xl:-right-16 top-1/2 -mt-12 lg:-mt-16 max-w-16 xl:max-w-[95px]">
              <img src="../assets/images/banner-insta.png" alt="banner-insta-icon" />
            </div>
            <div className="banner-like-icon absolute -left-5 top-1/2 mt-10 lg:mt-20 max-[767px]:max-w-20 max-[1280px]:max-w-24">
              <img src="../assets/images/banner-like.png" alt="banner-like-icon" />
            </div>
            <div className="banner-thumb-icon absolute -right-5 xl:-right-9 top-1/2 mt-8 lg:mt-20 max-[1280px]:max-w-20">
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
        <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} viewport={{ once: true, amount: 0.3 }} className="my-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">
      
          <div className="flex  flex-col items-start bg-white rounded-2xl p-4 lg:p-6">
            <div className="max-w-12 lg:max-w-14">
              <img src="../assets/icons/SocialMediaExpert.svg" alt="SocialMediaExpert" />
            </div>
            <h4 className="text-base lg:text-xl font-bold text-textdark mt-3 lg:mt-4 mb-1 lg:mb-2">Social Media Expert</h4>
            <p className="para-text">Our AI engine crafts personalised posts tailored to your goals, audience, and brand voice.</p>
          </div>
          <div className="flex  flex-col items-start bg-white rounded-2xl p-4 lg:p-6">
            <div className="max-w-12 lg:max-w-14">
              <img src="../assets/icons/Automated-Scheduling.svg" alt="Automated-Scheduling" />
            </div>
            <h4 className="text-base lg:text-xl font-bold text-textdark mt-3 lg:mt-4 mb-1 lg:mb-2">Automated Scheduling</h4>
            <p className="para-text">Save time with fully automated content creation, scheduling, and posting to ensure effortless consistency for your business.</p>
          </div>
          <div className="flex  flex-col items-start bg-white rounded-2xl p-4 lg:p-6">
            <div className="max-w-12 lg:max-w-14">
              <img src="../assets/icons/built-for-you.svg" alt="built-for-you" />
            </div>
            <h4 className="text-base lg:text-xl font-bold text-textdark mt-3 lg:mt-4 mb-1 lg:mb-2">Built for You</h4>
            <p className="para-text">Affordable, easy to use, and designed to simplify social media for busy businesses and creators.</p>
          </div>

        </div>
        </motion.div>
      </div>
      {/* <!-- End Section Why Choose PostReach? --> */}

      {/* <!-- Section Features --> */}
      <div className="custom-container container-lg relative mb-10 lg:mb-0 z-0 p-0 lg:p-10 xl:p-16" ref={featureRef}>
        <div className="grid grid-cols-1 items-center justify-center my-8 lg:my-12">
          <div className="flex flex-col  lg:flex-row items-start justify-center text-left gap-0 lg:gap-12 xl:gap-20">
            <h4 className="sec-title  w-full"><span className="text-themeblue">Powerful Features</span> for Effortless Social Media Management   </h4>
            <p className="para-text max-w-full lg:max-w-[465px] mx-auto">
              PostReach AI offers a suite of powerful tools designed to make social media management seamless and efficient. From fully automated posting to insightful analytics, we help you stay in control while saving time and boosting your online presence. </p>
          </div>
        </div>
        {/* tab */}

        <Tabs fullWidth aria-label="Options" color="primary" variant="bordered" radius="full"
          classNames={{
            tabList: "feature-tabs w-full border-none shadow-none bg-white p-[2px] mb-4",
            cursor: "",
            tab: "text-base font-bold text-[#292929] h-12 px-6 lg:px-7 border border-[#292929] min-w-48",
            tabContent: ""
          }}>

          <Tab key="Autopilot Mode" title={
            <div className="flex items-center space-x-2">
              <img src="../assets/icons/tabs/Tab1.svg" alt="AutopilotMode" />
              <span className="text-base font-bold text-[#292929]">Autopilot Mode</span>
            </div>
          } >
            <Card className="shadow-none">
              <CardBody className=" p-0">
                {/* Autopilot Mode tabs content */}
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[385px,1fr] gap-5">
                  <div className="flex  flex-col items-start max-[767px]:order-2">
                    <p className="para-text text-textdark">
                      Automate your social media completely, ensuring consistent posting without the hassle.
                    </p>
                    <ul className="flex flex-col gap-3 md:gap-7 mt-10">
                      <li className="flex gap-4">
                        <div className="min-w-12">
                          <img src="../assets/icons/tabs/fully-automated-icon.svg" alt="fully-automated-icon" />
                        </div>
                        <div className="">
                          <h4 className="text-base  font-semibold text-textdark">Fully Automated Content Creation</h4>
                          <p className="small-text">Our AI learns your business goals and audience, crafting engaging posts.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="min-w-12">
                          <img src="../assets/icons/tabs/IntelligentScheduling-icon.svg" alt="IntelligentScheduling-icon" />
                        </div>
                        <div className="">
                          <h4 className="text-base  font-semibold text-textdark">Intelligent Scheduling</h4>
                          <p className="small-text">Posts are automatically scheduled at the optimal times for maximum reach and engagement.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="min-w-12">
                          <img src="../assets/icons/tabs/Hands-Free Posting-icon.svg" alt="Hands-Free Posting-icon" />
                        </div>
                        <div className="">
                          <h4 className="text-base  font-semibold text-textdark">Hands-Free Posting</h4>
                          <p className="small-text">Enjoy a consistent online presence while PostReach handles the entire posting process.</p>
                        </div>
                      </li>

                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <img src="../assets/images/autopilot-mode.png" className="max-w-full object-contain" alt="autopilot-mode" />
                  </div>
                </div>
                {/* End Autopilot Mode tabs content */}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="Approval Queue" title={
            <div className="flex items-center space-x-2">
            <img src="../assets/icons/tabs/Tab2.svg" alt="AutopilotMode" />

              <span className="text-base font-bold text-[#292929]">Approval Queue</span>
            </div>
          }>
            <Card className="shadow-none">
              <CardBody className=" p-0">
                {/* ApprovalQueue tabs content */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[385px,1fr] gap-5">
                  <div className="flex  flex-col items-start max-[767px]:order-2">
                    <p className="para-text text-textdark">
                      Review, edit, or approve posts before publishing to control over your content.
                    </p>
                    <ul className="flex flex-col gap-3 md:gap-7 mt-10">
                      <li className="flex gap-4">
                        <div className="min-w-12">
                          <img src="../assets/icons/tabs/FullControlOverContent.svg" alt="FullControlOverContent" />
                        </div>
                        <div className="">
                          <h4 className="text-base  font-semibold text-textdark">Full Control Over Content</h4>
                          <p className="small-text">Review and approve AI-generated posts to ensure they align perfectly with your brand.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="min-w-12">
                          <img src="../assets/icons/tabs/PreviewYourPosts.svg" alt="PreviewYourPosts" />
                        </div>
                        <div className="">
                          <h4 className="text-base  font-semibold text-textdark">Preview Your Posts</h4>
                          <p className="small-text">Visualise your post before it’s scheduled to go live.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="min-w-12">
                          <img src="../assets/icons/tabs/StreamlinedWorkflow.svg" alt="StreamlinedWorkflow" />
                        </div>
                        <div className="">
                          <h4 className="text-base  font-semibold text-textdark">Streamlined Workflow</h4>
                          <p className="small-text">Manage approvals effortlessly in one centralised location, saving you time. </p>
                        </div>
                      </li>

                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <img src="../assets/images/ApprovalQueue.png" className="max-w-full object-contain" alt="ApprovalQueue" />

                  </div>
                </div>
                {/* End ApprovalQueue tabs content */}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="Calendar View" title={
            <div className="flex items-center space-x-2">
             <img src="../assets/icons/tabs/Tab3.svg" alt="AutopilotMode" />

              <span className="text-base font-bold text-[#292929]">Calendar View</span>
            </div>
          } >
            <Card className="shadow-none">
              <CardBody className=" p-0">
                {/* Calendar View tabs content */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[385px,1fr] gap-5">
                  <div className="flex  flex-col items-start max-[767px]:order-2">
                    <p className="para-text text-textdark">
                      Visualize your posting schedule with an intuitive calendar to plan ahead and stay organized.
                    </p>
                    <ul className="flex flex-col gap-3 md:gap-7 mt-10">
                      <li className="flex gap-4">
                        <div className="min-w-12">
                          <img src="../assets/icons/tabs/ClearScheduleOverview.svg" alt="Clear Schedule Overview" />
                        </div>
                        <div className="">
                          <h4 className="text-base  font-semibold text-textdark">Clear Schedule Overview</h4>
                          <p className="small-text">See all your scheduled posts in one clear, easy-to-navigate calendar.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="min-w-12">
                          <img src="../assets/icons/tabs/Platform-SpecificInsights.svg" alt="Platform-Specific Insights-icon" />
                        </div>
                        <div className="">
                          <h4 className="text-base  font-semibold text-textdark">Platform-Specific Insights</h4>
                          <p className="small-text">Quickly identify which posts are scheduled for each platform. </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="min-w-12">
                          <img src="../assets/icons/tabs/PlanWeeksAdvance.svg" alt="Plan Weeks in Advance" />
                        </div>
                        <div className="">
                          <h4 className="text-base  font-semibold text-textdark">Plan Weeks in Advance</h4>
                          <p className="small-text">Maintain a consistent posting schedule by mapping out your content weeks in advance.</p>
                        </div>
                      </li>

                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <img src="../assets/images/calendar-view.png" className="max-w-full object-contain" alt="calendar-view" />
                  </div>
                </div>
                {/* End Calendar View tabs content */}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="Analytics" title={
            <div className="flex items-center space-x-2">
             <img src="../assets/icons/tabs/Tab4.svg" alt="AutopilotMode" />
              <span className="text-base font-bold text-[#292929]">Analytics</span>
            </div>
          } >
            <Card className="shadow-none">
              <CardBody className="mt-10 p-0">
                {/* analytics tabs content */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[385px,1fr] gap-5">
                  <div className="flex  flex-col items-start max-[767px]:order-2">
                    <p className="para-text text-textdark">
                      See your social media growth in one easy-to-read dashboard and optimize your strategy.
                    </p>
                    <ul className="flex flex-col gap-3 md:gap-7 mt-10">
                      <li className="flex gap-4">
                        <div className="min-w-12">
                          <img src="../assets/icons/tabs/ActionableInsights.svg" alt="Actionable Insights-icon" />
                        </div>
                        <div className="">
                          <h4 className="text-base  font-semibold text-textdark">Actionable Insights</h4>
                          <p className="small-text">Track key metrics like reach, engagement, and audience growth to understand what’s working.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="min-w-12">
                          <img src="../assets/icons/tabs/Data-DrivenOptimisation.svg" alt="Data-Driven Optimisation-icon" />
                        </div>
                        <div className="">
                          <h4 className="text-base  font-semibold text-textdark">Data-Driven Optimisation</h4>
                          <p className="small-text">Our AI engine learns from your data and analytics, continuously improving the content.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="min-w-12">
                          <img src="../assets/icons/tabs/SimplifiedReporting-icon.svg" alt="Simplified Reporting-icon" />
                        </div>
                        <div className="">
                          <h4 className="text-base  font-semibold text-textdark">Simplified Reporting</h4>
                          <p className="small-text">Access easy-to-read reports that help you measure success and plan your next move.</p>
                        </div>
                      </li>


                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <img src="../assets/images/analytics.png" className="max-w-full object-contain" alt="analytics" />

                  </div>
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
      <div className="custom-container container-lg relative z-0 max-[767px]:my-2 p-4 lg:p-10 xl:p-16" >
        <div className="grid grid-cols-1 items-center justify-center mb-8 lg:mb-12">
          <div className="flex  flex-col items-start justify-center text-center">
            <h4 className="sec-title  w-full">Getting Started is<span className="text-themeblue"> Simple and Easy</span></h4>
            <p className="para-text  mx-auto">
              Get started in minutes and let PostReach handle the rest – Social Media has never been this easy. </p>
          </div>
        </div>
       
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr,410px] gap-8 ">
        <motion.div initial={{ opacity: 0, x: -150 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.5 }} className="my-section">
          <div className="flex relative max-[1280px]:overflow-hidden">
            <img src="../assets/images/getting-started-img.png" className="max-w-full w-full z-10" alt="about" />
            <div className="absolute left-4 xl:left-20 top-16 z-10 animate-updown">
              <img src="../assets/images/cursor.png" className="" alt="Cursor" />
            </div>
            <div className="absolute top-24 right-4 xl:right-20 z-10 animate-updown">
              <img src="../assets/images/insta-gs.png" className="" alt="instagram" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 xl:bottom-20 -ml-14 z-10 animate-downup">
              <img src="../assets/images/linkedin-gs.png" className="" alt="Linkedin" />
            </div>
            <div className="absolute -left-20 -bottom-20">
            <img src="../assets/images/getting-started-shadow.png" className="" alt="getting-started-shadow" />
            </div>
          </div>
          </motion.div>
          <div className="flex self-center  flex-col items-start ">
          <motion.div initial={{ opacity: 0, x: 150 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.5 }} className="my-section">
            <ul className="flex flex-col gap-4  simple-easy-list">
              <li className="flex gap-6">
                <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full border border-textdark bg-white">
                  1
                </div>
                <div className="">
                  <h4 className="text-base  font-semibold text-textdark">Sign Up in Seconds</h4>
                  <p className="small-text">Create your account quickly and start your journey to effortless social media management.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full border border-textdark bg-white">
                  2
                </div>
                <div className="">
                  <h4 className="text-base  font-semibold text-textdark">Complete a 5-Minute Questionnaire</h4>
                  <p className="small-text">Answer a few easy questions about your business and audience to help our AI understand your needs.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full border border-textdark bg-white">
                  3
                </div>
                <div className="">
                  <h4 className="text-base  font-semibold text-textdark">Let the AI Work Its Magic</h4>
                  <p className="small-text">Watch as PostReach AI generates tailored posts designed to engage your audience.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full border border-textdark bg-white">
                  4
                </div>
                <div className="">
                  <h4 className="text-base  font-semibold text-textdark">Review and Approve Content</h4>
                  <p className="small-text">Preview and approve your posts to ensure they align perfectly with your brand.</p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="w-8 h-8 min-w-8 min-h-8 text-base leading-none flex items-center justify-center rounded-full">
                  <img src='../assets/icons/done.svg' alt="check" />
                </div>
                <div className="">
                  <h4 className="text-base  font-semibold text-textdark">Sit Back as Posts Go Live</h4>
                  <p className="small-text">Our AI schedules and publishes your approved content, keeping your social media active and consistent.</p>
                </div>
              </li>

            </ul>
            <a href="#" className="mt-7 w-full sm:w-auto min-w-40 inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-white bg-themeblue border border-themeblue hover:bg-white hover:border-textdark hover:text-textdark">Get Started
            </a>
            </motion.div>
          </div>
        </div>
       
      </div>
      {/* <!-- End Section Getting Started --> */}

      {/* <!-- Section Generative AI --> */}
      <div className="custom-container">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 xl:grid-cols-[495px,1fr] ">
        <motion.div initial={{ opacity: 0, x: -150 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.5 }} className="my-section">
          <div className="flex  flex-col items-start justify-between">
            <h4 className="sec-title">Stunning Visuals Powered by<span className="text-themeblue"> Generative AI</span></h4>
            <p className="para-text">
              Unlike other tools, PostReach leverages the most advanced generative AI technologies to craft captivating visuals, ensuring your posts stand out and engage with your audience.
            </p>
            <a  className="mt-7  w-full sm:w-auto min-w-40 inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-white bg-themeblue border border-themeblue hover:bg-white hover:border-textdark hover:text-textdark">Get Started
            </a>
          </div>
          </motion.div>
          <div className="flex  flex-col items-star max-[767px]:-order-1">
          <motion.div initial={{ opacity: 0, x: 150 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.5 }} className="my-section">
            <div className=" w-full relative max-[767px]:pt-5 max-[1280px]:overflow-hidden">
              <img src="../assets/images/Generative-Ai.png" alt="GenerativeAI" className="relative z-10" />
              <div className="absolute -right-20 -bottom-8 lg:-bottom-20">
            <img src="../assets/images/generative-ai-shadow.png" className="" alt="generative-ai-shadow" />
            </div>
            </div>
            </motion.div>
          </div>

        </div>
      </div>
      {/* <!-- End Section Generative AI --> */}

      {/* <!-- Section advance-AI-Engine --> */}
      <div className="custom-container">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 xl:grid-cols-[550px,1fr]">
          <div className="flex  flex-col items-star">
          <motion.div initial={{ opacity: 0, x: -150 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.5 }} className="my-section">
            <div className=" w-full">
              <img src="../assets/images/advance-Ai-Engine.png" alt="GenerativeAI Engine" />
            </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 150 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.5 }} className="my-section">
          <div className="flex  flex-col items-start justify-between">
            <h4 className="sec-title">Smarter Social Media Powered by our <span className="text-themeblue"> Advanced AI Engine</span></h4>
            <p className="para-text">
              PostReach harnesses the most advanced large language models (LLMs), always updated to the latest versions for maximum performance. Unlike other tools, there’s no need to choose a model – we handle it all to deliver the best results effortlessly.
            </p>
            <a href="#" className="mt-7 w-full sm:w-auto min-w-40 inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-white bg-themeblue border border-themeblue hover:bg-white hover:border-textdark hover:text-textdark">Get Started
            </a>
          </div>
          </motion.div>


        </div>
      </div>
      {/* <!-- End Section advance-AI-Engine --> */}

      {/* <!-- Section What Our Happy Clients Say --> */}
      <div className="custom-container container-lg bg-[#F1F6FC] rounded-[32px] relative z-0 p-5 lg:p-10 xl:p-16 my-12">
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden -z-10">
          <img src="../assets/images/dot-bg.png" className="max-w-[1440px]" alt="dot-bg" />
        </div>
        <div className="grid grid-cols-1 items-center justify-center mb-6 lg:mb-8 xl:mb-14">
          <div className="flex  flex-col items-start justify-center text-left">
            <h4 className="sec-title  w-full">What Our<span className="text-themeblue"> Happy Clients Say</span></h4>
            <p className="para-text">
              Hear why businesses and creators love PostReach</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <Carousel
            additionalTransfrom={0}
            arrows={customerReview.length > 1} // Only show arrows if more than 1 item
            autoPlaySpeed={3000}
            infinite={false}
            centerMode={false}
            className="our-customer-slider"
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
              mobile: {
                breakpoint: { max: 600, min: 0 },
                items: 1,
              },
              tablet: {
                breakpoint: { max: 1024, min: 600 },
                items: 2,
              },
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
              <div className="flex  relative z-10 px-1 md:px-3" key={index}>

                <div className="flex  flex-col items-start bg-white rounded-3xl pt-6 pb-6 xl:pb-12 px-6 xl:px-8 h-full">
                  <div className="ml-auto">
                    <img src="../assets/images/testimonial.png" className="max-w-9" alt="testimonial" />
                  </div>
                  <h4 className="text-[#292929] text-base font-bold">A Game-Changer for My Business</h4>
                  <p className="text-base text-[#656565] mt-1 mb-6">
                    “PostReach AI has saved me countless hours. The content is engaging, the visuals are stunning, and the automation makes my life so much easier.”
                  </p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="w-12 h-12 min-w-12 rounded-full overflow-hidden">
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
                      <h4 className="text-sm  text-[#292929] font-semibold">Ricky Aprilia</h4>
                      <p className="text-sm  font-normal text-[#7C7C7C]">Ricky Aprilia</p>
                    </div>
                  </div>
                </div>

              </div>

              // <div className="px-2" key={index}> 
              //     <div className="p-2 border border-[#E4E7EC] bg-white rounded-lg">
              //         <div className="">
              //             <img
              //                 src={item.img}
              //                 style={{
              //                 display: 'block',
              //                 // height: '100%',
              //                 margin: 'auto',
              //                 // width: '100%',
              //             }}
              //             alt='User Image'
              //         />
              //         </div>
              //     </div>
              // </div>
            ))}
          </Carousel>
        </div>
      </div>
      {/* <!-- End Section What Our Happy Clients Say --> */}

      {/* <!-- Section As Featured In --> */}

      <div className="custom-container" ref={integrationRef}>
        <div className="grid grid-cols-1 items-center gap-x-6 lg:gap-x-10 xl:gap-x-16">
          <div className="col-span-1 text-center">
            <h4 className="sec-title w-full">As Featured In</h4>
          </div>
          <div className="col-span-1 our-customer-slider mt-5">
            <div className="marquee-container flex relative z-10 px-8">
              <div className="marquee">
                <img src="../assets/images/featuredIn-slider/featuredIn1.png" alt="featuredIn1" />
                <img src="../assets/images/featuredIn-slider/featuredIn2.png" alt="featuredIn2" />
                <img src="../assets/images/featuredIn-slider/featuredIn3.png" alt="featuredIn3" />
                <img src="../assets/images/featuredIn-slider/featuredIn1.png" alt="featuredIn1" />
                {/* Duplicate the images for seamless scrolling */}
                <img src="../assets/images/featuredIn-slider/featuredIn1.png" alt="featuredIn1" />
                <img src="../assets/images/featuredIn-slider/featuredIn2.png" alt="featuredIn2" />
                <img src="../assets/images/featuredIn-slider/featuredIn3.png" alt="featuredIn3" />
                <img src="../assets/images/featuredIn-slider/featuredIn1.png" alt="featuredIn1" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Section As Featured In --> */}

      {/* <!-- Section Seamless Integrations --> */}

      <div className="custom-container relative z-0 pt-7 my-12">
        <div className="absolute left-0 top-0 h-full w-full overflow-hidden -z-10">
          <img src="../assets/images/SeamlessIntegrations-bg.png" className="max-w-full min-[1365px]:max-w-[1200px] mx-auto  h-full w-full object-cover rounded-3xl" alt="dot-bg" />
        </div>
        <div className="grid grid-cols-1 items-center gap-x-6 lg:gap-x-10 xl:gap-x-16">
          <div className="col-span-1 text-center">
            <div className="mx-auto max-w-[520px]">
              <h4 className="sec-title w-full text-white"><span className="text-themeblue">Seamless Integrations</span> with Your Favorite Platforms</h4>
              <p className="para-text  mx-auto">PostReach AI seamlessly integrates with your favorite social media platforms, simplifying your management and boosting efficiency.</p>
            </div>
          </div>
          <div className="col-span-1 text-center">
            <ul className="w-full inline-flex justify-center gap-x-0 gap-y-4 max-[767px]:max-w-[235px] max-[767px]:flex-wrap md:gap-12 lg:gap-20 xl:gap-24 items-center pt-10 pb-10 lg:pt-28 lg:pb-16 ">
              <li className="max-[767px]:text-center max-[767px]:w-1/2">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full border-[6px] bg-white border-white  mx-auto animate-updown-sm delay-0">
                  <img src="../assets/icons/Social-icons/linkedin.svg" alt="linkedin" />
                </div>
                <p className="text-white text-sm md:text-lg font-normal text-center mt-3 md:mt-5 ">LinkedIn</p>
              </li>
              <li className="max-[767px]:text-center max-[767px]:w-1/2">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full border-[6px] bg-white border-white  mx-auto animate-downup-sm delay-50">
                  <img src="../assets/icons/Social-icons/facebook.svg" alt="facebook" />
                </div>
                <p className="text-white text-sm md:text-lg font-normal text-center mt-3 md:mt-5">Facebook</p>
              </li>
              <li className="max-[767px]:text-center max-[767px]:w-1/2">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full border-[6px] bg-white border-white  mx-auto animate-updown-sm delay-75">
                  <img src="../assets/icons/Social-icons/instagram.svg" alt="instagram" />
                </div>
                <p className="text-white text-sm md:text-lg font-normal text-center mt-3 md:mt-5">Instagram</p>
              </li>
              <li className="max-[767px]:text-center max-[767px]:w-1/2">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full border-[6px] bg-white border-white  mx-auto animate-downup-sm delay-100">
                  <img src="../assets/icons/Social-icons/twitter.svg" alt="twitter" />
                </div>
                <p className="text-white text-sm md:text-lg font-normal text-center mt-3 md:mt-5">X</p>
              </li>
              <li className="max-[767px]:text-center max-[767px]:w-1/2">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-full flex items-center justify-center  mx-auto">
                  <img src="../assets/icons/Social-icons/more.svg" alt="coming soon" />
                </div>
                <p className="text-white text-sm md:text-lg font-normal text-center mt-3 md:mt-5">more coming soon</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- End Section Seamless Integrations --> */}

      {/* <!-- Section Pricing  --> */}

      <div className="custom-container" ref={pricingRef}>
        <div className="grid grid-cols-1 items-center gap-x-6 lg:gap-x-10 xl:gap-x-16 ">
          <div className="col-span-1 text-center">
            {/* <p className="sec-sub-title w-full">Pricing</p> */}
            <h4 className="sec-title w-full">Choose the Plan That <span className="text-themeblue">Fits Your Needs</span></h4>
            <p className="para-text max-w-[520px] mx-auto">
              Choose a plan that suits your business needs and unlock all the tools you need to grow your social media effortlessly. </p>
          </div>

        </div>
        <motion.div initial={{ opacity: 0, y: 150 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.5 }} className="my-section">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center  gap-3 lg:gap-6 max-w-[1200px] mx-auto mt-8 lg:mt-10 xl:mt-20 ">
          <div className="col-span-1 mb-8 md:mb-0">
            <div className="flex flex-wrap flex-col p-4 lg:py-8 lg:px-6 rounded-[40px] border border-[#D9D9D9] relative z-10">
              <div className="absolute top-0 left-0 -z-10  h-full">
                <img src="../assets/images/pro-package.png" className="h-full w-full rounded-[40px]" alt="pro-package" />
              </div>
              <div className="w-max m-auto text-center -mt-10 lg:-mt-14">
                <div className="flex flex-row items-center gap-2 py-2 px-6 text-base md:text-lg font-semibold rounded-[50px] border border-themeblue text-themeblue bg-white">
                  <img src="../assets/images/coming-soon-star.png" alt="coming-soon-icon" /> Coiming Soon
                </div>
              </div>
              <div className="inline-flex max-w-max mt-4 lg:mt-6  text-2xl lg:text-[28px] leading-8 text-[#292929] font-bold rounded-lg">
                Pro Package
              </div>
              <p className="text-[#7C7C7C] text-sm md:text-base  font-normal">
                Content Personalized to your brand
              </p>
              <ul className="w-full inline-flex justify-start gap-4 items-center mt-6">
                <li>
                  <div className="h-6 w-6 mx-auto">
                    <img src="../assets/icons/facebook.svg" alt="facebook" />
                  </div>
                </li>
                <li>
                  <div className="h-6 w-6 mx-auto">
                    <img src="../assets/icons/instagram.svg" alt="instagram" />
                  </div>
                </li>
                <li>
                  <div className="h-6 w-6 mx-auto">
                    <img src="../assets/icons/twitter.svg" alt="twitter" />
                  </div>
                </li>
                <li>
                  <div className="h-6 w-6 mx-auto">
                    <img src="../assets/icons/linkedin.svg" alt="linkedin" />
                  </div>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-[#EFEFEF]">
                <h4 className=" text-3xl lg:text-4xl xl:text-[48px] xl:leading-[56px] text-[#292929] font-bold mb-3">$29.00<span className="text-[#7C7C7C] font-normal text-base leading-5">(Per Month)</span></h4>

              </div>
            </div>

          </div>

          <div className="col-span-1 mb-8 md:mb-0 max-[767px]:-order-1">
            <div className="flex flex-wrap flex-col p-6 lg:py-8 lg:px-6 rounded-[40px] z-10 relative">
              <div className="h-full w-full mx-auto absolute top-0 left-0 -z-10">
                <img src="../assets/images/starter-package-bg.png" className="h-full w-full rounded-[40px] " alt="package-bg" />
              </div>
              <div className="inline-flex max-w-max mt-4 lg:mt-6  text-2xl lg:text-[28px] leading-8 text-white font-bold rounded-lg">
                Starter Package
              </div>
              <p className="text-[#EFEFEF] text-sm md:text-base  font-normal">
                Content Personalized to your brand
              </p>
              <ul className="w-full inline-flex justify-start gap-4 items-center mt-6">
                <li>
                  <div className="h-6 w-6 mx-auto">
                    <img src="../assets/icons/facebook.svg" alt="facebook" />
                  </div>
                </li>
                <li>
                  <div className="h-6 w-6 mx-auto">
                    <img src="../assets/icons/instagram.svg" alt="instagram" />
                  </div>
                </li>
                <li>
                  <div className="h-6 w-6 mx-auto">
                    <img src="../assets/icons/twitter.svg" alt="twitter" />
                  </div>
                </li>
                <li>
                  <div className="h-6 w-6 mx-auto">
                    <img src="../assets/icons/linkedin.svg" alt="linkedin" />
                  </div>
                </li>
              </ul>
              <div className="my-6 py-6 border-t border-b border-[#EFEFEF]">
                <h4 className=" text-3xl lg:text-4xl xl:text-[48px] xl:leading-[56px] text-white font-bold mb-3">$20.00<span className="opacity-80 font-normal text-base leading-5">(Per Month)</span></h4>
                <a href="#" className="theme-primary-btn block w-full bg-white hover:bg-white font-bold text-textdark mt-auto w-full text-center py-3 leading-[22px]">Get Started</a>

              </div>
              <ul className="flex flex-wrap flex-col gap-4 mb-5 lg:mb-8 xl:mb-16">
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
          </div>


          <div className="col-span-1">
            <div className="flex flex-wrap flex-col p-4 lg:py-8 lg:px-6 rounded-[40px] border border-[#D9D9D9] relative z-10">
              <div className="absolute top-0 right-0 -z-10 h-full">
                <img src="../assets/images/unlimited-package.png" className="h-full w-full rounded-[40px]" alt="unlimited-package" />
              </div>
              <div className="w-max m-auto text-center -mt-10 lg:-mt-14">
                <div className="flex flex-row items-center gap-2 py-2 px-6 text-lg font-semibold rounded-[50px] border border-themeblue text-themeblue bg-white">
                  <img src="../assets/images/coming-soon-star.png" alt="coming-soon-icon" /> Coiming Soon
                </div>
              </div>
              <div className="inline-flex max-w-max mt-4 lg:mt-6 text-2xl lg:text-[28px] leading-8 text-[#292929] font-bold rounded-lg">
                Ultimate Package
              </div>
              <p className="text-[#7C7C7C] text-sm md:text-base  font-normal">
                Content Personalized to your brand
              </p>
              <ul className="w-full inline-flex justify-start gap-4 items-center mt-6">
                <li>
                  <div className="h-6 w-6 mx-auto">
                    <img src="../assets/icons/facebook.svg" alt="facebook" />
                  </div>
                </li>
                <li>
                  <div className="h-6 w-6 mx-auto">
                    <img src="../assets/icons/instagram.svg" alt="instagram" />
                  </div>
                </li>
                <li>
                  <div className="h-6 w-6 mx-auto">
                    <img src="../assets/icons/twitter.svg" alt="twitter" />
                  </div>
                </li>
                <li>
                  <div className="h-6 w-6 mx-auto">
                    <img src="../assets/icons/linkedin.svg" alt="linkedin" />
                  </div>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-[#EFEFEF]">
                <h4 className=" text-3xl lg:text-4xl xl:text-[48px] xl:leading-[56px] text-[#292929] font-bold mb-3">$49.00<span className="text-[#7C7C7C] font-normal text-base leading-5">(Per Month)</span></h4>

              </div>
            </div>

          </div>
        </div>
        </motion.div>
      </div>
      {/* <!-- End Section Pricing --> */}

      {/* <!-- Section We Are Here To Help --> */}
      <div className="custom-container max-[767px]:mt-10">

        <div className="items-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-[485px,1fr] gap-x-4 lg:gap-x-6 xl:gap-x-14 z-10 relative">
          <div className="absolute top-12 -left-16 -z-10  h-full max-w-[400px]">
            <img src="../assets/images/blur-circle.png" className="h-full w-full" alt="blur-circle" />
          </div>
          <div className="flex  flex-col items-start justify-between gap-3 text-left">
            <h4 className="sec-title w-full mb-0">We Are Here <span className="text-themeblue"> To Help</span></h4>
            <p className="para-text max-w-[520px] mb-3">
              Got questions? We’ve got answers! Here are some of the most common queries about PostReach AI. </p>
            <a href="#" className="mt-0 w-full sm:w-auto mb-8 min-w-40 inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-white bg-themeblue border border-themeblue hover:bg-white hover:border-textdark hover:text-textdark">Contact us
            </a>

          </div>

          <div className="flex  flex-col items-start justify-start">
            <Accordion showDivider={false}
              disableIndicatorAnimation={true}
              itemClasses={itemClasses}>
              <AccordionItem className="" key="1" aria-label="Accordion 1" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="I don’t have time. Is this tool for me?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C]">Yes, PostReach AI was created specifically for busy businesses and creators. It automates the entire social media workflow, saving you time while maintaining a consistent online presence.</p>
              </AccordionItem>
              <AccordionItem className="" key="2" aria-label="Accordion 2" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="Why not use an agency or hire a freelancer?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C]">Hiring agencies or freelancers often comes with high costs and requires ongoing management. PostReach AI is affordable, efficient, and requires no supervision, making it a hassle-free alternative.</p>
              </AccordionItem>
              <AccordionItem className="" key="3" aria-label="Accordion 3" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="Is the content generated compliant with community guidelines?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C]">Absolutely. Our AI engine is always up to date with the latest community guidelines to ensure all generated content is safe for posting and fully compliant.</p>
              </AccordionItem>
              <AccordionItem className="" key="4" aria-label="Accordion 4" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="Can I control what gets posted on my social media?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C]">Yes! With our Approval Queue feature, you can preview and approve all content before it’s posted, ensuring everything aligns with your brand.</p>
              </AccordionItem>
              <AccordionItem className="" key="4" aria-label="Accordion 4" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="What platforms does PostReach AI support?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C]">PostReach AI seamlessly integrates with Facebook, Instagram, LinkedIn, and X (formerly Twitter), with more platforms planned for the future.</p>
              </AccordionItem>
              <AccordionItem className="" key="4" aria-label="Accordion 4" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="How does the AI know what content to create?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C]">Our AI engine learns about your business through a simple onboarding questionnaire. It uses this information to craft content tailored to your brand, audience, and goals.</p>
              </AccordionItem>
              <AccordionItem className="" key="4" aria-label="Accordion 4" indicator={({ isOpen }) => (isOpen ? <AccOpenIcon /> : <AccCloseIcon />)} title="Can I edit the generated content or posts?">
                <p className="text-sm md:text-base font-normal text-[#7C7C7C]">In this initial version, editing is not available. PostReach&apos;s Social Media Expert AI uses advanced SEO techniques, adheres to community guidelines, and leverages data to maximise post performance. Trust our AI to handle the hard work and deliver optimised, engaging content tailored to your needs.</p>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      {/* <!-- End Section We Are Here To Help --> */}

      {/* <!-- Section Insights & Tips to Grow Your Social Media --> */}
      <div ref={blogRef}>
        <div className="custom-container relative z-0 my-12 delay-[300ms] duration-[600ms]" >
          <div className="grid grid-cols-1 items-center justify-center mb-10">
            <div className="flex  flex-col items-start justify-center text-center">
              <h4 className="sec-title  w-full"><span className="text-themeblue">Insights & Tips </span>to Grow Your Social Media</h4>
              <p className="para-text mx-auto">
                Got questions? We’ve got answers! Here are some of the most common queries about PostReach AI.</p>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.5 }} className="my-section">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-8 xl:mb-10">
          {latestBlog.map((item,index) => (
              <div className="blog-col" onClick={() => handleBlogDetail(item._id)} key={index}>
              <div className="blog-img-thumb">
              <img src={urlFor(item.blog_image).url()} className="h-full w-full rounded-xl" alt="blog-1" />
              </div>
              <p className="blog-category-tag">{item.category_id.name}</p>
              <h4 className="blog-title">{item.title}</h4>
              <p className="blog-content-p">{item.description}</p>
              <div className="blog-footer">
                <div className="blog-u-img">
                <img src={urlFor(item.author_image_url).url()} className="h-full w-full rounded-xl" alt="blog-1" />
                </div>
                <div className="blog-author">
                  <h4 className="blog-username">{item.author_name}</h4>
                  <div className="seprator-round"></div>
                  <p className="blog-date">{moment(new Date(item._createdAt),('DD/MM/yyyy')).format('DD MMMM, yyyy')}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
          <div className="grid grid-cols-1 items-center justify-center">
            <a onClick={handleViewBlog} className="mx-auto w-full sm:w-auto min-w-40 sm:max-w-max inline-flex items-center justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-white bg-themeblue border border-themeblue hover:bg-white hover:border-textdark hover:text-textdark cursor-pointer">View more </a>
          </div>
          </motion.div>
        </div>
      </div>
      {/* <!-- End Section Insights & Tips to Grow Your Social Media --> */}
     {/* <!-- Section Ready to Boost Your Social Media? --> */}
      <div className="custom-container  relative z-0 pl-0 md:pl-6 lg:pl-16 pt-8 lg:pt-12 pb-0 my-12">
        <motion.div initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.5 }} className="my-section">
          <div className="absolute left-0 top-0 h-full w-full rounded-3xl overflow-hidden -z-10">
            <img src="../assets/images/maskbg.png" className="max-w-[1200px] h-full w-full" alt="mask-bg" />
          </div>
          <div className="items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[400px,1fr] gap-x-10 mb-0 md:mb-12 lg:mb-24  relative max-[767px]:pl-5">
            {/* <div className="absolute h-[530px] w-[398px] bg-[#ACE1F333] backdrop-blur-2xl rounded-full"></div> */}
            <div className="flex  flex-col items-start justify-between gap-3 text-left pr-5 lg:pr-0">
              <h4 className="sec-title w-full mb-0 text-white">Ready to Boost Your Social Media?</h4>
              <p className="para-text max-w-[520px] mb-3 text-white">
                Start your free trial today and experience the power of PostReach AI. Simplify your social media management, save time, and grow your Business or Brand effortlessly. </p>
              <a href="#" className="my-6 md:my-0 w-full sm:w-auto  min-w-40 inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-[#0A2761] bg-white  hover:bg-[#0A2761] hover:border-white hover:text-white">Start Your Free Trial Now!
              </a>

            </div>

            <div className="flex  flex-col items-start justify-start relative">
              <div className="">
                <img src="../assets/images/freetrial-img.png" className="h-full w-full max-w-full" alt="" />
              </div>
              <div className="absolute bottom-5 max-[767px]:max-w-14 -left-4 md:-left-8">
                <img src="../assets/images/heart-freetrial.png" className="h-full w-full max-w-full" alt="" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* <!-- End Section Ready to Boost Your Social Media? --> */}
    </div>

  );
};

export default MainLayout;
