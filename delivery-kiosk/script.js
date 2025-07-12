// 전역 변수
let selectedRestaurant = null;
let selectedAddress = '';
let selectedDeliveryTime = '';
let selectedDeliveryFee = '';
let selectedPayment = '';
let cart = [];
let currentCategory = 'main';

// 메뉴 데이터
const menuData = {
    '맛있는치킨': {
        main: [
            { name: '후라이드치킨', price: 18000, icon: '🍗', description: '바삭한 후라이드치킨' },
            { name: '양념치킨', price: 19000, icon: '🍗', description: '매콤달콤 양념치킨' },
            { name: '간장치킨', price: 20000, icon: '🍗', description: '깊은 맛 간장치킨' },
            { name: '파닭', price: 22000, icon: '🍗', description: '파가 듬뿍 파닭' }
        ],
        side: [
            { name: '치킨무', price: 1000, icon: '🥕', description: '신선한 치킨무' },
            { name: '콜라', price: 2000, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 2000, icon: '🥤', description: '깔끔한 사이다' }
        ],
        drink: [
            { name: '콜라', price: 2000, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 2000, icon: '🥤', description: '깔끔한 사이다' },
            { name: '맥주', price: 4000, icon: '🍺', description: '시원한 맥주' }
        ],
        dessert: [
            { name: '아이스크림', price: 3000, icon: '🍦', description: '달콤한 아이스크림' },
            { name: '치킨무', price: 1000, icon: '🥕', description: '신선한 치킨무' }
        ]
    },
    '신선한피자': {
        main: [
            { name: '페퍼로니피자', price: 22000, icon: '🍕', description: '매콤한 페퍼로니' },
            { name: '하와이안피자', price: 24000, icon: '🍕', description: '파인애플이 들어간 피자' },
            { name: '불고기피자', price: 26000, icon: '🍕', description: '한국식 불고기 피자' },
            { name: '치즈피자', price: 20000, icon: '🍕', description: '치즈가 듬뿍' }
        ],
        side: [
            { name: '치킨윙', price: 8000, icon: '🍗', description: '바삭한 치킨윙' },
            { name: '콜라', price: 2000, icon: '🥤', description: '시원한 콜라' }
        ],
        drink: [
            { name: '콜라', price: 2000, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 2000, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '아이스크림', price: 3000, icon: '🍦', description: '달콤한 아이스크림' }
        ]
    },
    '한식당': {
        main: [
            { name: '김치찌개', price: 12000, icon: '🍲', description: '매콤한 김치찌개' },
            { name: '된장찌개', price: 11000, icon: '🍲', description: '구수한 된장찌개' },
            { name: '불고기', price: 15000, icon: '🥩', description: '맛있는 불고기' },
            { name: '제육볶음', price: 13000, icon: '🥩', description: '매콤달콤 제육볶음' }
        ],
        side: [
            { name: '김치', price: 2000, icon: '🥬', description: '신선한 김치' },
            { name: '된장국', price: 3000, icon: '🍲', description: '구수한 된장국' }
        ],
        drink: [
            { name: '막걸리', price: 4000, icon: '🍶', description: '구수한 막걸리' },
            { name: '소주', price: 3000, icon: '🍶', description: '깔끔한 소주' }
        ],
        dessert: [
            { name: '식혜', price: 2000, icon: '🍯', description: '달콤한 식혜' }
        ]
    },
    '중국집': {
        main: [
            { name: '짜장면', price: 8000, icon: '🍜', description: '맛있는 짜장면' },
            { name: '짬뽕', price: 9000, icon: '🍜', description: '매콤한 짬뽕' },
            { name: '탕수육', price: 15000, icon: '🥩', description: '바삭한 탕수육' },
            { name: '깐풍기', price: 16000, icon: '🍗', description: '달콤한 깐풍기' }
        ],
        side: [
            { name: '군만두', price: 5000, icon: '🥟', description: '바삭한 군만두' },
            { name: '양장피', price: 12000, icon: '🥬', description: '신선한 양장피' }
        ],
        drink: [
            { name: '콜라', price: 2000, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 2000, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '단팥빵', price: 3000, icon: '🥖', description: '달콤한 단팥빵' }
        ]
    },
    '분식점': {
        main: [
            { name: '떡볶이', price: 4000, icon: '🍡', description: '매콤달콤 떡볶이' },
            { name: '라면', price: 5000, icon: '🍜', description: '맛있는 라면' },
            { name: '김밥', price: 3000, icon: '🍙', description: '신선한 김밥' },
            { name: '순대', price: 6000, icon: '🥖', description: '구수한 순대' }
        ],
        side: [
            { name: '어묵', price: 2000, icon: '🍢', description: '맛있는 어묵' },
            { name: '튀김', price: 3000, icon: '🍤', description: '바삭한 튀김' }
        ],
        drink: [
            { name: '콜라', price: 1500, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 1500, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '아이스크림', price: 2000, icon: '🍦', description: '달콤한 아이스크림' }
        ]
    },
    '카페': {
        main: [
            { name: '아메리카노', price: 4000, icon: '☕', description: '깔끔한 아메리카노' },
            { name: '카페라떼', price: 5000, icon: '☕', description: '부드러운 카페라떼' },
            { name: '카푸치노', price: 5500, icon: '☕', description: '거품이 풍부한 카푸치노' },
            { name: '모카', price: 6000, icon: '☕', description: '달콤한 모카' }
        ],
        side: [
            { name: '샌드위치', price: 8000, icon: '🥪', description: '신선한 샌드위치' },
            { name: '토스트', price: 5000, icon: '🍞', description: '바삭한 토스트' }
        ],
        drink: [
            { name: '아메리카노', price: 4000, icon: '☕', description: '깔끔한 아메리카노' },
            { name: '카페라떼', price: 5000, icon: '☕', description: '부드러운 카페라떼' },
            { name: '스무디', price: 7000, icon: '🥤', description: '시원한 스무디' }
        ],
        dessert: [
            { name: '티라미수', price: 8000, icon: '🍰', description: '부드러운 티라미수' },
            { name: '치즈케이크', price: 7000, icon: '🍰', description: '진한 치즈케이크' }
        ]
    }
};

