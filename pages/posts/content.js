import React, {
    Fragment, Suspense, useState, ErrorBoundary
} from 'react'
import useSWR, {mutate, useSWRInfinite} from 'swr';
// import {
//     fetch
// } from 'isomorphic-fetch';
import * as _ from 'lodash'
import { Button, Confirm, Grid, Header, Input } from 'semantic-ui-react';
import {service} from '../../config/request';
import axios from 'axios';

import 'semantic-ui-css/semantic.min.css';

const url = 'http://localhost:8081/api/tutorials';
const shortUrl = '/api/tutorials';
const fetcher = url => service.get(url).then(res => {
    return res});
const App = () => {
    const [page, setPage] = useState(0);
    const pageSize = 7;
    const [isConfirm, setIsConfirm] = useState(false);
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    //Set page
    //const [data, setData] = useState('');
    const {data, error} = useSWR(url, fetcher);
   
    const handleAdd = async () => {
        //call API
        // mutate(url, async() => {
        //     await axios.post(url, newParams)
        //         .then(data => {
        //             console.log("Dau xanh: ",data); // JSON data parsed by `data.json()` call
        //         }); 
        // });
        const newParams = {
            title: title,
            description: des
        };

        const users = await mutate(url, service.post(url, newParams));
        console.log("List user", users);
        //Reset Value
        setTitle("");
        setDes("");
    }

    const handleDelete = () => async (e, data) => {
        console.log("Id: ", data.value);
        const result = await mutate(url, axios.delete(`http://localhost:8081/api/tutorials/${data.value}`));
        console.log("Result: ", result);
        setIsConfirm(false);
    };


    const getKey = (pageIndex, previousPageData) => {
        return `http://localhost:8081/api/tutorials/page/getAll?pageIndex=${(pageIndex=(pageIndex==0?0:pageIndex+10))}&pageSize=10`
        // if(previousPageData && !previousPageData.length) return null;
        // return url + `/page/getAll?pageIndex=${pageIndex+1}&pageSize=3`
    }

    if(error)
        return <Header>Oobs...Something when wrong!</Header>
    if(!data)
        return <Header>Loading......</Header>    
    return (
        <Fragment>
            <Grid style={{paddingTop: "20px"}}>
                <Grid.Row columns={3}>
                    <Grid.Column width={6}><Input fluid placeholder="Input Title" value={title} onChange={(e, data)=> setTitle(data.value)}/></Grid.Column>
                    <Grid.Column width={6}><Input fluid placeholder="Input description" value={des} onChange={(e, data)=> setDes(data.value)}/></Grid.Column>
                    <Grid.Column width={4}><Button onClick={handleAdd} color='green'>Add</Button></Grid.Column>
                </Grid.Row>               
            </Grid>
            <h1>List user</h1>
            {
                _.map(data, (item,index) => <Grid key={index}>
                    <Grid.Row columns={2}>
                        <Grid.Column>{item.title}</Grid.Column>
                        <Grid.Column>{item.description}</Grid.Column>
                    </Grid.Row>
                </Grid>)
            }
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column width={2}>
                        <Button onClick={() => setPage(page-1)}>Previous</Button>                           
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Button onClick={() => setPage(page+1)}>Next</Button>
                    </Grid.Column>
                </Grid.Row>  
            </Grid>        
        </Fragment>

    );
};

export default App;