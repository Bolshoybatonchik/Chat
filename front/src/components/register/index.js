import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom'


import { submitRegistration } from "inquiries";
import { validationName, validationEmail, validationPassword } from "utils/validatetion";
import { observer } from "mobx-react-lite";
import errorStore from "store/errorStore";

const SignUp = observer(() => {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const {registrationError} =errorStore
    const history = useHistory()
    const handleChangeName = event => {
        setName(event.target.value)
    }
    const handleChangePassword = event => {
        setPassword(event.target.value)
    }

    const handleChangeEmail = event => {
        setEmail(event.target.value)
    }

    const validateAll = () => {
        if (!name) {
            validationName(name, setNameError)
        }
        if (!password) {
            validationPassword(password, setPasswordError)
        }
        if (!email) {
            validationEmail(email, setEmailError)
        }
    }

    const Submit = async () => {
        const isEmptyValue = name && password && email
        if (!isEmptyValue) {
            validateAll()
        }
        const isError = !emailError && !passwordError && !nameError
        if (isEmptyValue && isError) {
           const error = await submitRegistration(name, email, password)
            if (!error) {
                history.push('/')
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} >
                    {registrationError && <div className={classes.error}>{registrationError}</div>}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={nameError}
                                autoComplete="name"
                                name="Name"
                                variant="outlined"
                                required
                                fullWidth
                                id="Name"
                                label="Name"
                                onBlur={() => validationName(name, setNameError)}
                                onChange={handleChangeName}
                                value={name}
                                helperText={nameError ? "invalid name" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={emailError}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChangeEmail}
                                onBlur={() => validationEmail(email, setEmailError)}
                                value={email}
                                helperText={emailError ? "The entered email address is not correct" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={passwordError}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChangePassword}
                                onBlur={() => validationPassword(password, setPasswordError)}
                                value={password}
                                helperText={passwordError ? "not less than 7 and not more than 15 characters" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                    <Button
                        onClick={Submit}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link className={classes.link} to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
})
export default SignUp

const useStyles = makeStyles((theme) => ({
    link:{
        textDecoration:"none",
        color:"#160057",
        "&:hover": {
            color:"blue"
        }
    },
    paper: {
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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: 'red',
    }
}));
