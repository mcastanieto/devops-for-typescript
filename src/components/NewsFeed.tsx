'use client';
import useSWR from 'swr';
import { NewsItemsResponse } from '../types/api';
import styles from './NewsFeed.module.css';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const params = new URLSearchParams();

params.set('sort', 'publishedAt:desc');

export function NewsFeed() {
  const { data, error, isLoading } = useSWR<NewsItemsResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/news-items?${params.toString()}`,
    fetcher
  );

  if (isLoading) return <div>loading...</div>;

  if (error || !data?.data) return <div>failed to load</div>;

  return (
    <div className={styles.newsItemList}>
      <h1>NewsFeed! 🗞️</h1>

      {data.data.map(({ attributes, id }) => (
        <div key={id} className={styles.newsItem}>
          <h2>{attributes.Title}</h2>

          <h3>
            <i>{attributes.Body}</i>
          </h3>

          <span>{new Date(attributes.publishedAt).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
}