'use client'
import React from 'react';

const ComingSoon: React.FC = () => {

    return (
      
        <div className="mx-auto   relative z-0 px-4 lg:px-0 pt-24 pb-12 lg:pt-28 lg:pb-0 xl:pt-40 overflow-hidden min-h-[calc(100vh-425px)] flex items-center justify-center">
        <div className="absolute h-full max-[375px]:-bottom-28 max-[767px]:bottom-0  md:top-0 left-0 -z-10 flex justify-center w-full text-center">
          <img src="../assets/images/banner-bg1.png" className="max-[375px]:hidden block object-cover w-full" alt="banner-bg" />
          <img src="../assets/images/banner375.png" className="max-[375px]:block hidden object-cover w-full"  alt="banner-bg" />
        </div>
        <div className="text-center max-w-full md:max-w-[calc(100%-2rem)] min-[1365px]:max-w-[1200px] mx-auto">
          <h1 className="banner-title max-[600px]:hidden block relative">
          Comming Soon..
              
          </h1>
          <h1 className="banner-title max-[600px]:block hidden relative">
          Commin Soon..

          </h1>

         
        

         
        </div>
      </div>
    
           
    )

}
export default ComingSoon;