let index = 1;
let attempts = 0; //Line Check
const correct = 'APPLE'; //정답

function appStart() {
  //타이머
  const TimerX = () => {
    const now = new Date();

    const setTime = () => {
      const currentNow = new Date();
      const flowTime = new Date(currentNow - now);
      const min = flowTime.getMinutes().toString().padStart(2, '0');
      const sec = flowTime.getSeconds().toString().padStart(2, '0');
      const timeH1 = document.querySelector('.Timer');
      timeH1.innerText = `Time: ${min}:${sec}`;
    };

    Timer = setInterval(setTime, 1000);
  };
  TimerX();

  //게임오버 display
  const displayGameover = () => {
    const div = document.createElement('div');
    div.innerText = '게임이 종료됐습니다.';
    div.style =
      'display:flex ; justify-content: center; align-items: center;  position: absolute;top: 40vh;left: 37vw; background-color: aqua;';
    document.body.appendChild(div);
  };
  // 게임오버
  const gameover = () => {
    window.removeEventListener('keydown', handleKeyDown);
    displayGameover();
  };
  // 다음 줄 넘어가기
  const nextline = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 1;
  };

  //엔터 키
  const enterKey = () => {
    let c_num = 0; // 맞은개수
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board_block[data-index='${attempts}${i + 1}']`
      );
      const inWord = block.innerText;
      const C_Word = correct[i];
      console.log('입력한 글자:', C_Word, '정답글자:', inWord);
      if (inWord === C_Word) {
        block.style.background = 'tomato';
        c_num += 1;
      } else if (correct.includes(C_Word)) block.style.background = 'red';
    }
    if (c_num === 5) gameover();
    else nextline();
  };
  //백스페이스 키
  const BackSpaceKey = () => {
    if (index > 1) {
      const preBlock = document.querySelector(
        `.board_block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = '';
    }
    if (index !== 1) index -= 1;
  };
  // 키인식
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const this_block = document.querySelector(
      `.board_block[data-index='${attempts}${index}']`
    );

    if (event.key === 'Backspace') BackSpaceKey();
    else if (index === 6) {
      if (event.key === 'Enter') enterKey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      this_block.innerText = key;
      index += 1;
    }
  };
  window.addEventListener('keydown', handleKeyDown);
}

appStart();
