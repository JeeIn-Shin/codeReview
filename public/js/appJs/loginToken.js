// 쿠키에서 토큰을 가져오는 함수
function getTokenFromCookie() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('accessToken=')) {
      return cookie.substring('accessToken='.length);
    }
  }
  return null; // 토큰이 없을 경우 null 반환
}

const axios = require('axios');

// 쿠키에서 액세스 토큰의 존재 여부와 만료 여부 확인
const token = getTokenFromCookie();

if (token) {
  const decodedToken = parseJwt(token);
  // 만료 시간이 'exp' 필드에 저장되어 있다고 가정
  const expirationTime = decodedToken.exp;

  // 토큰이 만료되었는지 확인
  if (expirationTime <= Date.now()) {
    // 액세스 토큰이 만료되었으므로 서버에 새로운 토큰을 요청
    // 경로 수정하기
    axios
      .post('https://your-api-endpoint', {
        // 새로운 토큰을 요청하기 위해 필요한 데이터
        // 이름, 비밀번호 등등
      })
      .then((response) => {
        // const tokendata = response.data.token;
        // console.log('새로운 토큰:', tokendata);
        // 새 토큰 관련 일 있으면 추가
      })
      .catch((error) => {
        console.error('오류:', error.message);
      });
  }
}

// getUserInfo 함수
async function getUserInfo() {
  try {
    const token = getTokenFromCookie();
    if (!token) {
      throw new Error('쿠키에 토큰 없음');
    }

    // fetch 수정 해야함
    const response = await fetch('/api/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('사용자 정보를 가져오는 데 실패함');
    }

    const userInfo = await response.json();
    return userInfo;
  } catch (error) {
    console.error(error);
  }
}
