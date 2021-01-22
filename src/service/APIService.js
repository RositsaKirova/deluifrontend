import axios from 'axios';

const ANSWER_API_REST_URL = "http://localhost:8081/answer";

class APIService {

    getTruthValueAnswer(){
        return axios.get(ANSWER_API_REST_URL);
    }

}

export default new APIService();