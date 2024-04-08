import axios from 'axios';
import React from 'react';

const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((response) => response.data);
// .catch((error) => {
//   console.log(error);
// });

export default fetcher;
