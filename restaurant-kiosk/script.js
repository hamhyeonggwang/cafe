// 전역 변수
let selectedOrderType = '';
let selectedFood = null;
let selectedOptions = {
    spiciness: '',
    sauce: '',
    side: ''
};
let quantity = 1;
let cart = [];

// DOM 요소들
const orderButtons = document.querySelectorAll('.order-btn');
const menuItems = document.querySelectorAll('.menu-item');
const optionButtons = document.querySelectorAll('.option-btn');
const optionsSection = document.getElementById('optionsSection');
const quantitySpan = document.getElementById('quantity');
const minusBtn = document.getElementById('minusBtn');
const plusBtn = document.getElementById('plusBtn');
const addToCartBtn = document.getElementById('addToCartBtn');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const orderCompleteBtn = document.getElementById('orderCompleteBtn');

// 주문 방식 선택
orderButtons.forEach(button => {
    button.addEventListener('click', function() {
        // 이전 선택 해제
        orderButtons.forEach(btn => btn.classList.remove('selected'));
        
        // 현재 버튼 선택
        this.classList.add('selected');
        selectedOrderType = this.dataset.type;
        
        // 음성 피드백
        speak(`주문 방식이 ${selectedOrderType}로 선택되었습니다.`);
        
        console.log('주문 방식 선택:', selectedOrderType);
    });
});

// 음식 선택
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // 이전 선택 해제
        menuItems.forEach(menuItem => menuItem.classList.remove('selected'));
        
        // 현재 아이템 선택
        this.classList.add('selected');
        selectedFood = {
            name: this.dataset.food,
            basePrice: parseInt(this.dataset.price)
        };
        
        // 옵션 섹션 표시
        optionsSection.style.display = 'block';
        
        // 음성 피드백
        speak(`${selectedFood.name}가 선택되었습니다. 옵션을 선택해주세요.`);
        
        console.log('음식 선택:', selectedFood);
    });
});

// 옵션 선택
optionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const option = this.dataset.option;
        const optionType = this.closest('.option-group').querySelector('h3').textContent;
        
        // 같은 그룹의 다른 버튼들 선택 해제
        const buttonGroup = this.closest('.button-group');
        buttonGroup.querySelectorAll('.option-btn').forEach(btn => {
            if (btn !== this) {
                btn.classList.remove('selected');
            }
        });
        
        // 현재 버튼 선택
        this.classList.add('selected');
        
        // 옵션 저장
        if (optionType.includes('매운 정도')) {
            selectedOptions.spiciness = option;
        } else if (optionType.includes('소스')) {
            selectedOptions.sauce = option;
        } else if (optionType.includes('사이드 메뉴')) {
            selectedOptions.side = option;
        }
        
        // 음성 피드백
        speak(`${option}이 선택되었습니다.`);
        
        console.log('옵션 선택:', selectedOptions);
    });
});

// 수량 조절
minusBtn.addEventListener('click', function() {
    if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
        speak(`수량이 ${quantity}개로 변경되었습니다.`);
    }
});

plusBtn.addEventListener('click', function() {
    if (quantity < 10) {
        quantity++;
        quantitySpan.textContent = quantity;
        speak(`수량이 ${quantity}개로 변경되었습니다.`);
    }
});

// 장바구니에 추가
addToCartBtn.addEventListener('click', function() {
    if (!selectedOrderType) {
        alert('주문 방식을 선택해주세요.');
        speak('주문 방식을 먼저 선택해주세요.');
        return;
    }
    
    if (!selectedFood) {
        alert('음식을 선택해주세요.');
        speak('음식을 먼저 선택해주세요.');
        return;
    }
    
    if (!selectedOptions.spiciness) {
        alert('매운 정도를 선택해주세요.');
        speak('매운 정도를 선택해주세요.');
        return;
    }
    
    // 가격 계산
    let totalItemPrice = selectedFood.basePrice;
    
    // 사이드 메뉴 추가 가격
    if (selectedOptions.side === '김치') {
        totalItemPrice += 500;
    } else if (selectedOptions.side === '단무지') {
        totalItemPrice += 300;
    } else if (selectedOptions.side === '콜라') {
        totalItemPrice += 1000;
    }
    
    // 장바구니에 추가
    const cartItem = {
        orderType: selectedOrderType,
        food: selectedFood.name,
        spiciness: selectedOptions.spiciness,
        sauce: selectedOptions.sauce,
        side: selectedOptions.side,
        quantity: quantity,
        price: totalItemPrice * quantity
    };
    
    cart.push(cartItem);
    
    // UI 업데이트
    updateCartDisplay();
    
    // 선택 초기화
    resetSelections();
    
    // 음성 피드백
    speak(`${selectedFood.name} ${quantity}개가 장바구니에 추가되었습니다.`);
    
    console.log('장바구니에 추가:', cartItem);
});

