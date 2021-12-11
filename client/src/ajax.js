// XHR 객체 생성
let xhr = new XMLHttpRequest;
// 요청 초기화
xhr.open('GET', 'http://localhost:3000/boardWrite', true);

// XMLHttpRequest 처리가 완료되면 실행
xhr.onload = function()
	{
    	/*
            주로 사용되는 HTTP STATUS
            200 : OK
            404 : ERROR
            403 : FORBIDDEN
        */
    	if (this.status === 200)
        	{
            	console.log(JSON.parse(this.responseText));
            }
    }

// 요청을 전송. 
xhr.send();