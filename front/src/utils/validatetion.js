export const validationEmail = (email,setEmailError) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = re.test(String(email).toLowerCase());
    if (!result) {
        setEmailError(true)
    } else {
        setEmailError(false)
    }
}

export  const validationPassword = (password,setPasswordError) => {
    if (password.length < 7 || password.length > 15) {
        setPasswordError(true)
    } else {
        setPasswordError(false)
    }
}

export const validationName = (name,setNameError) => {
    if (name.length < 2 || name.length > 15) {
        setNameError(true)
    } else {
        setNameError(false)
    }
}
