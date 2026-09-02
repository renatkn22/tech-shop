
import React, { useState } from 'react';
import { addRating } from '../http/ratingAPI';

const RatingStars = ({ deviceId, average = 0 }) => {
    const [rating, setRating] = useState(Math.round(average));
    const [hover, setHover] = useState(0);

    const handleRating = async (value) => {
        try {
            const data = await addRating(deviceId, value);
            setRating(Math.round(data.average));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    style={{
                        fontSize: '30px',
                        cursor: 'pointer',
                        color: star <= (hover || rating) ? '#ffc107' : '#ccc',
                        marginRight: '3px'
                    }}
                >
                    ★
                </span>
            ))}

            <span style={{ marginLeft: '10px', fontSize: '18px' }}>
                {average.toFixed(1)}
            </span>
        </div>
    );
};

export default RatingStars;

