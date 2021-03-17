import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";

function Pizza() {
    const [visible, setVisible] = useState(false);
    const showAnswer = () => setVisible(true);

    return (
        <div>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Dreaming of pizza</span></Typography>
            <Typography variant="body1" gutterBottom>John wants a pizza for dinner. He supposes that his mother knows him well and she knows he wants a pizza for dinner.
                Does this mean John's mother knows John wants a pizza for dinner?</Typography>
            <br/>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Agents</span>:  2 - John, John's mother</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>States</span>:  1 - John wants a pizza for dinner</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Question to ask</span>: Is the statement ' John's mother knows John wants a pizza for dinner ' true?</Typography>
            <Typography variant="body1" gutterBottom><span style={{fontWeight: 600}}>Statements to submit</span>, explaining the puzzle:</Typography>
            <ul>
                <li>John wants a pizza for dinner</li>
                <li>John supposes John's mother knows John wants a pizza for dinner</li>
            </ul>
            <br/>
            <Typography variant="body1" gutterBottom>Try out this puzzle and see whether you received the same answer.</Typography>
            <div className="rowC">
                <Button variant="contained" color="secondary" onClick={showAnswer}>Show answer</Button><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {visible ? <Typography variant="body1" gutterBottom>Statement <span style={{fontWeight: 600}}>John's mother knows John wants a pizza for dinner is false</span>.</Typography> : null}
            </div>
        </div>
    )
}

export default Pizza;