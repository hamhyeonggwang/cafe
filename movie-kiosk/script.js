// 전역 변수
let selectedMovie = null;
let selectedDate = '';
let selectedTime = '';
let selectedSeats = [];
let selectedDiscount = '없음';
let selectedSnack = null;
let snackQuantity = 1;
let personCount = 1;
let cart = [];

// 할인율 정보
const discountRates = {
    '없음': 0,
    '학생': 0.2,
    '어린이': 0.3,
    '경로우대': 0.5
};

// DOM 요소들
const movieSection = document.getElementById('movieSection');
const dateTimeSection = document.getElementById('dateTimeSection');
const seatSection = document.getElementById('seatSection');
const discountSection = document.getElementById('discountSection');
const snackSection = document.getElementById('snackSection');
const completeSection = document.getElementById('completeSection');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const personCountSpan = document.getElementById('personCount');
const ticketPriceSpan = document.getElementById('ticketPrice');
const snackQuantitySpan = document.getElementById('snackQuantity');

// 영화 선택
function selectMovie(movieName, price) {
    // 이전 선택 해제
    document.querySelectorAll('.movie-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 현재 영화 선택
    event.target.closest('.movie-item').classList.add('selected');
    selectedMovie = { name: movieName, price: price };
    
    // 다음 섹션 표시
    dateTimeSection.style.display = 'block';
    
    speak(`${movieName} 영화가 선택되었습니다. 날짜와 시간을 선택해주세요.`);
}

// 날짜 선택
function selectDate(date) {
    // 이전 선택 해제
    document.querySelectorAll('.date-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 현재 날짜 선택
    event.target.classList.add('selected');
    selectedDate = date;
    
    speak(`${date} 날짜가 선택되었습니다.`);
}

// 시간 선택
function selectTime(time) {
    // 이전 선택 해제
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 현재 시간 선택
    event.target.classList.add('selected');
    selectedTime = time;
    
    // 다음 섹션 표시
    seatSection.style.display = 'block';
    generateSeats();
    
    speak(`${time} 시간이 선택되었습니다. 좌석을 선택해주세요.`);
}

// 인원 수 변경
function changePerson(delta) {
    const newCount = personCount + delta;
    if (newCount >= 1 && newCount <= 8) {
        personCount = newCount;
        personCountSpan.textContent = personCount;
        generateSeats();
        speak(`인원 수가 ${personCount}명으로 변경되었습니다.`);
    }
}

// 좌석 생성
function generateSeats() {
    const seatsContainer = document.querySelector('.seats-container');
    seatsContainer.innerHTML = '';
    
    // 8행 10열 좌석 생성
    for (let row = 1; row <= 8; row++) {
        for (let col = 1; col <= 10; col++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.textContent = `${String.fromCharCode(64 + row)}${col}`;
            seat.dataset.row = row;
            seat.dataset.col = col;
            
            // 일부 좌석은 이미 예매된 것으로 설정
            if (Math.random() < 0.3) {
                seat.classList.add('occupied');
            } else {
                seat.onclick = () => selectSeat(seat);
            }
            
            seatsContainer.appendChild(seat);
        }
    }
}

// 좌석 선택
function selectSeat(seatElement) {
    if (selectedSeats.length >= personCount) {
        // 최대 인원수만큼 선택된 경우, 첫 번째 선택 해제
        const firstSeat = document.querySelector('.seat.selected');
        if (firstSeat) {
            firstSeat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(seat => seat !== firstSeat.textContent);
        }
    }
    
    seatElement.classList.toggle('selected');
    
    if (seatElement.classList.contains('selected')) {
        selectedSeats.push(seatElement.textContent);
    } else {
        selectedSeats = selectedSeats.filter(seat => seat !== seatElement.textContent);
    }
    
    speak(`좌석 ${seatElement.textContent}이 선택되었습니다.`);
    
    // 모든 좌석이 선택되면 다음 섹션 표시
    if (selectedSeats.length === personCount) {
        setTimeout(() => {
            discountSection.style.display = 'block';
            updateTicketPrice();
        }, 1000);
    }
}

// 할인 적용
function applyDiscount(discountType) {
    // 이전 선택 해제
    document.querySelectorAll('.discount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 현재 할인 선택
    event.target.classList.add('selected');
    selectedDiscount = discountType;
    
    updateTicketPrice();
    speak(`${discountType} 할인이 적용되었습니다.`);
}

// 티켓 가격 업데이트
function updateTicketPrice() {
    const basePrice = selectedMovie.price * personCount;
    const discountRate = discountRates[selectedDiscount];
    const discountAmount = basePrice * discountRate;
    const finalPrice = basePrice - discountAmount;
    
    ticketPriceSpan.textContent = finalPrice.toLocaleString() + '원';
}

// 간식 선택
function selectSnack(snackName, price) {
    // 이전 선택 해제
    document.querySelectorAll('.snack-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 현재 간식 선택
    event.target.closest('.snack-item').classList.add('selected');
    selectedSnack = { name: snackName, price: price };
    
    speak(`${snackName}가 선택되었습니다.`);
}

// 간식 수량 변경
function changeSnackQuantity(delta) {
    const newQuantity = snackQuantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
        snackQuantity = newQuantity;
        snackQuantitySpan.textContent = snackQuantity;
        speak(`수량이 ${snackQuantity}개로 변경되었습니다.`);
    }
}

// 간식 장바구니에 추가
function addSnackToCart() {
    if (!selectedSnack) {
        alert('간식을 선택해주세요.');
        speak('간식을 먼저 선택해주세요.');
        return;
    }
    
    const cartItem = {
        type: '간식',
        name: selectedSnack.name,
        quantity: snackQuantity,
        price: selectedSnack.price * snackQuantity
    };
    
    cart.push(cartItem);
    updateCartDisplay();
    
    speak(`${selectedSnack.name} ${snackQuantity}개가 장바구니에 추가되었습니다.`);
    
    // 선택 초기화
    document.querySelectorAll('.snack-item').forEach(item => {
        item.classList.remove('selected');
    });
    selectedSnack = null;
    snackQuantity = 1;
    snackQuantitySpan.textContent = snackQuantity;
}

// 장바구니 표시 업데이트
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        
        cartItemDiv.innerHTML = `
            <h4>${item.name} ${item.quantity}개</h4>
            <p>${item.type}</p>
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
    speak(`${removedItem.name}가 장바구니에서 삭제되었습니다.`);
}

// 영화 예매 완료 후 간식 주문으로 이동
function proceedToSnacks() {
    // 영화 예매 정보를 장바구니에 추가
    const basePrice = selectedMovie.price * personCount;
    const discountRate = discountRates[selectedDiscount];
    const discountAmount = basePrice * discountRate;
    const finalPrice = basePrice - discountAmount;
    
    const ticketItem = {
        type: '영화예매',
        name: `${selectedMovie.name} ${selectedDate} ${selectedTime}`,
        quantity: personCount,
        price: finalPrice,
        details: {
            movie: selectedMovie.name,
            date: selectedDate,
            time: selectedTime,
            seats: selectedSeats.join(', '),
            discount: selectedDiscount
        }
    };
    
    cart.push(ticketItem);
    updateCartDisplay();
    
    // 간식 주문 섹션 표시
    snackSection.style.display = 'block';
    
    speak('영화 예매가 완료되었습니다. 간식 주문을 진행합니다.');
}

// 주문 완료
function completeOrder() {
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다.');
        speak('장바구니가 비어있습니다.');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // 주문 요약 표시
    const ticketSummary = document.getElementById('ticketSummary');
    const snackSummary = document.getElementById('snackSummary');
    const totalAmount = document.getElementById('totalAmount');
    
    const ticketItems = cart.filter(item => item.type === '영화예매');
    const snackItems = cart.filter(item => item.type === '간식');
    
    ticketSummary.innerHTML = ticketItems.map(item => 
        `<p>${item.name} - ${item.price.toLocaleString()}원</p>`
    ).join('');
    
    snackSummary.innerHTML = snackItems.map(item => 
        `<p>${item.name} ${item.quantity}개 - ${item.price.toLocaleString()}원</p>`
    ).join('');
    
    totalAmount.textContent = total.toLocaleString() + '원';
    
    // 완료 섹션 표시
    completeSection.style.display = 'block';
    
    speak('주문이 완료되었습니다. 감사합니다!');
    
    // 훈련 완료 기록
    if (typeof completeTraining === 'function') {
        completeTraining('영화관 훈련');
    }
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
            // 좌석 선택 완료 시 간식 주문으로 이동
            if (selectedSeats.length === personCount && discountSection.style.display === 'block') {
                proceedToSnacks();
            }
            break;
    }
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    speak('영화관 키오스크에 오신 것을 환영합니다. 영화를 선택해주세요.');
    console.log('영화관 키오스크 초기화 완료');
});

// 터치 이벤트 개선 (모바일)
document.addEventListener('touchstart', function() {}, {passive: true});

// 로딩 완료 메시지
console.log('영화관 키오스크 JavaScript 로드 완료'); 