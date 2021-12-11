import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';
import ImageSlider from '../../utils/ImageSlider';
import Slider from './Sections/SimpleSlider';

const { Title } = Typography
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([])
    const [Populars, setPopulars] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success) {
                setVideo(response.data.videos)
            } else {
                alert('비디오 가져오기를 실패했습니다.')
            }
        })

    }, [])

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getPopulars(body)

    }, [])

    const getPopulars = (body) => {
        Axios.post('/api/popular/populars', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setPopulars([...Populars, ...response.data.popularInfo])
                    } else {
                        setPopulars(response.data.popularInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 인기 여행지를 가져오는데 실패 했습니다.")
                }
            })
    }

    const renderCard = Populars.map((popular, index) => {
        /* lg: 썸네일 크기 md: 화면이 작아졌을때 크기 xs: 화면이 제일 작아졌을때 크기 */
        return <Col lg={6} md={8} xs={24} key={index}> 
            <Card
                cover={<a href={`/popular/${popular._id}`} ><ImageSlider images={popular.images} /></a>}
            >
                <Meta
                    title={popular.title}
                    description={popular.address}
                />
            </Card>
        </Col>
    })

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative'}}>
                <a href={`/video/${video._id}`} >
                    <div style={{ position: 'relative' }}>
                        <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                        <div className="duration"
                            style={{
                                bottom: 0, right: 0, position: 'absolute', margin: '4px',
                                color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8,
                                padding: '2px 4px', borderRadius: '2px', letterSpacing: '0.5px', fontSize: '12px',
                                fontWeight: '500', lineHeight: '12px'
                            }}>
                            <span>{minutes} : {seconds}</span>
                        </div>
                    </div>
                </a>
            </div><br/>
            <Meta
                avatar= {
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name}</span><br/>
            <span style={{ marginLeft: '3rem' }}>{video.views} views</span> 
            - <span>{moment(video.createAt).format("MMMM Do YY")}</span>

        </Col>

    })

    return (
        <div>
            <div style={{ width: '85%', margin: '3rem auto' }}>
                <Slider />
            </div>

            <div>
                <br/>
            </div>

            <div style={{ width: '85%', margin: '3rem auto' }}>

                <Title level={3} > 인기 여행지 추천 </Title>
                <hr/>
                <a href="/PopularDestinations" style={{listStyle: 'none', position: 'relative', 
                                    top: '-45px' , left: '95%', fontSize: '15px'}}>더보기</a>
                
                <Row gutter={[32, 16]}>

                    {renderCard}

                </Row>
            </div>
            <div style={{ width: '85%', margin: '3rem auto' }}>
                <Title level={3} > 인기 여행지 영상 </Title>
                <hr/>
                <a href="/videoPage" style={{listStyle: 'none', position: 'relative', 
                                    top: '-45px' , left: '95%', fontSize: '15px'}}>더보기</a>
                <Row gutter={[32, 16]}>

                    {renderCards}

                </Row>
            </div>
            <br/><br/><br/>
        </div>

    )
}

export default LandingPage