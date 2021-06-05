import useSWR from 'swr'
require('isomorphic-fetch');

function Profile () {
  const { data, error } = useSWR('/api/user/123', fetch);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // render data
  return <div>hello {data.name}!</div>
}

function useUser(id) {
    const {data, error} = useSWR(`api/link/${id}`, fetcher);

    return {
        user:data,
        isLoading: !data && !error,
        isError: error,
    }
}
 
function Avatar ({id}) {
    const {user, isLoading, isError} = useUser(id);
    if(isLoading) return null;
}


export default Profile;