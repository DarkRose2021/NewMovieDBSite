import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

const Actor = () => {
    const {id} = useParams();

const [actorInfo, setActorInfo] = useState(null)

    useEffect(() => {
        console.log("Props :", id);
        const getActorInfo = async () => {
            try{
                console.log("Going for data");
                
                fetch(`"/getActorDetails/${id}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                })
                .then((resp) => {
                    if(!resp.ok){
                        throw new Error(`HTTP error! Status: ${resp.status}`);
                    }
                    return resp.json();
                })
                .then((data) => {
                    console.log("Data got")
                    setActorInfo(data)
                })
                .catch((error) => {
                    console.error("Error fetching: ", error);
                })
            }
            catch(error){
                console.error("Error outside of fetch: ", error)
            }
        };
        getActorInfo();
        //console.log("Got Actor data: ", actorInfo)
    }, [id]);


  return (
    <div className='actorCard'>
       {actorInfo ? (
                <>
                    <h1>{actorInfo.name}</h1>
                    <img className='pfp' src={`https://api.themoviedb.org/3/person/${id}/images`} alt={actorInfo.name} />
                </>
            ) : (
                <p>Loading....</p>
            )}
    </div>
  )
}

export default Actor