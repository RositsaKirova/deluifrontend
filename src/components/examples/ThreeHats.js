import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";

function ThreeHats() {
    const [visible, setVisible] = useState(false);
    const showAnswer = () => setVisible(true);
    const [answer1, setAnswer1] = useState(false);
    const showAnswer1 = () => setAnswer1(true);
    const [answer2, setAnswer2] = useState(false);
    const showAnswer2 = () => setAnswer2(true);
    const [answer3, setAnswer3] = useState(false);
    const showAnswer3 = () => setAnswer3(true);
    const [answer4, setAnswer4] = useState(false);
    const showAnswer4 = () => setAnswer4(true);

    return (
        <div>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Three-Hat Puzzle</span></Typography>
            <Typography variant="body1" gutterBottom>In a room there are 3 prisoners. Each prisoner is randomly given a hat out of 5 hats - 2 blue and 3 red.
                Each prisoner sees and knows the hats of the two others, but not their own. At the same time they each have to guess their own hat color or pass.
                They win release if at least one person guessed correctly and none guessed incorrectly. Passing is neither correct nor incorrect.
            </Typography>
            <br/>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Agents</span>:  3 - prisoner1, prisoner2, prisoner3</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>States</span>:  3 - prisoner 1 has a blue hat, prisoner 2 has a blue hat, prisoner 3 has a blue hat</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Question to ask</span>: Is the statement '
                ((prisoner1 knows prisoner1 has a blue hat OR prisoner1 knows false: (prisoner1 has a blue hat)) OR (prisoner2 knows prisoner2 has a blue hat OR prisoner2 knows false: (prisoner2 has a blue hat))) OR (prisoner3 knows prisoner3 has a blue hat OR prisoner3 knows false: (prisoner3 has a blue hat)) ' true?
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>This question is long but actually it just asks whether there is a prisoner knowing about its own hat color.</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Statements to submit</span>, explaining the puzzle:</Typography>
            <ul>
                <li>IF (prisoner1 has a blue hat AND prisoner2 has a blue hat) THEN false: (prisoner3 has a blue hat)
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>This one and the next two statements explain that if there are already two blue hats, there will be no third blue hat. That is because the puzzle says there are 5 hats from which 2 are blue.</li>
                <li>IF (prisoner2 has a blue hat AND prisoner3 has a blue hat) THEN false: (prisoner1 has a blue hat)</li>
                <li>IF (prisoner1 has a blue hat AND prisoner3 has a blue hat) THEN false: (prisoner2 has a blue hat)</li>
                <li>prisoner1,prisoner2 know prisoner3 has a blue hat OR prisoner1,prisoner2 know false: (prisoner3 has a blue hat)
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>This one and the next two statements explain that every prisoner's hat is seen and known by the other two prisoners.</li>
                <li>prisoner2,prisoner3 know prisoner1 has a blue hat OR prisoner2,prisoner3 know false: (prisoner1 has a blue hat)</li>
                <li>prisoner1,prisoner3 know prisoner2 has a blue hat OR prisoner1,prisoner3 know false: (prisoner2 has a blue hat)</li>
            </ul>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>All of the above statements are the rules of the 'game' and should be set to be common knowledge.</span></Typography>
            <br/>
            <Typography variant="body1" gutterBottom>Try out this puzzle and see whether you received the same answer.</Typography>
            <div className="rowC">
                <Button variant="contained" color="secondary" onClick={showAnswer}>Show answer</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {visible ? <Typography variant="body1" gutterBottom>Statement <span style={{fontWeight: 600}}>((prisoner1 knows prisoner1 has a blue hat OR prisoner1 knows false: (prisoner1 has a blue hat)) OR (prisoner2 knows prisoner2 has a blue hat OR prisoner2 knows false: (prisoner2 has a blue hat))) OR (prisoner3 knows prisoner3 has a blue hat OR prisoner3 knows false: (prisoner3 has a blue hat)) is false</span>.</Typography> : null}
            </div>
            <br/>
            <Typography variant="body1" gutterBottom>So far we explained the general situation. Let's explore further a concrete state.</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Case: There are two prisoners with blue hats</span></Typography>
            <Typography variant="body1" gutterBottom>After receiving an answer to the previous question, use the 'UPDATE FORM' option.</Typography>
            <Typography variant="body1" gutterBottom>What you need to do is add to <span style={{fontWeight: 600}}>Submitted statements</span> the following statements:</Typography>
            <ul>
                <li>prisoner1 has a blue hat</li>
                <li>prisoner2 has a blue hat</li>
            </ul>
            <Typography variant="body1" gutterBottom>Also change the <span style={{fontWeight: 600}}>question</span> to: Is the statement ' (prisoner1 knows prisoner1 has a blue hat OR prisoner2 knows prisoner2 has a blue hat) OR prisoner3 knows false: (prisoner3 has a blue hat) ' true?</Typography>
            <Typography variant="body1" gutterBottom>Try out this case of the puzzle and see whether you received the same answer.</Typography>
            <div className="rowC">
                <Button variant="contained" color="secondary" onClick={showAnswer1}>Show answer</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {answer1 ? <Typography variant="body1" gutterBottom>Statement <span style={{fontWeight: 600}}>(prisoner1 knows prisoner1 has a blue hat OR prisoner2 knows prisoner2 has a blue hat) OR prisoner3 knows false: (prisoner3 has a blue hat) is true</span>.</Typography> : null}
            </div>
            <br/>
            <Typography variant="body1" gutterBottom>Now we have our answer but we don't know for sure is it prisoner1 which knows he has a blue hat or prisoner2 which knows he has a blue hat or prisoner 3 which knows he has a red hat.
                To explore further, choose the 'UPDATE FORM' option after receiving the previous answer and separate the previous question into three new ones.</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Question 1</span>: Is the statement ' prisoner1 knows prisoner1 has a blue hat ' true?</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Question 2</span>: Is the statement ' prisoner2 knows prisoner2 has a blue hat ' true?</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Question 3</span>: Is the statement ' prisoner3 knows false: (prisoner3 has a blue hat) ' true?</Typography>
            <Typography variant="body1" gutterBottom>Ask the questions one by one. After receiving the answer to the first question, again choose the 'UPDATE FORM' option. Ask the second question and so on.</Typography>
            <div className="rowC">
                <Button variant="contained" color="secondary" onClick={showAnswer2}>Show answer to Question 1</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {answer2 ? <Typography variant="body1" gutterBottom>Statement <span style={{fontWeight: 600}}>prisoner1 knows prisoner1 has a blue hat is false</span>.</Typography> : null}
            </div>
            <br/>
            <div className="rowC">
                <Button variant="contained" color="secondary" onClick={showAnswer3}>Show answer to Question 2</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {answer3 ? <Typography variant="body1" gutterBottom>Statement <span style={{fontWeight: 600}}>prisoner2 knows prisoner2 has a blue hat is false</span>.</Typography> : null}
            </div>
            <br/>
            <div className="rowC">
                <Button variant="contained" color="secondary" onClick={showAnswer4}>Show answer to Question 3</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {answer4 ? <Typography variant="body1" gutterBottom>Statement <span style={{fontWeight: 600}}>prisoner3 knows false: (prisoner3 has a blue hat) is true</span>.<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    Because prisoner3 sees two blue hats and there is no third blue hat, he concludes and knows his hat is red.</Typography> : null}
            </div>
            <br/>
            <Typography variant="body1" gutterBottom>There are also other cases that could be explored.</Typography>
        </div>
    )
}

export default ThreeHats;