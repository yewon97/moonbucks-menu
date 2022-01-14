const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    // JSON.stringify() -> 값이나 객체를 JSON 문자열로 변환
    localStorage.setItem('menu', JSON.stringify(menu));
  },
  getLocalStorage() {
    // 배열을 순회할 수 있게 문자열을 JSON.parse을 이용해 객체로 바꿔줌
    return JSON.parse(localStorage.getItem('menu'));
  },
};

function App() {
  // 상태(변하는 데이터, 이 앱에서 변하는 것이 무엇인가?) - 메뉴명
  this.menu = [];

  // App이라는 함수가 인스턴스로 생성이 될 때 로컬스토리지 안에 있는 것을 불러오면 좋을 것 같음
  // App이 생성될 때 실행을 하기 위해서 초기화 한다는 말의 init 메서드를 생성
  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
    }
    render();
  };

  // 데이터 그려주는 로직 (재사용)
  const render = () => {
    const template = this.menu
      .map((item, index) => {
        return `
      <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
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
      })
      .join('');
    $('#espresso-menu-list').innerHTML = template;
    updateMenuCount();
  };

  // 메뉴 개수 카운팅
  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').innerText = `총 ${menuCount} 개`;
  };
  // 메뉴를 추가할 때
  const addMenuName = () => {
    if ($('#espresso-menu-name').value === '') {
      alert('값을 입력해주세요!');
      return;
    }
    const espressoMenuName = $('#espresso-menu-name').value;
    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    render();
    $('#espresso-menu-name').value = '';
  };
  // 메뉴 수정 함수
  const updateMenuName = (e) => {
    // data-menu-id 속성을 이용해서 값을 가져올 수 있음
    const menuId = e.target.closest('li').dataset.menuId;
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText);
    this.menu[menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };
  // 메뉴 삭제 함수
  const removeMenuName = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const menuId = e.target.closest('li').dataset.menuId;
      this.menu.splice(menuId, 1); // index:menuId인 것 1개만 삭제한다.
      store.setLocalStorage(this.menu); // localStorage 업데이트해주기
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

  // 카테고리별 메뉴판 관리하기
  $('nav').addEventListener('click', (e) => {
    // 예외처리
    // nav에 이벤트리스너를 적용했기 때문에 카테고리 사이 빈칸을 눌러도 이벤트가 실행됨
    const isCategoryButton = e.target.classList.contains('cafe-category-name');
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      // console.log(categoryName);
    }
  });
}

// new 키워드를 사용하여 생성자 함수를 호출하게 되면 이때의 this는 "만들어질 객체"를 참조한다.
const app = new App();
// 인스턴스가 생성이되고, app.init()이 실행되면서 로컬스토리지에 있는 값을 불러옴
app.init();
