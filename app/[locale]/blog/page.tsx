"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    let query = supabase.from("blogs").select("*").eq("status", "published");
    if (selectedCategory !== "All") query = query.eq("category", selectedCategory);
    const { data } = await query.order("created_at", { ascending: false });
    setBlogs(data || []);
  };

  const categories = ["All", "Education", "Healthcare", "Community", "Youth Empowerment", "Drug Prevention", "Justice", "Other"];
  const truncateText = (text: string, maxLength: number) => text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="relative h-[400px] bg-gradient-to-r from-green-900 to-green-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Blog</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Latest Stories</h2>
          <p className="text-xl text-gray-600">Updates from our programs and communities</p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === cat ? "bg-green-900 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              {blog.image_url && <img src={blog.image_url} alt={blog.title} className="w-full h-48 object-cover" />}
              <div className="p-6">
                {blog.category && <span className="text-xs bg-orange-100 text-green-800 px-2 py-1 rounded">{blog.category}</span>}
                <h2 className="text-xl font-bold mt-2 mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-600 mb-4">By {blog.author} • {new Date(blog.created_at).toLocaleDateString()}</p>
                <div className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: truncateText(blog.content.replace(/<[^>]*>/g, ''), 150) }} />
                <Link href={`/blog/${blog.slug || blog.id}`} className="text-green-600 hover:text-green-700 font-semibold">Read More →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
