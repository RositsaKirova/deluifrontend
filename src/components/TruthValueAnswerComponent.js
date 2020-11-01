import React from 'react'
import APIService from '../service/APIService'

//test git

export default class TruthValueAnswerComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            answer: ''
        }
    }

    componentDidMount(){
        APIService.getTruthValueAnswer().then((response) => {
            console.log(response)
            this.setState({ answer: response.data })
            console.log(this.state.answer)
        })
            .catch(function (ex) {
                console.log('Response parsing failed. Error: ', ex);
            });;
    }

    render() {
        return (
            <div>
                <h3> The prover answered with <input
                    type='text'
                    value={this.state.answer}
                    disabled={true}
                />.</h3>
            </div>
        )
    }
}