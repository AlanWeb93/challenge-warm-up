import React, { useEffect } from 'react'
import styled from "styled-components";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import swal from 'sweetalert';

const Login = ({history}) => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            history.push("/home");
        }
    }, []);

    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validationSchema: Yup.object({
          email: Yup.string()
            .email('El email no es valido')
            .required('El email es obligatorio'),
          password: Yup.string()
            .required('El password es obligatorio')
        }),
        onSubmit: async valores => {
            const {email, password} = valores;

            await axios.post('http://challenge-react.alkemy.org', {
                email,
                password
            })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                history.push("/home");
            })
            .catch(err => {
                swal({
                    title: "Error",
                    text: "Credenciales Invalidas.",
                    icon: "error",
                    button: "Aceptar",
                    timer: "4000"
                });
            })
        }
    });

    return (
        <Container>
            <Header>
                <img src="/images/logo-header-alkemy.png" alt="logotipo" />
            </Header>
            <Form onSubmit={formik.handleSubmit}>
                <legend>Iniciar Sesión</legend>
                <Campo>
                    <input 
                        type="email" 
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange} 
                        placeholder="Correo Electronico"
                    />
                </Campo>
                {
                    formik.touched.email && formik.errors.email ? (
                        <Error>
                            <p>{formik.errors.email}</p>
                        </Error>
                    ) : null
                }
                <br/>
                <Campo>
                    <input 
                        type="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange} 
                        placeholder="Contraseña"
                    />
                    
                </Campo>
                {
                    formik.touched.password && formik.errors.password ? (
                        <Error>
                            <p>{formik.errors.password}</p>
                        </Error>
                    ) : null
                }
                <Submit>
                    <input type="submit" value="Iniciar sesión" />
                </Submit>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    background-color: white;
    color: white;
    height: 100vh;

    @media (min-width: 480px) {
        background-color: unset;
        background-image: url(/images/background-alkemy.png);
        background-repeat: no-repeat;
        background-size: cover;
    }
`;

const Header = styled.header`
    max-width: 180px;
    padding-top: 5px;

    @media (min-width: 480px) {
        margin-top: .8rem;
        margin-left: 2%;
    }
`;

const Form = styled.form`
    width: 100%;
    margin: 0 auto;

    legend {
        color: white;
        font-size: 2rem;
        margin: 2rem 0;
    }

    background-color: rgba(0,0,0, 0.85);
    max-width: 330px;
    padding: 1px 1px;

    @media (min-width: 480px) {
        width: 90%;
        margin: 0 auto;

        legend {
            color: white;
            font-size: 2rem;
            margin: 2rem 0;
            font-weight: bold;
        }

        background-color: rgba(0,0,0, 0.85);
        max-width: 330px;
        padding: 2rem 4rem;
        margin: 1rem auto 4rem auto;
    }
    
`;

const Campo = styled.div`
    display: flex;
    position: relative;
    margin-bottom: .8rem;

    input {
        flex: 1;
        padding: 1.3rem 1rem .7rem 1rem;
        border: none;
        background-color: #323232;
        border-radius: 5px;
        color: white;
        &:focus {
            background-color: #454545;
            outline: none;

        }
    }
    
`;

const Error = styled.div`
    margin: 2px;
    background-color: #323232;
    color: red;
    padding: 4px;
`;

const Submit = styled.div`
    display: flex;
    margin-top: 2rem;
    
    input {
        background-color: #323232;
        color: white;
        display: block;
        width: 100%;
        text-align: center;
        text-decoration: none;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        padding: 1rem 0;
        cursor: pointer;
    }

`;

export default Login
