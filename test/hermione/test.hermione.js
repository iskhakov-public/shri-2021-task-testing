const { assert } = require('chai');

describe('Hermione Tests', async function () {
    it('Desktop', async function () {
        await this.browser.url('/hw/store');
        await this.browser.assertView('main', '#root', {
            compositeImage: true,
        });
    });

    it('Mobile', async function () {
        await this.browser.setWindowSize(375, 812);
        await this.browser.url('/hw/store');
        await this.browser.assertView('plain', '#root', {
            compositeImage: true,
        });
    });

    it('Product Item Page', async function () {
        await this.browser.url('/hw/store/catalog');
        const productId = await this.browser.$('.ProductItem').getAttribute('data-testid');
        const datailsLink = await this.browser.$('.ProductItem-DetailsLink');
        await datailsLink.click();
        const url = await this.browser.url();
        const urls = url.split('/');
        assert.equal(urls[urls.length - 1], productId);
    });

    it('Product Adds to Cart', async function () {
        await this.browser.url(('/hw/store/catalog'));
        await this.browser.$('.ProductItem-DetailsLink').click();
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.assertView('plain', '.CartBadge', {
            compositeImage: true
        });
    });

    it('Content Reload persistence', async function () {
        await this.browser.url('/hw/store/catalog');
        await this.browser.$('.ProductItem-DetailsLink').click();
        await this.browser.$('.ProductDetails-AddToCart').click();
        await this.browser.url('/hw/store/cart');
        await this.browser.url('/hw/store');
        await this.browser.url('/hw/store/cart');
        await this.browser.assertView('plain', '.Cart', {
            compositeImage: true,
        });
        await this.browser.$('.Cart-Clear').click();
    });

});