# 웹 퍼블리셔 포트폴리오

## NAS 서버

[http://base-css.woobi.co.kr/](http://base-css.woobi.co.kr/)

## 개발 환경 설정

### 필수 요구사항
- Node.js 24.14.0 이상

### 의존성 설치
```bash
npm install
```

## 개발

### SCSS 컴파일

#### 압축된 CSS 생성
```bash
npm run sass
```

#### 실시간 감지 모드 (개발용)
```bash
npm run sass:watch
```

### 빌드

프로덕션 빌드를 생성합니다 (난독화 + minify):

```bash
npm run build
```

빌드 결과물은 `deploy/` 폴더에 생성됩니다.

#### 빌드 과정
1. SCSS → CSS 컴파일 (압축)
2. HTML minify + robots meta 태그 자동 추가
3. CSS minify
4. JavaScript 난독화 + minify
5. 라이브러리 및 기타 리소스 복사
6. `deploy/` 폴더로 출력

#### 빌드에서 제외되는 항목
- `old/` 폴더
- `skill/` 폴더
- `node_modules/` 폴더
- SCSS 소스 파일

#### 난독화 제외 파일
다음 파일들은 난독화하지 않고 원본 그대로 복사됩니다:
- `assets/js/lib/**` (모든 라이브러리)
- `assets/js/html5shiv.js`
- `assets/js/IE9.js`
- `assets/js/ie11CustomProperties.min.js`

## 배포

깃허브 [Action 탭](https://github.com/gntcjswo/portfolio/actions)에서 현황 확인 가능합니다.  
해당 배포 시스템에서 에러가 나면 실 개발 서버에서도 에러가 난다는 뜻이오니 에러가 나진 않은지 확인 꼭 해주세요.

### 자동 배포 (권장)

- **[main]**  
  **_main_** 브랜치에 새로운 내용이 _push_ 가 되면,  
  _GIT Action_ 을 이용해 자동으로 빌드 후 `deploy/` 폴더 내용을 서버에 배포합니다.  
  별도로 빌드 및 FTP 접속, 전송을 하지 않아도 됩니다.  
  **_!! main 브랜치 관리에 유의 해주세요._**  
  관련 소스 : `.github/workflows/ftp-deploy.yml`

### 수동 배포

로컬에서 빌드 후 `deploy/` 폴더의 내용만 서버에 업로드합니다.
