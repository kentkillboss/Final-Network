import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    title:{
        display: 'flex',
    },
    content: {
        padding: '9px 14px',
        marginBottom: '5px',
        marginRight: '10px',
        background: '#0048AA',
        color: 'white',
        border: '1px solid #0048AA',
        borderRadius: '14px 14px 0 14px'
    },
    time: {
        fontSize: '13px',
        color: 'grey'
    }
}))

function MessageDisplay({user}) {
    const classes = useStyles();
    return (
        <>
            <Box className={classes.title}>
                <Avatar src={user.avatar} />
                <Typography style={{paddingTop: '5%'}}>{user.username}</Typography>
            </Box>
            <Box className={classes.content}>
                The following npm package, @material-ui/icons, includes the 1,100+ official Material icons 
            </Box>
            <Box className={classes.time}>
                chat time
            </Box>
        </>
    );
}

export default MessageDisplay;