import React from 'react';
import { FaHome, FaRegHeart, FaRoute, FaMap, FaClipboardList } from "react-icons/fa";

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FaHome />,
    cName: 'nav-text'
  },
  {
    title: '인기',
    path: '/popularDestinations',
    icon: <FaRegHeart />,
    cName: 'nav-text'
  },
  {
    title: '코스',
    path: '/Course',
    icon: <FaRoute />,
    cName: 'nav-text'
  },
  {
    title: '여행지맵',
    path: '/Map',
    icon: <FaMap />,
    cName: 'nav-text'
  },
  {
    title: '자유게시판',
    path: '/Board',
    icon: <FaClipboardList />,
    cName: 'nav-text'
  }
];