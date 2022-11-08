import axios from 'axios';
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29751149-7f03b7bad417db024d5002aea';

const fetchImages = ({ searchQuery, currentPage, pageSize }) => {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: pageSize,
  });

  return axios.get(`${BASE_URL}?${searchParams}`);
};

fetchImages.propTypes = {
  searchQuery: PropTypes.string,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
};

export default fetchImages;
