'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { urlFor } from '../../sanity/client';
import { client } from "../../sanity/client";
import { BlogDetailType, BlogType } from '../response/responseType';
import moment from 'moment';
import routes from '../navigation-list/route-list';
import navigations from '../navigation-list/navigation';
import ProgressLoader from '../common/progress-loader';
import { PortableText } from 'next-sanity';
import { DataContext } from '../context/shareData';

const options = { next: { revalidate: 30 } };

const BlogDetail: React.FC = () => {
  const context = useContext(DataContext);
  const [type, setType] = useState<string>('introduction');
  const [blog, setBlog] = useState<BlogType>();
  const [blogDetail, setBlogDetail] = useState<BlogDetailType[]>([]);
  const [recommondedBlogs, setRecommonded] = useState<BlogType[]>([]);
  const router = useRouter();
  const { slug } = useParams();
  // Dynamic refs for blog detail sections
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  if (!context) {
    throw new Error('DataContext must be used within a DataProvider');
}


  useEffect(() => {
    if (typeof slug === 'string') {
      getBlog(slug);
      
    }
    getRecommondedBlogs();
  }, []);

  useEffect(() => {
    router.prefetch(navigations.blogList);
    router.prefetch(navigations.blogDetail);
  }, []);

  const getBlog = async (slug: string) => {
    const blog = await client.fetch(routes.blogWithSlug, { slug }, options);
    context.setMetadata(blog[0])
    setBlog(blog[0]);
    getBlogDetail(blog[0]._id);
  };

  const getBlogDetail = async (id: string) => {
    const blogDetail = await client.fetch(routes.blog_details, { id }, options);
    setBlogDetail(blogDetail);
  };

  const getRecommondedBlogs = async () => {
    const category = await client.fetch(routes.recommondedBlog, {}, options);
    setRecommonded(category);
  };

  const handleScroll = (type: string) => {
    const ref = sectionRefs.current[type];
    const offset = 100;
    if (ref) {
      const elementPosition = ref.getBoundingClientRect().top; // Position relative to viewport
      const offsetPosition = elementPosition + window.scrollY - offset; // Adjust for header offset
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setType(type);
  };

  const handleViewBlog = () => {
    router.push(navigations.blogList)
  };

  const handleBlogDetail = (postId :string ) => {
    router.push(`${navigations.blogDetail}/${postId}`)
}

  return (
    
    <div>
      <div className="custom-container max-w-[calc(100%-1.5rem)] min-[1365px]:max-w-[1320px] xl:pl-0 2xl:pl-[70px] relative z-0 pb-0 md:pb-8 lg:pb-10 py-8 lg:py-10 px-0 mt-20 mb-3 md:mb-5">
        <div className="flex flex-row gap-6 xl:gap-12 2xl:gap-16">
          {/* Sidebar */}
          <div className="h-screen sticky top-24 max-[991px]:hidden">
            <ul className="blogdetail-sidebar cursor-pointer">
              {blogDetail.map((item) => (
                <li key={item._id}>
                  <a className={type === item.title ? 'active' : ''} onClick={() => handleScroll(item.title)}>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog Content */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,44px] gap-4 lg:gap-6">
            <div className="blog-col gap-3 cursor-default">
              {blog && (
                <div>
                  <p className="blog-category-tag">{blog.category_id.name}</p>
                  <h2 className="blog-title blog-title-lg">{blog.title}</h2>
                  <div className="blog-author">
                    <div className="blog-u-img">
                      <img
                        src={urlFor(blog?.author_image_url).url()}
                        alt="User"
                      />
                    </div>
                    <h4 className="blog-username">{blog?.author_name}</h4>
                    <div className="seprator-round"></div>
                    <p className="blog-date">
                      {moment(new Date(blog._createdAt)).format(
                        'DD MMMM, yyyy'
                      )}
                    </p>
                  </div>
                  <div className="blog-img-lg">
                    <img
                      src={urlFor(blog?.blog_image).url()}
                      className="h-full w-full rounded-xl"
                      alt="blog"
                    />
                  </div>
                  <p className="blog-desc-p text-[#656565]">
                    {blog?.description}
                  </p>
                  <div className="highlight-content">
                <p className="font-semibold mb-3 text-sm md:text-base text-textdark">{blog?.quote_description}</p>
                <div className="blog-author">
                  {blog?.quote_author_image_url && <div className="blog-u-img h-10 w-10">
                    <img src={urlFor(blog?.quote_author_image_url).url()} className="h-full w-full rounded-xl" alt="blog-1" />
                  </div>}
                  <div>
                    <h4 className="blog-username">{blog?.quote_author_name}</h4>
                    <p className="blog-date">{blog?.quote_author_designation}</p>
                  </div>
                </div>
            </div>
                </div>
              )}

              {blogDetail.map((item) => (
                <div
                className=""
                key={item._id}
                ref={(el) => {
                  sectionRefs.current[item.title] = el; // Assign the element to the reference map
                }}
              >
                <h4 className="content-sub-title">{item.title}</h4>
                <div className="blog-desc-p">
                  <PortableText
                    value={item.description}
                    components={{
                      types: {
                        image: ({ value }) => (
                          <div className='blog-img-lg'>
                            <img
                            src={urlFor(value.asset._ref).url()}
                            alt="Blog Visual"
                            className="rounded-md my-4 w-full"
                          />
                          </div>
                        ),
                      },
                    }}
                  />
                </div>
              </div>
              
              ))}
            </div>

            {/* Social Media Links */}
            <div className="h-auto lg:h-screen sticky top-24">
              <ul className="blog-social-list min-w-11 flex flex-row items-center md:flex-col gap-3 md:gap-4 ml-auto">
                <li className="md:hidden"><p className="blog-desc-p">Share</p></li>
                <li>
                  <a href="#">
                    <img
                      src="../assets/icons/Social-icons/linkedin-blue.svg"
                      alt="linkedin"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="../assets/icons/Social-icons/twitter-blue.svg"
                      alt="twitter"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="../assets/icons/Social-icons/facebook-blue.svg"
                      alt="facebook"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="../assets/icons/Social-icons/instagram-blue.svg"
                      alt="instagram"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Blogs */}
      <div className="bg-[#F9FCFF] py-4 lg:py-8">
        <div className="custom-container">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl lg:text-[28px] lg:leading-[42px] font-bold text-textdark m-0">
              Recommended Blogs
            </h3>
            <a onClick={handleViewBlog} className="view-all-link cursor-pointer max-md:hidden">
              View All
              <img
                src="../assets/icons/arrow-up-right.svg"
                alt="viewall-icon"
              />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommondedBlogs.map((item, index) => (
              <div className="blog-col" key={index} onClick={() => handleBlogDetail(item.slug.current)}>
                <div className="blog-img-thumb">
                  <img
                    src={urlFor(item.blog_image).url()}
                    className="h-full w-full rounded-xl"
                    alt="blog"
                  />
                </div>
                <h4 className="blog-title">{item.title}</h4>
                <p className="blog-content-p">{item.description}</p>
              </div>
            ))}
          </div>
          <a onClick={handleViewBlog} className="view-all-link justify-center cursor-pointer mt-10 mb-2 md:hidden">
              View All
              <img
                src="../assets/icons/arrow-up-right.svg"
                alt="viewall-icon"
              />
            </a>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <div className="fixed bottom-8 md:bottom-12 right-3 md:right-12">
        {/* <img src="../assets/icons/scrolltop-arrow.svg" alt="scrolltop-arrow" /> */}
        <ProgressLoader />
      </div>
    </div>
  );
};

export default BlogDetail;