// 배달비 정보
const deliveryFees = {
    'free': { name: '무료배달', price: 0, condition: '30,000원 이상' },
    'fast': { name: '빠른배달', price: 3000, condition: '빠른 배달' }
};

// DOM 요소들
const restaurantSection = document.getElementById('restaurantSection');
const menuSection = document.getElementById('menuSection');
const deliverySection = document.getElementById('deliverySection');
const deliveryFeeSection = document.getElementById('deliveryFeeSection');
const paymentSection = document.getElementById('paymentSection');
const completeSection = document.getElementById('completeSection');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const menuGrid = document.getElementById('menuGrid');

// 결제 관련 DOM 요소들
const finalPaymentSection = document.getElementById('finalPaymentSection');
const finalPaymentOptions = document.querySelectorAll('#finalPaymentSection .payment-option');
const finalPaymentAmount = document.getElementById('finalPaymentAmount');
const processFinalPaymentBtn = document.getElementById('processFinalPaymentBtn');
const paymentCompleteSection = document.getElementById('paymentCompleteSection');
const paymentAnimation = document.querySelector('.payment-animation');
const paymentSuccess = document.querySelector('.payment-success');
const orderNumber = document.getElementById('orderNumber');

// 음식점 선택
function selectRestaurant(restaurantName) {
    // 이전 선택 해제
    document.querySelectorAll('.restaurant-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 현재 음식점 선택
    event.target.closest('.restaurant-item').classList.add('selected');
    selectedRestaurant = restaurantName;
    
    // 메뉴 섹션 표시
    menuSection.style.display = 'block';
    showCategory('main');
    
    speak(`${restaurantName}이 선택되었습니다. 메뉴를 선택해주세요.`);
}

// 카테고리 표시
function showCategory(category) {
    currentCategory = category;
    
    // 카테고리 버튼 활성화
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 메뉴 표시
    displayMenu(category);
}

// 메뉴 표시
function displayMenu(category) {
    if (!selectedRestaurant || !menuData[selectedRestaurant]) return;
    
    const menus = menuData[selectedRestaurant][category];
    menuGrid.innerHTML = '';
    
    menus.forEach(menu => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.onclick = () => selectMenu(menu);
        
        menuItem.innerHTML = `
            <div class="menu-icon">${menu.icon}</div>
            <h3>${menu.name}</h3>
            <p>${menu.description}</p>
            <p class="price">${menu.price.toLocaleString()}원</p>
            <div class="menu-quantity">
                <button class="quantity-btn" onclick="changeQuantity('${menu.name}', -1, event)">-</button>
                <span class="quantity-display" id="qty-${menu.name}">0</span>
                <button class="quantity-btn" onclick="changeQuantity('${menu.name}', 1, event)">+</button>
            </div>
        `;
        
        menuGrid.appendChild(menuItem);
    });
}

