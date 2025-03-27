import Link from 'next/link';
import type { ArticleItem } from '@/types';

interface Props {
    category: string;
    articles: ArticleItem[];
}

const ArticleItemList = ({category, articles}: Props) => {
    return (
        <div className='flex flex-col gap-5'>
            <h2 className='font-cormorant-garamond font-light text-4xl'>{category}</h2>
            <div className='flex flex-col gap-2.5 font-poppins text-lg'>
                {articles.map((article, id) => (
                    <Link 
                    key={id} 
                    href={`/${article.id}`} 
                    className='text-neutral-900 transition duration-150 hover:text-neutral-500 hover:underline'>
                        {article.title}
                    </Link>
                ))}
            </div>
        </div>    
    )
}

export default ArticleItemList;