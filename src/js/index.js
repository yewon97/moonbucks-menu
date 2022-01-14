// 1. 이벤트 위임
// 2. 요구사항을 전략적으로 접근, 단계별 세세하게 나누기
// 3. DOM 요소 가져올 때는 $표시를 써서 변수처럼 사용
// 4. 새롭게 알게 된 메서드 innerText, innerHTML, insertAdjacentHtml, closest, e.target
// 5. 상태값의 중요성

const $ = (selector) => document.querySelector(selector);

function App() {
  // form 태그가 자동으로 전송되는걸 막아줌
  $("#espresso-menu-form").addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // 메뉴의 이름을 입련받는건
  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      console.log(document.querySelector('#espresso-menu-name').value);
    }
  });
}

App();
