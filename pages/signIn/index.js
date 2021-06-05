import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, Grid, Header, Input, Label } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {signInWithEmailPassword} from '../../auth/email';
import {signInByGoogle} from '../../auth/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import * as _ from 'lodash';

Login.propTypes = {
    onLogin: PropTypes.func,
};

function Login(props) {
    const {onLogin} = props;
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');

    const handleLoginByGoogle = () => {
        signInByGoogle().then(result => {
            console.log("Result: ", result);
            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;
            router.push('/');
        });
    }

    const handleSubmit = () => {
       
        //hanle login
        try {
            signInWithEmailPassword(userName, pass).then(data => {
               if(_.has(data, 'user')) {
                   let accessToken = _.get(data, 'user.za');
                   let refreshToken = _.get(data, 'user.refreshToken');
                   localStorage.setItem('accessToken', accessToken);
                   localStorage.setItem('refreshToken', refreshToken);
                   router.push('/');
               } else {
                    swal('Login Failed', data.message, 'error');
               }
            });
        } catch (err) {
            swal('Login Failed', err, 'error');
        }
        

    };

    return (
        <Fragment>
            <Container style={{padding: "200px 300px 100px 300px"}}>
                <Header color="blue" size="huge">Đăng nhập</Header>
                <Form>
                    <Form.Field>
                        <label>Email</label>
                        <Input placeholder='Input email' onChange={(e, data) => setUserName(data.value)} type="email"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Input placeholder='password' type="password" onChange={(e,data) => setPass(data.value)}/>
                    </Form.Field>
                    <Form.Field>        
                    </Form.Field>
                    <Grid style={{marginBottom: "15px"}}>
                        <Grid.Row color={2}>
                            <Grid.Column width="6"><Button type='submit' color="facebook" onClick={handleSubmit}>Login</Button></Grid.Column>
                            <Grid.Column width="8"><Button color="google plus" onClick={handleLoginByGoogle}>Login By Google</Button></Grid.Column>
                        </Grid.Row>
                    </Grid>
                   
                </Form>
                
                <Link href='/signUp'>
                        <a>Bạn chưa có tài khoản? Tạo tài khoản mới</a>
                </Link>
            </Container>
        </Fragment>
    );
}

export default Login;