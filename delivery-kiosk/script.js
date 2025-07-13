// 전역 변수
let selectedCategory = '';
let selectedRestaurant = null;
let selectedAddress = '';
let selectedDeliveryTime = '';
let selectedDeliveryFee = '';
let selectedPayment = '';
let cart = [];
let currentCategory = 'main';

// 카테고리별 음식점 데이터
const restaurantData = {
    '한식': [
        { name: '한식당', description: '한식 전문점', deliveryTime: '35-45분', minOrder: 12000 },
        { name: '맛있는집', description: '가정식 한식', deliveryTime: '30-40분', minOrder: 15000 },
        { name: '전통한식', description: '전통 한식', deliveryTime: '40-50분', minOrder: 20000 },
        { name: '한끼한끼', description: '간편 한식', deliveryTime: '25-35분', minOrder: 10000 }
    ],
    '중식': [
        { name: '중국집', description: '중식 전문점', deliveryTime: '30-40분', minOrder: 10000 },
        { name: '만리장성', description: '고급 중식', deliveryTime: '35-45분', minOrder: 18000 },
        { name: '차이나타운', description: '전통 중식', deliveryTime: '40-50분', minOrder: 22000 },
        { name: '중화요리', description: '현대 중식', deliveryTime: '25-35분', minOrder: 12000 }
    ],
    '일식': [
        { name: '스시로', description: '일식 전문점', deliveryTime: '30-40분', minOrder: 25000 },
        { name: '우동집', description: '우동 전문점', deliveryTime: '25-35분', minOrder: 15000 },
        { name: '돈부리', description: '돈부리 전문', deliveryTime: '20-30분', minOrder: 12000 },
        { name: '라멘집', description: '라멘 전문점', deliveryTime: '25-35분', minOrder: 18000 }
    ],
    '치킨': [
        { name: '맛있는치킨', description: '치킨 전문점', deliveryTime: '30-40분', minOrder: 15000 },
        { name: '바삭치킨', description: '바삭한 치킨', deliveryTime: '25-35분', minOrder: 18000 },
        { name: '양념치킨', description: '양념 치킨', deliveryTime: '30-40분', minOrder: 20000 },
        { name: '치킨천국', description: '다양한 치킨', deliveryTime: '35-45분', minOrder: 22000 }
    ],
    '피자': [
        { name: '신선한피자', description: '피자 전문점', deliveryTime: '25-35분', minOrder: 18000 },
        { name: '도미노피자', description: '프리미엄 피자', deliveryTime: '30-40분', minOrder: 25000 },
        { name: '피자헛', description: '미국식 피자', deliveryTime: '25-35분', minOrder: 20000 },
        { name: '피자스쿨', description: '학생 피자', deliveryTime: '20-30분', minOrder: 15000 }
    ],
    '분식': [
        { name: '분식점', description: '분식 전문점', deliveryTime: '20-30분', minOrder: 8000 },
        { name: '떡볶이천국', description: '떡볶이 전문', deliveryTime: '15-25분', minOrder: 6000 },
        { name: '분식왕', description: '다양한 분식', deliveryTime: '25-35분', minOrder: 10000 },
        { name: '분식스쿨', description: '학생 분식', deliveryTime: '20-30분', minOrder: 7000 }
    ],
    '카페': [
        { name: '카페', description: '음료/디저트', deliveryTime: '15-25분', minOrder: 5000 },
        { name: '스타벅스', description: '프리미엄 커피', deliveryTime: '20-30분', minOrder: 8000 },
        { name: '투썸플레이스', description: '고급 카페', deliveryTime: '25-35분', minOrder: 12000 },
        { name: '이디야', description: '대중적 카페', deliveryTime: '15-25분', minOrder: 6000 }
    ]
};

