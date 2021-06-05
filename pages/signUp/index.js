import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, Header, Input, Label } from 'semantic-ui-react';
import {url} from '../../config/constant';
import axios from 'axios';
import { mutate } from 'swr';
import {signUpWithEmailPassword} from '../../auth/email';
import 'semantic-ui-css/semantic.min.css';
import swal from 'sweetalert';
import _, { has } from 'lodash';
import {useRouter} from 'next/router';

SignUp.propTypes = {
    onLogin: PropTypes.func,
};

function SignUp(props) {
    const {onLogin} = props;
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async () => {
        try {
            signUpWithEmailPassword(userName, pass).then(data => {
                if(_.has(data, 'user')){
                   let user = data.user;
                    // localStorage.setItem('token', token);
                    // localStorage.setItem('refreshToken', refreshToken);
                    router.push('/signIn')
                } else {
                    
                    swal('Oh noes!', data.message, 'error');
                    setError(_.get(data, 'message'));
                }
            }).error(err => {
                console.err(err)
            });

        } catch (err) {
            setError(err.message);           
        }      
    };

    return (
        <Fragment>
            <Container style={{padding: "200px 300px 100px 300px"}}>
                <Header color="blue" size="huge">Đăng kí tài khoản</Header>
                <Form onSubmit={handleSubmit} size='large'>
                    <Form.Field>
                        <label>Email</label>
                        <Input placeholder='First Name' onChange={(e, data) => setUserName(data.value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Input placeholder='password' type="password" onChange={(e,data) => setPass(data.value)}/>
                    </Form.Field>
                    <Form.Field>        
                    </Form.Field>
                   
                    <Button type='submit' color="facebook">Đăng ký</Button>
                </Form>      
            </Container>
            
        </Fragment>
    );
}

export default SignUp;