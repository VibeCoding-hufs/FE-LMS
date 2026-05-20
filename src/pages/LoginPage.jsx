import { Link } from 'react-router-dom'
import './LoginPage.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginPage() {

  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');


  
  // 로그인 버튼 클릭 시 서버에 데이터 전송, 성공 시 메인 페이지로 이동
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://kikoky.duckdns.org:8000/accounts/login/",
        { login_id: id, password }
      );
      // 서버에서 받은 userID를 브라우저에 저장(이거 안배움 바이브코딩)
      localStorage.setItem('userID', response.data.userID);
      console.log('로그인 성공, userID:', response.data.userID);
      navigate('/');


    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };




  return (
    <div className="LoginBox">
      <h1 className='LoginTitle'>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div className='LoginForm'>
            <div className="userIDbox">
            <label className='userID' htmlFor="userID">아이디:&nbsp;&nbsp;</label>
            <input type="text" id="userID" placeholder='아이디'
              value={id} onChange={(e) => setId(e.target.value)} />
            </div>

            <div className='passwordbox'>
            <label className='password' htmlFor="password">비밀번호:&nbsp;&nbsp;</label>
            <input type="password" id="password" placeholder='비밀번호'
              value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="btnRow">
              <button type="submit">로그인</button>
              <Link to="/signup" className='signpBtn'>회원가입</Link>
            </div>
        </div>


      </form>
    </div>
  );
}

export default LoginPage;