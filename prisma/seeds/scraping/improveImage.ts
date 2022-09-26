import puppeteer from "puppeteer";

const DEFAULT_URL: string = "https://www.amazon.com.br/s?k="

const amzImageImprover
    = async (url = DEFAULT_URL) => {

        const browser = await puppeteer.launch({
            headless: false, //false para abrir a janela do navegador
        });
        const page = await browser.newPage();

        // seta o tamanho da tela
        await page.setViewport({ width: 1920, height: 1080 });

        // acessa a url
        await page.goto(url + '365 Historias Biblicas', { waitUntil: 'domcontentloaded' });

        //faz a pagina rolar até o final para carregar todos os livros
        await new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 100;
            const timer = setInterval(async () => {
                const scrollHeight = await page.evaluate('document.body.scrollHeight');
                await page.evaluate('window.scrollBy(0, document.body.scrollHeight)');;
                totalHeight += distance;

                const noMoreContent = totalHeight >= scrollHeight;

                //Para o interval e resolve a promise quando chega no final do inifinity scroll
                if (noMoreContent) {
                    clearInterval(timer);
                    resolve(true);
                }

            }, 100);

        });

        //pega os titulos dos livros
        const titles = await page.$$eval('.a-link-normal span div', (links) => {
            const data = links.map((link) => {
                return link.textContent
            })
            return data
        })

        browser.close();

        return titles;

    }

export default amzImageImprover
