"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import RichTextEditor from "../../components/RichTextEditor";

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const router = useRouter();
  const [type, setType] = useState<"blog" | "report">("blog");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const categories = ["Education", "Healthcare", "Community", "Youth Empowerment", "Drug Prevention", "Justice", "Custom"];

  useEffect(() => {
    if (!localStorage.getItem("adminAuth")) {
      router.push("/admin");
    }
    fetchItems();
  }, [type]);

  const fetchItems = async () => {
    const { data } = await supabase.from(type === "blog" ? "blogs" : "reports").select("*").order("created_at", { ascending: false });
    setItems(data || []);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleReportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setReportFile(file);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    const data: any = { title, content, author, status: "published" };
    
    if (type === "blog") {
      data.category = category === "Custom" ? customCategory : category;
      data.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from("blog-images").upload(fileName, imageFile);
        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage.from("blog-images").getPublicUrl(fileName);
          data.image_url = publicUrl;
        }
        if (uploadError) console.error("Blog image upload error:", uploadError);
      }
    } else if (type === "report" && reportFile) {
      const fileExt = reportFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage.from("reports").upload(fileName, reportFile);
      console.log("Upload result:", uploadData, uploadError);
      if (uploadData) {
        const { data: { publicUrl } } = supabase.storage.from("reports").getPublicUrl(fileName);
        data.file_url = publicUrl;
        data.file_name = reportFile.name;
        data.file_type = fileExt;
        console.log("File data to save:", { file_url: publicUrl, file_name: reportFile.name, file_type: fileExt });
      }
      if (uploadError) {
        console.error("Report file upload error:", uploadError);
        alert("File upload failed: " + uploadError.message);
        setUploading(false);
        return;
      }
    }
    
    console.log("Data to insert:", data);
    const { error: insertError } = await supabase.from(type === "blog" ? "blogs" : "reports").insert([data]);
    if (insertError) {
      console.error("Insert error:", insertError);
      alert("Failed to publish: " + insertError.message);
    } else {
      alert("Published successfully!");
    }
    setTitle("");
    setContent("");
    setAuthor("");
    setCategory("");
    setCustomCategory("");
    setImageFile(null);
    setImagePreview("");
    setReportFile(null);
    setUploading(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    await supabase.from(type === "blog" ? "blogs" : "reports").delete().eq("id", id);
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={() => { localStorage.removeItem("adminAuth"); router.push("/admin"); }} className="bg-red-600 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex gap-4 mb-6">
            <button onClick={() => setType("blog")} className={`px-4 py-2 rounded ${type === "blog" ? "bg-orange-600 text-white" : "bg-gray-200"}`}>
              Blog
            </button>
            <button onClick={() => setType("report")} className={`px-4 py-2 rounded ${type === "report" ? "bg-orange-600 text-white" : "bg-gray-200"}`}>
              Report
            </button>
          </div>

          <form onSubmit={handlePublish} className="space-y-4">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 border rounded" required />
            {type === "report" && (
              <div>
                <label className="block text-sm font-medium mb-2">Upload File (PDF, Excel, or Image)</label>
                <input type="file" accept=".pdf,.xlsx,.xls,.jpg,.jpeg,.png" onChange={handleReportFileChange} className="w-full p-2 border rounded" />
                {reportFile && <p className="text-sm text-gray-600 mt-2">Selected: {reportFile.name}</p>}
              </div>
            )}
            {type === "blog" ? (
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <RichTextEditor value={content} onChange={setContent} />
              </div>
            ) : (
              <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded h-40" required />
            )}
            {type === "blog" && (
              <>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                {category === "Custom" && (
                  <input type="text" placeholder="Enter custom category" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} className="w-full p-2 border rounded" required />
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Image</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
                  {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded mt-2" />}
                </div>
              </>
            )}
            <button type="submit" disabled={uploading} className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 disabled:bg-gray-400">
              {uploading ? "Publishing..." : `Publish ${type === "blog" ? "Blog" : "Report"}`}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Published {type === "blog" ? "Blogs" : "Reports"}</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border p-4 rounded flex justify-between items-start">
                <div className="flex-1">
                  {item.image_url && <img src={item.image_url} alt={item.title} className="w-24 h-24 object-cover rounded mb-2" />}
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-600">By {item.author}</p>
                  {item.category && <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">{item.category}</span>}
                  {item.file_url && (
                    <a href={item.file_url} target="_blank" className="text-xs text-blue-600 hover:underline block mt-1">
                      📎 {item.file_name || "Download File"}
                    </a>
                  )}
                  <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <button onClick={() => handleDelete(item.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
