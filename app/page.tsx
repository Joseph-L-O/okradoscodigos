import ArticleItemList from "@/components/ArticleListItem";
import { getCategoriesArticles } from "@/lib/articles";

const Home = async () => {

  const articles = await getCategoriesArticles();

  return <section className="mx-auto w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 mt-20 flex flex-col items-center gap-16 mb-20">
    <header className="font-cormorant-garamond font-light text-6xl text-neutral-900 text-center">
      <h1>Min joe blog</h1>
    </header>
    <section className="md:grid md:grid-cols-2 flex flex-col gap-10">
      {
        articles !== null && Object.keys(articles).map((article: string) => (
          <ArticleItemList key={article} category={article} articles={articles[article]} />
        ))}
    </section>
  </section>
}

export default Home;
