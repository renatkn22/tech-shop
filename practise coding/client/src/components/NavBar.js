import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils.js/consts";
import {Button, Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    return (
        <Navbar
            expand="lg"
            variant="dark"
            style={{
                background: '#111827',
                minHeight: '72px',
                borderBottom: '1px solid #2d3748'
            }}
        >
            <Container>

                <NavLink
                    to={SHOP_ROUTE}
                    style={{
                        color: '#fff',
                        textDecoration: 'none',
                        fontSize: '26px',
                        fontWeight: '700',
                        letterSpacing: '-0.5px'
                    }}
                >
                    <span style={{color: '#60a5fa'}}>Tech</span>Shop
                </NavLink>

                <Nav className="ms-auto align-items-center gap-2">

                    <Button
                        variant="link"
                        onClick={() => navigate(SHOP_ROUTE)}
                        style={{
                            color: '#d1d5db',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >
                         Магазин
                    </Button>

                    {user.isAuth ? (
                        <>
                            <Button
                                onClick={() => navigate(ADMIN_ROUTE)}
                                style={{
                                    background: '#2563eb',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '9px 16px',
                                    fontWeight: '500'
                                }}
                            >
                                 Адмін панель
                            </Button>

                            <Button
                                onClick={logOut}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #4b5563',
                                    color: '#fff',
                                    borderRadius: '10px',
                                    padding: '9px 18px',
                                    fontWeight: '500'
                                }}
                            >
                                Вийти
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => navigate(LOGIN_ROUTE)}
                            style={{
                                background: '#fff',
                                color: '#111827',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '9px 20px',
                                fontWeight: '600'
                            }}
                        >
                             Увійти
                        </Button>
                    )}

                </Nav>

            </Container>
        </Navbar>
    );
});

export default NavBar;