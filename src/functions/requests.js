import axios from 'axios';
import { addAll, add } from '../features/appSlice';
import swal from 'sweetalert';

export const getPosts = async (dispatch) => {
    await axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
            dispatch(
                addAll({payload: res.data})
              );
        });
}

export const removePost = async (id, posts, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => {
            const newPosts = posts.payload.filter(post => post.id !== id)
            dispatch(
                addAll({payload: newPosts})
            );
        });
}

export const addPost = async ({title, content}, dispatch) => {
    await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body: content
    })
    .then(res => {
        dispatch(
            add({
                id: res.data.id,
                title: res.data.title,
                body: res.data.body
            })
        );
    });
}

export const updatePost = async ({title, content, id}) => {
    await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title,
        body: content
    })
    .then(res => {
        swal({
            title: "Modificado",
            text: "El post fue modificado correctamente.",
            icon: "success",
            button: "Aceptar",
            timer: "4000"
        });
    })
    .catch(err => {
        swal({
            title: "Error",
            text: "No se pudo modificar el post",
            icon: "error",
            button: "Aceptar",
            timer: "4000"
        });
    });
}

export const getPost = async (id, setExist) => {
    await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => {
            setExist(true);
        })
        .catch(err => {
            setExist(false);
        });
}
