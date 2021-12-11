import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd';
import axios from 'axios';
import PopularImage from './Sections/PopularImage';
import PopularInfo from './Sections/PopularInfo';
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';

function DetailPopularPage(props) {

    const popularId = props.match.params.popularId
    const variable = { popularId: popularId }

    const [Popular, setPopular] = useState({})
    const [Comments, setComments] = useState([])

    useEffect(() => {
        axios.get(`/api/popular/populars_by_id?id=${popularId}&type=single`)
            .then(response => {
                setPopular(response.data[0])
            })
            .catch(err => alert(err))

        axios.post('/api/comment/getComments', variable)
            .then(response => {
                if(response.data.success) {
                    setComments(response.data.comments)
                    console.log(response.data.comments)
                } else {
                    alert('코멘트 정보를 가져오는 것을 실패했습니다.')
                }
            })

    }, [])

    const refreshFunction = (newComment) => {
        //부모의 Comments state값을 업데이트하기위한 함수
        setComments(Comments.concat(newComment)); //자식들한테 값을 전달받아 Comments값 업데이트
    };  

    if(Popular) {
        console.log(Popular)
        return(
            <div style={{ width: '100%', padding: '3rem 4rem' }}>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h1>{Popular.title}</h1>
                </div>

                <br />

                <Row gutter={[16, 16]} >
                    <Col lg={12} sm={24}>
                        {/* PopularImage */}
                        <PopularImage detail={Popular} />
                    </Col>
                    <Col lg={12} sm={24}>
                        {/* PopularInfo */}
                        <PopularInfo detail={Popular} />
                    </Col>

                </Row>
                <div>
                    <List.Item
                        actions={[ <LikeDislikes popular userId={localStorage.getItem('userId')}
                                    popularId={popularId} /> ]}
                        >    
                    </List.Item>

                    {/* Comments */}
                    <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={popularId} />
                </div>
            </div>
        )
    } else {
        return (
            <div>...loading</div>
        )
    }
  
    
}

export default DetailPopularPage