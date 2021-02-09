import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";

function MuddyChildren() {
    const [visible, setVisible] = useState(false);
    const showAnswer = () => setVisible(true);
    const [answer1, setAnswer1] = useState(false);
    const showAnswer1 = () => setAnswer1(true);
    const [answer2, setAnswer2] = useState(false);
    const showAnswer2 = () => setAnswer2(true);
    const [answer3, setAnswer3] = useState(false);
    const showAnswer3 = () => setAnswer3(true);

    return (
        <div>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Muddy Children</span></Typography>
            <Typography variant="body1" gutterBottom>There is a set of children. Those are professional logicians and very attentive.
                Every child has a muddy face or not. Every child sees and knows whether the others have a muddy face but doesn’t know about its own face.
                A man comes and publicly announces that at least one of them has a muddy face. Then he repeatedly asks the same question: “Do you know if you have a dirty face or not, and if so, which of the two?”</Typography>
            <br/>
            <Typography variant="body1" gutterBottom>In the puzzle it's said that there is a set of children.
                For simplicity, here we will show the situation where there are two children. The logic is the same for as many children as you decide to have in your puzzle.</Typography>
            <Typography variant="body1" gutterBottom>Another thing is that the man publicly announces that at least one of the children has a muddy face.
                That means there are two possible cases - only one child to have a muddy face or both of them to have muddy faces.</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Case 1: only one child from the two has a muddy face</span></Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Agents</span>:  2 - child1, child2</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>States</span>:  2 - child1 is muddy, child2 is muddy</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Question to ask</span>: Is the statement ' child1 knows child1 is muddy OR child2 knows false: (child2 is muddy) ' true?<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>That is the same question the man asks the children.</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Statements to submit</span>, explaining the puzzle:</Typography>
            <ul>
                <li>child1 is muddy<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>We decide child1 to be the one with the muddy face.</li>
                <li>false: (child2 is muddy)<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>We decide child2 to be the clean one.</li>
                <li>child1 knows false: (child2 is muddy)<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>This statement and the next statement are true because in the puzzle is said that every child sees and knows whether the others have a muddy face.</li>
                <li>child2 knows child1 is muddy</li>
                <li>(child1 is muddy OR child2 is muddy) OR (child1 is muddy AND child2 is muddy)<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>!!!This statement should be set to be common knowledge as it is presenting the public announcement of the man.</li>
            </ul>
            <br/>
            <Typography variant="body1" gutterBottom>Try out this puzzle and see whether you received the same answer.</Typography>
            <div className="rowC">
                <Button variant="contained" color="secondary" onClick={showAnswer}>Show answer</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {visible ? <Typography variant="body1" gutterBottom>Statement <span style={{fontWeight: 600}}>child1 knows child1 is muddy OR child2 knows false: (child2 is muddy) is true</span>.</Typography> : null}
            </div>
            <br/>
            <Typography variant="body1" gutterBottom>Now we have our answer but we don't know for sure is it child1 which knows it is muddy or child2 which knows it is clean or maybe both.
            To explore further, choose the 'UPDATE FORM' option after receiving the previous answer and separate the previous question into two new ones.</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Question 1</span>: Is the statement ' child1 knows child1 is muddy ' true?</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Question 2</span>: Is the statement ' child2 knows false: (child2 is muddy) ' true?</Typography>
            <Typography variant="body1" gutterBottom>Ask the questions one by one. After receiving the answer to the first question, again choose the 'UPDATE FORM' option. Ask the second question.</Typography>
            <div className="rowC">
                <Button variant="contained" color="secondary" onClick={showAnswer1}>Show answer to Question 1</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {answer1 ? <Typography variant="body1" gutterBottom>Statement <span style={{fontWeight: 600}}>child1 knows child1 is muddy is true</span>.<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>Because child1 sees child2 is clean and it is common knowledge that at least one child is dirty, child1 concludes and knows it is the one that is dirty.</Typography> : null}
            </div>
            <br/>
            <div className="rowC">
                <Button variant="contained" color="secondary" onClick={showAnswer2}>Show answer to Question 2</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {answer2 ? <Typography variant="body1" gutterBottom>Statement <span style={{fontWeight: 600}}>child2 knows false: (child2 is muddy) is false</span>.<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>There are two possible cases as we already explained - only one child to have a muddy face or both of them to have muddy faces.
                    Because child2 sees child1 is dirty, it doesn't know which is the case right now - whether it is dirty too or not.</Typography> : null}
            </div>
            <br/>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Case 2: both children have muddy faces</span></Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Agents</span>:  2 - child1, child2</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>States</span>:  2 - child1 is muddy, child2 is muddy</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Question to ask</span>: Is the statement ' child1 knows child1 is muddy ' true?<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>Every child is in the same situation - every child sees a dirty child, so it is enough to ask just if the one of them knows whether it is dirty for itself.
                The answer we receive will be the same for the self knowledge of the other child.</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Statements to submit</span>, explaining the puzzle:</Typography>
            <ul>
                <li>child1 is muddy</li>
                <li>child2 is muddy</li>
                <li>child1 knows child2 is muddy</li>
                <li>child2 knows child1 is muddy</li>
                <li>(child1 is muddy OR child2 is muddy) OR (child1 is muddy AND child2 is muddy)<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>!!!This statement should be set to be common knowledge as it is presenting the public announcement of the man.</li>
            </ul>
            <br/>
            <Typography variant="body1" gutterBottom>Try out this puzzle and see whether you received the same answer.</Typography>
            <div className="rowC">
                <Button variant="contained" color="secondary" onClick={showAnswer3}>Show answer</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {answer3 ? <Typography variant="body1" gutterBottom>Statement <span style={{fontWeight: 600}}>child1 knows child1 is muddy is false</span>.</Typography> : null}
            </div>
        </div>
    )
}

export default MuddyChildren;