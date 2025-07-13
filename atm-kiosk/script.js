// ATM 키오스크 상태 관리
let currentState = 'transactionSelect';
let selectedTransaction = '';
let pinInput = '';
let currentPinInput = '';
let newPinInput = '';
let selectedAmount = 0;
let currentBalance = 1250000;
let isCurrentPinEntered = false;

// 대시보드로 돌아가기
function goBack() {
    window.location.href = '../index.html';
}

// 거래 선택 (IBK ATM 메인화면)
function selectTransaction(transaction) {
    selectedTransaction = transaction;
    // 기타 거래 안내
    const mainOnly = ['passbook','mobile','overseas','investment','hicharge','other','tax','international','creditcard','inquiry'];
    if (mainOnly.includes(transaction)) {
        alert('해당 서비스는 준비 중이거나 안내만 제공됩니다. 가까운 직원에게 문의하세요.');
        document.getElementById('atmMainSection').style.display = 'block';
        return;
    }
    // 메인화면 숨기고 카드 삽입 화면으로 이동
    document.getElementById('atmMainSection').style.display = 'none';
    showSection('cardSection');
    currentState = 'card';
}

// 카드 삽입
function insertCard() {
    showSection('pinSection');
    currentState = 'pin';
}

// PIN 번호 입력
function inputNumber(num) {
    if (currentState === 'pin') {
        if (pinInput.length < 4) {
            pinInput += num;
            updatePinDisplay();
        }
    } else if (currentState === 'changePin') {
        if (isCurrentPinEntered) {
            if (newPinInput.length < 4) {
                newPinInput += num;
                updateNewPinDisplay();
            }
        } else {
            if (currentPinInput.length < 4) {
                currentPinInput += num;
                updateCurrentPinDisplay();
            }
        }
    }
}

