import React, { useEffect, useState } from 'react';

const Reviews = () => {
    const role = localStorage.getItem("role");
    const [reviews, setReviews] = useState([]);

    const getReviews = async () => {
        try {
            const response = await fetch("http://localhost:8080/allReviews", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (Array.isArray(data.Reviews)) {
                setReviews(data.Reviews);
            } else {
                console.error("Invalid data format received:", data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getReviews();
    }, []);

    const deleteReview = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/deleteReview/${id}`, {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            getReviews(); // Update reviews after deletion
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    return (
        <div>
            {reviews.map((review) => (
                <div key={review._id} className='Review'>
                    <p>Movie: {review.MovieName}</p>
                    <p>Rating: {review.starAmount}</p>
                    <p>Review: {review.ReviewTxt}</p>
                    <p>User: {review.UserPosted}</p>
                    
                    {role === "Admin" && (
                        <button onClick={() => deleteReview(review._id)}>Delete Review</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Reviews;