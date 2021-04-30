import axios from 'axios'

const Api = axios.create({
  baseURL: "https://backend-saipos.herokuapp.com"
})

export default Api