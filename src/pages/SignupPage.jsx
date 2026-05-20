import './SignupPage.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function SignupPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [dept, setDept] = useState('');


  
  // 회원가입 버튼 클릭 시 서버에 데이터 전송, 성공 시 로그인 페이지로 이동
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://kikoky.duckdns.org:8000/accounts/register/",
        { login_id: id, name: username, password, email, role, department: dept }
      );
      
      navigate('/login');


    } catch (error) {
      // 서버가 보낸 실제 오류 내용 출력
      console.error('회원가입 실패:', error.response?.data);
    }
  };




  return (
    <div className="SignupBox">
      <h1 className='SignupTitle'>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className='SignupForm'>

          <div className="usernamebox">
            <label htmlFor="username">사용자명</label>
            <input type="text" id="username" placeholder='사용자명'
              value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>



          <div className='passwordbox'>
            <label htmlFor="id">아이디</label>
            <input type="text" id="id" placeholder='아이디'
              value={id} onChange={(e) => setId(e.target.value)} />
          </div>



          <div className='passwordbox'>
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" placeholder='비밀번호'
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className='passwordbox'>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" placeholder='이메일 주소'
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className='passwordbox'>
            <label htmlFor="role">자격</label>
            <input type="text" id="role" placeholder='STUDENT/PROFESSOR'
              value={role} onChange={(e) => setRole(e.target.value)} />
          </div>

          <div className='passwordbox'>
            <label htmlFor="department">학과</label>
            <input type="text" id="department" placeholder='학과'
              value={dept} onChange={(e) => setDept(e.target.value)} />
          </div>

          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
