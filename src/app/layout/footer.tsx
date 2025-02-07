'use client'
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import navigations from '../navigation-list/navigation';
import { DataContext } from '../context/shareData';
import { useLoading } from '../context/LoadingContext';

const Footer: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { setIsLoading } = useLoading();
    const context = useContext(DataContext);

    if (!context) {
        throw new Error('DataContext must be used within a DataProvider');
    }

    useEffect(() => {
        router.prefetch(navigations.privacyPolicy);
        router.prefetch(navigations.termsCondition);
        router.prefetch(navigations.home);
        router.prefetch(navigations.blogList);
      }, []);

    const handleNavigation = (type:string) => {
        if(type == 'privacy'){
            router.push(navigations.privacyPolicy);
        }else  if(type == 'terms'){
            router.push(navigations.termsCondition);
        }else if(type == 'blog'){
            router.push(navigations.blogList)
        }else if(type == 'home'){
            context.setData(type);
            if(pathname !== navigations.home) {
              setIsLoading(true);
              router.push(navigations.home);
            };
        }
    }

    const handleComingSoon = () => {
        router.push(navigations.comingSoon);
    }

  return (
    <div className="">
       {/* footer */}
       
       
       <div className="custom-container max-w-full p-0">
        <div className="bg-[#05183F]">
        <div className="custom-container max-[767px]:p-0">
            <div className="grid  grid-cols-1 w-full items-center gap-6 md:gap-8 lg:gap-28 lg:grid-cols-[260px,1fr] py-8 md:py-10">
            <div className="flex  flex-col">
                <a onClick={() =>handleNavigation('home')} className="cursor-pointer">
                <span className="logo">
                <img src='../assets/images/PostReachLogo-white.webp' alt="logo" className="max-w-48" />
                </span>
                </a>
                <ul className="w-full inline-flex justify-start gap-3 items-center mt-3 mb-7">
                <li className="text-lg font-semibold text-white">
                    Follow us:
                </li>
                <li className="h-6 w-6">
                    <a href="https://www.facebook.com/postreachai" target='blank'>
                    <img src='../assets/icons/Social-icons/facebook-white.webp' alt="facebook" />
                    </a>
                </li>
                <li className="h-6 w-6">
                    <a href="https://www.instagram.com/postreachai" target='blank'>
                    <img src='../assets/icons/Social-icons/instagram-white.webp' alt="Instagram" />
                    </a>
                </li>

                <li className="h-6 w-6">
                    <a href="https://www.linkedin.com/postreachai" target='blank'>
                    <img src='../assets/icons/Social-icons/linkedin-white.webp' alt="linkdein" />
                    </a>
                </li>
                <li className="h-6 w-6">
                    <a href="https://x.com/PostReachAI" target='blank'>
                    <img src='../assets/icons/Social-icons/twitter-whte.webp' alt="twitter" />
                    </a>
                </li>
                </ul>
                <div className="">
                <div className="marquee-container">
                    <div className="marquee max-h-16 lg:max-h-[72px] ">
                    <img  src="../assets/images/marquee.webp"  alt="marquee" />
                        {/* {images}
                        {images}  */}
                        {/* Duplicate the images for seamless scrolling */}
                    </div>
                </div>
                </div>
            </div>
            <div className="flex max-[767px]:flex-wrap flex-row gap-0 md:gap-4 lg:gap-6 xl:gap-10">
                <div className="flex-[50%] md:flex-1">
                <h4 className="text-base md:text-lg font-bold text-white mb-4">Company</h4>
                <ul className="text-sm md:text-base text-white font-normal flex flex-col gap-3">
                    <li>
                    <a href="#">About Us</a>
                    </li>
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>Careers</a>
                    </li>
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>Affiliates</a>
                    </li>
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>Help Center</a>
                    </li>
                    <li>
                    <a className="cursor-pointer" onClick={() =>handleNavigation('blog')}>Blog</a>
                    </li>
                </ul>
                </div>
                <div className="flex-[50%] md:flex-1">
                <h4 className="text-base md:text-lg font-bold text-white mb-4">Compare</h4>
                <ul className="text-sm md:text-base text-white font-normal flex flex-col gap-3">
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>Hootsuite vs PostReach</a>
                    </li>
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>Buffer vs PostReach</a>
                    </li>
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>SpoutSocial vs PostReach</a>
                    </li>
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>SocialPilot vs PostReach</a>
                    </li>
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>Later vs PostReach</a>
                    </li>
                </ul>
                </div>
                <div className="flex-[50%] md:flex-1">
                <h4 className="text-base md:text-lg font-bold text-white mt-8 md:mt-0 mb-4">Free Tools</h4>
                <ul className="text-sm md:text-base text-white font-normal flex flex-col gap-3">
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>Post Compliance Checker</a>
                    </li>
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>Image to Post Generator</a>
                    </li>
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>URL to Post Generator</a>
                    </li>
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>Post Idea Generator</a>
                    </li>
                    <li>
                    <a onClick={handleComingSoon} className='cursor-pointer'>Instagram Caption Generator</a>
                    </li>

                </ul>
                </div>
            </div>
            </div>
        </div>
        </div>
        <div className="bg-[#05183F] p-0 mb:p-6 border-t-1 border-[#FFFFFF33]">
        <div className="custom-container py-2">
            <div className="flex flex-wrap items-center justify-between text-sm text-[#E9EBF8] font-normal">
            <p className="max-[767px]:py-4">
                © 2025 PostReachAI | All Rights Reserved
            </p>
            <ul className=" flex flex-wrap gap-6 max-[767px]:mb-4 ">
                <li>
                <a href="#">Sitemap</a>
                </li>
                <li>
                <a onClick={() =>handleNavigation('privacy')} className='cursor-pointer'>Privacy Policy</a>
                </li>
                <li>
                <a onClick={() =>handleNavigation('terms')} className='cursor-pointer'>Term of Service</a>
                </li>

            </ul>
            </div>
        </div>
        </div>
        </div>
        {/* footer */}
    </div>
  );
};

export default Footer;
