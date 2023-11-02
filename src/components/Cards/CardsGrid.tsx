import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';

import placeholderJSON from '../../data/tempData.json';
import { PlaceholderJSONInterface } from '../../models/interfaces';
import Sidebar from '../Sidebar/Sidebar';

import Card from './Card';

import 'react-loading-skeleton/dist/skeleton.css';
import styles from './CardsGrid.module.css';

const fakeRequest = (ms: number) => new Promise((res) => {
  setTimeout(res, ms);
}) as Promise<void>;

// build empty nested array of length x length
const buildNestedArray = (length: number) => Array.from(Array.from({ length }));

const NUM_POSTS_INIT = 10;
const POST_CARD_HEIGHT = 240;
const REQUEST_DELAY = 600;
const MAX_POSTS = 40;
const { posts } = placeholderJSON;

const CardsGrid = () => {
  const [jsonData, setJsonData] = useState<PlaceholderJSONInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchFakeRequest = async (id: number) => {
    if (id > MAX_POSTS) {
      setHasMore(false);
      return null;
    }
    await fakeRequest(REQUEST_DELAY);
    return posts[id - 1];
  };

  const generatePromiseArray = (length: number, dataLength: number) => {
    return buildNestedArray(length).map((_, i) => fetchFakeRequest(dataLength + i + 1));
  };

  const fetchMultiplePosts = async (numPosts: number) => {
    // if there aren't enough requested posts, fetch the remaining,
    // otherwise fetch requested amount
    const testLength = MAX_POSTS - jsonData.length < numPosts
      ? MAX_POSTS - jsonData.length
      : numPosts;

    // negative testLength means there are no more posts to fetch
    if (testLength <= 0) {
      setHasMore(false);
      return null;
    }

    // generate array of promises with fake requests
    const results = await Promise.all(generatePromiseArray(testLength, jsonData.length));
    setJsonData((prev) => [...prev, ...results] as PlaceholderJSONInterface[]);
    return results;
  };

  useEffect(() => {
    const promises = generatePromiseArray(NUM_POSTS_INIT, 0);

    Promise.all(promises).then((results) => {
      if (results === null) return;
      setJsonData(results as PlaceholderJSONInterface[]);
      setLoading(false);
    });

    return () => {
      setJsonData([]);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <InfiniteScroll
          style={{
            display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%',
          }}
          dataLength={jsonData.length}
          next={() => fetchMultiplePosts(NUM_POSTS_INIT)}
          initialScrollY={0}
          scrollThreshold={0.8}
          hasMore={hasMore}
          loader={(
            <div style={{ width: '100%', marginTop: '1rem' }}>
              <Skeleton
                baseColor='#151517'
                highlightColor='#151517'
                height={POST_CARD_HEIGHT}
                style={{ width: '100%', marginTop: '1rem' }}
              />
            </div>
          )}
          endMessage={
            <p style={{ textAlign: 'center', paddingTop: '4rem' }}>no more posts</p>
          }
        >
          {
            loading ? buildNestedArray(NUM_POSTS_INIT).map((_, i) => {
              return (
                <Skeleton
                  baseColor='#18181b'
                  highlightColor='#151517'
                  key={i}
                  height={POST_CARD_HEIGHT}
                  style={{ width: '100%', marginTop: '1rem' }}
                />
              );
            }) : jsonData.map((data) => (
              <Card
                key={`${data.userId}-${data.id}`}
                id={data.id}
                title={data.title}
                body={data.body}
              />
            ))
          }
        </InfiniteScroll>
      </div>
      <Sidebar />
    </div>
  );
};

export default CardsGrid;