// 메뉴 데이터 (기존 구조 유지하되 가격 차별화)
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
            { name: '치즈볼', price: 3000, icon: '🧀', description: '바삭한 치즈볼' },
            { name: '감자튀김', price: 2500, icon: '🍟', description: '바삭한 감자튀김' }
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
    '바삭치킨': {
        main: [
            { name: '후라이드치킨', price: 22000, icon: '🍗', description: '바삭한 후라이드치킨' },
            { name: '양념치킨', price: 24000, icon: '🍗', description: '매콤달콤 양념치킨' },
            { name: '간장치킨', price: 25000, icon: '🍗', description: '깊은 맛 간장치킨' },
            { name: '파닭', price: 28000, icon: '🍗', description: '파가 듬뿍 파닭' }
        ],
        side: [
            { name: '치킨무', price: 1500, icon: '🥕', description: '신선한 치킨무' },
            { name: '치즈볼', price: 3500, icon: '🧀', description: '바삭한 치즈볼' },
            { name: '감자튀김', price: 3000, icon: '🍟', description: '바삭한 감자튀김' }
        ],
        drink: [
            { name: '콜라', price: 2500, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 2500, icon: '🥤', description: '깔끔한 사이다' },
            { name: '맥주', price: 5000, icon: '🍺', description: '시원한 맥주' }
        ],
        dessert: [
            { name: '아이스크림', price: 4000, icon: '🍦', description: '달콤한 아이스크림' },
            { name: '치킨무', price: 1500, icon: '🥕', description: '신선한 치킨무' }
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
            { name: '치즈볼', price: 4000, icon: '🧀', description: '바삭한 치즈볼' },
            { name: '감자튀김', price: 3500, icon: '🍟', description: '바삭한 감자튀김' }
        ],
        drink: [
            { name: '콜라', price: 2000, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 2000, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '아이스크림', price: 3000, icon: '🍦', description: '달콤한 아이스크림' }
        ]
    },
    '도미노피자': {
        main: [
            { name: '페퍼로니피자', price: 28000, icon: '🍕', description: '매콤한 페퍼로니' },
            { name: '하와이안피자', price: 30000, icon: '🍕', description: '파인애플이 들어간 피자' },
            { name: '불고기피자', price: 32000, icon: '🍕', description: '한국식 불고기 피자' },
            { name: '치즈피자', price: 26000, icon: '🍕', description: '치즈가 듬뿍' }
        ],
        side: [
            { name: '치킨윙', price: 12000, icon: '🍗', description: '바삭한 치킨윙' },
            { name: '치즈볼', price: 6000, icon: '🧀', description: '바삭한 치즈볼' },
            { name: '감자튀김', price: 5000, icon: '🍟', description: '바삭한 감자튀김' }
        ],
        drink: [
            { name: '콜라', price: 3000, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 3000, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '아이스크림', price: 4000, icon: '🍦', description: '달콤한 아이스크림' }
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
            { name: '된장국', price: 3000, icon: '🍲', description: '구수한 된장국' },
            { name: '떡꼬치', price: 2500, icon: '🍡', description: '매콤달콤 떡꼬치' }
        ],
        drink: [
            { name: '막걸리', price: 4000, icon: '🍶', description: '구수한 막걸리' },
            { name: '소주', price: 3000, icon: '🍶', description: '깔끔한 소주' }
        ],
        dessert: [
            { name: '식혜', price: 2000, icon: '🍯', description: '달콤한 식혜' }
        ]
    },
    '맛있는집': {
        main: [
            { name: '김치찌개', price: 15000, icon: '🍲', description: '매콤한 김치찌개' },
            { name: '된장찌개', price: 14000, icon: '🍲', description: '구수한 된장찌개' },
            { name: '불고기', price: 18000, icon: '🥩', description: '맛있는 불고기' },
            { name: '제육볶음', price: 16000, icon: '🥩', description: '매콤달콤 제육볶음' }
        ],
        side: [
            { name: '김치', price: 3000, icon: '🥬', description: '신선한 김치' },
            { name: '된장국', price: 4000, icon: '🍲', description: '구수한 된장국' },
            { name: '떡꼬치', price: 3500, icon: '🍡', description: '매콤달콤 떡꼬치' }
        ],
        drink: [
            { name: '막걸리', price: 5000, icon: '🍶', description: '구수한 막걸리' },
            { name: '소주', price: 4000, icon: '🍶', description: '깔끔한 소주' }
        ],
        dessert: [
            { name: '식혜', price: 3000, icon: '🍯', description: '달콤한 식혜' }
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
    '만리장성': {
        main: [
            { name: '짜장면', price: 12000, icon: '🍜', description: '맛있는 짜장면' },
            { name: '짬뽕', price: 14000, icon: '🍜', description: '매콤한 짬뽕' },
            { name: '탕수육', price: 22000, icon: '🥩', description: '바삭한 탕수육' },
            { name: '깐풍기', price: 24000, icon: '🍗', description: '달콤한 깐풍기' }
        ],
        side: [
            { name: '군만두', price: 8000, icon: '🥟', description: '바삭한 군만두' },
            { name: '양장피', price: 18000, icon: '🥬', description: '신선한 양장피' }
        ],
        drink: [
            { name: '콜라', price: 3000, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 3000, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '단팥빵', price: 5000, icon: '🥖', description: '달콤한 단팥빵' }
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
    '떡볶이천국': {
        main: [
            { name: '떡볶이', price: 3000, icon: '🍡', description: '매콤달콤 떡볶이' },
            { name: '라면', price: 4000, icon: '🍜', description: '맛있는 라면' },
            { name: '김밥', price: 2500, icon: '🍙', description: '신선한 김밥' },
            { name: '순대', price: 5000, icon: '🥖', description: '구수한 순대' }
        ],
        side: [
            { name: '어묵', price: 1500, icon: '🍢', description: '맛있는 어묵' },
            { name: '튀김', price: 2500, icon: '🍤', description: '바삭한 튀김' }
        ],
        drink: [
            { name: '콜라', price: 1200, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 1200, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '아이스크림', price: 1500, icon: '🍦', description: '달콤한 아이스크림' }
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
    },
    '스타벅스': {
        main: [
            { name: '아메리카노', price: 6000, icon: '☕', description: '깔끔한 아메리카노' },
            { name: '카페라떼', price: 7000, icon: '☕', description: '부드러운 카페라떼' },
            { name: '카푸치노', price: 7500, icon: '☕', description: '거품이 풍부한 카푸치노' },
            { name: '모카', price: 8000, icon: '☕', description: '달콤한 모카' }
        ],
        side: [
            { name: '샌드위치', price: 12000, icon: '🥪', description: '신선한 샌드위치' },
            { name: '토스트', price: 8000, icon: '��', description: '바삭한 토스트' }
        ],
        drink: [
            { name: '아메리카노', price: 6000, icon: '☕', description: '깔끔한 아메리카노' },
            { name: '카페라떼', price: 7000, icon: '☕', description: '부드러운 카페라떼' },
            { name: '스무디', price: 9000, icon: '🥤', description: '시원한 스무디' }
        ],
        dessert: [
            { name: '티라미수', price: 12000, icon: '🍰', description: '부드러운 티라미수' },
            { name: '치즈케이크', price: 10000, icon: '🍰', description: '진한 치즈케이크' }
        ]
    },
    // 추가 음식점들의 메뉴
    '양념치킨': {
        main: [
            { name: '양념치킨', price: 25000, icon: '🍗', description: '매콤달콤 양념치킨' },
            { name: '후라이드치킨', price: 24000, icon: '🍗', description: '바삭한 후라이드치킨' },
            { name: '간장치킨', price: 26000, icon: '🍗', description: '깊은 맛 간장치킨' },
            { name: '파닭', price: 28000, icon: '🍗', description: '파가 듬뿍 파닭' }
        ],
        side: [
            { name: '치킨무', price: 2000, icon: '🥕', description: '신선한 치킨무' },
            { name: '치즈볼', price: 4000, icon: '🧀', description: '바삭한 치즈볼' },
            { name: '감자튀김', price: 3500, icon: '🍟', description: '바삭한 감자튀김' }
        ],
        drink: [
            { name: '콜라', price: 3000, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 3000, icon: '🥤', description: '깔끔한 사이다' },
            { name: '맥주', price: 6000, icon: '🍺', description: '시원한 맥주' }
        ],
        dessert: [
            { name: '아이스크림', price: 5000, icon: '🍦', description: '달콤한 아이스크림' },
            { name: '치킨무', price: 2000, icon: '🥕', description: '신선한 치킨무' }
        ]
    },
    '치킨천국': {
        main: [
            { name: '후라이드치킨', price: 26000, icon: '🍗', description: '바삭한 후라이드치킨' },
            { name: '양념치킨', price: 28000, icon: '🍗', description: '매콤달콤 양념치킨' },
            { name: '간장치킨', price: 29000, icon: '🍗', description: '깊은 맛 간장치킨' },
            { name: '파닭', price: 32000, icon: '🍗', description: '파가 듬뿍 파닭' }
        ],
        side: [
            { name: '치킨무', price: 2500, icon: '🥕', description: '신선한 치킨무' },
            { name: '치즈볼', price: 4500, icon: '🧀', description: '바삭한 치즈볼' },
            { name: '감자튀김', price: 4000, icon: '🍟', description: '바삭한 감자튀김' }
        ],
        drink: [
            { name: '콜라', price: 3500, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 3500, icon: '🥤', description: '깔끔한 사이다' },
            { name: '맥주', price: 7000, icon: '🍺', description: '시원한 맥주' }
        ],
        dessert: [
            { name: '아이스크림', price: 6000, icon: '🍦', description: '달콤한 아이스크림' },
            { name: '치킨무', price: 2500, icon: '🥕', description: '신선한 치킨무' }
        ]
    },
    '피자헛': {
        main: [
            { name: '페퍼로니피자', price: 24000, icon: '🍕', description: '매콤한 페퍼로니' },
            { name: '하와이안피자', price: 26000, icon: '🍕', description: '파인애플이 들어간 피자' },
            { name: '불고기피자', price: 28000, icon: '🍕', description: '한국식 불고기 피자' },
            { name: '치즈피자', price: 22000, icon: '🍕', description: '치즈가 듬뿍' }
        ],
        side: [
            { name: '치킨윙', price: 10000, icon: '🍗', description: '바삭한 치킨윙' },
            { name: '치즈볼', price: 5000, icon: '🧀', description: '바삭한 치즈볼' },
            { name: '감자튀김', price: 4000, icon: '🍟', description: '바삭한 감자튀김' }
        ],
        drink: [
            { name: '콜라', price: 2500, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 2500, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '아이스크림', price: 3500, icon: '🍦', description: '달콤한 아이스크림' }
        ]
    },
    '피자스쿨': {
        main: [
            { name: '페퍼로니피자', price: 18000, icon: '🍕', description: '매콤한 페퍼로니' },
            { name: '하와이안피자', price: 20000, icon: '🍕', description: '파인애플이 들어간 피자' },
            { name: '불고기피자', price: 22000, icon: '🍕', description: '한국식 불고기 피자' },
            { name: '치즈피자', price: 16000, icon: '🍕', description: '치즈가 듬뿍' }
        ],
        side: [
            { name: '치킨윙', price: 6000, icon: '🍗', description: '바삭한 치킨윙' },
            { name: '치즈볼', price: 3000, icon: '🧀', description: '바삭한 치즈볼' },
            { name: '감자튀김', price: 2500, icon: '🍟', description: '바삭한 감자튀김' }
        ],
        drink: [
            { name: '콜라', price: 1500, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 1500, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '아이스크림', price: 2500, icon: '🍦', description: '달콤한 아이스크림' }
        ]
    },
    '맛있는집': {
        main: [
            { name: '김치찌개', price: 15000, icon: '🍲', description: '매콤한 김치찌개' },
            { name: '된장찌개', price: 14000, icon: '🍲', description: '구수한 된장찌개' },
            { name: '불고기', price: 18000, icon: '🥩', description: '맛있는 불고기' },
            { name: '제육볶음', price: 16000, icon: '🥩', description: '매콤달콤 제육볶음' }
        ],
        side: [
            { name: '김치', price: 3000, icon: '🥬', description: '신선한 김치' },
            { name: '된장국', price: 4000, icon: '🍲', description: '구수한 된장국' },
            { name: '떡꼬치', price: 3500, icon: '🍡', description: '매콤달콤 떡꼬치' }
        ],
        drink: [
            { name: '막걸리', price: 5000, icon: '🍶', description: '구수한 막걸리' },
            { name: '소주', price: 4000, icon: '🍶', description: '깔끔한 소주' }
        ],
        dessert: [
            { name: '식혜', price: 3000, icon: '🍯', description: '달콤한 식혜' }
        ]
    },
    '전통한식': {
        main: [
            { name: '김치찌개', price: 20000, icon: '🍲', description: '매콤한 김치찌개' },
            { name: '된장찌개', price: 18000, icon: '🍲', description: '구수한 된장찌개' },
            { name: '불고기', price: 25000, icon: '🥩', description: '맛있는 불고기' },
            { name: '제육볶음', price: 22000, icon: '🥩', description: '매콤달콤 제육볶음' }
        ],
        side: [
            { name: '김치', price: 5000, icon: '🥬', description: '신선한 김치' },
            { name: '된장국', price: 6000, icon: '🍲', description: '구수한 된장국' }
        ],
        drink: [
            { name: '막걸리', price: 8000, icon: '🍶', description: '구수한 막걸리' },
            { name: '소주', price: 6000, icon: '🍶', description: '깔끔한 소주' }
        ],
        dessert: [
            { name: '식혜', price: 4000, icon: '🍯', description: '달콤한 식혜' }
        ]
    },
    '한끼한끼': {
        main: [
            { name: '김치찌개', price: 10000, icon: '🍲', description: '매콤한 김치찌개' },
            { name: '된장찌개', price: 9000, icon: '🍲', description: '구수한 된장찌개' },
            { name: '불고기', price: 12000, icon: '🥩', description: '맛있는 불고기' },
            { name: '제육볶음', price: 11000, icon: '🥩', description: '매콤달콤 제육볶음' }
        ],
        side: [
            { name: '김치', price: 1500, icon: '🥬', description: '신선한 김치' },
            { name: '된장국', price: 2000, icon: '🍲', description: '구수한 된장국' }
        ],
        drink: [
            { name: '막걸리', price: 3000, icon: '🍶', description: '구수한 막걸리' },
            { name: '소주', price: 2500, icon: '🍶', description: '깔끔한 소주' }
        ],
        dessert: [
            { name: '식혜', price: 1500, icon: '🍯', description: '달콤한 식혜' }
        ]
    },
    '차이나타운': {
        main: [
            { name: '짜장면', price: 15000, icon: '🍜', description: '맛있는 짜장면' },
            { name: '짬뽕', price: 17000, icon: '🍜', description: '매콤한 짬뽕' },
            { name: '탕수육', price: 28000, icon: '🥩', description: '바삭한 탕수육' },
            { name: '깐풍기', price: 30000, icon: '🍗', description: '달콤한 깐풍기' }
        ],
        side: [
            { name: '군만두', price: 10000, icon: '🥟', description: '바삭한 군만두' },
            { name: '양장피', price: 22000, icon: '🥬', description: '신선한 양장피' }
        ],
        drink: [
            { name: '콜라', price: 4000, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 4000, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '단팥빵', price: 6000, icon: '🥖', description: '달콤한 단팥빵' }
        ]
    },
    '중화요리': {
        main: [
            { name: '짜장면', price: 13000, icon: '🍜', description: '맛있는 짜장면' },
            { name: '짬뽕', price: 15000, icon: '🍜', description: '매콤한 짬뽕' },
            { name: '탕수육', price: 25000, icon: '🥩', description: '바삭한 탕수육' },
            { name: '깐풍기', price: 27000, icon: '🍗', description: '달콤한 깐풍기' }
        ],
        side: [
            { name: '군만두', price: 9000, icon: '🥟', description: '바삭한 군만두' },
            { name: '양장피', price: 20000, icon: '🥬', description: '신선한 양장피' }
        ],
        drink: [
            { name: '콜라', price: 3500, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 3500, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '단팥빵', price: 5500, icon: '🥖', description: '달콤한 단팥빵' }
        ]
    },
    '스시로': {
        main: [
            { name: '초밥세트', price: 30000, icon: '🍣', description: '신선한 초밥 세트' },
            { name: '우동', price: 18000, icon: '🍜', description: '맛있는 우동' },
            { name: '라멘', price: 20000, icon: '🍜', description: '진한 라멘' },
            { name: '돈부리', price: 22000, icon: '🍱', description: '푸짐한 돈부리' }
        ],
        side: [
            { name: '미소국', price: 5000, icon: '🍲', description: '구수한 미소국' },
            { name: '가라아게', price: 12000, icon: '🍗', description: '바삭한 가라아게' }
        ],
        drink: [
            { name: '녹차', price: 3000, icon: '🍵', description: '깔끔한 녹차' },
            { name: '우롱차', price: 4000, icon: '🍵', description: '향긋한 우롱차' }
        ],
        dessert: [
            { name: '모찌', price: 6000, icon: '🍡', description: '달콤한 모찌' }
        ]
    },
    '우동집': {
        main: [
            { name: '우동', price: 15000, icon: '🍜', description: '맛있는 우동' },
            { name: '라멘', price: 18000, icon: '🍜', description: '진한 라멘' },
            { name: '돈부리', price: 12000, icon: '🍱', description: '푸짐한 돈부리' },
            { name: '초밥세트', price: 25000, icon: '🍣', description: '신선한 초밥 세트' }
        ],
        side: [
            { name: '미소국', price: 3000, icon: '🍲', description: '구수한 미소국' },
            { name: '가라아게', price: 8000, icon: '🍗', description: '바삭한 가라아게' }
        ],
        drink: [
            { name: '녹차', price: 2000, icon: '🍵', description: '깔끔한 녹차' },
            { name: '우롱차', price: 3000, icon: '🍵', description: '향긋한 우롱차' }
        ],
        dessert: [
            { name: '모찌', price: 4000, icon: '🍡', description: '달콤한 모찌' }
        ]
    },
    '돈부리': {
        main: [
            { name: '돈부리', price: 12000, icon: '🍱', description: '푸짐한 돈부리' },
            { name: '우동', price: 12000, icon: '🍜', description: '맛있는 우동' },
            { name: '라멘', price: 15000, icon: '🍜', description: '진한 라멘' },
            { name: '초밥세트', price: 20000, icon: '🍣', description: '신선한 초밥 세트' }
        ],
        side: [
            { name: '미소국', price: 2000, icon: '🍲', description: '구수한 미소국' },
            { name: '가라아게', price: 6000, icon: '🍗', description: '바삭한 가라아게' }
        ],
        drink: [
            { name: '녹차', price: 1500, icon: '🍵', description: '깔끔한 녹차' },
            { name: '우롱차', price: 2500, icon: '🍵', description: '향긋한 우롱차' }
        ],
        dessert: [
            { name: '모찌', price: 3000, icon: '🍡', description: '달콤한 모찌' }
        ]
    },
    '라멘집': {
        main: [
            { name: '라멘', price: 18000, icon: '🍜', description: '진한 라멘' },
            { name: '우동', price: 16000, icon: '🍜', description: '맛있는 우동' },
            { name: '돈부리', price: 14000, icon: '🍱', description: '푸짐한 돈부리' },
            { name: '초밥세트', price: 28000, icon: '🍣', description: '신선한 초밥 세트' }
        ],
        side: [
            { name: '미소국', price: 4000, icon: '🍲', description: '구수한 미소국' },
            { name: '가라아게', price: 10000, icon: '🍗', description: '바삭한 가라아게' }
        ],
        drink: [
            { name: '녹차', price: 2500, icon: '🍵', description: '깔끔한 녹차' },
            { name: '우롱차', price: 3500, icon: '🍵', description: '향긋한 우롱차' }
        ],
        dessert: [
            { name: '모찌', price: 5000, icon: '🍡', description: '달콤한 모찌' }
        ]
    },
    '분식왕': {
        main: [
            { name: '떡볶이', price: 5000, icon: '🍡', description: '매콤달콤 떡볶이' },
            { name: '라면', price: 6000, icon: '🍜', description: '맛있는 라면' },
            { name: '김밥', price: 4000, icon: '🍙', description: '신선한 김밥' },
            { name: '순대', price: 7000, icon: '🥖', description: '구수한 순대' }
        ],
        side: [
            { name: '어묵', price: 2500, icon: '🍢', description: '맛있는 어묵' },
            { name: '튀김', price: 3500, icon: '🍤', description: '바삭한 튀김' }
        ],
        drink: [
            { name: '콜라', price: 2000, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 2000, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '아이스크림', price: 2500, icon: '🍦', description: '달콤한 아이스크림' }
        ]
    },
    '분식스쿨': {
        main: [
            { name: '떡볶이', price: 3500, icon: '🍡', description: '매콤달콤 떡볶이' },
            { name: '라면', price: 4500, icon: '🍜', description: '맛있는 라면' },
            { name: '김밥', price: 2800, icon: '🍙', description: '신선한 김밥' },
            { name: '순대', price: 5500, icon: '🥖', description: '구수한 순대' }
        ],
        side: [
            { name: '어묵', price: 1800, icon: '🍢', description: '맛있는 어묵' },
            { name: '튀김', price: 2800, icon: '🍤', description: '바삭한 튀김' }
        ],
        drink: [
            { name: '콜라', price: 1300, icon: '🥤', description: '시원한 콜라' },
            { name: '사이다', price: 1300, icon: '🥤', description: '깔끔한 사이다' }
        ],
        dessert: [
            { name: '아이스크림', price: 1800, icon: '🍦', description: '달콤한 아이스크림' }
        ]
    },
    '투썸플레이스': {
        main: [
            { name: '아메리카노', price: 5500, icon: '☕', description: '깔끔한 아메리카노' },
            { name: '카페라떼', price: 6500, icon: '☕', description: '부드러운 카페라떼' },
            { name: '카푸치노', price: 7000, icon: '☕', description: '거품이 풍부한 카푸치노' },
            { name: '모카', price: 7500, icon: '☕', description: '달콤한 모카' }
        ],
        side: [
            { name: '샌드위치', price: 10000, icon: '🥪', description: '신선한 샌드위치' },
            { name: '토스트', price: 7000, icon: '🍞', description: '바삭한 토스트' }
        ],
        drink: [
            { name: '아메리카노', price: 5500, icon: '☕', description: '깔끔한 아메리카노' },
            { name: '카페라떼', price: 6500, icon: '☕', description: '부드러운 카페라떼' },
            { name: '스무디', price: 8000, icon: '🥤', description: '시원한 스무디' }
        ],
        dessert: [
            { name: '티라미수', price: 10000, icon: '🍰', description: '부드러운 티라미수' },
            { name: '치즈케이크', price: 9000, icon: '🍰', description: '진한 치즈케이크' }
        ]
    },
    '이디야': {
        main: [
            { name: '아메리카노', price: 3500, icon: '☕', description: '깔끔한 아메리카노' },
            { name: '카페라떼', price: 4500, icon: '☕', description: '부드러운 카페라떼' },
            { name: '카푸치노', price: 5000, icon: '☕', description: '거품이 풍부한 카푸치노' },
            { name: '모카', price: 5500, icon: '☕', description: '달콤한 모카' }
        ],
        side: [
            { name: '샌드위치', price: 7000, icon: '🥪', description: '신선한 샌드위치' },
            { name: '토스트', price: 5000, icon: '🍞', description: '바삭한 토스트' }
        ],
        drink: [
            { name: '아메리카노', price: 3500, icon: '☕', description: '깔끔한 아메리카노' },
            { name: '카페라떼', price: 4500, icon: '☕', description: '부드러운 카페라떼' },
            { name: '스무디', price: 6000, icon: '🥤', description: '시원한 스무디' }
        ],
        dessert: [
            { name: '티라미수', price: 7000, icon: '🍰', description: '부드러운 티라미수' },
            { name: '치즈케이크', price: 6000, icon: '🍰', description: '진한 치즈케이크' }
        ]
    }
};

// 배달비 정보
const deliveryFees = {
    'free': { name: '무료배달', price: 0, condition: '30,000원 이상' },
    'fast': { name: '빠른배달', price: 3000, condition: '빠른 배달' }
};

// DOM 요소들
const categorySection = document.getElementById('categorySection');
const restaurantSection = document.getElementById('restaurantSection');
const restaurantGrid = document.getElementById('restaurantGrid');
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

// 카테고리 선택
function selectCategory(category) {
    // 이전 선택 해제
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 현재 카테고리 선택
    event.target.closest('.category-item').classList.add('selected');
    selectedCategory = category;
    
    // 음식점 섹션 표시
    displayRestaurants(category);
    restaurantSection.style.display = 'block';
    
    speak(`${category} 카테고리가 선택되었습니다. 음식점을 선택해주세요.`);
}

// 음식점 표시
function displayRestaurants(category) {
    if (!restaurantData[category]) return;
    
    const restaurants = restaurantData[category];
    restaurantGrid.innerHTML = '';
    
    restaurants.forEach(restaurant => {
        const restaurantItem = document.createElement('div');
        restaurantItem.className = 'restaurant-item';
        restaurantItem.onclick = () => selectRestaurant(restaurant.name);
        
        restaurantItem.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p>${restaurant.description}</p>
            <p class="delivery-time">배달시간: ${restaurant.deliveryTime}</p>
            <p class="min-order">최소주문: ${restaurant.minOrder.toLocaleString()}원</p>
        `;
        
        restaurantGrid.appendChild(restaurantItem);
    });
}

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
    // 결제 버튼 표시/숨김
    const payBtn = document.querySelector('.pay-btn');
    console.log('결제 버튼 조건 확인:', { cartLength: cart.length, selectedDeliveryFee, cart });
    if (cart.length > 0 && selectedDeliveryFee) {
        payBtn.style.display = 'inline-block';
        console.log('결제 버튼 표시됨');
    } else {
        payBtn.style.display = 'none';
        console.log('결제 버튼 숨김됨');
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
    console.log('배달 시간 선택:', time);
    
    // 이전 선택 해제
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // 현재 시간 선택
    event.target.classList.add('selected');
    selectedDeliveryTime = time;
    
    // 배달비 타입 설정
    selectedDeliveryFee = time;
    console.log('selectedDeliveryFee 설정:', selectedDeliveryFee);
    
    // 빠른배달 선택 시 장바구니에 3000원 추가
    if (time === 'fast') {
        const fastDeliveryItem = {
            name: '빠른배달',
            price: 3000,
            quantity: 1,
            icon: '🛵',
            type: '배달비'
        };
        
        // 기존 빠른배달 항목이 있으면 제거
        cart = cart.filter(item => item.name !== '빠른배달');
        cart.push(fastDeliveryItem);
        console.log('빠른배달 추가됨, 장바구니:', cart);
        updateCartDisplay();
        
        // 결제 버튼 직접 표시
        const payBtn = document.querySelector('.pay-btn');
        payBtn.style.display = 'inline-block';
        
        speak('빠른배달이 선택되었습니다. 3,000원이 추가되었습니다. 결제를 진행해주세요.');
    } else if (time === 'free') {
        // 무료배달 선택 시 기존 빠른배달 항목 제거
        cart = cart.filter(item => item.name !== '빠른배달');
        console.log('무료배달 선택됨, 장바구니:', cart);
        updateCartDisplay();
        
        // 결제 버튼 직접 표시
        const payBtn = document.querySelector('.pay-btn');
        payBtn.style.display = 'inline-block';
        
        speak('무료배달이 선택되었습니다. 결제를 진행해주세요.');
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
    
    // 배달비를 장바구니에 추가/제거
    if (feeType === 'fast') {
        // 빠른배달 선택 시 장바구니에 3000원 추가
        const fastDeliveryItem = {
            name: '빠른배달',
            price: 3000,
            quantity: 1,
            icon: '🛵',
            type: '배달비'
        };
        
        // 기존 빠른배달 항목이 있으면 제거
        cart = cart.filter(item => item.name !== '빠른배달');
        cart.push(fastDeliveryItem);
    } else if (feeType === 'free') {
        // 무료배달 선택 시 기존 빠른배달 항목 제거
        cart = cart.filter(item => item.name !== '빠른배달');
    }
    
    updateCartDisplay();
    
    speak(`${deliveryFees[feeType].name}이 선택되었습니다. 결제를 진행해주세요.`);
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
    
    // 메뉴 금액 계산 (배달비 제외)
    const menuItems = cart.filter(item => item.type !== '배달비');
    const subtotal = menuItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // 배달비 계산
    const deliveryItems = cart.filter(item => item.type === '배달비');
    const deliveryFee = deliveryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
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
    
    // 주문 내역 (배달비 포함)
    orderSummary.innerHTML = cart.map(item => 
        `<p>${item.icon} ${item.name} ${item.quantity}개 - ${(item.price * item.quantity).toLocaleString()}원</p>`
    ).join('');
    
    // 배달 정보
    const deliveryFeeText = selectedDeliveryFee === 'fast' ? '빠른배달 (3,000원)' : '무료배달 (0원)';
    deliverySummary.innerHTML = `
        <p>🏪 ${selectedRestaurant}</p>
        <p>📍 ${selectedAddress || '주소 미입력'}</p>
        <p>💰 ${deliveryFeeText}</p>
    `;
    
    // 결제 정보
    const paymentMethods = {
        'card': '신용카드',
        'cash': '현금결제',
        'mobile': '모바일결제'
    };
    paymentSummary.innerHTML = `
        <p>💳 ${paymentMethods[selectedPayment] || '신용카드'} 결제</p>
    `;
    
    // 총 금액
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
    selectedCategory = '';
    selectedRestaurant = null;
    selectedAddress = '';
    selectedDeliveryTime = '';
    selectedDeliveryFee = '';
    selectedPayment = '';
    currentCategory = 'main';
    
    // 모든 섹션 숨기기
    categorySection.style.display = 'block';
    restaurantSection.style.display = 'none';
    menuSection.style.display = 'none';
    deliverySection.style.display = 'none';
    deliveryFeeSection.style.display = 'none';
    paymentSection.style.display = 'none';
    completeSection.style.display = 'none';
    
    // 선택 해제
    document.querySelectorAll('.category-item, .restaurant-item, .time-btn, .fee-option, .payment-option').forEach(item => {
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

function goToPayment() {
    console.log('goToPayment 호출됨');
    console.log('장바구니 상태:', cart);
    console.log('selectedDeliveryFee:', selectedDeliveryFee);
    
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다.');
        speak('장바구니가 비어있습니다.');
        return;
    }
    
    if (!selectedDeliveryFee) {
        alert('배달비를 먼저 선택해주세요.');
        speak('배달비를 먼저 선택해주세요.');
        return;
    }
    
    // 결제 방법 섹션 표시
    console.log('결제 방법 섹션 표시 전:', paymentSection.style.display);
    paymentSection.style.display = 'block';
    console.log('결제 방법 섹션 표시 후:', paymentSection.style.display);
    
    // 다른 섹션들 숨기기
    deliverySection.style.display = 'none';
    deliveryFeeSection.style.display = 'none';
    
    speak('결제 방법을 선택해주세요.');
    console.log('결제 방법 선택 안내 완료');
}