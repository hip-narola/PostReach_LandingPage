'use client'
import React, { useContext } from 'react';
import { DataContext } from '../context/shareData';
import { useLoading } from '../context/LoadingContext';
import navigations from '../navigation-list/navigation';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Sidenav: React.FC = () => {
    const context = useContext(DataContext);
    const { setIsLoading } = useLoading();
    const pathname = usePathname();
    const router = useRouter();

    if (!context) {
        throw new Error('DataContext must be used within a DataProvider');
    }
  

    const handleNavigation  = (type:string) => {
        context.setData(type);
        context.setMobilenav(false);
        if(type == 'blog'){
            router.push(navigations.blogList)
        }else{
            if(pathname !== navigations.home) {
              setIsLoading(true);
              router.push(navigations.home);
            };
          }
    }

    const handleClose  = () => {
        context.setMobilenav(false);
    }
    
    return(
        <div>
            <div className={`sidenav ${context.getMobilenav ? open : ''}`}>
             <div className="flex flex-col gap-0 p-0 bg-white min-h-[100vh] max-w-[calc(100vw-32px)]">
                <div className="flex justify-between items-center p-4 mb-4 border-b-1 border-[#EFEFEF]">
                    <a  onClick={() => handleNavigation('home')} className="cursor-pointer">
                    <span className="logo">
                    <img src='../assets/images/PostReachLogo.webp' alt="logo" className="max-w-[132px] md:max-w-48" />
                    </span>
                    </a>
                    <div className="p-0">
                    <img onClick={handleClose} src="../assets/icons/x.svg" alt="closemenu" />
                    </div>
                </div>
             <div className="flex flex-col lg:hidden gap-2 px-2">
                  <a onClick={() => handleNavigation('home')} className="flex items-center justify-between flex-row p-2 text-base font-normal leading-6 text-[#525252] cursor-pointer">Home <img src="../assets/icons/caret-right.svg" alt="caret-right" /></a>
                  <a onClick={() => handleNavigation('feature')} className="flex items-center justify-between flex-row p-2 text-base font-normal leading-6 text-[#525252] cursor-pointer">Features <img src="../assets/icons/caret-right.svg" alt="caret-right" /></a>
                  <a  onClick={() => handleNavigation('integration')} className="flex items-center justify-between flex-row p-2 text-base font-normal leading-6 text-[#525252] cursor-pointer">Integrations <img src="../assets/icons/caret-right.svg" alt="caret-right" /></a>
                  <a onClick={() => handleNavigation('pricing')} className="flex items-center justify-between flex-row p-2 text-base font-normal leading-6 text-[#525252] cursor-pointer">Pricing <img src="../assets/icons/caret-right.svg" alt="caret-right" /></a>
                  <a onClick={() => handleNavigation('blog')} className="flex items-center justify-between flex-row p-2 text-base font-normal leading-6 text-[#525252] cursor-pointer">Blog <img src="../assets/icons/caret-right.svg" alt="caret-right" /></a>
                </div>
                <div className="flex gap-x-3 px-2 lg:hidden lg:flex-1 lg:justify-end mt-8">
                  <a href="#" className="flex-[50%] inline-flex justify-center text-center  text-base  font-bold px-2 py-3 rounded-full text-textdark border border-textdark hover:border-themeblue hover:text-themeblue">Start Free Trial</a>
                  <a href="#" className="flex-[50%] inline-flex justify-center text-center bg-themeblue text-base  font-bold px-2 py-3 rounded-full text-white border border-themeblue hover:border-textdark hover:text-textdark hover:bg-white">Log in</a>
                </div>
          </div>
            </div>
        </div>
    )
}

export default Sidenav;