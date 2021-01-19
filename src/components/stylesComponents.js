const styles = theme => ({
    select: {
        border:'2px solid black',
        minWidth: 200,
        maxWidth: 300,
        textAlign: "center"
    },
    templateTexts: {
        border: '2px solid black',
        textAlign: "center",
        fontWeight: 'bold',
        backgroundColor: "lightgray"
    },
    table: {
        width: '90vw',
    },
    head: {
        backgroundColor: theme.palette.common.black
    },
    cellHeadFontSize: {
        fontSize: '13pt',
        color: theme.palette.common.white
    },
    cellFontSize: {
        fontSize: '13pt'
    },
    redText: {
        color: 'red'
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    hidden: {
        display: 'none',
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default styles;