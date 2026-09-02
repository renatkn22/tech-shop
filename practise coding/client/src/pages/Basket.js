import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { fetchBasket, removeFromBasket } from '../http/basketAPI';

const Basket = () => {
    const [basket, setBasket] = useState(null);

    useEffect(() => {
        loadBasket();
    }, []);

    const loadBasket = () => {
        fetchBasket()
            .then(data => {
                setBasket(data);
            })
            .catch(error => {
                console.log(
                    "Помилка кошика:",
                    error.response?.data || error
                );
            });
    };

    const removeDevice = (deviceId) => {
        removeFromBasket(deviceId)
            .then(() => {
                loadBasket();
            })
            .catch(error => {
                console.log(
                    "Помилка видалення:",
                    error.response?.data || error
                );
            });
    };

    if (!basket) {
        return (
            <Container className="mt-5">
                <h2>Завантаження кошика...</h2>
            </Container>
        );
    }

    const devices = basket.basket_devices || [];

    const totalPrice = devices.reduce(
        (sum, item) =>
            sum + item.device.price * item.quantity,
        0
    );

    return (
        <Container className="mt-5">

            <h2 className="mb-4">
                Мій кошик
            </h2>

            {devices.length === 0 ? (

                <Card className="text-center p-5">
                    <h4>Ваш кошик порожній</h4>

                    <p className="text-muted">
                        Додайте товари, щоб вони з'явилися тут.
                    </p>

                    <Button
                        variant="outline-dark"
                        href="/"
                    >
                        Перейти до товарів
                    </Button>
                </Card>

            ) : (

                <Row>

                    <Col md={8}>

                        {devices.map(item => (

                            <Card
                                className="mb-3"
                                key={item.id}
                            >

                                <Card.Body>

                                    <Row className="align-items-center">

                                        <Col md={3} className="text-center">

                                            <img
                                                src={
                                                    process.env.REACT_APP_API_URL +
                                                    item.device.img
                                                }
                                                alt={item.device.name}
                                                style={{
                                                    width: '120px',
                                                    height: '120px',
                                                    objectFit: 'contain'
                                                }}
                                            />

                                        </Col>

                                        <Col md={4}>

                                            <h5>
                                                {item.device.name}
                                            </h5>

                                            <div className="text-muted">
                                                Ціна: {item.device.price} ₴
                                            </div>

                                        </Col>

                                        <Col md={2}>

                                            <strong>
                                                {item.quantity} шт.
                                            </strong>

                                        </Col>

                                        <Col md={3} className="text-end">

                                            <h5>
                                                {item.device.price * item.quantity} ₴
                                            </h5>

                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() =>
                                                    removeDevice(
                                                        item.device.id
                                                    )
                                                }
                                            >
                                                Видалити
                                            </Button>

                                        </Col>

                                    </Row>

                                </Card.Body>

                            </Card>

                        ))}

                    </Col>

                    <Col md={4}>

                        <Card>

                            <Card.Body>

                                <h4>
                                    Підсумок
                                </h4>

                                <hr />

                                <div className="d-flex justify-content-between mb-3">

                                    <span>
                                        Товарів:
                                    </span>

                                    <strong>
                                        {devices.reduce(
                                            (sum, item) =>
                                                sum + item.quantity,
                                            0
                                        )}
                                    </strong>

                                </div>

                                <div className="d-flex justify-content-between">

                                    <span>
                                        Разом:
                                    </span>

                                    <h4>
                                        {totalPrice} ₴
                                    </h4>

                                </div>

                                <Button
                                    variant="success"
                                    className="w-100 mt-3"
                                >
                                    Оформити замовлення
                                </Button>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            )}

        </Container>
    );
};

export default Basket;