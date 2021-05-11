import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom'

import { changePassword } from "inquiries";
import ErrorStore from 'store/errorStore'
import { validationEmail, validationPassword } from "utils/validatetion";
import { observer } from "mobx-react-lite";


const PasswordRecovery = observer(()=> {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const classes = useStyles();
    const history = useHistory();

    const {loginError} = ErrorStore

    const handleChangeEmail = event => {
        setEmail(event.target.value)
    }

    const handleChangePassword = event => {
        setPassword(event.target.value)
    }

    const validateAll = () => {
        if (!password) {
            validationPassword(password, setPasswordError)
        }
        if (!email) {
            validationEmail(email, setEmailError)
        }
    }

    const submit = async () => {
        const isEmptyValue = password && email
        if (!isEmptyValue) {
            validateAll()
        }
        const isError = !emailError && !passwordError
        if (isEmptyValue && isError) {
            await changePassword(email, password)
            history.push('/')
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    {loginError ? (
                        <div className={classes.error}>{loginError}</div>
                    ) : null}
                    <TextField
                        onChange={handleChangeEmail}
                        value={email}
                        error={emailError === true}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onBlur={()=>{validationEmail(email,setEmailError)}}
                        helperText={emailError ?"The entered email address is not correct":""}
                    />
                    <TextField
                        onChange={handleChangePassword}
                        value={password}
                        error={passwordError === true}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
                        id="password"
                        onBlur={()=>{validationPassword(password, setPasswordError)}}
                        autoComplete="current-password"
                        helperText={passwordError ?"not less than 7 and not more than 15 characters":""}
                    />
                    <Button
                        onClick={submit}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link className={classes.link} to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link className={classes.link} to="/register" variant="body2">
                                "Don't have an account? Sign Up"
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
})
export default PasswordRecovery

const useStyles = makeStyles((theme) => ({
    link:{
        textDecoration:"none",
        color:"#160057",
        "&:hover": {
            color:"blue"
        }
    },
    paper: {
        position: "relative",
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: 'red',
        top: '-15%',
        left: '5%',
        position: 'absolute',
        width: '90%',
        height: '50px',
    }
}));
