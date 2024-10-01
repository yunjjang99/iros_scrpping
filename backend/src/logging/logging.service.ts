import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class LoggingService {
  async logLoginNetworkRequests(): Promise<any> {
    console.log("호출");

    const browser = await puppeteer.launch({
      headless: false, // 브라우저를 실제로 띄우기
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // 크롬 설치 경로
      defaultViewport: null, // 전체 화면 보기 옵션 (필요에 따라)
      args: ['--start-maximized'], // 브라우저를 최대화하여 시작
    });
    
    const page = await browser.newPage();

    // 페이지 이동
    await page.goto('http://www.iros.go.kr/PMainJ.jsp', { waitUntil: 'networkidle0' });

    // 페이지의 HTML 가져오기
    const pageContent = await page.content();

    // HTML을 로그에 출력
    console.log("페이지 HTML:", pageContent);

    // 브라우저 닫기 (원한다면 주석 해제)
    // await browser.close();

    return { status: 'HTML이 성공적으로 로드되었습니다.', html: pageContent };
  }
}
