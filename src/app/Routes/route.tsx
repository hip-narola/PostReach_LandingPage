const  routes = {

    blogs : `*[_type == "blog"]|order(publishedAt desc){...,category_id -> {name, _id}}` ,
    category : `*[_type == "category"]`,
    blogWithId: `*[_type == "blog" && _id == $id]{...,category_id -> {name, _id}}`,
    blog_details: `*[_type == "blog_detail" && blog_id._ref == $id]`,
    recommondedBlog :`*[_type == "blog" && is_recommended == true] | order(_createdAt desc)`,
    featuredBlog :`*[_type == "blog" && is_featured == true] | order(_createdAt desc)[0...4]{...,category_id -> {name, _id}}`,
    LatestBlog :`*[_type == "blog"] | order(_createdAt desc)[0...3]{...,category_id -> {name, _id}}`,
    // Common blog query with dynamic parameters for filtering and pagination
    blogWithFilter: (selectedValues:string[], searchText:string, start:number, end:number) => {
        return `{
        "blogs": *[_type == "blog"
            ${selectedValues?.length ? `&& category_id._ref in $selectedValues` : ""}
            ${searchText ? `&& (title match $searchText || author_name match $searchText)` : ""}
        ] | order(_createdAt desc)[${start}...${end}] {
            ...,
            category_id->{name, _id}
        },
        "totalRecords": count(*[_type == "blog"
            ${selectedValues?.length ? `&& category_id._ref in $selectedValues` : ""}
            ${searchText ? `&& (title match $searchText || author_name match $searchText)` : ""}
        ])
        }`
    }
}

export default routes;