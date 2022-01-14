// 1. 이벤트 위임
// 2. 요구사항을 전략적으로 접근, 단계별 세세하게 나누기
// 3. DOM 요소 가져올 때는 $표시를 써서 변수처럼 사용
// 4. 새롭게 알게 된 메서드 innerText, innerHTML, insertAdjacentHtml, closest, e.target
// 5. 상태값의 중요성

const $ = (selector) => document.querySelector(selector);

function App() {
  // 이벤트 위임하기 - e.target
  $('#espresso-menu-list').addEventListener('click', (e) => {
    if(e.target.classList.contains('menu-edit-button')) {
      const $menuName = e.target.closest("li").querySelector(".menu-name");
      const updatedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText);
      $menuName.innerText = updatedMenuName;
    }
  })

  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

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
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
    $('#espresso-menu-name').value = '';
  };

  $('#espresso-menu-submit-button').addEventListener('click', () => addMenuName());

  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuName();
  });
}

App();
