import axios from 'axios';

const url = 'http://localhost:8080/routes';

export const fetch = () => axios.get(url);