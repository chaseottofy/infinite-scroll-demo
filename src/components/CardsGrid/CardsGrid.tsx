import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  API_URL,
  CARD_STYLE,
  END_MESSAGE_STYLE,
  GRID_STYLE,
  MAX_POSTS,
  NUM_POSTS_INIT,
  POST_CARD_HEIGHT,
} from '../../data/constants';
import { PlaceholderJSONInterface } from '../../models/interfaces';
import buildArray from '../../utils/build-array';
import Card from '../Card/Card';
import Sidebar from '../Sidebar/Sidebar';
import MultSkel from '../Skel/MultSkel';
import Skel from '../Skel/Skel';

import styles from './CardsGrid.module.css';

const CardsGrid = () => {
  const [jsonData, setJsonData] = useState<PlaceholderJSONInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchRequest = async (id: number): Promise<PlaceholderJSONInterface | null> => {
    if (id > MAX_POSTS) {
      setHasMore(false);
      return null;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data: PlaceholderJSONInterface = await response.json();
      // await new Promise((res) => setTimeout(res, REQUEST_DELAY));
      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    }
  };

  /**
   * @param responsesLength {number} - length of responses to generate
   * @param jsonDataLength {number} - length of current responses generated
   * @returns {Promise<PlaceholderJSONInterface | null>[]}
   */
  const generatePromiseArray = (
    responsesLength: number,
    jsonDataLength: number,
  ): Promise<PlaceholderJSONInterface | null>[] => {
    return buildArray(responsesLength).map((_, i) => fetchRequest(jsonDataLength + i + 1));
  };

  const fetchMultiplePosts = async (numPosts: number) => {
    // fetch either full amount or remaining
    const diff = MAX_POSTS - jsonData.length;
    const testLength = diff < numPosts ? diff : numPosts;
    
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
    Promise.all(generatePromiseArray(NUM_POSTS_INIT, 0)).then((results) => {
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
          style={GRID_STYLE}
          dataLength={jsonData.length}
          next={() => fetchMultiplePosts(NUM_POSTS_INIT)}
          initialScrollY={0}
          scrollThreshold={0.8}
          hasMore={hasMore}
          loader={(<div style={CARD_STYLE}>{Skel(POST_CARD_HEIGHT)}</div>)}
          endMessage={<p style={END_MESSAGE_STYLE}>no more posts</p>}
        >
          {loading ? MultSkel(NUM_POSTS_INIT, CARD_STYLE, POST_CARD_HEIGHT)
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
