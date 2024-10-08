import React, { useState } from 'react'
import { button, Input } from 'antd';
import Axios from 'axios'
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { textArea } = Input;

function Comment(props) {
    const videoId = props.postId;

    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("")

    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id, //redux에서 정보를 가져오는 방법 
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data.result)
                    setcommentValue("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('커멘트를 저장하지 못했습니다.')
                }
            })
    }

    return (
        <div>
            <br />
            <p> 댓글 </p>
            <hr />

            { /* Comment Lists */}

            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} />
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists} />
                    </React.Fragment>
                )
            ))}


            { /* Root Comment Form */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={ handleClick }
                    value={ commentValue }
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={ onSubmit } > 등록 </button>
            </form>
        </div>
    )
}

export default Comment