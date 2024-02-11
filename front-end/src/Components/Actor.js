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
                    console.log(data)
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

    const formattedBirthday = (birthday, deathday) => {
        const formattedBirth = formatDate(birthday);
        if (deathday) {
            const formattedDeath = formatDate(deathday);
            return `${formattedBirth} - ${formattedDeath}`;
        } else {
            return `${formattedBirth} - Present`;
        }
    };
    

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };
    


  return (
    <div className='actorCards'>
        {/* {actor.name} */}
       {actorInfo ? (
                <>
                <div className='actorCard'>
                    <h1>{actorInfo.name}</h1>
                        <img className='pfp' src={`https://api.themoviedb.org/t/p/h632/${actorInfo.profile_path}`} alt={actorInfo.name} />
                        <h2>{actorInfo.gender}</h2>
                        <h2>{formattedBirthday(actorInfo.birthday, actorInfo.deathday)}</h2>
                        <p>{actorInfo.bio}</p>
                    
                </div>
                   
                </>
            ) : (
                <p>Loading....</p>
            )}
    </div>
  )
}

export default Actor