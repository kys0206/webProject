import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
const { TextArea } = Input;

const Continents = [
    { key: 1, value: "강남구" },
    { key: 2, value: "강동구" },
    { key: 3, value: "강북구" },
    { key: 4, value: "강서구" },
    { key: 5, value: "관악구" },
    { key: 6, value: "광진구" },
    { key: 7, value: "구로구" },
    { key: 8, value: "금천구" },
    { key: 9, value: "노원구" },
    { key: 10, value: "도봉구" },
    { key: 11, value: "동대문구" },
    { key: 12, value: "동작구" },
    { key: 13, value: "마포구" },
    { key: 14, value: "서대문구" },
    { key: 15, value: "서초구" },
    { key: 16, value: "성동구" },
    { key: 17, value: "성북구" },
    { key: 18, value: "송파구" },
    { key: 19, value: "양천구" },
    { key: 20, value: "영등포구" },
    { key: 21, value: "용산구" },
    { key: 22, value: "은평구" },
    { key: 23, value: "종로구" },
    { key: 24, value: "중구" },
    { key: 25, value: "중랑구" }
]

const Places = [
    { key: 1, value: "문화시설" },
    { key: 2, value: "관광지" },
    { key: 3, value: "레포츠" },
    { key: 4, value: "카페" },
    { key: 5, value: "음식" },
    { key: 6, value: "자연" },
    { key: 7, value: "공원" },
    { key: 8, value: "체험" }
]

function UploadPopularPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Address, setAddress] = useState("")
    const [Friend, setFriend] = useState("")
    const [Place, setPlace] = useState(1)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const addressChangeHandler = (event) => {
        setAddress(event.currentTarget.value)
    }

    const friendChangeHandler = (event) => {
         setFriend(event.currentTarget.value)
     }

    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const placeChangeHandler = (event) => {
        setPlace(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Place || !Address || !Friend || !Continent || Images.length === 0) {
            return alert(" 모든 값을 입력해주세요.")
        }

        //서버에 채운 값들을 request로 보낸다.
        const body = {
            //로그인 된 사람의 ID 
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            address: Address,
            friend: Friend,
            images: Images,
            continents: Continent,
            places: Place
        }

        Axios.post('/api/popular', body)
            .then(response => {
                if (response.data.success) {
                    alert('인기 여행지 업로드에 성공 했습니다.')
                    props.history.push('/')
                } else {
                    alert('인기 여행지에 실패 했습니다.')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2><b> 인기 여행지 업로드 </b></h2>
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label><b>이름</b></label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label><b>설명</b></label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label><b>주소</b></label>
                <Input onChange={addressChangeHandler} value={Address} />
                <br />
                <br />
                <label><b>동반자 유형</b></label>
                <label> ex) 가족, 친구, 연인등</label>
                <Input onChange={friendChangeHandler} value={Friend} />
                <br />
                <br />
                <label><b>유형 &nbsp;&nbsp;</b></label>
                <select onChange={placeChangeHandler} value={Place}>
                    {Places.map(item => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                {/* <label>가격($)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br /> */}
                <br />
                <label><b>여행지 지역(구) &nbsp;&nbsp;</b></label>
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit">
                    확인
                </button>
            </Form>

        </div>
    )
}

export default UploadPopularPage