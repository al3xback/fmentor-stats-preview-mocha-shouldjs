import should from 'should';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-stats-preview-mocha-shouldjs/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have an image element to describe card content', () => {
		const imgEl = document.querySelector('img');

		should.exist(imgEl);
	});

	it('should have a templates status which value is equal or more than 300', () => {
		const cardStatListItemElements = document.querySelectorAll(
			'.card__stats-list-item'
		);
		const cardTemplatesStatusValue =
			+cardStatListItemElements[1].querySelector('.num').textContent;

		cardTemplatesStatusValue.should.be.aboveOrEqual(300);
	});

	it('should have three status list item elements', () => {
		const cardStatListItemElements = document.querySelectorAll(
			'.card__stats-list-item'
		);

		cardStatListItemElements.should.have.length(3);
	});
});
