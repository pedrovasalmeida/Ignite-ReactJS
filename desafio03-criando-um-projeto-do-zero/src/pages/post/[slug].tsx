import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import { IoMdCalendar } from 'react-icons/io';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { getPrismicClient } from '../../services/prismic';

import Header from '../../components/Header';

import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
  uid: string;
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.data.title} | spacetraveling</title>
      </Head>

      <Header />

      <div className={styles.container}>
        {post && (
          <>
            <img
              className={styles.banner}
              src={post.data.banner.url}
              alt={post.data.title}
            />
            <div className={styles.post}>
              <strong>{post.data.title}</strong>

              <div className={styles.metaDataWrapper}>
                <span>
                  <IoMdCalendar size={20} />
                  {format(
                    new Date(post.first_publication_date),
                    'dd MMM yyyy',
                    { locale: ptBR }
                  )}
                </span>
                <span>
                  <AiOutlineUser size={20} />
                  {post.data.author}
                </span>
                <span>
                  <AiOutlineClockCircle size={20} />4 min
                </span>
              </div>

              <div className={styles.postContent}>
                {post.data &&
                  post.data.content.map((content, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                      <h2>{content.heading}</h2>

                      <div
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: RichText.asHtml(content.body),
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();

  const posts = await prismic.query([
    Prismic.Predicates.at('document.type', 'post-challenge'),
  ]);

  const paths = posts.results.map(post => ({
    params: { slug: post.uid },
  }));

  return {
    fallback: true,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('post-challenge', String(slug), {});

  const post: Post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
    },
  };
};
