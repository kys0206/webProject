import React, { useEffect, useState } from 'react'

const { kakao } = window

const MapContainer = ({ searchPlace }) => {

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  
  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var markers = []
    const container = document.getElementById('myMap')
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    }
    const map = new kakao.maps.Map(container, options)

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(searchPlace, placesSearchCB)

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
        }

        map.setBounds(bounds)
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination)
        setPlaces(data)
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(), i

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild)
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a')
        el.href = '#'
        el.innerHTML = i

        if (i === pagination.current) {
          el.className = 'on'
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }

        fragment.appendChild(el)
      }
      paginationEl.appendChild(fragment)
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '<br/>' + place.road_address_name + '<br/>' + place.phone + '</div>')
        infowindow.open(map, marker)
      })
    }
  }, [searchPlace])

  return (
    <div>
      <div
        id="myMap"
        style={{
          width: '600px',
          height: '500px',
        }}
      ></div>
      <div id="result-list" style={{position: 'relative', top: '-450px', left: '650px', 
                                    width: '40%', height: '500px', overflow: 'auto'}}>
        {Places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px', textAlign: 'center' }}>
            <span>{i + 1}</span>
            <div>
              <h4 style={{ fontWeight: 'bold' }}>장소명 : {item.place_name}</h4>
                {item.road_address_name ? (
                <div>
                  <span>도로명 주소 : {item.road_address_name}</span>
                  <br/>
                  <span>주소 : {item.address_name}</span>
                </div>
              ) : (
                <span>주소 : {item.address_name}</span>
              )}
              <span>전화번호 : {item.phone}</span>
            </div>
          </div>                                                     
        ))}
        <br/><br/>
        <div id="pagination" style={{ marginTop: '3rem', fontSize: '20px', textDecoration: 'none', 
                                        textAlign: 'center', margin: '0 10px', fontWeight: 'bold'}}></div>
      </div>
    </div>
  )
}

export default MapContainer