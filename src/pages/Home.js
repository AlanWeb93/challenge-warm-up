import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/Header';
import Post from '../components/Post';
import { addPost, getPosts } from '../functions/requests';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts } from '../features/appSlice';

const Home = () => {
    const posts = useSelector(selectPosts);
    const dispatch = useDispatch();
    
    useEffect(() => {
        getPosts(dispatch);
    }, [dispatch]);

    const formik = useFormik({
        initialValues: {
          title: '',
          content: ''
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
            addPost(valores, dispatch);
            valores.title = '';
            valores.content = '';
        }
    });
    
    return (
        <>
            <Header />
            <Container>
                

                <CreatePost>
                    <h4>Crear Post</h4>

                    <Form onSubmit={formik.handleSubmit}>
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
                                value={formik.values.content}
                                onChange={formik.handleChange} 
                                placeholder="Contenido"
                                rows="6"
                            />
                            
                        </Campo>
                        {
                            formik.touched.content && formik.errors.content ? (
                                <Error>
                                    <p>{formik.errors.content}</p>
                                </Error>
                            ) : null
                        }
                        <Submit>
                            <input type="submit" value="Aceptar" />
                        </Submit>
                    </Form>

                </CreatePost>
                <Posts>
                    <h4>Posts</h4>
                    <ScrollPost>
                        {
                            posts.payload?.map(p => <Post key={p.id} post={p} />)
                            //console.log(posts.payload)
                        }
                    </ScrollPost>
                </Posts>
            </Container>
        </>
    )
}

const Container = styled.div`

    @media (min-width: 650px) {
        display: flex;
        margin: 10px;
        height: 90vh;
    }
    
`;

const Posts = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 5px;

    h4 {
        text-align: center;
        margin-top: 5px;
    }

    @media (min-width: 650px) {
        display: flex;
        flex-direction: column;
        width: 65%;
        margin-left: 5px;

        h4 {
            text-align: center;
        }
    }
    
`;

const ScrollPost = styled.div`
    @media (min-width: 650px) {
        overflow-y: scroll;
    }
`;

const CreatePost = styled.div`
    h4 {
        text-align: center;
        margin-top: 5px;
    }

    @media (min-width: 650px) {
        display: flex;
        flex-direction: column;
        width: 35%;

        h4 {
            text-align: center;
        }
    }
`;

const Form = styled.form`
    width: 100%;
    margin-right: 5px;

    background-color: rgba(0,0,0, 0.85);
    padding: 1px 1px;

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

export default Home
