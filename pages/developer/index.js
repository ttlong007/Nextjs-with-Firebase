import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, FormField, Grid, Header, Input } from 'semantic-ui-react';
import { writeDeveloperData } from '../../database/reatimeDatabase';
import { realtimeDB } from '../../config/firebase';
import _ from 'lodash';

Developer.propTypes = {
    
};

function Developer(props) {
    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [deps, setDeps] = useState([]);
    const handleAddDeveloper = () => {
        writeDeveloperData(id, name, role);
    }

    useEffect(() => {
        getDeps();
    },[]);

    const getDeps = () => {
        const subcriber = realtimeDB.ref("developers");
        subcriber.on("value",snapshot => {
            console.log("snapShot, ", snapshot.val());
            setDeps(snapshot.val());
        });
    }
    // const subcriber = realtimeDB.ref("developers");
    // subcriber.once("value").then(snapshot => {
    //     console.log("snapShot, ", snapshot.val());
    //     setDeps(snapshot.val());
    // });

    return (
        <Fragment>
            <Container textAlign="left">
                <Header color="blue">Input Developer Info</Header>
                <Form>
                    <FormField>
                        <label>ID:</label>
                        <Input type="number" onChange={(e, data) => setId(data.value)}/>
                    </FormField>
                    <FormField>
                        <label>Name:</label>
                        <Input  onChange={(e, data) => setName(data.value)}/>
                    </FormField>
                    <FormField>
                        <label>Role:</label>
                        <Input  onChange={(e, data) => setRole(data.value)}/>
                    </FormField>
                    <Button color="green" onClick={handleAddDeveloper}>Add</Button>
                </Form>
            </Container> 
            <Container>
                <Header color="orange">Danh sách Developer</Header>
                {
                    _.map(deps, (item, index) => {return<Fragment key={index}>

                        <Grid>
                            <Grid.Row divided>
                                <Grid.Column width="8" color="brown">{_.get(item, 'name', "Khong cos ten")}</Grid.Column>
                                <Grid.Column color="olive" width="8">{_.get(item, 'role', "Khong cos ten")}</Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Fragment>
                    })
                }
            </Container>           
        </Fragment>
    );
}

export default Developer;