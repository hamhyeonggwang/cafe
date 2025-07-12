// 전역 변수
let selectedOrderType = '';
let selectedDrink = null;
let selectedOptions = {
    temperature: '',
    size: '레귤러',
    extra: []
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

// 음료 선택
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // 이전 선택 해제
        menuItems.forEach(menuItem => menuItem.classList.remove('selected'));
        
        // 현재 아이템 선택
        this.classList.add('selected');
        selectedDrink = {
            name: this.dataset.drink,
            basePrice: parseInt(this.dataset.price)
        };
        
        // 옵션 섹션 표시
        optionsSection.style.display = 'block';
        
        // 음성 피드백
        speak(`${selectedDrink.name}가 선택되었습니다. 옵션을 선택해주세요.`);
        
        console.log('음료 선택:', selectedDrink);
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
        if (optionType.includes('온도')) {
            selectedOptions.temperature = option;
        } else if (optionType.includes('사이즈')) {
            selectedOptions.size = option;
        } else if (optionType.includes('추가 옵션')) {
            // 추가 옵션은 다중 선택 가능
            if (selectedOptions.extra.includes(option)) {
                selectedOptions.extra = selectedOptions.extra.filter(item => item !== option);
                this.classList.remove('selected');
            } else {
                selectedOptions.extra.push(option);
            }
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
    
    if (!selectedDrink) {
        alert('음료를 선택해주세요.');
        speak('음료를 먼저 선택해주세요.');
        return;
    }
    
    if (!selectedOptions.temperature) {
        alert('온도를 선택해주세요.');
        speak('온도를 선택해주세요.');
        return;
    }
    
    // 가격 계산
    let totalItemPrice = selectedDrink.basePrice;
    
    // 사이즈 추가 가격
    if (selectedOptions.size === '라지') {
        totalItemPrice += 500;
    } else if (selectedOptions.size === '엑스트라라지') {
        totalItemPrice += 1000;
    }
    
    // 추가 옵션 가격
    if (selectedOptions.extra.includes('디카페인')) {
        totalItemPrice += 500;
    }
    
    // 장바구니에 추가
    const cartItem = {
        orderType: selectedOrderType,
        drink: selectedDrink.name,
        temperature: selectedOptions.temperature,
        size: selectedOptions.size,
        extra: [...selectedOptions.extra],
        quantity: quantity,
        price: totalItemPrice * quantity
    };
    
    cart.push(cartItem);
    
    // UI 업데이트
    updateCartDisplay();
    
    // 선택 초기화
    resetSelections();
    
    // 음성 피드백
    speak(`${selectedDrink.name} ${quantity}개가 장바구니에 추가되었습니다.`);
    
    console.log('장바구니에 추가:', cartItem);
});

// 장바구니 표시 업데이트
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        
        const extraOptions = item.extra.length > 0 ? ` (${item.extra.join(', ')})` : '';
        
        cartItemDiv.innerHTML = `
            <h4>${item.drink} ${item.quantity}개</h4>
            <p>주문방식: ${item.orderType}</p>
            <p>온도: ${item.temperature}</p>
            <p>사이즈: ${item.size}</p>
            ${item.extra.length > 0 ? `<p>추가옵션: ${item.extra.join(', ')}</p>` : ''}
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
    speak(`${removedItem.drink}가 장바구니에서 삭제되었습니다.`);
}

// 선택 초기화
function resetSelections() {
    // 음료 선택 해제
    menuItems.forEach(item => item.classList.remove('selected'));
    selectedDrink = null;
    
    // 옵션 선택 해제
    optionButtons.forEach(btn => btn.classList.remove('selected'));
    selectedOptions = {
        temperature: '',
        size: '레귤러',
        extra: []
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
        `${item.drink} ${item.quantity}개 (${item.temperature}, ${item.size})`
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
    
    // 장바구니 초기화
    cart = [];
    updateCartDisplay();
    
    // 모든 선택 초기화
    orderButtons.forEach(btn => btn.classList.remove('selected'));
    selectedOrderType = '';
    resetSelections();
    
    console.log('주문 완료');
});

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
    speak('카페 키오스크에 오신 것을 환영합니다. 주문 방식을 선택해주세요.');
    console.log('카페 키오스크 초기화 완료');
});

// 터치 이벤트 개선 (모바일)
document.addEventListener('touchstart', function() {}, {passive: true});

// 로딩 완료 메시지
console.log('카페 키오스크 JavaScript 로드 완료'); 