import { useState, useEffect } from "react";
import HeaderNav from "@/components/HeaderNav";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { ArticleItem } from "@/types";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";

// Mock categories data
type category = {
  label: string
  value: string
  posts: ArticleItem[]
};

type categories = category[];
const Category = () => {
  // get query params 
  const query = useRouter().query.category || "";
  const [categories, setCategories] = useState<categories | null>(null);
  const [retries, setRetries] = useState(0)
  useEffect(() => {
    if (retries < 5) {
      console.log(query)
      if (!categories) {
        fetch("/api/categories").then(res => res.json()).then(categories => setCategories(categories));
        setRetries((prevRetries) => prevRetries + 1);
        return
      }

      if (query !== "" && categories && categories.length > 1) {
        setCategories((prevCategories) => prevCategories?.filter((cat) => cat.label === query) || []);
        setRetries((prevRetries) => prevRetries + 1);
        return
      }

      if (categories && categories.map(cat => cat.posts).filter(post => post !== undefined).length === 0) {
        fetch(`/api/posts`).then(res => res.json()).then((articles: { data: ArticleItem[] }) => setCategories((prevCategories) => prevCategories?.map((cat) => cat.value === categories[0].value ? { ...cat, posts: articles.data } : cat) || []));
        setRetries((prevRetries) => prevRetries + 1);
        return
      }
    }
  }, [query, categories, retries]);

  if (!categories) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderNav />

      <main className="flex-1">
        {
          categories.map((category, index) => (
            <div key={index}>
              {/* Category Header */}
              <section className="bg-[#0f172a] text-white py-12 md:py-16">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{category?.label || "Carregando..."}</h1>
                    <p className="text-lg text-gray-300">
                      {category?.label || "Carregando..."}
                    </p>
                  </div>
                </div>
              </section>

              {/* Posts Grid */}
              <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                  {category.posts?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {category.posts.map(post => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-medium text-gray-500">Nenhum post encontrado nessa categoria.</h3>
                    </div>
                  )}
                </div>
              </section>
            </div>
          ))}
      </main >

      <Footer />
    </div>
  );
};

export default Category;
