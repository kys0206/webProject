import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import Axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const { TextArea } = Input;

function UploadBoard(props) {

    const [Title, setTitle] = useState("")
    const [Post, setPost] = useState("")

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const postChangeHandler = (event) => {
        setPost(event.currentTarget.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Post === 0) {
            return alert(" 모든 값을 입력해주세요.")
        }

        //서버에 채운 값들을 request로 보낸다.
        const body = {
            //로그인 된 사람의 ID 
            writer: props.user.userData._id,
            title: Title,
            post: Post,
        }

        Axios.post('/api/board', body)
            .then(response => {
                if (response.data.success) {
                    alert('게시물 업로드에 성공 했습니다.')
                    props.history.push('/board')
                } else {
                    alert('게시물에 실패 했습니다.')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2><b> 게시판 작성 </b></h2>
            </div>

            <Form onSubmit={submitHandler}>
                <br />
                <br />
                <label><b>제목</b></label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label><b>내용</b></label>
                <TextArea onChange={postChangeHandler} value={Post} style={{ height: '500px' }}/>
                <br />
                <br />
                <button type="submit" >
                    확인
                </button>
            </Form>

        </div>
    )
}

export default UploadBoard