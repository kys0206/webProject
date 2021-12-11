import React from 'react'
import "./UserCardBlock.css"
function UserCardBlock(props) {

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () => (
        props.populars && props.populars.map((popular, index) => (
            <tr key={index}>
                <td>
                    <img style={{ width: '170px' }} alt="popular"
                        src={renderCartImage(popular.images)} />
                </td>
                <td>
                    {popular.continents} 
                </td>
                <td>
                    {popular.places}
                </td>
                <td>
                    <button onClick={() => props.removeItem(popular._id)}>
                        삭제 
                    </button>
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>여행지 사진</th>
                        <th>여행지 지역</th>
                        <th>여행지 분류</th>
                        <th>여행지 삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock