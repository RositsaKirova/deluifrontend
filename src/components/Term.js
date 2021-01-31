import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    dropdown: {
        position: 'absolute',
        top: 28,
        right: 0,
        left: 0,
        width: 500,
        zIndex: 1,
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    b: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    }
}));

//props = title, explanation
export default function ClickAway(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = (e) => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (e) => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
                <button data-testid="title" type="button" className={classes.b} onClick={handleClick}>
                    {props.title}
                </button>
                {open ? (
                    <div data-testid="explanation" className={classes.dropdown}>
                        {props.explanation}
                    </div>
                ) : null}
            </div>
        </ClickAwayListener>
    );
}