import {realtimeDB} from '../config/firebase';


export const writeDeveloperData = (depId, name, role) => {
    realtimeDB.ref('developers/'+depId).set({
        name: name,
        role: role
    })
}