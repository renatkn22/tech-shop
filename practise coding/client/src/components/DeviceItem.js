import React, {useEffect, useState} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png';
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils.js/consts";
import {fetchRating} from "../http/ratingAPI";

const DeviceItem = ({device}) => {
    const navigate = useNavigate();

    const [rating, setRating] = useState({
        average: 0,
        count: 0
    });

    useEffect(() => {
        fetchRating(device.id)
            .then(data => setRating(data))
            .catch(e => console.error(e));
    }, [device.id]);

    return (
        <Col
            md={3}
            sm={6}
            xs={12}
            className="mt-4 d-flex justify-content-center"
        >
            <Card
                onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
                style={{
                    width: '220px',
                    border: 'none',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: '0.25s',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow =
                        '0 10px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow =
                        '0 4px 15px rgba(0,0,0,0.08)';
                }}
            >
                <div
                    style={{
                        height: '210px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#f8f9fa',
                        padding: '15px'
                    }}
                >
                    <Image
                        src={process.env.REACT_APP_API_URL + device.img}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </div>

                <Card.Body>

                    <div
                        style={{
                            fontSize: '14px',
                            color: '#888',
                            marginBottom: '6px'
                        }}
                    >
                        {device.type?.name || 'Техніка'}
                    </div>

                    <Card.Title
                        style={{
                            fontSize: '17px',
                            fontWeight: '600',
                            marginBottom: '10px'
                        }}
                    >
                        {device.name}
                    </Card.Title>

                    <div
                        className="d-flex align-items-center"
                        style={{marginBottom: '10px'}}
                    >
                        <div style={{display: 'flex', gap: '2px'}}>
                            {[1, 2, 3, 4, 5].map(starNumber => (
                                <span
                                    key={starNumber}
                                    style={{
                                        color: starNumber <= Math.round(rating.average)
                                            ? '#ffc107'
                                            : '#d1d5db',
                                        fontSize: '18px'
                                    }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>

                        <span
                            style={{
                                marginLeft: '6px',
                                fontWeight: '600',
                                fontSize: '14px'
                            }}
                        >
                            {rating.average.toFixed(1)}
                        </span>

                        <span
                            style={{
                                marginLeft: '4px',
                                color: '#888',
                                fontSize: '13px'
                            }}
                        >
                            ({rating.count})
                        </span>
                    </div>

                    <div
                        style={{
                            fontSize: '20px',
                            fontWeight: '700'
                        }}
                    >
                        {device.price} ₴
                    </div>

                </Card.Body>
            </Card>
        </Col>
    );
};

export default DeviceItem;