import axios from 'axios';
import React from 'react';

const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((response) => response.data);

export default fetcher;
