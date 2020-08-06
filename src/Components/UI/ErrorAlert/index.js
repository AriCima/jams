import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function ErrorAlert(errorMessage) {
    const classes = useStyles();
    console.log('ErrorMessage launched: ', errorMessage);
    return (
        <div className={classes.root}>
            <Alert
                variant="filled"
                severity="error"
            >
                <AlertTitle>Error</AlertTitle>
                {/* {errorMessage} */}
            </Alert>
        </div>
    );
}
