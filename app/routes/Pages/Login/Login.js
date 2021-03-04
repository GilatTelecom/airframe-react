import React, { useState } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    CustomInput,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

import { useAuth } from "../../../auth"


function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    function postLogin() {
        axios.post("http://172.31.0.25/api/v1/access_token", {"client-id": userName, "client-token": password}, { 
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => {
          if (result.status === 200) {
            let token = result.data;
            
            setAuthTokens(token.data.token);
            setLoggedIn(true);
          } else {
            setIsError(true);
          }
        }).catch(e => {
          setIsError(true);
        });
        
    }

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (

        <EmptyLayout>
            <EmptyLayout.Section center>
                <HeaderAuth
                    title="Sign In to Application"
                />
                <form className="mb-3">
                    <FormGroup>
                        <FormText color="red" style={{ textAlign: "center" }}>
                            {isError && <div>The username or password provided were incorrect!</div>}
                        </FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="username">
                            Username
                    </Label>
                        <Input type="text" name="user" id="username" value={userName}
                            onChange={e => {
                                setUserName(e.target.value);
                            }} placeholder="Enter Username..." className="bg-white" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">
                            Password
                    </Label>
                        <Input type="password" name="password" id="password" value={password}
                            onChange={e => {
                                setPassword(e.target.value);
                            }} placeholder="Password..." className="bg-white" />
                    </FormGroup>

                    <ThemeConsumer>
                        {
                            ({ color }) => (

                                <Button onClick={postLogin} block  color={color}>Sign In</Button>
                            )
                        }
                    </ThemeConsumer>

                </form>
                <div className="d-flex mb-5">
                    <Link to="/pages/forgotpassword" className="text-decoration-none">
                        Forgot Password
                </Link>
                    <Link to="/pages/register" className="ml-auto text-decoration-none">
                        Register
                </Link>
                </div>
                <FooterAuth />
            </EmptyLayout.Section>
        </EmptyLayout>
    );
}

export default Login;

