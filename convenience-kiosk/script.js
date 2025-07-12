// 상품 데이터
const products = {
    음료: [
        { name: '콜라', price: 1500, image: '🥤', category: '음료' },
        { name: '사이다', price: 1500, image: '🥤', category: '음료' },
        { name: '물', price: 800, image: '💧', category: '음료' },
        { name: '커피', price: 2000, image: '☕', category: '음료' },
        { name: '에너지드링크', price: 2500, image: '⚡', category: '음료' },
        { name: '주스', price: 1800, image: '🍊', category: '음료' }
    ],
    과자: [
        { name: '초코파이', price: 1200, image: '🍫', category: '과자' },
        { name: '오레오', price: 1500, image: '🍪', category: '과자' },
        { name: '포카칩', price: 1300, image: '🥔', category: '과자' },
        { name: '새우깡', price: 1200, image: '🦐', category: '과자' },
        { name: '맥주', price: 1000, image: '🍺', category: '과자' },
        { name: '감자칩', price: 1400, image: '🥔', category: '과자' }
    ],
    라면: [
        { name: '신라면', price: 1200, image: '🍜', category: '라면' },
        { name: '진라면', price: 1100, image: '🍜', category: '라면' },
        { name: '짜파게티', price: 1300, image: '🍜', category: '라면' },
        { name: '불닭볶음면', price: 1400, image: '🍜', category: '라면' },
        { name: '너구리', price: 1200, image: '🍜', category: '라면' },
        { name: '안성탕면', price: 1100, image: '🍜', category: '라면' }
    ],
    빵: [
        { name: '단팥빵', price: 1000, image: '🍞', category: '빵' },
        { name: '크림빵', price: 1200, image: '🍞', category: '빵' },
        { name: '식빵', price: 2500, image: '🍞', category: '빵' },
        { name: '호빵', price: 800, image: '🍞', category: '빵' },
        { name: '베이글', price: 1500, image: '🥯', category: '빵' },
        { name: '도넛', price: 1200, image: '🍩', category: '빵' }
    ],
    아이스크림: [
        { name: '바닐라아이스크림', price: 2000, image: '🍦', category: '아이스크림' },
        { name: '초코아이스크림', price: 2200, image: '🍦', category: '아이스크림' },
        { name: '딸기아이스크림', price: 2200, image: '🍦', category: '아이스크림' },
        { name: '멘토스', price: 1500, image: '🍬', category: '아이스크림' },
        { name: '껌', price: 500, image: '🍬', category: '아이스크림' },
        { name: '사탕', price: 300, image: '🍬', category: '아이스크림' }
    ],
    생활용품: [
        { name: '휴지', price: 1500, image: '🧻', category: '생활용품' },
        { name: '물티슈', price: 2000, image: '🧻', category: '생활용품' },
        { name: '치약', price: 3000, image: '🪥', category: '생활용품' },
        { name: '칫솔', price: 1500, image: '🪥', category: '생활용품' },
        { name: '비누', price: 1000, image: '🧼', category: '생활용품' },
        { name: '샴푸', price: 5000, image: '🧴', category: '생활용품' }
    ]
};

// 전역 변수
let selectedProduct = null;
let selectedPaymentMethod = '';
let quantity = 1;
let cart = [];
let currentCategory = '';

// DOM 요소들
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.search-btn');
const categoryItems = document.querySelectorAll('.category-item');
const menuGrid = document.getElementById('menuGrid');
const menuSection = document.getElementById('menuSection');
const optionsSection = document.getElementById('optionsSection');
const quantitySpan = document.getElementById('quantity');
const minusBtn = document.getElementById('minusBtn');
const plusBtn = document.getElementById('plusBtn');
const addToCartBtn = document.getElementById('addToCartBtn');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const orderCompleteBtn = document.getElementById('orderCompleteBtn');
const optionButtons = document.querySelectorAll('.option-btn');

// 검색 기능
function searchProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) {
        speak('검색어를 입력해주세요.');
        return;
    }

    const allProducts = Object.values(products).flat();
    const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );

    if (filteredProducts.length === 0) {
        speak('검색 결과가 없습니다.');
        return;
    }

    displayProducts(filteredProducts);
    speak(`검색 결과 ${filteredProducts.length}개를 찾았습니다.`);
}

