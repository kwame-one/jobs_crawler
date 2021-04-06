const puppeteer = require('puppeteer');
import {db} from './db'

export const jobberman = async (number=1) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.jobberman.com.gh/jobs?sort_by=latest&page=${number}`, {waitUntil: 'networkidle2'});
   
    await page.waitForSelector('.top-jobs-if-container');

    const jobs = await page.evaluate(() => {
        const articles = document.querySelectorAll('article.search-result:not(.group)')

        let items = [];

        articles.forEach((article, index) => {
         
            items.push({
                'role': article.querySelector('a h3').innerText,
                'company': article.querySelector('.search-result__job-meta').innerText,
                'location': article.querySelector('.search-result__location').innerText,
                'employment_type': article.querySelector('.search-result__job-type').innerText,
                'job_function': article.querySelector('.search-result__job-function span').innerText,
                'salary': article.querySelector('.search-result__job-salary').innerText,
                'link': article.querySelector('a.search-result__job-title').href
            })
            
        })

        return items;
    });

    let connection = await db();
  
    jobs.forEach(async (job) => {
        connection.query('SELECT id FROM `news` WHERE `link` = ?', [job.link], async(err, results, fields) => {
            if(results.length == 0) {
                await connection.query('INSERT INTO news SET ?', job);
            }
        }); 
    })

    await browser.close();

    console.log('done');

}

