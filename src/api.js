import axios from "axios"

export const ncNewsApi = axios.create(({
    baseURL: "https://news-api-project-ib9y.onrender.com/api"
}))