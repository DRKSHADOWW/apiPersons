import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () =>{
    return axios.get(baseUrl)
}

const delPerson = (id) =>{
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (id, personObject )=>{
    return axios.put(`${baseUrl}/${id}`, personObject)
}

const create = personObject => {
    return axios.post(baseUrl, personObject)
  }




export default {getAll, delPerson, updatePerson, create}