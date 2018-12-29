import axios from 'axios';

const store = {
  state: {
    tasks: []
  },

  async fetchProducts() {
    this.state.tasks = await axios('https://rickandmortyapi.com/api/character').then(res => res.data.results)
  },
  
  addProduct(task) {
    this.state.tasks.push(task);
  }
};

export default store;
