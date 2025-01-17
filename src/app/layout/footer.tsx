'use client'
import React from 'react';

const Footer: React.FC = () => {

    const images = Array.from({ length: 10 }).map((_, index) => (
        <img
          key={index}
          src="../assets/images/marquee.png"
          alt={`Marquee ${index}`}
        />
      ));

  return (
    <div className="">
       {/* footer */}
       
       
       <div className="custom-container max-w-full p-0">
        <div className="bg-[#05183F]">
        <div className="custom-container max-[767px]:p-0">
            <div className="grid  grid-cols-1 w-full items-center gap-6 md:gap-8 lg:gap-28 lg:grid-cols-[260px,1fr] py-10">
            <div className="flex  flex-col">
                <a href="#" className="">
                <span className="logo">
                    <img src='../assets/images/logo-white.png' alt="logo" />
                </span>
                </a>
                <ul className="w-full inline-flex justify-start gap-3 items-center mt-3 mb-7">
                <li className="text-lg font-semibold text-white">
                    Follow us:
                </li>
                <li className="h-6 w-6">
                    <a href="#">
                    <img src='../assets/icons/Social-icons/facebook-white.svg' alt="facebook" />
                    </a>
                </li>
                <li className="h-6 w-6">
                    <a href="#">
                    <img src='../assets/icons/Social-icons/instagram-white.svg' alt="Instagram" />
                    </a>
                </li>

                <li className="h-6 w-6">
                    <a href="#">
                    <img src='../assets/icons/Social-icons/linkedin-white.svg' alt="linkdein" />
                    </a>
                </li>
                <li className="h-6 w-6">
                    <a href="#">
                    <img src='../assets/icons/Social-icons/twitter-whte.svg' alt="twitter" />
                    </a>
                </li>
                </ul>
                <div className="">
                <div className="marquee-container">
                    <div className="marquee">
                        {images}
                        {images} {/* Duplicate the images for seamless scrolling */}
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
                    <a href="#">Careers</a>
                    </li>
                    <li>
                    <a href="#">Affiliates</a>
                    </li>
                    <li>
                    <a href="#">Help Center</a>
                    </li>
                    <li>
                    <a href="#">Blog</a>
                    </li>
                </ul>
                </div>
                <div className="flex-[50%] md:flex-1">
                <h4 className="text-base md:text-lg font-bold text-white mb-4">Compare</h4>
                <ul className="text-sm md:text-base text-white font-normal flex flex-col gap-3">
                    <li>
                    <a href="#">Hootsuite vs PostReach</a>
                    </li>
                    <li>
                    <a href="#">Buffer vs PostReach</a>
                    </li>
                    <li>
                    <a href="#">SpoutSocial vs PostReach</a>
                    </li>
                    <li>
                    <a href="#">SocialPilot vs PostReach</a>
                    </li>
                    <li>
                    <a href="#">Later vs PostReach</a>
                    </li>
                </ul>
                </div>
                <div className="flex-[50%] md:flex-1">
                <h4 className="text-base md:text-lg font-bold text-white mt-8 md:mt-0 mb-4">Free Tools</h4>
                <ul className="text-sm md:text-base text-white font-normal flex flex-col gap-3">
                    <li>
                    <a href="#">Post Compliance Checker</a>
                    </li>
                    <li>
                    <a href="#">Image to Post Generator</a>
                    </li>
                    <li>
                    <a href="#">URL to Post Generator</a>
                    </li>
                    <li>
                    <a href="#">Post Idea Generator</a>
                    </li>
                    <li>
                    <a href="#">Instagram Caption Generator</a>
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
                © 2024 MyRider | All Rights Reserved
            </p>
            <ul className=" flex flex-wrap gap-6 max-[767px]:mb-4 ">
                <li>
                <a href="#">Sitemap</a>
                </li>
                <li>
                <a href="#">Privacy Policy</a>
                </li>
                <li>
                <a href="#">Term of Service</a>
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