// 메뉴 수량 변경
function changeQuantity(menuName, delta, event) {
    event.stopPropagation();
    
    const quantityDisplay = document.getElementById(`qty-${menuName}`);
    let currentQty = parseInt(quantityDisplay.textContent) || 0;
    const newQty = Math.max(0, currentQty + delta);
    
    quantityDisplay.textContent = newQty;
    
    // 장바구니 업데이트
    updateCartItem(menuName, newQty);
}

// 메뉴 선택
function selectMenu(menu) {
    const quantityDisplay = document.getElementById(`qty-${menu.name}`);
    let currentQty = parseInt(quantityDisplay.textContent) || 0;
    const newQty = currentQty + 1;
    
    quantityDisplay.textContent = newQty;
    updateCartItem(menu.name, newQty);
    
    speak(`${menu.name}이 장바구니에 추가되었습니다.`);
}

// 장바구니 아이템 업데이트
function updateCartItem(menuName, quantity) {
    const existingItem = cart.find(item => item.name === menuName);
    
    if (quantity === 0) {
        // 수량이 0이면 장바구니에서 제거
        cart = cart.filter(item => item.name !== menuName);
    } else {
        if (existingItem) {
            existingItem.quantity = quantity;
        } else {
            // 새 아이템 추가
            const menu = findMenuByName(menuName);
            if (menu) {
                cart.push({
                    name: menuName,
                    price: menu.price,
                    quantity: quantity,
                    icon: menu.icon
                });
            }
        }
    }
    
    updateCartDisplay();
}

// 메뉴 이름으로 메뉴 찾기
function findMenuByName(menuName) {
    if (!selectedRestaurant || !menuData[selectedRestaurant]) return null;
    
    for (const category in menuData[selectedRestaurant]) {
        const menu = menuData[selectedRestaurant][category].find(m => m.name === menuName);
        if (menu) return menu;
    }
    return null;
}

// 장바구니 표시 업데이트
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        
        cartItemDiv.innerHTML = `
            <h4>${item.icon} ${item.name} ${item.quantity}개</h4>
            <p>${item.price.toLocaleString()}원 × ${item.quantity}</p>
            <p class="price">${(item.price * item.quantity).toLocaleString()}원</p>
            <button onclick="removeFromCart(${index})" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; margin-top: 10px;">삭제</button>
        `;
        
        cartItems.appendChild(cartItemDiv);
        total += item.price * item.quantity;
    });
    
    totalPrice.textContent = total.toLocaleString() + '원';
    
    // 배달 옵션 버튼 표시/숨김
    const orderBtn = document.querySelector('.order-btn');
    if (cart.length > 0) {
        orderBtn.style.display = 'inline-block';
    } else {
        orderBtn.style.display = 'none';
    }
}

// 장바구니에서 삭제
function removeFromCart(index) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    updateCartDisplay();
    
    // 수량 표시도 업데이트
    const quantityDisplay = document.getElementById(`qty-${removedItem.name}`);
    if (quantityDisplay) {
        quantityDisplay.textContent = '0';
    }
    
    speak(`${removedItem.name}가 장바구니에서 삭제되었습니다.`);
}

// 배달 옵션으로 진행
function proceedToDelivery() {
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다.');
        speak('장바구니가 비어있습니다.');
        return;
    }
    
    deliverySection.style.display = 'block';
    speak('배달 옵션을 선택해주세요.');
}

// 주소 확인
function confirmAddress() {
    const addressInput = document.getElementById('addressInput');
    selectedAddress = addressInput.value;
    
    if (selectedAddress.trim() === '') {
        alert('주소를 입력해주세요.');
        speak('주소를 입력해주세요.');
        return;
    }
    
    speak('주소가 확인되었습니다.');
}

