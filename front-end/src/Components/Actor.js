import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

const Actor = ({actor}) => {
    const {id} = useParams();
    
    // console.log("ID: ", id)
    // console.log("Actors ", actor)
const [actorInfo, setActorInfo] = useState(null)
const [isExpanded, setIsExpanded] = useState(false); // State to track if bio is expanded


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
    
 // Check if a name and at least one additional piece of information other than gender
        const isCompleteActorInfo =
        actorInfo &&
        actorInfo.name &&
        (actorInfo.birthday || actorInfo.deathday || actorInfo.bio);

        const toggleExpanded = () => {
            setIsExpanded(!isExpanded);
        };
        const isBioExpandable = () => {
            const bioElement = document.querySelector('.actorCard p');
            if (bioElement) {
              return bioElement.scrollHeight > 110; // Adjust 50 as needed, it represents the threshold height
            }
            return false;
          };

  return (
    <div className='actorCards'>
        {isCompleteActorInfo && (
    <div className={`actorCard ${isBioExpandable() ? 'collapsed' : ''}`} onClick={isBioExpandable() ? toggleExpanded : null}>
    <img className='pfp' src={`https://image.tmdb.org/t/p/original${actorInfo.profile}`} alt={actorInfo.name} />
            <h1>{actorInfo.name}</h1>
            {actorInfo.birthday && 
                <h2>{formattedBirthday(actorInfo.birthday, actorInfo.deathday)}</h2>}
            {actorInfo.gender && 
                <h2>{actorInfo.gender}</h2>}
            {actorInfo.bio && 
              <p className={isExpanded ? 'expanded' : 'collapsed'}>{actorInfo.bio}</p>}
            </div>
        )}
    </div>
  );
};


export default Actor