// 장바구니 표시 업데이트
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        
        cartItemDiv.innerHTML = `
            <h4>${item.food} ${item.quantity}개</h4>
            <p>주문방식: ${item.orderType}</p>
            <p>매운 정도: ${item.spiciness}</p>
            <p>소스: ${item.sauce}</p>
            ${item.side !== '사이드없음' ? `<p>사이드: ${item.side}</p>` : ''}
            <p class="price">${item.price.toLocaleString()}원</p>
            <button onclick="removeFromCart(${index})" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; margin-top: 10px;">삭제</button>
        `;
        
        cartItems.appendChild(cartItemDiv);
        total += item.price;
    });
    
    totalPrice.textContent = total.toLocaleString() + '원';
}

// 장바구니에서 삭제
function removeFromCart(index) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    updateCartDisplay();
    speak(`${removedItem.food}가 장바구니에서 삭제되었습니다.`);
}

// 선택 초기화
function resetSelections() {
    // 음식 선택 해제
    menuItems.forEach(item => item.classList.remove('selected'));
    selectedFood = null;
    
    // 옵션 선택 해제
    optionButtons.forEach(btn => btn.classList.remove('selected'));
    selectedOptions = {
        spiciness: '',
        sauce: '',
        side: ''
    };
    
    // 수량 초기화
    quantity = 1;
    quantitySpan.textContent = quantity;
    
    // 옵션 섹션 숨기기
    optionsSection.style.display = 'none';
}

// 주문 완료
orderCompleteBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다.');
        speak('장바구니가 비어있습니다.');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const orderSummary = cart.map(item => 
        `${item.food} ${item.quantity}개 (${item.spiciness}, ${item.sauce})`
    ).join('\n');
    
    const orderMessage = `
주문이 완료되었습니다!

주문 내역:
${orderSummary}

총 금액: ${total.toLocaleString()}원

감사합니다! 😊
    `;
    
    alert(orderMessage);
    speak('주문이 완료되었습니다. 감사합니다!');
    
    // 훈련 완료 기록
    if (typeof completeTraining === 'function') {
        completeTraining('식당 훈련');
    }
    
    // 장바구니 초기화
    cart = [];
    updateCartDisplay();
    
    // 모든 선택 초기화
    orderButtons.forEach(btn => btn.classList.remove('selected'));
    selectedOrderType = '';
    resetSelections();
    
    console.log('주문 완료');
});

// 대시보드로 돌아가기
function goBack() {
    speak('대시보드로 돌아갑니다.');
    window.location.href = '../index.html';
}

// 음성 피드백 함수 (Web Speech API 사용)
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        speechSynthesis.speak(utterance);
    }
}

// 키보드 접근성 개선
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'Escape':
            resetSelections();
            speak('선택이 취소되었습니다.');
            break;
        case 'Enter':
            if (document.activeElement.classList.contains('menu-item')) {
                document.activeElement.click();
            }
            break;
    }
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    speak('식당 키오스크에 오신 것을 환영합니다. 주문 방식을 선택해주세요.');
    console.log('식당 키오스크 초기화 완료');
});

// 터치 이벤트 개선 (모바일)
document.addEventListener('touchstart', function() {}, {passive: true});

// 로딩 완료 메시지
console.log('식당 키오스크 JavaScript 로드 완료'); 