// PIN 표시 업데이트
function updatePinDisplay() {
    const pinDots = document.querySelectorAll('#pinSection .pin-dot');
    pinDots.forEach((dot, index) => {
        if (index < pinInput.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// PIN 지우기
function clearPin() {
    pinInput = '';
    updatePinDisplay();
}

// PIN 확인
function enterPin() {
    if (pinInput.length === 4) {
        alert('비밀번호는 쉿! 비밀이에요!');
        // 실제 ATM에서는 PIN 검증 로직이 들어갑니다
        if (pinInput === '1234') {
            // 선택된 거래에 따라 해당 섹션으로 이동
            switch(selectedTransaction) {
                case 'balance':
                    showSection('balanceSection');
                    currentState = 'balance';
                    break;
                case 'withdraw':
                    showSection('withdrawSection');
                    currentState = 'withdraw';
                    selectedAmount = 0;
                    updateSelectedAmount();
                    break;
                case 'deposit':
                    showSection('depositSection');
                    currentState = 'deposit';
                    break;
                case 'transfer':
                    showSection('transferSection');
                    currentState = 'transfer';
                    break;
                default:
                    showSection('mainMenuSection');
                    currentState = 'mainMenu';
            }
        } else {
            alert('잘못된 비밀번호입니다. 다시 입력해주세요.');
            clearPin();
        }
    } else {
        alert('비밀번호를 4자리 입력해주세요.');
    }
}

// 현재 PIN 표시 업데이트
function updateCurrentPinDisplay() {
    const pinDots = document.querySelectorAll('#currentPin1, #currentPin2, #currentPin3, #currentPin4');
    pinDots.forEach((dot, index) => {
        if (index < currentPinInput.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 새 PIN 표시 업데이트
function updateNewPinDisplay() {
    const pinDots = document.querySelectorAll('#newPin1, #newPin2, #newPin3, #newPin4');
    pinDots.forEach((dot, index) => {
        if (index < newPinInput.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// PIN 입력 지우기
function clearPinInput() {
    if (isCurrentPinEntered) {
        newPinInput = '';
        updateNewPinDisplay();
    } else {
        currentPinInput = '';
        updateCurrentPinDisplay();
    }
}

// 서비스 선택
function selectService(service) {
    switch(service) {
        case 'balance':
            showSection('balanceSection');
            currentState = 'balance';
            break;
        case 'withdraw':
            showSection('withdrawSection');
            currentState = 'withdraw';
            selectedAmount = 0;
            updateSelectedAmount();
            break;
        case 'deposit':
            showSection('depositSection');
            currentState = 'deposit';
            break;
        case 'transfer':
            showSection('transferSection');
            currentState = 'transfer';
            break;
        case 'statement':
            showSection('statementSection');
            currentState = 'statement';
            break;
        case 'changePin':
            showSection('changePinSection');
            currentState = 'changePin';
            isCurrentPinEntered = false;
            currentPinInput = '';
            newPinInput = '';
            updateCurrentPinDisplay();
            updateNewPinDisplay();
            break;
    }
}

// 금액 선택
function selectAmount(amount) {
    selectedAmount = amount;
    updateSelectedAmount();
    
    // 선택된 버튼 스타일 변경
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

// 직접 입력 금액
function selectCustomAmount() {
    const customAmount = document.getElementById('customAmount').value;
    if (customAmount && customAmount > 0) {
        selectedAmount = parseInt(customAmount);
        updateSelectedAmount();
        
        // 선택된 버튼 스타일 제거
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    } else {
        alert('올바른 금액을 입력해주세요.');
    }
}

// 선택된 금액 업데이트
function updateSelectedAmount() {
    document.getElementById('selectedAmount').textContent = selectedAmount.toLocaleString();
}

// 출금 처리
function processWithdraw() {
    if (selectedAmount === 0) {
        alert('출금할 금액을 선택해주세요.');
        return;
    }
    
    if (selectedAmount > currentBalance) {
        alert('잔액이 부족합니다.');
        return;
    }
    
    currentBalance -= selectedAmount;
    showTransactionComplete('출금', `출금 금액: ${selectedAmount.toLocaleString()}원`);
}

// 입금 처리
function processDeposit() {
    const depositAmount = Math.floor(Math.random() * 100000) + 10000; // 랜덤 입금 금액
    currentBalance += depositAmount;
    document.getElementById('depositAmount').textContent = depositAmount.toLocaleString();
    showTransactionComplete('입금', `입금 금액: ${depositAmount.toLocaleString()}원`);
}

// 이체 처리
function processTransfer() {
    const transferAccount = document.getElementById('transferAccount').value;
    const transferAmount = parseInt(document.getElementById('transferAmount').value);
    const transferName = document.getElementById('transferName').value;
    
    if (!transferAccount || !transferAmount || !transferName) {
        alert('모든 정보를 입력해주세요.');
        return;
    }
    
    if (transferAmount > currentBalance) {
        alert('잔액이 부족합니다.');
        return;
    }
    
    currentBalance -= transferAmount;
    showTransactionComplete('이체', `이체 금액: ${transferAmount.toLocaleString()}원\n받는 분: ${transferName}\n계좌번호: ${transferAccount}`);
}

// PIN 번호 입력 (변경용)
function inputPinNumber(num) {
    if (isCurrentPinEntered) {
        if (newPinInput.length < 4) {
            newPinInput += num;
            updateNewPinDisplay();
        }
    } else {
        if (currentPinInput.length < 4) {
            currentPinInput += num;
            updateCurrentPinDisplay();
        }
    }
}

// PIN 변경 확인
function confirmPinChange() {
    if (!isCurrentPinEntered) {
        // 현재 PIN 확인
        if (currentPinInput.length === 4) {
            if (currentPinInput === '1234') {
                isCurrentPinEntered = true;
                document.getElementById('newPinStep').style.display = 'block';
                currentPinInput = '';
                updateCurrentPinDisplay();
            } else {
                alert('현재 PIN 번호가 올바르지 않습니다.');
                currentPinInput = '';
                updateCurrentPinDisplay();
            }
        } else {
            alert('현재 PIN 번호를 4자리 입력해주세요.');
        }
    } else {
        // 새 PIN 확인
        if (newPinInput.length === 4) {
            if (newPinInput === currentPinInput) {
                alert('새 PIN 번호가 현재 PIN 번호와 같습니다.');
                newPinInput = '';
                updateNewPinDisplay();
            } else {
                showTransactionComplete('PIN 변경', 'PIN 번호가 성공적으로 변경되었습니다.');
            }
        } else {
            alert('새 PIN 번호를 4자리 입력해주세요.');
        }
    }
}

// 거래 완료 표시
function showTransactionComplete(type, details) {
    document.getElementById('transactionType').textContent = `${type} 완료`;
    document.getElementById('transactionDetails').innerHTML = details.replace(/\n/g, '<br>');
    showSection('transactionCompleteSection');
    currentState = 'transactionComplete';
}

// 메인 메뉴로 돌아가기
function returnToMain() {
    showSection('mainMenuSection');
    currentState = 'mainMenu';
}

// 카드 가져가기
function takeCard() {
    // 거래 초기화
    showSection('cardSection'); // 일단 숨김
    document.getElementById('atmMainSection').style.display = 'block';
    currentState = 'transactionSelect';
    selectedTransaction = '';
    pinInput = '';
    selectedAmount = 0;
    currentPinInput = '';
    newPinInput = '';
    isCurrentPinEntered = false;
    updatePinDisplay();
    updateCurrentPinDisplay();
    updateNewPinDisplay();
    updateSelectedAmount();
}

// 섹션 표시 함수
function showSection(sectionId) {
    // 모든 섹션 숨기기
    const sections = [
        'transactionSelectSection', 'cardSection', 'pinSection', 'mainMenuSection', 'balanceSection',
        'withdrawSection', 'depositSection', 'transferSection', 'statementSection',
        'changePinSection', 'transactionCompleteSection', 'cardReturnSection'
    ];
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.style.display = 'none';
        }
    });
    
    // 선택된 섹션 표시
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('section-slide-down');
        
        // 애니메이션 클래스 제거
        setTimeout(() => {
            targetSection.classList.remove('section-slide-down');
        }, 600);
    }
}

// 잔액 업데이트
function updateBalance() {
    document.getElementById('currentBalance').textContent = currentBalance.toLocaleString();
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    updateBalance();
    
    // 엔터 키 이벤트 처리
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            if (currentState === 'pin') {
                enterPin();
            } else if (currentState === 'changePin') {
                confirmPinChange();
            }
        }
    });
    
    // 숫자 키 이벤트 처리
    document.addEventListener('keydown', function(event) {
        if (event.key >= '0' && event.key <= '9') {
            if (currentState === 'pin') {
                inputNumber(event.key);
            } else if (currentState === 'changePin') {
                inputPinNumber(event.key);
            }
        } else if (event.key === 'Backspace') {
            if (currentState === 'pin') {
                clearPin();
            } else if (currentState === 'changePin') {
                clearPinInput();
            }
        }
    });
});

// 서비스 아이템 호버 효과
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 금액 버튼 호버 효과
document.addEventListener('DOMContentLoaded', function() {
    const amountButtons = document.querySelectorAll('.amount-btn');
    
    amountButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
});

// 키패드 버튼 효과
document.addEventListener('DOMContentLoaded', function() {
    const keypadButtons = document.querySelectorAll('.num-btn, .clear-btn, .enter-btn');
    
    keypadButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// 거래 완료 후 카드 반환으로 이동
function completeTransaction() {
    showSection('cardReturnSection');
    currentState = 'cardReturn';
}

// 거래 완료 섹션의 계속 버튼 클릭 시 카드 반환으로 이동
document.addEventListener('DOMContentLoaded', function() {
    const continueBtn = document.querySelector('#transactionCompleteSection .continue-btn');
    if (continueBtn) {
        continueBtn.onclick = completeTransaction;
    }
}); 

// 화면 확대(접근성)
function zoomScreen() {
    document.body.style.zoom = (document.body.style.zoom === '1.3') ? '1' : '1.3';
} 

// 출금 - 오른쪽 키패드 입력
function appendCustomAmount(num) {
    const input = document.getElementById('customAmount');
    input.value = (input.value || '') + num;
    input.focus();
}
function clearCustomAmount() {
    const input = document.getElementById('customAmount');
    input.value = '';
    input.focus();
}
// 이체 - 오른쪽 키패드 입력 (계좌번호/금액 중 포커스된 곳에 입력)
function appendTransferInput(num) {
    const accountInput = document.getElementById('transferAccount');
    const amountInput = document.getElementById('transferAmount');
    if (document.activeElement === accountInput) {
        accountInput.value = (accountInput.value || '') + num;
    } else if (document.activeElement === amountInput) {
        amountInput.value = (amountInput.value || '') + num;
    } else {
        amountInput.value = (amountInput.value || '') + num;
        amountInput.focus();
    }
}
function clearTransferInput() {
    const accountInput = document.getElementById('transferAccount');
    const amountInput = document.getElementById('transferAmount');
    if (document.activeElement === accountInput) {
        accountInput.value = '';
        accountInput.focus();
    } else if (document.activeElement === amountInput) {
        amountInput.value = '';
        amountInput.focus();
    } else {
        amountInput.value = '';
        amountInput.focus();
    }
} 

// 풀스크린 모드
function toggleFullscreen() {
    const elem = document.documentElement;
    const btn = document.querySelector('.fullscreen-btn');
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) elem.requestFullscreen();
        btn.textContent = '전체화면 종료';
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
        btn.textContent = '전체화면 시작';
    }
}
document.addEventListener('fullscreenchange', function() {
    const btn = document.querySelector('.fullscreen-btn');
    if (document.fullscreenElement) {
        btn.textContent = '전체화면 종료';
    } else {
        btn.textContent = '전체화면 시작';
    }
});

// 음성 피드백 볼륨 제어
let voiceVolume = 0.8;
function setVoiceVolume(val) {
    voiceVolume = parseFloat(val);
}
// 기존 speak 함수 수정
function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ko-KR';
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = voiceVolume;
        speechSynthesis.speak(utterance);
    }
} 