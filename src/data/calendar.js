// 요일 이름 목록
export const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];




// startDay부터 endDay까지 날짜 주 단위 배열로 묶어 반환
export const groupDatesByWeek = (startDay, endDay) => {

  const weeks = []; // 결과 배열
  let currentWeek = []; // 현재 주에 속한 날짜들을 담는 임시 배열
  let currentDate = new Date(startDay); // startDay부터 시작


  while (currentDate <= endDay) {

    currentWeek.push(new Date(currentDate));

    if (currentWeek.length === 7 || currentDate.getDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }


  if (currentWeek.length > 0) weeks.push(currentWeek);


  return weeks;
};
