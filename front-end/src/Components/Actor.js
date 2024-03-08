import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const Actor = ({ actor }) => {
    const { id } = useParams();
    const [actorInfo, setActorInfo] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false); // State to track if bio is expanded

    useEffect(() => {
        const getActorInfo = async () => {
            try {
                const response = await fetch(`http://localhost:8080/getActorDetails/${actor.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setActorInfo(data);
            } catch (error) {
                console.error("Error fetching actor details: ", error);
            }
        };
        getActorInfo();
    }, [id, actor.id]);

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

    const isCompleteActorInfo = actorInfo && actorInfo.name && actorInfo.birthday && actorInfo.bio;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const isBioExpandable = () => {
        const bioElement = document.querySelector('.actorCard p');
        return bioElement && bioElement.scrollHeight > 110;
    };

    if (!isCompleteActorInfo) {
        return null; // Skip rendering if actor info is incomplete or doesn't meet requirements
    }

    return (
        <div className='actorCards'>
            <div className={`actorCard ${isBioExpandable() ? 'collapsed' : ''}`} onClick={isBioExpandable() ? toggleExpanded : null}>
                <img className='pfp' src={`https://image.tmdb.org/t/p/original${actorInfo.profile}`} alt={actorInfo.name} />
                <h1>{actorInfo.name}</h1>
                {actorInfo.character && <h2>{actorInfo.character}</h2>}
                <h2>{formattedBirthday(actorInfo.birthday, actorInfo.deathday)}</h2>
                <h2>{actorInfo.gender}</h2>
                <p className={isExpanded ? 'expanded' : 'collapsed'}>{actorInfo.bio}</p>
            </div>
        </div>
    );
};

export default Actor;
