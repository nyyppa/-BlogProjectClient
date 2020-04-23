import React from 'react';
import Button from '@material-ui/core/Button';

function LoginButton() {
    return(
        <Button variant="contained"
                color="secondary"
                onClick={() => {
                    window.location.assign("/user");
                }}>Login</Button>
    );
}

export default LoginButton;