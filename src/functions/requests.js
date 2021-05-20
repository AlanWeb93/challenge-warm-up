import axios from 'axios';

export const getPosts = async (setPosts) => {
    await axios.get(' https://jsonplaceholder.typicode.com/posts')
        .then(res => setPosts(res.data));

}