import React, { useState } from 'react'
import styled from 'styled-components'
import CloseIcon from '@material-ui/icons/Close';
import {EditOutlined} from '@material-ui/icons';
import { Modal } from '@material-ui/core';

const Post = ({post}) => {

    const [open, setOpen] = useState(false);

    const remove = () => {
        console.log('remove');
    }

    const edit = () => {
        console.log('edit');
    }

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <>
            <Card>
                <p onClick={handleOpen}>{post.title}</p>
                
                <Options>
                    <CloseIcon onClick={remove} />
                    
                    <EditOutlined onClick={edit} />
                </Options>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
            >
                    <ModalStyle >
                        <h4>{post.title}</h4>
                        <p>
                            {post.body}
                        </p>
                    </ModalStyle>
            </Modal>
        </>
    )
}

const Card = styled.div`
    position: relative;
    padding: 20px;
    border-bottom: 1px solid #323232;

    &:hover {
        background-color: #454545;
        color: white;
        cursor: pointer;
    }
`;

const Options = styled.div`
    display: flex;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 999;
`;

const ModalStyle = styled.div`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    position: absolute;
    width: 400;
    background-color: white;
    border: 1px solid #000;
    padding: 25px;

    h4 {
        text-align: center;
    }

    p {
        margin-top: 15px;
    }
`;

export default Post
