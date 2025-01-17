
export interface CategoryType{
    name: string,
    _createdAt:Date,
    _id:string,
    _rev:string,
    _type:string,
    _updatedAt:Date
}

export interface BlogType{
    author_image_url:{
        asset: {
            _ref:string,
            _type:string
        },
        _type:string,
    },
    author_name:string,
    blog_image:{
        asset: {
            _ref:string,
            _type:string
        },
        _type:string,
    },
    category_id:{
        name:string,
        _id:string
    },
    description:string,
    is_recommended:boolean
    quote_author_designation:string,
    quote_author_image_url:{
        asset: {
            _ref:string,
            _type:string
        },
        _type:string,
    },
    quote_author_name:string,
    quote_description:string,
    title:string,
    _createdAt:Date,
    _id:string,
    _rev:string,
    _type:string,
    _updatedAt: Date
}


export interface BlogDetailType{
    _id:string,
    title: string,
    _updatedAt: Date,
    blog_id: {
        _ref: string,
        _type:string
    },
    _createdAt: Date,
    _rev: string,
    _type: string,
    description: Array<
    | {
        _type: 'block';
        children: Array<{
          _type: 'span';
          text: string;
        }>;
        style: string;
      }
    | {
        _type: 'image';
        asset: {
          _ref: string;
          _type: string;
        };
      }
  >;
}   
