import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './BoardPage.css';

function BoardPage() {

    const [boardList, setboardList] = useState([]);

	useEffect(() => {
		axios.post('/api/board/boards')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.boards)
                    setboardList([response.data.boards])
                } else {
                    alert(" 게시물을 가져오는데 실패 했습니다.")
                }
            });
	}, []);

    return (
		<div className="container m-auto is-max-desktop">
            <br/><br/><br/><br/>
            <a href="/board/upload" style={{listStyle: 'none', position: 'relative', 
                                top: '-20px' , left: '93%', fontSize: '15px'}}>작성하기</a>
			<table className="board-table">
				<thead>
					<tr>
						<th className="h-board-id">글 번호</th>
						<th className="h-board-title">제목</th>
						<th className="h-board-writer">작성자</th>
						<th className="h-board-date">작성 시간</th>
						<th className="h-board-views">조회수</th>
					</tr>
				</thead>
				<tbody className="board-list">
					{boardList.map((boards, index) => {
						return (
							<tr key={boards.boardId}>
								<td className="board-id" style={{ textAlign: 'center' }}>{boards.boardId}</td>
								<td className="board-title" style={{ textAlign: 'center' }}>
									<Link to={`/board/${boards.boardId}`}>{boards.title}</Link>
								</td>
								<td className="board-writer">{boards.userId}</td>
								<td className="board-date" style={{ textAlign: 'center' }}>{moment(boards.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
								<td className="board-views" style={{ textAlign: 'center' }}>{boards.viewCounts}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default BoardPage
