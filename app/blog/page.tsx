import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function BlogPage() {
  const posts = [
    {
      title: "Justice Begins at Home: Transforming Communities",
      image: "/IMG_5892 (1).jpg",
      excerpt: "How legal awareness is changing family dynamics in Kinyinya Sector",
      date: "March 2024"
    },
    {
      title: "Education for All: The Tumurere Yize Story",
      image: "/education (1).jpg",
      excerpt: "500+ children receiving educational support and hope for the future",
      date: "February 2024"
    },
    {
      title: "Empowering Teenage Mothers",
      image: "/IMG_5911 (1).jpg",
      excerpt: "New beginnings through education and entrepreneurship",
      date: "January 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="relative h-[400px] bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Blog</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Latest Stories</h2>
          <p className="text-xl text-gray-600">Updates from our programs and communities</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-sm text-orange-600 mb-2">{post.date}</p>
                <h3 className="font-bold text-xl mb-3 text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-orange-600 font-semibold hover:text-orange-700">Read More →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
