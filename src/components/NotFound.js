import React from 'react'
import styled from 'styled-components';

const NotFound = () => {
    return (
        <Container>
            <h2>Post No Encontrado</h2>
        </Container>
    )
}

const Container = styled.div`
    display: flex:
    height: 100vh;
    text-align: center;
    
    h2 {
        margin-top: 50px;
        font-size: 30px;
    }
`;

export default NotFound
