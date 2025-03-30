import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { getArticleData } from '@/lib/articles';

const Article = async ({ params }: any) => {
    const { slug } = await params;
    const article = await getArticleData(slug);
    return (
        <section className='mx-auto w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 mt-20 flex flex-col items-center gap-16 mb-20'>
            <header className='font-cormorant-garamond font-light text-6xl text-neutral-900 text-center'>
                <h1>{article?.title}</h1>
            </header>
            <div className='flex flex-col gap-5'>
                <Link href='/' className='flex items-center gap-2 text-neutral-900 transition duration-150 hover:text-neutral-500'>
                    <ArrowLeftIcon className='w-5 h-5' />
                    <span>Voltar</span>
                </Link>
                <p>{article?.date.toString()}</p>
                <article className='article' dangerouslySetInnerHTML={{ __html: article?.contentHtml || ""}} />
            </div>

        </section>
    )
}
export default Article;
