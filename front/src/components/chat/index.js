import React, { useEffect, useRef, useState } from 'react'
import { TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom'
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { observer } from "mobx-react-lite";
import clsx from 'clsx';

import UserStore from 'store/userStore';
import { deleteToken } from "utils/localStorage";
import { getMessage, getUserData } from "inquiries";
import ChatStore from 'store/chatStote';
import { Logo } from "components/logo/index";

const ws = new WebSocket('ws://localhost:3000')

const Chat = observer(() => {

    const messageEl = useRef('');
    const [message, setMessage] = useState('')
    const classes = useStyles();
    const history = useHistory()
    const {name, email, userId} = UserStore.user


    ws.onopen = function () {
        console.log("Соединение установлено.");
    };

    ws.onmessage = function (event) {
        ChatStore.updateMessage(JSON.parse(event.data));
    };

    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const {currentTarget: target} = event;
                target.scroll({top: target.scrollHeight, behavior: 'smooth'});
            });
        }
    }, [])

    useEffect(() => {
        getListMessage()
    }, [])

    useEffect(() => {
        getUserData()
    }, [])

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            ChatStore.updateMessage(JSON.parse(e.data));
        })
    }, [])

    const changeMessage = (e) => {
        setMessage(e.target.value)
    }

    const getListMessage = async () => {
        const allMsg = await getMessage()
        ChatStore.updateMessage(allMsg);
    }

    const sendMessage = () => {
        ws.send(JSON.stringify({message, name, userId}))
        setMessage('')
    }

    const logOut = () => {
        deleteToken()
        history.push('/login')
    }

    const disabledButton = !message.trim()

    return (
        <Container component="main" className={classes.container}>
            <CssBaseline/>
            <Box className={classes.user}>
                <Paper className={classes.inform}>
                    <span>{name}</span>
                    <span>{email}</span>
                    <Button onClick={logOut} className={classes.submit} variant="contained" color="primary">
                        Logout
                    </Button>
                </Paper>
                <Paper className={classes.paper}>
                    <TextField
                        onChange={changeMessage}
                        autoComplete="text"
                        name="Text"
                        variant="outlined"
                        multiline={true}
                        rowsMax='6'
                        required
                        fullWidth
                        id="Text"
                        label="Text"
                        autoFocus
                        value={message}
                    />
                    <Button onClick={sendMessage} className={clsx(classes.submit, classes.messageSubmit)}
                            variant="contained" color="primary"
                            disabled={disabledButton}>
                        Send
                    </Button>
                </Paper>
            </Box>
            <Box className={classes.chat}>
                <Logo/>
                <Paper className={classes.wrapper}>
                    <div className={classes.messagesList} ref={messageEl}>
                        {ChatStore.listMessage.map((item) => {
                            return (<Box className={classes.massageWrapper} key={item.id}>
                                    <span className={classes.name}>{item.userName}</span>
                                    <span className={classes.message}>{item.message}</span>
                                </Box>
                            )
                        })}
                    </div>
                </Paper>
            </Box>
        </Container>
    )
})

const useStyles = makeStyles((theme) => ({
    user: {
        width: '50%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position:"relative"
    },
    chat: {
        display: 'flex',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "column",
        [theme.breakpoints.down('lg')]: {
            width: '100%',
        },
    },
    message: {
        marginTop: "5px",
        whiteSpace: "pre",
    },
    name: {
        marginTop: "5px",
        width: "20%",
        height: "40px",
        color: "green"
    },
    inform: {
        margin: '20px 0 0 20px',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '35px',
        background: 'linear-gradient(0.25turn, #3fb3fb, #a53a9c)',
        boxShadow: '0 0 10px 0 lightslategray',
        [theme.breakpoints.down('lg')]: {
            width: '300px',
        },
        [theme.breakpoints.down('md')]: {
            width: '300px',
            margin: '20px 0 0 0',
        },
        [theme.breakpoints.down('400')]: {
            width: '250px',
        },
    },
    paper: {
        margin: '300px 0 10px 20px',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '35px',
        background: 'linear-gradient(0.25turn, #ff00e2, #fdbb2d)',
        boxShadow: '0 0 10px 0 lightslategray',
        [theme.breakpoints.down('lg')]: {
            width: '300px',
        },
        [theme.breakpoints.down('md')]: {
            width: '300px',
            margin: '20px 0 10px 0',
        },
        [theme.breakpoints.down('400')]: {
            width: '250px',

        },
    },
    submit: {
        marginTop: "20px",
    },
    messageSubmit: {
        backgroundColor: "#c23be2",
        '&:hover': {
            background: "#f1710b",
        },
    },
    massageWrapper: {
        display: "flex",
        width: '90%',
        minHeight: ' 60px',
        backgroundColor: 'white',
        margin: '5px 0 5px',
        borderRadius: '5px',
        [theme.breakpoints.down('500')]: {
            width: '100%',
        },
    },
    wrapper: {
        display: 'flex',
        minHeight: '400px',
        maxWidth: '600px',
        maxHeight: '600px',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '35px',
        background: '#c0c0c7',
        boxShadow: '0 0 10px 0 lightslategray',
        marginBottom: 15,
        [theme.breakpoints.down('500')]: {
            width: '95%',
        },
    },
    messagesList: {
        width: '400px',
        height: '390px',
        overflowY: 'auto',
        padding: ' 15 10',
        marginRight: "-30px",
        [theme.breakpoints.down('lg')]: {
            width: '350px',
        },
        [theme.breakpoints.down('500')]: {
            width: '100%',
            marginRight: 0,
        },
    },
    container: {
        display: 'flex',
        justifyContent: ' space-evenly',
        maxWidth: '90%',
        minHeight: '83vh',
        backgroundColor: '#c7c7cf',
        borderRadius: '15px',
        border: 'solid 1px white',
        [theme.breakpoints.down('md')]: {
            flexDirection: "column",
            alignItems: "center",
            marginTop: 10,
            marginBottom:10,
            minHeight: '95vh',
        },
    }
}));

export default Chat
