import React from 'react'
import useSWR from 'swr'
import {fetch} from 'isomorphic-fetch'

function Pokemon({pokemon}) {
    const {name} = 'Test';
    const url = 'https:/pokeapi.co/api/v2/pokemon' + name;

    const {data: result, error} = useSWR(url, fetch);
    if (error) return <h1> Something went wrong!!!</h1>
    if(!result) return <h1>Loading...............</h1>
    return (
        <div className='Card'>
            <span className='Card--id'>#{result.id}</span>
            <img
                className='Card--image'
                src={result.sprites.front_default}
                alt={name}
            />
            <h1 className='Card--name'>{name}</h1>
            <span className='Card--details'>
                {result.types.map((poke) => poke.type.name).join(', ')}
            </span>
        </div>
    );
}

export default Pokemon;