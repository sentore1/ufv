"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    fetchBlog();
  }, [params.id]);

  const fetchBlog = async () => {
    let { data } = await supabase.from("blogs").select("*").eq("slug", params.id).single();
    if (!data) {
      const result = await supabase.from("blogs").select("*").eq("id", params.id).single();
      data = result.data;
    }
    if (data) setBlog(data);
    else router.push("/blog");
  };

  if (!blog) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <button onClick={() => router.back()} className="text-orange-600 hover:text-orange-700 mb-6 flex items-center gap-2">
          ← Back to Blog
        </button>
        
        {blog.image_url && <img src={blog.image_url} alt={blog.title} className="w-full h-96 object-cover rounded-lg mb-8" />}
        
        <div className="bg-white p-8 rounded-lg shadow">
          {blog.category && <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded">{blog.category}</span>}
          <h1 className="text-4xl font-bold mt-4 mb-4 text-gray-800">{blog.title}</h1>
          <p className="text-gray-600 mb-8">By {blog.author} • {new Date(blog.created_at).toLocaleDateString()}</p>
          <div className="prose max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
