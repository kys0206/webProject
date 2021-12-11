import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';

const { Title } = Typography

function MyPage(user) {

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={3} > 마이페이지 </Title>
            <hr/>

            <div>
                유저가 작성한 게시물 목록
            </div>
                
        </div>
    )
}

export default MyPage
