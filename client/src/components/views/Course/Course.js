import React, { useEffect, useState } from 'react'
import { Icon, Col, Card, Row, List, Avatar } from 'antd';
import axios from "axios";
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import Checkbox2 from './Sections/CheckBox2';
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { continents, places } from './Sections/Datas';
import MultiSlider from './Sections/MultiSlider';

function Course() {

    const [Courses, setCourses] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        places: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getCourses(body)

    }, [])

    const getCourses = (body) => {
        axios.post('/api/course/courses', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setCourses([...Courses, ...response.data.courseInfo])
                    } else {
                        setCourses(response.data.courseInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 여행지 코스를 가져오는데 실패 했습니다.")
                }
            })
    }

    const loadMoreHanlder = () => {

        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }

        getCourses(body)
        setSkip(skip)
    }


    const renderCards = Courses.map((course, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<a href={`/course/${course._id}`} ><ImageSlider images={course.images} /></a>}
            >
                <Meta
                    title={course.title}
                    description={course.address}
                />
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getCourses(body)
        setSkip(0)

    }

    const handlePlaces = (value) => {
        const data = places;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log('filters', filters)

        if (category === "places") {
            let placesValues = handlePlaces(filters)
            newFilters[category] = placesValues
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getCourses(body)

    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h4><b>여러분이 직접 만든 코스를 소개합니다! <Icon type="rocket" /> </b></h4>
            </div>
            <br/>
            <a href="/course/upload" class="btn write"
                style={{
                    listStyle: 'none', 
                    position: 'relative', 
                    top: '-20px' , 
                    left: '93%', 
                    fontSize: '15px',
                    textDecoration: 'none',
                    color: 'white',
                    padding: '10px 20px 10px 20px',
                    margin: '20px',
                    display: 'inline-block',
                    borderRadius: '10px',
                    transition: 'all 0.1s',
                    textShadow: '0px -2px rgba(0, 0, 0, 0.44',
                    backgroundColor: '#1f75d9',
                    borderBottom: '5px solid #165195'
                }}>
                <b>작성하기</b>
            </a>
            <br/>
            <div>
                <h5 style={{ textAlign: 'center', color: '#5f9ea0' }}><b> 이달의 인기 코스 </b></h5>
                <br/>
                <MultiSlider />
            </div>

            <br/><br/><br/>

            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <Checkbox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <Checkbox2 list={places} handleFilters={filters => handleFilters(filters, "places")} />
                </Col>
            </Row>

            {/* Search */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature 
                    refreshFunction={updateSearchTerm}
                />
            </div>

            {/* Cards */}
            <Row gutter={[16, 16]} >
                {renderCards}
            </Row>
            <br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHanlder}>더보기</button>
                </div>
            }

        </div>
    )
}

export default Course