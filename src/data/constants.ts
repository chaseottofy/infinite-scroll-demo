const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const NUM_POSTS_INIT = 10;
const POST_CARD_HEIGHT = 240;
const MAX_POSTS = 40;

const CARD_STYLE = {
  width: '100%',
  marginTop: '1rem',
  lineHeight: '1 !important',
  maxHeight: `${POST_CARD_HEIGHT}px`,
  minHeight: `${POST_CARD_HEIGHT}px`,
  height: '100% !important',
  border: '1px solid #27272a',
  overflow: 'hidden',
} as React.CSSProperties;

const GRID_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '100%',
} as React.CSSProperties;

const END_MESSAGE_STYLE = {
  textAlign: 'center',
  paddingTop: '4rem',
} as React.CSSProperties;

export {
  API_URL,
  CARD_STYLE,
  END_MESSAGE_STYLE,
  GRID_STYLE,
  MAX_POSTS,
  NUM_POSTS_INIT,
  POST_CARD_HEIGHT,
};
