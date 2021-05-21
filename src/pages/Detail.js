import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { selectPost } from '../features/appSlice';
import { getPost, updatePost } from '../functions/requests';
import NotFound from '../components/NotFound';

const Detail = ({match}) => {
    const post = useSelector(selectPost);
    const [exist, setExist] = useState(false);
    
    useEffect(() => {
        getPost(match.params.id, setExist); 
    }, [match.params.id]);

    const formik = useFormik({
        initialValues: {
          title: post?.post.title,
          content: post?.post.body
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('El titulo es obligatorio')
                .trim(),
            content: Yup.string()
                .required('El contenido es obligatorio')
                .trim()
        }),
        onSubmit: valores => {
            valores.id = post?.post.id;
            updatePost(valores);
        }
    });

    return (
        <>
            <Header />
            {
                exist ? (
                    <Container>
                        <Form onSubmit={formik.handleSubmit}>
                            <legend>Editar Post</legend>
                            <Campo>
                                <input 
                                    type="text" 
                                    id="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange} 
                                    placeholder="Titulo"
                                />
                            </Campo>
                            {
                                formik.touched.title && formik.errors.title ? (
                                    <Error>
                                        <p>{formik.errors.title}</p>
                                    </Error>
                                ) : null
                            }
                            <br/>
                            <Campo>
                                <textarea 
                                    type="text"
                                    id="content"
                                    rows="6"
                                    value={formik.values.content}
                                    onChange={formik.handleChange} 
                                    placeholder="Contenido"
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
                                <input type="submit" value="Editar" />
                            </Submit>
                        </Form>
                    </Container>
                ) : <NotFound />
            }
            
        </>
    )
}

const Container = styled.div`
    background-color: white;
    color: white;
    height: 100vh;
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

    textarea {
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

        &:hover {
            background-color: #454545;
        }
    }

`;

export default Detail
