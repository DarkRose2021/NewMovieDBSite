import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

const Actor = ({actor}) => {
    const {id} = useParams();
    
    // console.log("ID: ", id)
    // console.log("Actors ", actor)
const [actorInfo, setActorInfo] = useState(null)

    useEffect(() => {
        // console.log("Props :", id);

        // console.log("Props", name)
        const getActorInfo = async () => {
            try{
                //console.log("Going for data");
                //updateActorDetails
                fetch(`http://localhost:8080/getActorDetails/${actor.id}`, {
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
                    // console.log("Data got")
                    // console.log(data)
                    setActorInfo(data)
                    // console.log(actorInfo)
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
    }, [id]);

    const formattedBirthday = (birthday) => {
        const date = new Date(birthday);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

  return (
    <div className='actorCard'>
        {/* {actor.name} */}
       {actorInfo ? (
                <>
                    <h1>{actorInfo.name}</h1>
                    <img className='pfp' src={`https://api.themoviedb.org/t/p/w500/${actorInfo.profile_path}`} alt={actorInfo.name} />
                    <h2>{actorInfo.gender}</h2>
                    <h2>{formattedBirthday(actorInfo.birthday)}</h2>
                </>
            ) : (
                <p>Loading....</p>
            )}
    </div>
  )
}

export default Actor