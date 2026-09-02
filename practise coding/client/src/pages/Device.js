import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../http/deviceAPI";
import { addToBasket } from "../http/basketAPI";
import RatingStars from '../components/RatingStars';
import { fetchRating } from '../http/ratingAPI';


const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    const [rating, setRating] = useState({
    average: 0,
    count: 0
});

useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data));

    fetchRating(id).then(data => setRating(data));
}, [id]);

    const add = () => {
    addToBasket(device.id)
        .then(() => {
            alert("Товар додан у кошик");
        })
        .catch(e => {
            console.log(e);
        });

        
};

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <RatingStars
    deviceId={device.id}
    average={rating.average}
/>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3> {device.price} грн.</h3>
                        <Button variant={"outline-dark"} onClick={add}>Додати в кошик</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;