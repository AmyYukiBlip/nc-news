import axios from "axios"

export const ncNewsApi = axios.create(({
    baseURL: "https://news-api-project-ib9y.onrender.com/api"
}))

// before rolling out useContext, test build by hard coding a valid user here or where component needs it, add to a variable 