// 카테고리 선택
function selectCategory(category) {
    // 이전 선택 해제
    categoryItems.forEach(item => item.classList.remove('selected'));
    
    // 현재 카테고리 선택
    const selectedCategoryItem = document.querySelector(`[data-category="${category}"]`);
    selectedCategoryItem.classList.add('selected');
    
    currentCategory = category;
    displayProducts(products[category]);
    
    speak(`${category} 카테고리가 선택되었습니다.`);
}

// 상품 표시
function displayProducts(productList) {
    menuGrid.innerHTML = '';
    
    productList.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'menu-item';
        productDiv.onclick = () => selectProduct(product);
        
        productDiv.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 15px;">${product.image}</div>
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()}원</p>
        `;
        
        menuGrid.appendChild(productDiv);
    });
    
    menuSection.style.display = 'block';
}

// 상품 선택
function selectProduct(product) {
    // 이전 선택 해제
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 현재 상품 선택
    event.target.closest('.menu-item').classList.add('selected');
    selectedProduct = product;
    
    // 옵션 섹션 표시
    optionsSection.style.display = 'block';
    
    speak(`${product.name}가 선택되었습니다. 옵션을 선택해주세요.`);
}

// 결제 방법 선택
optionButtons.forEach(button => {
    button.addEventListener('click', function() {
        // 이전 선택 해제
        optionButtons.forEach(btn => btn.classList.remove('selected'));
        
        // 현재 버튼 선택
        this.classList.add('selected');
        selectedPaymentMethod = this.dataset.option;
        
        speak(`${selectedPaymentMethod} 결제가 선택되었습니다.`);
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
    if (!selectedProduct) {
        alert('상품을 선택해주세요.');
        speak('상품을 먼저 선택해주세요.');
        return;
    }
    
    if (!selectedPaymentMethod) {
        alert('결제 방법을 선택해주세요.');
        speak('결제 방법을 선택해주세요.');
        return;
    }
    
    // 장바구니에 추가
    const cartItem = {
        product: selectedProduct.name,
        category: selectedProduct.category,
        paymentMethod: selectedPaymentMethod,
        quantity: quantity,
        price: selectedProduct.price * quantity
    };
    
    cart.push(cartItem);
    
    // UI 업데이트
    updateCartDisplay();
    
    // 선택 초기화
    resetSelections();
    
    // 음성 피드백
    speak(`${selectedProduct.name} ${quantity}개가 장바구니에 추가되었습니다.`);
});

// 장바구니 표시 업데이트
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        
        cartItemDiv.innerHTML = `
            <h4>${item.product} ${item.quantity}개</h4>
            <p>카테고리: ${item.category}</p>
            <p>결제 방법: ${item.paymentMethod}</p>
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
    speak(`${removedItem.product}가 장바구니에서 삭제되었습니다.`);
}

// 선택 초기화
function resetSelections() {
    // 상품 선택 해제
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('selected');
    });
    selectedProduct = null;
    
    // 결제 방법 선택 해제
    optionButtons.forEach(btn => btn.classList.remove('selected'));
    selectedPaymentMethod = '';
    
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
        `${item.product} ${item.quantity}개 (${item.paymentMethod})`
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
        completeTraining('편의점 훈련');
    }
    
    // 장바구니 초기화
    cart = [];
    updateCartDisplay();
    
    // 모든 선택 초기화
    categoryItems.forEach(item => item.classList.remove('selected'));
    currentCategory = '';
    resetSelections();
    menuSection.style.display = 'none';
    
    console.log('주문 완료');
});

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
        case 'Enter':
            if (event.target === searchInput) {
                searchProducts();
            }
            break;
        case 'Escape':
            resetSelections();
            speak('선택이 취소되었습니다.');
            break;
    }
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    speak('편의점 키오스크에 오신 것을 환영합니다. 카테고리를 선택하거나 상품을 검색해주세요.');
    console.log('편의점 키오스크 초기화 완료');
});

// 터치 이벤트 개선 (모바일)
document.addEventListener('touchstart', function() {}, {passive: true});

// 로딩 완료 메시지
console.log('편의점 키오스크 JavaScript 로드 완료'); 