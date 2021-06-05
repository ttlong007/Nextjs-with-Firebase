import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, Header, Input, Label } from 'semantic-ui-react';
import {url} from '../../config/constant';
import axios from 'axios';
import { mutate } from 'swr';
import {
    emailLinkAuthentication,
    emailLinkComplete
} from '../../auth/emailLink';
import 'semantic-ui-css/semantic.min.css';
import swal from 'sweetalert';
import _, { has } from 'lodash';
import {useRouter} from 'next/router';

EmailLink.propTypes = {
    onLogin: PropTypes.func,
};

function EmailLink(props) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const handleSubmit = async () => {
        try {
            await emailLinkAuthentication(email);
        } catch (err) {
            console.error("Loi: ", err);     
        }      
    };

    return (
        <Fragment>
            <Container style={{padding: "200px 300px 100px 300px"}}>
                <Header color="blue" size="huge">Đăng nhập bằng Email</Header>
                <Form onSubmit={handleSubmit} size='large'>
                    <Form.Field>
                        <label>Email</label>
                        <Input placeholder='email' onChange={(e, data) => setEmail(data.value)}/>
                    </Form.Field>                         
                    <Button type='submit' color="facebook">Verify Email</Button>
                </Form>      
            </Container>
            
        </Fragment>
    );
}

export default EmailLink;