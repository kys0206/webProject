import React, {useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Typography } from 'antd';
import Axios from 'axios';
import MapContainer from './Sections/MapContainer';

const { Title } = Typography

function Map() {

    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')

    const onChange = (e) => {
        setInputText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPlace(InputText)
        setInputText('')
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={3} > 여행지 맵 </Title>
            <hr/>

            <>
                <form className="inputForm" onSubmit={handleSubmit} 
                    style={{ position: 'relative', top: '25px', left: '650px'   }}>
                    <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} 
                            style={{ width: '180px', height: '30px'}}/>
                    <button type="submit" style={{height: '30px'}}>검색</button>
                </form>
                <MapContainer searchPlace={Place} />
            </>
                
        </div>
    )
}

export default Map
