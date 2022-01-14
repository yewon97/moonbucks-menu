const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    // JSON.stringify() -> 값이나 객체를 JSON 문자열로 변환
    localStorage.setItem('menu', JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem('menu');
  },
};

function App() {
  // 상태(변하는 데이터, 이 앱에서 변하는 것이 무엇인가?) - 메뉴명 

  // 메뉴를 추가할 때
  const addMenuName = () => {
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요!');
      return;
    }
    const espressoMenuName = $('#espresso-menu-name').value;
    const menuItemTemplate = (espressoMenuName) => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
    };
    $('#espresso-menu-list').insertAdjacentHTML('beforeend', menuItemTemplate(espressoMenuName));
    updateMenuCount();
    $('#espresso-menu-name').value = '';
  };
  // 메뉴 개수 카운팅
  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
  };
  // 메뉴 수정 함수
  const updateMenuName = (e) => {
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  };
  // 메뉴 삭제 함수
  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      e.target.closest('li').remove();
      updateMenuCount();
    }
  };

  // 메뉴 수정할 때 & 메뉴 삭제 할 때
  $('#espresso-menu-list').addEventListener('click', (e) => {
    // 메뉴 수정
    if (e.target.classList.contains('menu-edit-button')) {
      updateMenuName(e);
    }
    // 메뉴 삭제
    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuName(e);
    }
  });

  // form태그 새로고침 막아주는 것
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // 확인 버튼을 눌렀을 때
  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

  // 엔터키를 눌렀을 때
  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuName();
  });
}

App();
