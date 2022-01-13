// 1. 이벤트 위임
// 2. 요구사항을 전략적으로 접근, 단계별 세세하게 나누기
// 3. DOM 요소 가져올 때는 $표시를 써서 변수처럼 사용
// 4. 새롭게 알게 된 메서드 innerText, innerHTML, insertAdjacentHtml, closest, e.target

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  },
};

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명(갯수)
  this.menu = [];

  // 메뉴 카운트 function
  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };
  // esspressonMenuName 추가하는 function
  const addMenuName = () => {
    const espressoMenuName = $('#espresso-menu-name').value;
    this.menu.push({name: espressoMenuName});
    const template = this.menu.map((item) => {
      return `<li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${item.name}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
        </li>`;
    }).join("");
    if (!($('#espresso-menu-name').value === '')) {
      
      $('#espresso-menu-list').insertHTML('beforeend', menuItemTemplate(espressoMenuName));
    } else {
      alert('메뉴를 입력해주세요!');
    }
    // 총 *개
    // const 변수 = li 갯수를 카운팅해서
    updateMenuCount();
    // input을 빈 값으로 초기화
    $('#espresso-menu-name').value = '';
    // input값이 빈값이면 추가 안되게
  };
  // 메뉴 수정하는 function
  const updateMenuName = (e) => {
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요', $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  };
  // 메뉴 삭제하는 function
  const removeMenuName = (e) => {
    if (confirm('메뉴를 삭제하시겠습니까?')) {
      e.target.closest('li').remove();
      updateMenuCount();
    }
  };

  //  form 태그가 자동으로 전송되는걸 막아준다.
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });
  // 확인 버튼으로 메뉴의 이름을 입력 받음
  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);
  // 엔터키로 메뉴의 이름을 입력 받음
  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addMenuName();
    }
  });
  // 메뉴 수정&삭제
  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    } else if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });
}
App(); //  App이라는 Function을 실행시킨다.

