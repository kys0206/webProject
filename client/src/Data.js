const board = [
    {
      "no": 1,
      "title": "강남구청 위넌",
      "content": "강남구청 위넌 스터디카페",
      "createDate": "2021-08-29",
      "writer": "홍길동",
      "readCount": 6
    },
    {
      "no": 2,
      "title": "압구정 로데오",
      "content": "압구정 로데오거리",
      "createDate": "2021-08-30",
      "writer": "김자바",
      "readCount": 5
    },
    {
      "no": 3,
      "title": "청담동 명품거리",
      "content": "청담동 명품거리",
      "createDate": "2021-08-31",
      "writer": "리액트",
      "readCount": 1
    },
    {
      "no": 4,
      "title": "사가정 육회본가",
      "content": "사가정 육회본가 꼬막비빔밥",
      "createDate": "2021-08-31",
      "writer": "토비",
      "readCount": 2
    },
    {
      "no": 5,
      "title": "강남구청 용우집",
      "content": "용우집에서 몬주한잔",
      "createDate": "2021-09-01",
      "writer": "사가정",
      "readCount": 4
    },
    {
      "no": 6,
      "title": "강남구청 위넌",
      "content": "강남구청 위넌 스터디카페",
      "createDate": "2021-08-29",
      "writer": "홍길동",
      "readCount": 6
    },
    {
      "no": 7,
      "title": "압구정 로데오",
      "content": "압구정 로데오거리",
      "createDate": "2021-08-30",
      "writer": "김자바",
      "readCount": 5
    },
    {
      "no": 8,
      "title": "청담동 명품거리",
      "content": "청담동 명품거리",
      "createDate": "2021-08-31",
      "writer": "리액트",
      "readCount": 1
    },
    {
      "no": 9,
      "title": "사가정 육회본가",
      "content": "사가정 육회본가 꼬막비빔밥",
      "createDate": "2021-08-31",
      "writer": "토비",
      "readCount": 2
    },
    {
      "no": 10,
      "title": "강남구청 용우집",
      "content": "용우집에서 몬주한잔",
      "createDate": "2021-09-01",
      "writer": "사가정",
      "readCount": 4
    },
    {
      "no": 11,
      "title": "압구정 로데오",
      "content": "압구정 로데오거리",
      "createDate": "2021-08-30",
      "writer": "김자바",
      "readCount": 5
    },
    {
      "no": 12,
      "title": "청담동 명품거리",
      "content": "청담동 명품거리",
      "createDate": "2021-08-31",
      "writer": "리액트",
      "readCount": 1
    },
    {
      "no": 13,
      "title": "사가정 육회본가",
      "content": "사가정 육회본가 꼬막비빔밥",
      "createDate": "2021-08-31",
      "writer": "토비",
      "readCount": 2
    },
    {
      "no": 14,
      "title": "강남구청 용우집",
      "content": "용우집에서 몬주한잔",
      "createDate": "2021-09-01",
      "writer": "사가정",
      "readCount": 4
    }
  ];
   
  const getBoardByNo = no => {
    const array = board.filter(x => x.no == no);
    if (array.length == 1) {
      return array[0];
    }
    return null;
  }
   
  export {
    board,
    getBoardByNo
  };