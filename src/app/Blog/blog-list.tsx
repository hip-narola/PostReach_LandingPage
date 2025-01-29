'use client'
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import navigations from '../navigation-list/navigation';
import {CheckboxGroup, Checkbox ,Autocomplete, AutocompleteItem, Pagination, Button} from "@nextui-org/react";
import { urlFor } from '../../sanity/client';

import { client } from "../../sanity/client";
import routes from '../navigation-list/route-list';
import { BlogType, CategoryType } from '../response/responseTyep';
import { useLoading } from '../context/LoadingContext';



const options = { next: { revalidate: 30 } };
const BlogList: React.FC = () => {
    const router = useRouter();
    const [filter , setFilter] = useState<boolean>(false);
    const [noData , setNoData] = useState<boolean>(false);
    const [applyFilter , setApplyFilter] = useState<boolean>(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [displayName, setDisplayName] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Default page size
    const [blogList, setBlogList] = useState<BlogType[]>([]); // Default page size
    const [categoryList, setCategoryList] = useState<CategoryType[]>([]); // Default page size
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState<number>();
    const [start, setStart] = useState((currentPage - 1) * pageSize);
    const [end, setEnd] = useState(start + pageSize);
    const [searchList, setSerachList] = useState<string[]>([]);
    const [featuredBlog , setFeatured] = useState<BlogType[]>([]);
    const { setIsLoading } = useLoading();
 
    useEffect(() => {
      getAllBlog();
      getAllCategory();
      getAutoCompleteList();
      getFeaturedBlogs();
    },[]);

    useEffect(() => {
      router.prefetch(navigations.blogDetail);
    }, []);
    

    const getAutoCompleteList = async() => {
          
        const query = `*[_type == "blog"]{author_name, title}`;
  
        try {
          const result = await client.fetch(query, {}, options);
          console.log('result =>',result);
          const autoCompleteList: string[] = Array.from(
            new Set(
              result.flatMap((item: { title: string; author_name: string }) => [
                item.title,
                item.author_name,
              ])
            )
          );
          console.log('autoCompleteList =>',autoCompleteList);
          
          setSerachList(autoCompleteList)
        } catch (error) {
          console.error("Error fetching all blogs:", error);
        }
    }

    const getAllCategory = async() => {
      const category =  await client.fetch(routes.category, {}, options);
      setCategoryList(category)
    }

    const getAllBlog = async (selectedValues?:string[], searchText?:string) => {
      setIsLoading(true);
      try {
        const result = await client.fetch(routes.blogWithFilter(selectedValues || [],searchText || '',start,end),{ selectedValues: selectedValues || [] , searchText : searchText || ''}, options);
        console.log('blogs =>',result);
        
        if(result.blogs.length > 0){
          setNoData(false);
          setTotalRecords(result.totalRecords);
          setTotalPages(Math.ceil(result.totalRecords / pageSize));
          setBlogList(result.blogs);
          setIsLoading(false);
        }else{
          setNoData(true);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching all blogs:", error);
      }
    };

   
  
   const handleBlogDetail = (postId :string ) => {
        router.push(`${navigations.blogDetail}/${postId}`)
   }

   const handleFilter = () => {
        setFilter(!filter);
   }


  const handleReset = () => {
    setSelectedValues([]);
    setApplyFilter(false);
    getAllBlog();
    setDisplayName([]);
  }

  const handleApply = async() => {
    getAllBlog(selectedValues);
    setFilter(false);
    setApplyFilter(true);
  }
 
  const handlePageChange = (page: number) => {
    // Calculate start and end based on page number and page size
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
  
    setCurrentPage(page);
    setStart(start);
    setEnd(end);
  };
  
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    
    // Reset to first page when page size is changed
    const start = 0;
    const end = newPageSize;
    setStart(start);
    setEnd(end);
    setCurrentPage(1); // Reset to first page
  };

  const handleSelection = (item: string) => {
    const formatString = (input: string) => {
      return input.replace(/([a-z])([A-Z])/g, '$1, $2');
    };
  
    const formattedItem = formatString(item);
  console.log('formattedItem =>',formattedItem);
  
    setDisplayName(prevDisplayName => {
      return prevDisplayName.length > 0
        ? [...prevDisplayName,' , ' ,formattedItem]  
        : [formattedItem];  
    });
  };

  useEffect(() => {
    getAllBlog();
  },[start,end]);

  const handleSelectionChange = (key: string) => {
    getAllBlog(selectedValues,key);
  }

 

  const getFeaturedBlogs = async() => {
    const feature =  await client.fetch(routes.featuredBlog, {}, options);
    setFeatured(feature)
  }

  const handleBlur  = () =>  {
    getAllBlog(selectedValues,'');
  }



  return (
    <div className="custom-container relative z-0 py-8 lg:py-10 px-0 mt-20 mb-5">
        <div className="grid grid-cols-1 items-center justify-center">
          <div className="flex  flex-col items-start justify-center text-center">
            <h4 className="pagebanner-title  w-full"><span className="text-themeblue">Insights & Tips </span>to Grow Your Social Media</h4>
            <p className="para-text mx-auto">
            Welcome to our blog, your go-to resource for mastering social media marketing and boosting your online presence.</p>
          </div>
        </div>
        
        {/* Header */}
      {featuredBlog.length > 0 && 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8 lg:py-14">
                
            <div className="blog-col" onClick={() => handleBlogDetail(featuredBlog[0]._id)}>
            <div className="blog-img-thumb h-auto lg:h-80">
            <img src={urlFor(featuredBlog[0].blog_image).url()} className="h-full w-full rounded-xl" alt="blog-1" />
            </div>
            <p className="blog-category-tag">{featuredBlog[0].category_id.name}</p>
            <h4 className="blog-title">{featuredBlog[0].title}</h4>
            <p className="blog-content-p">{featuredBlog[0].description}</p>
            <div className="blog-footer">
            <div className="blog-u-img">
              <img src={urlFor(featuredBlog[0].author_image_url).url()} className="h-full w-full rounded-xl" alt="blog-1" />
            </div>
            <div className="blog-author">
              <h4 className="blog-username">{featuredBlog[0].author_name}</h4>
              <div className="seprator-round"></div>
              <p className="blog-date">{moment(new Date(featuredBlog[0]._createdAt),('DD/MM/yyyy')).format('DD MMMM, yyyy')}</p>
            </div>
            </div>
            </div>
    
            <div className='grid  md:grid-rows-3 gap-6 blog-h-list'>
              {featuredBlog.map((item,index) => (
                <div key={index}>
                  {index != 0 &&
                    <div className="blog-col flex-row items-start gap-4" onClick={() => handleBlogDetail(item._id)}>
                    <div className="blog-img-thumb blog-img-thumb-sm flex-1 md:max-w-28 lg:max-w-full">
                    <img src={urlFor(item.blog_image).url()} className="h-full w-full rounded-xl" alt="blog-1" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
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
                    </div>
                  }
                </div>
              ))}
            </div>
    
        </div>}   

        <div className="flex items-start md:items-center justify-between gap-4 mt-5 md:mt-10 max-[767px]:flex-col">
            <h3 className="text-[28px] leading-[42px] font-bold text-textdark m-0">All Blogs</h3>
            <div className="flex flex-row justify-between md:justify-center items-center gap-3 max-w-full relative">
            <Autocomplete
                className="blog-search-wrapper md:max-w-lg  w-full"
                placeholder="Search by title or writer"
                variant="bordered"
                radius="full"
                onBlur={handleBlur}
                onSelectionChange={(key) => {
                  const selectedOption = searchList.find((option, index) => index.toString() === key);
                  if (selectedOption) handleSelectionChange(selectedOption);
                }}
                startContent={
                  <img
                    src="../assets/icons/magnifying-glass.svg"
                    className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
                    alt="Search Icon"
                  />
                }
                isClearable={false}>
              {searchList.map((option, index) => (
                  <AutocompleteItem className="text-textdark" key={index} textValue={option}>{option}</AutocompleteItem>
               
              ))}
              </Autocomplete>
               <div className="relative">
               <img onClick={handleFilter} className="cursor-pointer" src='../assets/icons/blog-filter.svg'  />
               {applyFilter &&  <img className="cursor-pointer absolute -top-3 -right-3 max-w-7" onClick={handleReset} src='../assets/icons/filter-close-btn.svg'  />}
               </div>
                {filter && 
                    <div className="filter-checkbox-group">
                      <h4 className="text-base font-semibold text-textdark mb-2">Categories</h4>
                        <CheckboxGroup value={selectedValues} onChange={(values) => setSelectedValues(values)}>
                            {categoryList && categoryList.map((item) => (
                                <Checkbox key={item._id} value={item._id} onChange={() => handleSelection(item.name)}>{item.name}</Checkbox>
                            ))}
                        </CheckboxGroup>
                        <div className="flex justify-between items-center gap-3 mt-3 pt-3 border-t border-[#EFEFEF]">
                        <Button className='flex-1 text-sm font-bold text-textdark border border-textdark bg-white rounded-full hover:border-themeblue hover:text-themeblue' radius="full" onPress={handleReset}>Reset</Button>
                        <Button className='flex-1 text-sm font-bold text-white border border-themeblue bg-themeblue rounded-full hover:border-textdark hover:text-textdark hover:bg-white' radius="full"  onPress={handleApply}>Apply</Button>
                        </div>
                    </div>
                }
           
            </div>
        </div>

       {noData && 
        <div className="flex flex-col justify-center text-center my-6 gap-6">
          <img  src="../assets/images/no-result.png" className="w-full h-full max-w-max mx-auto" />
          <p className="text-sm md:text-base font-normal text-[#525252]">
            Sorry, no results found. Please try adjusting your filters or keywords again.
          </p>
        </div>}
        {applyFilter && <p className="text-base font-normal text-textlight mt-3">We&apos;ve found <b className="text-textdark font-semibold">{blogList.length} results</b> that match your filter <b className="text-textdark font-semibold">&#39;{displayName}&#39;</b> criteria</p>}
        {/* Header */}
       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 md:my-10">
                {blogList.map((item) => (
                <div className="blog-col" key={item._id} onClick={() => handleBlogDetail(item._id)}>
                    <div className="blog-img-thumb">
                        <img 
                        src={urlFor(item.blog_image).url()}
                         className="h-full w-full rounded-xl" alt="blog-1" />
                    </div>
                    <p className="blog-category-tag">{item.category_id.name}</p>
                    <h4 className="blog-title line-clamp-1">{item.title}</h4>
                    <p className="blog-content-p">{item.description}</p>
                    <div className="blog-footer">
                    <div className="blog-u-img">
                        <img src={urlFor(item.author_image_url).url()} alt="User" />
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
       {/* pagination */}
     
          <div className="flex flex-wrap max-[767px]:justify-center max-[767px]:flex-col   items-center gap-4" >
          {totalRecords > blogList.length && 
            <div className="flex items-center gap-1 pagination-wrapper">
                {/* First Page Button */}
              <button onClick={() => handlePageChange(1)}disabled={currentPage === 1}>
                <img  src='../assets/icons/first-record.svg'/>
              </button>
              {totalPages && totalPages > 1 && (
                      <Pagination
                        loop
                        showControls
                        color="primary"
                        initialPage={1}
                        total={totalPages || 0}
                        page={currentPage}
                        onChange={handlePageChange}
                      />
              )}
              {/* Last Page Button */}
              <button onClick={() => handlePageChange(totalPages || 0)} disabled={currentPage === totalPages}>
                <img  src='../assets/icons/last-record.svg'/>
              </button>
            </div>
          }
         
            <div className="max-[767px]:mx-auto ml-auto">
              <label htmlFor="pageSize" className="mr-2 text-[#989898]">
                  Number Blogs / Page
              </label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={handlePageSizeChange}
                className="p-1 rounded-lg border border-[#EFEFEF] text-[#989898]"
                
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
       {/* pagination */}
    </div>
  );
};

export default BlogList;
