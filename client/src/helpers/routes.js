
const BUCKETNAME = process.env.NODE_ENV === 'production' ? 'amurse_spaces' : 'amurse_spaces_dev';

//MEDIA FILES
export const ENDPOINT_MEDIA_DOWNLOAD = `https://storage.googleapis.com/${BUCKETNAME}/`

