import { useState } from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { IoMdCalendar } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';

import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getPrismicClient } from '../services/prismic';

import Header from '../components/Header';

import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
  const [postsData, setPostsData] = useState(postsPagination.results);

  async function handleLoadNextPage() {
    const response = await fetch(nextPage);

    const posts = await response.json();

    const updatedPosts = posts.results.map((post: Post) => {
      return {
        uid: post.uid,
        first_publication_date: post.first_publication_date,
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
    });

    setPostsData(prevState => [...prevState, ...updatedPosts]);
    setNextPage(posts.next_page);
  }

  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <Header />

      <main className={styles.container}>
        <div className={styles.posts}>
          {postsData.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <h2>{post.data.title}</h2>
                <p>{post.data.subtitle}</p>
                <div>
                  <IoMdCalendar size={20} />
                  <time>
                    {format(
                      new Date(post.first_publication_date),
                      'dd MMM yyyy',
                      { locale: ptBR }
                    )}
                  </time>
                  <AiOutlineUser size={20} />
                  <span>{post.data.author}</span>
                </div>
              </a>
            </Link>
          ))}
        </div>
        {nextPage && (
          <button type="button" onClick={handleLoadNextPage}>
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post-challenge')],
    {
      fetch: [
        'post-challenge.title',
        'post-challenge.subtitle',
        'post-challenge.author',
      ],
      pageSize: 1,
    }
  );

  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      },
    },
  };
};
