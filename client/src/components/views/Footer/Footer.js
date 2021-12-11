import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div>
            <div style={{
                height: '150px', display: 'flex',
                flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', fontSize:'1rem', backgroundColor: '#e2e2e2'
            }}>
                <br/>
                <pre style={{ fontSize: '14px', backgroundColor: '#e2e2e2' }}> 우)02225   서울특별시 중랑구 동일로92길   TEL : 010-1234-5678 </pre>
                <p> <b>서울여행 여긴어때?</b>  <Icon type="car" /></p>
            </div>
        </div>
        
    )
}

export default Footer
