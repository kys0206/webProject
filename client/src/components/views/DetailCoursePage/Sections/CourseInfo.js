import React from 'react'
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

function PopularInfo(props) {
    const dispatch = useDispatch();


    const clickHandler = () => {
        //필요한 정보를 Cart 필드에다가 넣어 준다.
        dispatch(addToCart(props.detail._id))

    }

    return (
        <div>
            <Descriptions title="여행지 정보">
                <Descriptions.Item label="지역">{props.detail.continents}</Descriptions.Item>
                <Descriptions.Item label="분류">{props.detail.places}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="동반자 유형">{props.detail.friend}</Descriptions.Item>
                <Descriptions.Item label="주소">{props.detail.address}</Descriptions.Item>
                <br/>
                <Descriptions.Item label="설명">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    담기
                </Button>
                <Button size="large" shape="round" type="Light">
                    <a href="/Course">
                        목록
                    </a>
                </Button>
            </div>


        </div>
    )
}

export default PopularInfo