// 배달 시간 선택
function selectDeliveryTime(time) {
    // 이전 선택 해제
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 현재 시간 선택
    event.target.classList.add('selected');
    selectedDeliveryTime = time;
    
    // 빠른배달 선택 시 장바구니에 3000원 추가
    if (time === 'fast') {
        const fastDeliveryItem = {
            name: '빠른배달',
            price: 3000,
            quantity: 1,
            type: '배달비'
        };
        
        // 기존 빠른배달 항목이 있으면 제거
        cart = cart.filter(item => item.name !== '빠른배달');
        cart.push(fastDeliveryItem);
        updateCartDisplay();
        
        speak('빠른배달이 선택되었습니다. 3,000원이 추가되었습니다.');
    } else if (time === 'free') {
        // 무료배달 선택 시 기존 빠른배달 항목 제거
        cart = cart.filter(item => item.name !== '빠른배달');
        updateCartDisplay();
        
        speak('무료배달이 선택되었습니다.');
    }
}

// 배달비 선택
function selectDeliveryFee(feeType) {
    // 이전 선택 해제
    document.querySelectorAll('.fee-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // 현재 배달비 선택
    event.target.closest('.fee-option').classList.add('selected');
    selectedDeliveryFee = feeType;
    
    // 다음 섹션 표시
    paymentSection.style.display = 'block';
    
    speak(`${deliveryFees[feeType].name}이 선택되었습니다.`);
}

// 결제 방법 선택
function selectPayment(paymentType) {
    // 이전 선택 해제
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // 현재 결제 방법 선택
    event.target.closest('.payment-option').classList.add('selected');
    selectedPayment = paymentType;
    
    // 결제하기 섹션 표시
    const paymentProcessSection = document.getElementById('paymentProcessSection');
    paymentProcessSection.style.display = 'block';
    displayPaymentSummary();
    
    speak('결제 방법이 선택되었습니다. 결제를 진행해주세요.');
}

// 결제 요약 표시
function displayPaymentSummary() {
    const menuAmount = document.getElementById('menuAmount');
    const deliveryAmount = document.getElementById('deliveryAmount');
    const totalPaymentAmount = document.getElementById('totalPaymentAmount');
    const selectedPaymentMethod = document.getElementById('selectedPaymentMethod');
    
    // 메뉴 금액 계산
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = deliveryFees[selectedDeliveryFee].price;
    const total = subtotal + deliveryFee;
    
    menuAmount.textContent = subtotal.toLocaleString() + '원';
    deliveryAmount.textContent = deliveryFee.toLocaleString() + '원';
    totalPaymentAmount.textContent = total.toLocaleString() + '원';
    
    // 결제 방법 표시
    const paymentMethods = {
        'card': '신용카드',
        'cash': '현금결제',
        'mobile': '모바일결제'
    };
    selectedPaymentMethod.textContent = paymentMethods[selectedPayment] || '신용카드';
}

// 주문 요약 표시
function displayOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const deliverySummary = document.getElementById('deliverySummary');
    const paymentSummary = document.getElementById('paymentSummary');
    const totalAmount = document.getElementById('totalAmount');
    
    // 주문 내역
    orderSummary.innerHTML = cart.map(item => 
        `<p>${item.icon} ${item.name} ${item.quantity}개 - ${(item.price * item.quantity).toLocaleString()}원</p>`
    ).join('');
    
    // 배달 정보
    deliverySummary.innerHTML = `
        <p>🏪 ${selectedRestaurant}</p>
        <p>📍 ${selectedAddress}</p>
        <p>⏰ ${selectedDeliveryTime}</p>
        <p>💰 ${deliveryFees[selectedDeliveryFee].name} - ${deliveryFees[selectedDeliveryFee].price.toLocaleString()}원</p>
    `;
    
    // 결제 정보
    paymentSummary.innerHTML = `
        <p>💳 ${selectedPayment} 결제</p>
    `;
    
    // 총 금액 계산
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = deliveryFees[selectedDeliveryFee].price;
    const total = subtotal + deliveryFee;
    
    totalAmount.textContent = total.toLocaleString() + '원';
}

// 결제 처리
function processPayment() {
    speak('결제를 처리하고 있습니다...');
    
    // 결제 처리 시뮬레이션
    setTimeout(() => {
        speak('결제가 완료되었습니다!');
        
        // 주문 완료 섹션 표시
        completeSection.style.display = 'block';
        displayOrderSummary();
        
        // 결제하기 섹션 숨김
        const paymentProcessSection = document.getElementById('paymentProcessSection');
        paymentProcessSection.style.display = 'none';
        
        speak('주문이 완료되었습니다. 감사합니다!');
    }, 2000);
}

