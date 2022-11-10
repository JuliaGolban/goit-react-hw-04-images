import { useState, useEffect } from 'react';
import fetchImages from '../services/apiService';
import Searchbar from '../Searchbar/Searchbar';
import Title from '../Title/Title';
import ImageGalleryList from '../ImageGallery/ImageGalleryList/ImageGalleryList';
import TextButton from '../Buttons/TextButton/TextButton';
import Modal from '../Modal/Modal';
import NotiflixLoading from '../helpers/Loader/NotiflixLoading';
import NotifyMessages from '../helpers/Messages/NotifyMessages';
import ScrollToTop from 'components/helpers/Scroll/ScrollToTop';
import css from './App.module.css';

const notify = new NotifyMessages();
const loader = new NotiflixLoading();

const App = () => {
  // const [options, setOptions] = useState({
  //   searchQuery: '',
  //   currentPage: 1,
  //   pageSize: 12,
  // });

  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalDescr, setModalDescr] = useState('');
  const [modalImg, setModalImg] = useState('');
  const [showScroll, setShowScroll] = useState(false);
  const [error, setError] = useState(null);

  const totalPage = Math.ceil(totalHits / pageSize);

  useEffect(() => {
    if (searchQuery === '') return;

    async function getImages() {
      setIsLoading(true);
      const options = { searchQuery, currentPage, pageSize };

      try {
        const { data } = await fetchImages(options);
        setImages(state => [...state, ...data.hits]);
        setTotalHits(data.totalHits);
        setShowScroll(true);
        setError(null);
        handleMessages(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [currentPage, pageSize, searchQuery]);

  const handleMessages = data => {
    if (data.totalHits !== 0 && currentPage === 1) {
      notify.onTotalImages(data.totalHits);
    }
    if (data.total === 0) {
      return notify.onFetchError();
    }
  };

  const handleFormSubmit = searchQuery => {
    reset();
    setSearchQuery(searchQuery);
  };

  const handleLoadMore = () => {
    incrementCurrentPage();
  };

  const handleModal = (modalDescr, modalImg) => {
    setModalDescr(modalDescr);
    setModalImg(modalImg);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const incrementCurrentPage = () => {
    setCurrentPage(state => state + 1);
  };

  // const incrementCurrentPage = currentPage => {
  //   setOptions(state => ({
  //     ...state,
  //     [currentPage]: state[currentPage] + 1,
  //   }));
  // };

  const reset = () => {
    setImages([]);
    setSearchQuery('');
    setCurrentPage(1);
    setPageSize(12);
    setTotalHits(0);
    setIsLoading(false);
    setShowModal(false);
    setModalDescr('');
    setModalImg('');
    setShowScroll(false);
    setError(null);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />

      {error && <Title text="Whoops, something went wrong" />}

      {images.length === 0 && !error && (
        <Title text="Let's find whatever you want!.." />
      )}

      {isLoading ? loader.onLoading() : loader.onLoaded()}

      {images.length > 0 && !isLoading && (
        <ImageGalleryList images={images} onImageClick={handleModal} />
      )}

      {currentPage < totalPage && !isLoading && (
        <TextButton text="Load more" onClick={handleLoadMore} />
      )}

      {showModal && (
        <Modal
          onClick={toggleModal}
          modalImg={modalImg}
          modalDescr={modalDescr}
        />
      )}

      {showScroll && images.length > 0 && !isLoading && <ScrollToTop />}
    </div>
  );
};

export default App;
