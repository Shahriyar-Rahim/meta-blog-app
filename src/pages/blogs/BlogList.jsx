import React, { useContext, useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { use } from 'react';
import { BlogContext } from '../../context/BlogContext';
import Loading from '../../components/Loading';

const BlogList = () => {
    const {searchTerm} = useContext(BlogContext);


    const [isLoading, setIsLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [showBlogs, setShowBlogs] = useState(6);
    useEffect(() => {
        fetch('https://meta-blog-app-backend-olive.vercel.app/blogs') || fetch('https://meta-blog-app-backend-test.vercel.app/blogs')
        .then(response => response.json())
        .then(data => {
            setBlogs(data.blogs);
            setIsLoading(false);
        })
        .catch(error => console.error("Error fetching blog data: " + error))
    }, [])


    // console.log(blogs);

    // filter blogs based on title, description and author name
    const filterBlogs = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // handle more blog
    const handleMoreBLog = () => {
        setShowBlogs(prev => prev + 3);
    }

    if(isLoading) return <Loading />
  return (
    <div
    className='container mx-auto'
    >
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3' >
            {
                filterBlogs.slice(0, showBlogs).map((blog, index) => (
                    <BlogCard 
                    key={index}
                    blog={blog}
                    />
                ))
            }
        </div>

        {
            showBlogs < filterBlogs.length && (
                <div className=' flex justify-center items-center mt-8 mb-5'>
                    <button 
                    onClick={handleMoreBLog}
                    className=' bg-secondary rounded-md text-white hover:bg-secondary/80 font-semibold flex items-center justify-center px-6 py-2 gap-1 transition-colors duration-200'>View More</button>
                </div>
            )
        }
    </div>
  )
}

export default BlogList