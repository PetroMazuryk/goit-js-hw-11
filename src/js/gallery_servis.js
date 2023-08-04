import axios from 'axios';

const PIXABAY_URL = 'https://pixabay.com/api/';
const options = {
  key: '32614456-fa2d97d1002b2d5ec83882b58',
};

export default class GalleryServis {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.showNumberOfPhotos = 40;
  }

  async getPhotos() {
    const url = `${PIXABAY_URL}?key=${options.key}&q=${this.searchQuery}&page=${this.page}&per_page=${this.showNumberOfPhotos}&image_type=photo&orientation=horizontal&safesearch=true`;

    try {
      const response = await axios.get(url);
      const photoArray = response.data.hits;
      const totalPhotos = response.data.totalHits;

      this.page += 1;

      return { photoArray, totalPhotos };
    } catch (error) {
      console.error(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
}
console.log(12);
