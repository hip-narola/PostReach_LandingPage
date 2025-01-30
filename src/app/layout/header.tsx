'use client'
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import navigations from '../navigation-list/navigation';
import { DataContext } from '../context/shareData';
import { useLoading } from '../context/LoadingContext';

const Header: React.FC = () => {
const { setIsLoading } = useLoading();
  const context = useContext(DataContext);

  if (!context) {
      throw new Error('DataContext must be used within a DataProvider');
  }


  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (type:string) => {
    context.setData(type);
    if(type == 'blog'){
      router.push(navigations.blogList)
    }else{
      if(pathname !== navigations.home) {
        setIsLoading(true);
        router.push(navigations.home);
      };
    }
    
  }

  const handleMenu = ( ) => {
    context.setMobilenav(true);
  }

  const handleLogin = () =>{
    window.open(`${process.env.NEXT_PUBLIC_POSTREACH_URL}/auth/signin`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="">
        <header className="fixed  bg-white inset-x-0 top-0 z-50 max-w-[100vw] max-[1023px]:shadow-[0px_4px_12px_0px_#10194208]">
        <nav className="custom-nav" aria-label="Global">
          <div className="flex">
            <a onClick={() => handleNavigation('home')} className="cursor-pointer">
              <span className="logo">
                <img src='../assets/images/PostReachLogo.webp' alt="logo" className="max-w-[132px] md:max-w-36 xl:max-w-48" />
              </span>
            </a>
          </div>
          <div className="flex ml-auto lg:hidden">
            <button type="button" onClick={handleMenu} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Open main menu</span>
                <img src="../assets/icons/list.svg" alt="menu" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a onClick={() => handleNavigation('home')} className="text-base font-normal leading-6 text-[#525252] cursor-pointer">Home</a>
            <a onClick={() => handleNavigation('feature')} className="text-base font-normal leading-6 text-[#525252] cursor-pointer">Features</a>
            <a onClick={() => handleNavigation('integration')} className="text-base font-normal leading-6 text-[#525252] cursor-pointer">Integrations</a>
            <a onClick={() => handleNavigation('pricing')} className="text-base font-normal leading-6 text-[#525252] cursor-pointer">Pricing</a>
            <a onClick={() => handleNavigation('blog')} className="text-base font-normal leading-6 text-[#525252] cursor-pointer">Blog</a>
          </div>
          <div className="hidden gap-x-3 lg:flex lg:flex-1 lg:justify-end ">
            <a onClick={handleLogin} className=" cursor-pointer min-w-40 inline-flex justify-center text-center  text-base  font-bold px-5 py-3 rounded-full text-textdark border border-textdark hover:border-themeblue hover:text-themeblue">Start Free Trial</a>
            <a onClick={handleLogin} className=" cursor-pointer min-w-40 inline-flex justify-center text-center bg-themeblue text-base leading-6 font-bold px-10 py-3 rounded-full text-white border border-themeblue hover:border-textdark hover:text-textdark hover:bg-white">Log in</a>
          </div>
        </nav>

      </header>
    </div>
  );
};

export default Header;
