## My Corona Status(KR) Check App

## 기능

- 국내 코로나 현황 확인 (2020/ 2021)
  - 국내 누적 확진자 (막대)
  - 월별 격리자 현황 (선)
  - 누적 확진, 해제, 사망 비율 (원형)
- 매 월 업데이트

## 실행방법

```
$ git clone https://github.com/shseok/corona19-Status.git
$ cd .\corona19-Status-Check\
$ npm install
$ npm start
```

## 실행과정

```
1. npx create-react-app .
   *현재 폴더(corona-19)에서 리액트 프로젝트가 생성

2. npm start
   *develpopment mode
   *loaclhost:3000 open

3. App.js, App.css 수정 / Contents.js, Header.js - Components 생성

4. axios 사용 - api GET
```

## 유용한 기능 및 도움받은 기능

> rafce -> snippet
>
> > react hook : useState(데이터를 담아 배열관리), useEffect(fetch API를 사용)
> >
> > > axios lib : for 'API 요청'
> > >
> > > > react-chartjs-2 : for 'chart'
> > > >
> > > > > chart.js 와 react chart.js 를 search해서 option들을 확인
> > > > >
> > > > > > POST (app): for 'API 데이터 확인'
> > > > > >
> > > > > > > covid19api.com : document on post (다양한 api를 제공한다)

## 주의사항

> use Effect 사용시 두 번째 인자에 빈 배열을 줄 것
>
> > react 코드의 tag에 클래스를 줄때 className으로 줄것
> >
> > > covid19api.com - 데이터의 시차가 존재 (단, 데이터의 수치는 국내에서 제공하는 것과 일치)

```
const fetchEvents = () => {
const res = axios.get("https://api.covid19api.com/total/dayone/country/kr")
console.log(res);
}
fetchEvents();
```

위 처럼 사용하면 res(데이터)가 불러오기 전에 호출하므로 promise가 console에 나타난다.

```
const fetchEvents = async() => {
            const res = await axios.get("https://api.covid19api.com/total/dayone/country/kr")
            console.log(res);
        }
        fetchEvents();
```

따라서 async와 await을 사용하여 해결할 수 있다.

다른 방법: 1. chaining을 사용 (ex.then) 2. fetch와 then을 이용해서 chaining을 사용

## 개선사항

- header에서 해외 option 선택시 해외 코로나 현황을 api를 통해 axios로 가져와서 보여주기

## 도움 받은 사이트 (ref)

https://github.com/axios/axios
https://ko.reactjs.org/docs/hooks-reference.html#useeffect
https://gist.github.com/ihoneymon/652be052a0727ad59601
https://www.chartjs.org/docs/latest/
https://github.com/reactchartjs/react-chartjs-2/pulls
https://developer.mozilla.org/en-US/docs/Web/CSS
https://daep93.tistory.com/7
https://covid19api.com/
