import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Checkbox from './Sections/CheckBox';
import Checkbox2 from './Sections/CheckBox2';
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { continents, places } from './Sections/Datas';

function PopularDestinations() {

    const [Populars, setPopulars] = useState([])
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

        getPopulars(body)

    }, [])

    const getPopulars = (body) => {
        axios.post('/api/popular/populars', body)
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

    const loadMoreHanlder = () => {

        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }

        getPopulars(body)
        setSkip(skip)
    }


    const renderCards = Populars.map((popular, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<a href={`/popular/${popular._id}`} ><ImageSlider images={popular.images} /></a>}
            >
                <Meta
                    title={popular.title}
                    description={popular.address}
                    friend={popular.friend}
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

        getPopulars(body)
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
        getPopulars(body)

    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>

            <div style={{ textAlign: 'center' }}>
                <h2>인기 여행지 추천 <Icon type="rocket" /> </h2>
            </div>
            <br/>
            <a href="/popular/upload" style={{listStyle: 'none', position: 'relative', 
                                top: '-20px' , left: '93%', fontSize: '15px'}}>작성하기</a>

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

export default PopularDestinations