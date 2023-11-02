export interface PlaceholderJSONInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface FetchMultiplePostsInterface {
  numPosts: number;
  jsonDataLength: number;
  setJsonData: React.Dispatch<React.SetStateAction<PlaceholderJSONInterface[]>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FetchRequestInterface {
  id: number;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface GeneratePromiseArrayInterface {
  responsesLength: number;
  jsonDataLength: number;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}
