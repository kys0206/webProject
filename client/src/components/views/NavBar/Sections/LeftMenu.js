import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <div style={{ position: 'relative', left: '-15%', fontWeight: 'bold' }}>
      <Menu mode={props.mode}style={{ position: 'relative', left: '-22%'}}>
        <SubMenu title={<span>인기</span>} >
          <MenuItemGroup>
            <Menu.Item key="post">
              <a href="/popularDestinations"><b>인기</b></a>
            </Menu.Item>
            <Menu.Item key="course">
              <a href="/course"><b>코스</b></a>
            </Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      <Menu.Item key="video">
        <a href="/videoPage">영상</a>
      </Menu.Item>
      <Menu.Item key="map">
        <a href="/map">여행지 맵</a>
      </Menu.Item>
      <Menu.Item key="board">
        <a href="/">자유게시판</a>
      </Menu.Item>
    </Menu>
    </div>
    
  )
}

export default LeftMenu