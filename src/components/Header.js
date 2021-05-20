import React from 'react'
import styled from 'styled-components'

const Header = () => {

    return (
        <Nav>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Cerrar Sesion</a></li>
            </ul>
        </Nav>
    )
}

const Nav = styled.nav`
    background-color: #323232;
    color: white;

    ul {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        list-style:none;
        margin:0;
        padding:0;

        a {
            color: white;
            text-decoration: none;
            font-size: 1.1rem;
        }
    }

    ul li{
        text-align:center;
        margin-bottom: 20px;
        flex:1;
        padding: 1rem;

        &:hover {
            background-color: #454545;
            cursor: pointer;
        }
    }

    @media (min-width: 480px) {
        ul {
            flex-direction: row;
        }
        ul li {
            margin-bottom: 0px;
        }
    }
`;

export default Header
