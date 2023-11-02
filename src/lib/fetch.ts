import {
  API_URL,
  MAX_POSTS,
} from '../data/constants';
import {
  FetchMultiplePostsInterface,
  FetchRequestInterface,
  GeneratePromiseArrayInterface,
  PlaceholderJSONInterface,
} from '../models/interfaces';
import buildArray from '../utils/buildArray';

const fetchRequest = async ({
  id,
  setHasMore,
}: FetchRequestInterface): Promise<PlaceholderJSONInterface | null> => {
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
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
};

const generatePromiseArray = ({
  responsesLength,
  jsonDataLength,
  setHasMore,
}: GeneratePromiseArrayInterface): Promise<PlaceholderJSONInterface | null>[] => {
  return buildArray(responsesLength).map((_, i) => fetchRequest({
    id: jsonDataLength + i + 1,
    setHasMore,
  }));
};

// export const fetchMultiplePosts = async (
const fetchMultiplePosts = async ({
  numPosts,
  jsonDataLength,
  setJsonData,
  setHasMore,
  setLoading,
}: FetchMultiplePostsInterface): Promise<(PlaceholderJSONInterface | null)[] | null> => {
  // fetch either full amount or remaining
  const diff = MAX_POSTS - jsonDataLength;
  const testLength = diff < numPosts ? diff : numPosts;

  if (testLength <= 0) {
    setHasMore(false);
    return null;
  }

  // generate array of promises with fake requests
  const results = await Promise.all(generatePromiseArray({
    responsesLength: testLength,
    jsonDataLength,
    setHasMore,
  }));

  setJsonData((prev) => [...prev, ...results] as PlaceholderJSONInterface[]);
  setLoading(false);

  return results;
};

export default fetchMultiplePosts;
