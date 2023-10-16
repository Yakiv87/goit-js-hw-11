import axios from 'axios';

export default class ImageApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1; 
    this.per_page = 40;
    this.totalPages = 0;
      }

  async fetchImages() {
    const KEY = '39947445-b137d581fb2e8c7b497617e38';
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );

    this.incrementPage();
    this.hitsCounter(response);
    this.totalHits = response.data.totalHits;

    return response.data;
  }
  calculateTotalPages(totalHits) {
    this.totalPages = Math.ceil(totalHits / this.per_page); 
  }
  
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  hitsCounter(response) {
    this.viewedHits += response.data.hits.length;
  }

  resethitsCounter() {
    this.viewedHits = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}