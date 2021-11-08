const { assert } = require('chai')

/* 
const {width, height} = await browser.getWindowSize();
await browser.setWindowSize(520, Math.max(height, 1440));

Общие требования:
[x] вёрстка должна адаптироваться под ширину экрана
[x] в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину
[x] название магазина в шапке должно быть ссылкой на главную страницу
[x] на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"
[x]   при выборе элемента из меню "гамбургера", меню должно закрываться

Страницы:
[ ] в магазине должны быть страницы: главная, каталог, условия доставки, контакты
[x] страницы главная, условия доставки, контакты должны иметь статическое содержимое

Каталог:
[x] в каталоге должны отображаться товары, список которых приходит с сервера
[x] для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре
[x] на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"
[x] если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом
[ ] если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество
[x] содержимое корзины должно сохраняться между перезагрузками страницы

Корзина:
[x] в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней
[x] в корзине должна отображаться таблица с добавленными в нее товарами
[x] для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа
[ ] в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться
[ ] если корзина пустая, должна отображаться ссылка на каталог товаров
*/


describe("Корзина", async function() {
    const cartEmpty = async function () {
        await this.browser.url('/hw/store/catalog/1');
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.url('/hw/store/cart');
        const cart = await this.browser.$('.Cart');
        await cart.waitForExist();

        const button = await this.browser.$('.Cart-Clear')
        await button.click()
        // await catalog.scrollIntoView();
        await this.browser.assertView('plain', '.Cart', {
            // compositeImage: true,
            // allowViewportOverflow: true,
            // screenshotDelay: 0.3,
            // ignoreElements: ['.card-title', '.card-text', '.card-link']
        })
    }

    it('пустая корзина', cartEmpty)

    it('пустая корзина (мобильная)', withMobile(cartEmpty))


    it('сохранение состояния после перезагрузки', async function () {
        await this.browser.url('/hw/store/catalog');
        const product = await this.browser.$('.ProductItem-DetailsLink');
        await product.waitForExist()
        await product.click();
        const addLink = await this.browser.$('.ProductDetails-AddToCart');
        await addLink.waitForExist()
        await addLink.click();
        await addLink.click();
        await this.browser.url('/hw/store/cart');
        await this.browser.url('/hw/store');
        await this.browser.url('/hw/store/cart');
        await this.browser.assertView('plain', '#root', {
            compositeImage: true,
        });
        // await this.browser.$('.Cart-Clear').click();
    });
})

describe('Каталог', async function () {
    const catalog = async function () {
        await this.browser.url('/hw/store/catalog');
        const catalog = await this.browser.$('.Catalog');
        await catalog.waitForExist();

        const card = await this.browser.$('.ProductItem')
        await card.waitForExist()
        // await catalog.scrollIntoView();
        await this.browser.assertView('plain', '.Catalog', {
            // compositeImage: true,
            allowViewportOverflow: true,
            // screenshotDelay: 0.3,
            // ignoreElements: ['.card-title', '.card-text', '.card-link']
        })
    }

    it("компонент каталога (настольный)", catalog)

    it("компонент каталога (мобильный)", withMobile(catalog))


    const product = async function () {
        await this.browser.url('/hw/store/catalog/1')

        const card = await this.browser.$('.Product')
        await card.waitForExist()
        await card.scrollIntoView();
        await this.browser.assertView('plain', '.Product', {
            compositeImage: true,
            // allowViewportOverflow: true,
            // screenshotDelay: 0.3,
            // ignoreElements: ['.card-title', '.card-text', '.card-link']
        })
    }

    it("страница продукта (настольный)", product)

    it("страница продукта (мобильный)", withMobile(product))

    const addtocard = async function () {
        await this.browser.url('/hw/store/catalog/1');
        const button = await this.browser.$('.ProductDetails-AddToCart');
        await button.waitForExist()
        await button.click();
        await this.browser.assertView('plain', '#root', {
            compositeImage: true,
            // allowViewportOverflow: true,
            // screenshotDelay: 0.3,
            // ignoreElements: ['.card-title', '.card-text', '.card-link']
        })
    }

    it("при нажатии на 'добавить в корзину'", addtocard)
})

describe('Страницы', async function () {
    const staticpage = function (pageUrl, selector) {
        return async function () {
            await this.browser.url(`store/${pageUrl}`)
            await this.browser.assertView('plain', selector, {
                compositeImage: true
            })
        }
    }

    it('доставка (настольная)', staticpage('delivery', '.Delivery'))

    it('доставка (мобильная)', withMobile(staticpage('delivery', '.Delivery')))

    it('главная (настольная)', staticpage('', '.Home'))

    it('главная (мобильная)', withMobile(staticpage('', '.Home')))

    it('контакты (настольная)', staticpage('contacts', '.Contacts'))

    it('контакты (мобильная)', withMobile(staticpage('contacts', '.Contacts')))
})

describe('Общие требования', async function () {
    const home = async function () {
        await this.browser.url('/hw/store');
        await this.browser.assertView('desktop', '#root', {
            compositeImage: true,
        })
    }


    it('настольная версия', home)

    it('мобильная версия', withMobile(home))

    it('навигация настольная', async function () {
        await this.browser.url('/hw/store');
        await this.browser.assertView('desktop', 'div.container:nth-child(1)', {
            compositeImage: true
        })
    })

    it('навигация мобильная (гамбургер)', async function () {
        const { height, width } = await this.browser.getWindowSize();
        await this.browser.setWindowSize(520, Math.max(height, 1440));
        await this.browser.url('/hw/store');
        const button = await this.browser.$(".Application-Toggler")
        await button.click()
        await this.browser.assertView('mobile', 'div.container:nth-child(1)')
        await this.browser.setWindowSize(width, height);
    })

    it('навигация мобильная (закрытие гамбургера при нажатии)', async function () {
        const { height, width } = await this.browser.getWindowSize();
        await this.browser.setWindowSize(520, Math.max(height, 1440));
        await this.browser.url('/hw/store');
        const button = await this.browser.$(".Application-Toggler")
        await button.click()
        await button.click()
        await this.browser.assertView('mobile', 'div.container:nth-child(1)')
        await this.browser.setWindowSize(width, height);
    })

    it('навигация мобильная (закрытие по клику на ссылке)', async function () {
        const { height } = await this.browser.getWindowSize();
        await this.browser.setWindowSize(520, Math.max(height, 1440));
        await this.browser.url('/hw/store');
        const button = await this.browser.$('.Application-Toggler');
        await button.click();
        const link = await this.browser.$('.nav-link');
        await link.click();
        const nav = await this.browser.$('.navbar-nav');
        await nav.waitUntil(async function () {
            return await nav.isDisplayed() === false;
        }, {
            timeout: 5000,
            timeoutMsg: 'navbar is displayed after close',
        });

    });

})


function withMobile(check) {
    return async function () {
        const { width, height } = await this.browser.getWindowSize();
        await this.browser.setWindowSize(520, Math.max(height, 1440));
        try {
            await check.call(this)
        } finally {
            await this.browser.setWindowSize(width, height);
        }
    }
}