// 결제 취소
function cancelPayment() {
    speak('결제가 취소되었습니다.');
    
    // 결제하기 섹션 숨김
    const paymentProcessSection = document.getElementById('paymentProcessSection');
    paymentProcessSection.style.display = 'none';
    
    // 결제 방법 선택으로 돌아가기
    paymentSection.style.display = 'block';
}

// 주문 완료 - 결제 화면으로 이동
function completeOrder() {
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다.');
        speak('장바구니가 비어있습니다.');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    finalPaymentAmount.textContent = total.toLocaleString() + '원';
    
    // 결제 화면 표시
    finalPaymentSection.style.display = 'block';
    speak('결제 방법을 선택해주세요.');
    
    console.log('결제 화면 표시');
}

// 결제 방법 선택
finalPaymentOptions.forEach(option => {
    option.addEventListener('click', function() {
        // 이전 선택 해제
        finalPaymentOptions.forEach(opt => opt.classList.remove('selected'));
        
        // 현재 선택
        this.classList.add('selected');
        const selectedMethod = this.dataset.method;
        
        // 결제하기 버튼 표시
        processFinalPaymentBtn.style.display = 'inline-block';
        
        const methodText = selectedMethod === 'card' ? '카드결제' : '모바일쿠폰결제';
        speak(`${methodText}가 선택되었습니다.`);
        
        console.log('결제 방법 선택:', selectedMethod);
    });
});

// 결제 처리
processFinalPaymentBtn.addEventListener('click', function() {
    const selectedPayment = document.querySelector('#finalPaymentSection .payment-option.selected');
    if (!selectedPayment) {
        alert('결제 방법을 선택해주세요.');
        speak('결제 방법을 선택해주세요.');
        return;
    }
    
    // 결제 화면 숨기기
    finalPaymentSection.style.display = 'none';
    
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
        const orderNum = 'DELIVERY' + Date.now().toString().slice(-6);
        orderNumber.textContent = orderNum;
        
        speak('결제가 완료되었습니다.');
        
        console.log('결제 완료, 주문번호:', orderNum);
    }, 3000);
});

// 새로운 주문 시작
function resetOrder() {
    // 모든 화면 초기화
    finalPaymentSection.style.display = 'none';
    paymentCompleteSection.style.display = 'none';
    
    // 장바구니 초기화
    cart = [];
    updateCartDisplay();
    
    // 모든 선택 초기화
    selectedRestaurant = null;
    selectedAddress = '';
    selectedDeliveryTime = '';
    selectedDeliveryFee = '';
    selectedPayment = '';
    currentCategory = 'main';
    
    // 모든 섹션 숨기기
    restaurantSection.style.display = 'block';
    menuSection.style.display = 'none';
    deliverySection.style.display = 'none';
    deliveryFeeSection.style.display = 'none';
    paymentSection.style.display = 'none';
    completeSection.style.display = 'none';
    
    // 선택 해제
    document.querySelectorAll('.restaurant-item, .time-btn, .fee-option, .payment-option').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 결제 옵션 선택 해제
    finalPaymentOptions.forEach(opt => opt.classList.remove('selected'));
    processFinalPaymentBtn.style.display = 'none';
    
    speak('새로운 주문을 시작합니다.');
    
    console.log('새로운 주문 시작');
}

// 대시보드로 돌아가기
function goBack() {
    speak('대시보드로 돌아갑니다.');
    window.location.href = '../index.html';
}

// 음성 피드백 함수
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        speechSynthesis.speak(utterance);
    }
}

// 키보드 접근성
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'Escape':
            // 선택 초기화
            speak('선택이 취소되었습니다.');
            break;
        case 'Enter':
            // 장바구니에 아이템이 있으면 배달 옵션으로 이동
            if (cart.length > 0 && deliverySection.style.display === 'none') {
                proceedToDelivery();
            }
            break;
    }
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    speak('배달주문 키오스크에 오신 것을 환영합니다. 음식점을 선택해주세요.');
    console.log('배달주문 키오스크 초기화 완료');
});

// 터치 이벤트 개선 (모바일)
document.addEventListener('touchstart', function() {}, {passive: true});

// 로딩 완료 메시지
console.log('배달주문 키오스크 JavaScript 로드 완료'); 