// 전역 변수
let selectedOrderType = '';
let selectedFood = null;
let quantity = 1;
let cart = [];

// DOM 요소들
const orderButtons = document.querySelectorAll('.order-btn');
const menuItems = document.querySelectorAll('.menu-item');
const quantitySection = document.getElementById('quantitySection');
const quantitySpan = document.getElementById('quantity');
const minusBtn = document.getElementById('minusBtn');
const plusBtn = document.getElementById('plusBtn');
const addToCartBtn = document.getElementById('addToCartBtn');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const orderCompleteBtn = document.getElementById('orderCompleteBtn');

// 결제 관련 DOM 요소들
const paymentSection = document.getElementById('paymentSection');
const paymentOptions = document.querySelectorAll('.payment-option');
const paymentAmount = document.getElementById('paymentAmount');
const processPaymentBtn = document.getElementById('processPaymentBtn');
const paymentCompleteSection = document.getElementById('paymentCompleteSection');
const paymentAnimation = document.querySelector('.payment-animation');
const paymentSuccess = document.querySelector('.payment-success');
const orderNumber = document.getElementById('orderNumber');

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
            basePrice: parseInt(this.dataset.price),
            isSet: this.dataset.set === 'true'
        };
        
        // 수량 섹션 표시
        quantitySection.style.display = 'block';
        
        // 음성 피드백
        speak(`${selectedFood.name}가 선택되었습니다. 수량을 선택해주세요.`);
        
        console.log('음식 선택:', selectedFood);
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
    
    // 장바구니에 추가
    const cartItem = {
        orderType: selectedOrderType,
        food: selectedFood.name,
        quantity: quantity,
        price: selectedFood.basePrice * quantity,
        isSet: selectedFood.isSet
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
        
        const setBadge = item.isSet ? '<span style="background: #f39c12; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; margin-left: 10px;">세트</span>' : '';
        
        cartItemDiv.innerHTML = `
            <h4>${item.food} ${item.quantity}개 ${setBadge}</h4>
            <p>주문방식: ${item.orderType}</p>
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
    
    // 수량 초기화
    quantity = 1;
    quantitySpan.textContent = quantity;
    
    // 수량 섹션 숨기기
    quantitySection.style.display = 'none';
}

// 주문 완료 - 결제 화면으로 이동
orderCompleteBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다.');
        speak('장바구니가 비어있습니다.');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    paymentAmount.textContent = total.toLocaleString() + '원';
    
    // 결제 화면 표시
    paymentSection.style.display = 'block';
    speak('결제 방법을 선택해주세요.');
    
    console.log('결제 화면 표시');
});

// 결제 방법 선택
paymentOptions.forEach(option => {
    option.addEventListener('click', function() {
        // 이전 선택 해제
        paymentOptions.forEach(opt => opt.classList.remove('selected'));
        
        // 현재 선택
        this.classList.add('selected');
        const selectedMethod = this.dataset.method;
        
        // 결제하기 버튼 표시
        processPaymentBtn.style.display = 'inline-block';
        
        const methodText = selectedMethod === 'card' ? '카드결제' : '모바일쿠폰결제';
        speak(`${methodText}가 선택되었습니다.`);
        
        console.log('결제 방법 선택:', selectedMethod);
    });
});

// 결제 처리
processPaymentBtn.addEventListener('click', function() {
    const selectedPayment = document.querySelector('.payment-option.selected');
    if (!selectedPayment) {
        alert('결제 방법을 선택해주세요.');
        speak('결제 방법을 선택해주세요.');
        return;
    }
    
    // 결제 화면 숨기기
    paymentSection.style.display = 'none';
    
    // 결제 완료 화면 표시
    paymentCompleteSection.style.display = 'block';
    paymentAnimation.style.display = 'block';
    paymentSuccess.style.display = 'none';
    
    speak('결제를 처리하고 있습니다.');
    
    // 3초 후 결제 완료 표시
    setTimeout(() => {
        paymentAnimation.style.display = 'none';
        paymentSuccess.style.display = 'block';
        
        // 주문번호 생성 (현재 시간 기반)
        const orderNum = 'REST' + Date.now().toString().slice(-6);
        orderNumber.textContent = orderNum;
        
        speak('결제가 완료되었습니다.');
        
        console.log('결제 완료, 주문번호:', orderNum);
    }, 3000);
});

// 새로운 주문 시작
function resetOrder() {
    // 모든 화면 초기화
    paymentSection.style.display = 'none';
    paymentCompleteSection.style.display = 'none';
    
    // 장바구니 초기화
    cart = [];
    updateCartDisplay();
    
    // 모든 선택 초기화
    orderButtons.forEach(btn => btn.classList.remove('selected'));
    selectedOrderType = '';
    resetSelections();
    
    // 결제 옵션 선택 해제
    paymentOptions.forEach(opt => opt.classList.remove('selected'));
    processPaymentBtn.style.display = 'none';
    
    speak('새로운 주문을 시작합니다.');
    
    console.log('새로운 주문 시작');
}

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