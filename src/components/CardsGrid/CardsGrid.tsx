import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  END_MESSAGE_STYLE,
  GRID_STYLE,
  NUM_POSTS_INIT,
} from '../../data/constants';
import fetchMultiplePosts from '../../lib/fetch';
import {
  PlaceholderJSONInterface,
} from '../../models/interfaces';
import Card from '../Card/Card';
import Sidebar from '../Sidebar/Sidebar';
import MultSkel from '../Skel/MultSkel';
import Skel from '../Skel/Skel';

import styles from './CardsGrid.module.css';

const CardsGrid = () => {
  const [jsonData, setJsonData] = useState<PlaceholderJSONInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMultiplePosts({
      numPosts: NUM_POSTS_INIT,
      jsonDataLength: 0,
      setJsonData,
      setLoading,
      setHasMore,
    });

    return () => {
      setJsonData([]);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <InfiniteScroll
          style={GRID_STYLE}
          dataLength={jsonData.length}
          next={() => fetchMultiplePosts({
            numPosts: NUM_POSTS_INIT,
            jsonDataLength: jsonData.length,
            setJsonData,
            setLoading,
            setHasMore,
          })}
          initialScrollY={0}
          scrollThreshold={0.8}
          hasMore={hasMore}
          loader={loading ? null : Skel()}
          endMessage={<p style={END_MESSAGE_STYLE}>no more posts</p>}
        >
          {loading ? MultSkel(NUM_POSTS_INIT)
            : jsonData.map((data) => (
              <Card
                key={`${data.userId}-${data.id}`}
                id={data.id}
                title={data.title}
                body={data.body}
              />
            ))}
        </InfiniteScroll>
      </div>

      <Sidebar />
    </div>
  );
};

export default CardsGrid;
