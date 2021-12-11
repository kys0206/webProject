import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd';
import axios from 'axios';
import CourseImage from './Sections/CourseImage';
import CourseInfo from './Sections/CourseInfo';
import Comment from './Sections/Comment';
import LikeDislikes from './Sections/LikeDislikes';
import HorizonLine from '../../utils/HorizontalLine';

function DetailCoursePage(props) {

    const courseId = props.match.params.courseId
    const variable = { courseId: courseId }

    const [Course, setCourse] = useState({})
    const [Comments, setComments] = useState([])

    useEffect(() => {
        axios.get(`/api/course/courses_by_id?id=${courseId}&type=single`)
            .then(response => {
                setCourse(response.data[0])
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

    if(Course) {
        console.log(Course)
        return(
            <div style={{ width: '100%', padding: '3rem 4rem' }}>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h3>{Course.title}</h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h7>{Course.address}</h7>
                </div>

                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <List.Item
                        actions={[ <LikeDislikes course userId={localStorage.getItem('userId')}
                                    courseId={courseId} /> ]}
                        >    
                    </List.Item>
                </div>
                <HorizonLine />
                <br />

                <Row gutter={[16, 16]} style={{ display: 'flex', justifyContent: 'center' }} >
                    <Col lg={7} sm={24}>
                        {/* CourseImage */}
                        <CourseImage detail={Course} />
                    </Col>
                </Row>
                <br/><br/>
                <Row gutter={[16, 16]} style={{ display: 'flex', justifyContent: 'center' }} >
                    <Col lg={12} sm={24}>
                        {/* CourseInfo */}
                        <CourseInfo detail={Course} />
                    </Col>
                </Row>
                <div>
                    {/* Comments */}
                    <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={courseId} />
                </div>
            </div>
        )
    } else {
        return (
            <div>...loading</div>
        )
    }
  
    
}

export default DetailCoursePage