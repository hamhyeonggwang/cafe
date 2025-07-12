// 대시보드 JavaScript 기능

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

// 훈련 프로그램으로 이동
function goToTraining(type) {
    if (type === 'cafe') {
        speak('카페 키오스크 훈련을 시작합니다.');
        window.location.href = 'cafe-kiosk/index.html';
    } else if (type === 'restaurant') {
        speak('식당 키오스크 훈련을 시작합니다.');
        window.location.href = 'restaurant-kiosk/index.html';
    } else if (type === 'convenience') {
        speak('편의점 키오스크 훈련을 시작합니다.');
        window.location.href = 'convenience-kiosk/index.html';
    } else if (type === 'movie') {
        speak('영화관 키오스크 훈련을 시작합니다.');
        window.location.href = 'movie-kiosk/index.html';
    } else if (type === 'delivery') {
        speak('배달주문 키오스크 훈련을 시작합니다.');
        window.location.href = 'delivery-kiosk/index.html';
    }
}

// 훈련 카드 클릭 이벤트
document.addEventListener('DOMContentLoaded', function() {
    const trainingCards = document.querySelectorAll('.training-card');
    
    trainingCards.forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('coming-soon')) {
                speak('이 훈련 프로그램은 준비 중입니다.');
                return;
            }
            
            // 클릭 효과
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 훈련 타입 확인
            const cardTitle = this.querySelector('h3').textContent;
            if (cardTitle.includes('카페')) {
                goToTraining('cafe');
            } else if (cardTitle.includes('식당')) {
                goToTraining('restaurant');
            }
        });
        
        // 키보드 접근성
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.click();
            }
        });
        
        // 포커스 가능하게 만들기
        card.setAttribute('tabindex', '0');
    });
    
    // 초기 음성 안내
    speak('키오스크 훈련 대시보드에 오신 것을 환영합니다. 원하는 훈련 프로그램을 선택해주세요.');
});

// 진행 상황 업데이트 (로컬 스토리지 사용)
function updateProgress() {
    const progressItems = document.querySelectorAll('.progress-item');
    
    progressItems.forEach(item => {
        const progressFill = item.querySelector('.progress-fill');
        const statusSpan = item.querySelector('span:last-child');
        const trainingName = item.querySelector('span:first-child').textContent;
        
        // 로컬 스토리지에서 진행 상황 확인
        const progress = localStorage.getItem(`${trainingName}_progress`) || 0;
        
        if (progress > 0) {
            progressFill.style.width = `${progress}%`;
            if (progress >= 100) {
                statusSpan.textContent = '완료';
                statusSpan.style.color = '#27ae60';
            } else {
                statusSpan.textContent = `${progress}%`;
            }
        }
    });
}

// 훈련 완료 시 호출할 함수
function completeTraining(trainingType) {
    const progress = localStorage.getItem(`${trainingType}_progress`) || 0;
    const newProgress = Math.min(100, progress + 25); // 25%씩 증가
    localStorage.setItem(`${trainingType}_progress`, newProgress);
    
    speak(`${trainingType} 훈련이 완료되었습니다. 대시보드로 돌아갑니다.`);
    
    // 잠시 후 대시보드로 이동
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// 통계 정보 표시
function showStatistics() {
    const totalTrainings = 4; // 전체 훈련 수
    const completedTrainings = ['카페 훈련']; // 완료된 훈련
    
    const completionRate = (completedTrainings.length / totalTrainings) * 100;
    
    // 통계 표시 (필요시 구현)
    console.log(`훈련 완료율: ${completionRate}%`);
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    showStatistics();
    
    // 애니메이션 효과
    const cards = document.querySelectorAll('.training-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// 키보드 네비게이션 개선
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'Escape':
            // 대시보드에서는 특별한 동작 없음
            break;
        case 'Tab':
            // 포커스 표시 개선
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('training-card')) {
                focusedElement.style.outline = '3px solid #f39c12';
                focusedElement.style.outlineOffset = '2px';
            }
            break;
    }
});

// 터치 이벤트 개선 (모바일)
document.addEventListener('touchstart', function() {}, {passive: true});

// 로딩 완료 메시지
console.log('키오스크 훈련 대시보드 JavaScript 로드 완료'); 