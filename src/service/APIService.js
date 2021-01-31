import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8081'
})

const ANSWER_API_REST_URL = "/answer";
const SEND_API_REST_URL = "/submission";

class APIService {

    getTruthValueAnswer(){
        return instance.get(ANSWER_API_REST_URL);
    }

    postQuestion(submittedEncoded, commonKnowledgeList, questionEncoded) {
        let formData = new FormData();
        formData.append("submittedStatements", submittedEncoded);
        console.log(submittedEncoded);
        formData.append("listCommonK", commonKnowledgeList);
        console.log(commonKnowledgeList);
        formData.append("question", questionEncoded);
        console.log(questionEncoded);
        console.log(formData);
        return instance.post(SEND_API_REST_URL, formData, {headers:{"Content-Type" : "multipart/form-data"}});
    }

}

export default new APIService();