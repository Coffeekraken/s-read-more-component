# Coffeekraken s-read-more-component <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<a href="https://travis-ci.org/Coffeekraken/s-read-more-component">
		<img src="https://img.shields.io/travis/Coffeekraken/s-read-more-component.svg?style=flat-square" />
	</a>
	<a href="https://www.npmjs.com/package/coffeekraken-s-read-more-component">
		<img src="https://img.shields.io/npm/v/coffeekraken-s-read-more-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-read-more-component/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-s-read-more-component.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken/s-read-more-component">
		<img src="https://img.shields.io/npm/dt/coffeekraken-s-read-more-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-read-more-component">
		<img src="https://img.shields.io/github/forks/coffeekraken/s-read-more-component.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-read-more-component">
		<img src="https://img.shields.io/github/stars/coffeekraken/s-read-more-component.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/coffeekrakenio">
		<img src="https://img.shields.io/twitter/url/http/coffeekrakenio.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

Simple tag to easly crop and reveal some contents. The display style is totaly up to you...

[![View demo](http://components.coffeekraken.io/assets/img/view-demo.png)](http://components.coffeekraken.io/app/s-read-more-component)

## Table of content

1. **[Demo](http://components.coffeekraken.io/app/s-read-more-component)**
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [Javascript API](doc/js)
5. [SASS API](doc/sass)
6. [Sugar Web Components Documentation](https://github.com/Coffeekraken/sugar/blob/master/doc/js/webcomponents.md)
7. [Browsers support](#readme-browsers-support)
8. [Contribute](#readme-contribute)
9. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
10. [Licence](#readme-license)

<a name="readme-install"></a>
## Install

```
npm install coffeekraken-s-read-more-component --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import SReadMoreComponent from 'coffeekraken-s-read-more-component'
```

Then simply use it inside your html like so:

```html
<s-read-more more="More..." less="Less..." threshold="100">
	<p class="p m-b">
		Nulla tincidunt convallis vehicula. Morbi molestie, arcu eleifend elementum faucibus, sapien diam faucibus sem, ac commodo metus dolor eget odio. Suspendisse et nulla lectus. Mauris facilisis, nulla in maximus lacinia, justo nisi dapibus nibh, quis volutpat neque nulla in ipsum. Pellentesque fermentum lectus eros, nec interdum nisi porttitor non. Suspendisse.
	</p>
	<p class="p m-b">
		Nulla tincidunt convallis vehicula. Morbi molestie, arcu eleifend elementum faucibus, sapien diam faucibus sem, ac commodo metus dolor eget odio. Suspendisse et nulla lectus. Mauris facilisis, nulla in maximus lacinia, justo nisi dapibus nibh, quis volutpat neque nulla in ipsum. Pellentesque fermentum lectus eros, nec interdum nisi porttitor non. Suspendisse.
	</p>
	<p class="p m-b">
		Nulla tincidunt convallis vehicula. Morbi molestie, arcu eleifend elementum faucibus, sapien diam faucibus sem, ac commodo metus dolor eget odio. Suspendisse et nulla lectus. Mauris facilisis, nulla in maximus lacinia, justo nisi dapibus nibh, quis volutpat neque nulla in ipsum. Pellentesque fermentum lectus eros, nec interdum nisi porttitor non. Suspendisse.
	</p>
</s-read-more>
```

Then style your read more like so (just an example):

```scss
s-read-more {
	overflow: hidden;
	// width: 500px;
	max-height: 150px;
	position: relative;
	display: block;
	padding-bottom: 20px;
	transition: all .2s ease-in-out;
}
s-read-more:before {
	content: '';
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 100px;
	background: linear-gradient(to top, white 30px, transparent);
	transition: all .2s ease-in-out;
}
s-read-more:after {
	display: block;
	position: absolute;
	bottom: 0;
	width: 100%;
	content: attr(more);
	color: red;
	cursor: pointer;
}
s-read-more[disabled] {
	max-height:none;
	&:before, &:after {
		display:none;
	}
}
s-read-more[active]:before {
	height: 0;
}
s-read-more[active]:after {
	content: attr(less);
}
```

<a id="readme-browsers-support"></a>
## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| --------- | --------- | --------- | --------- |
| IE11+ | last 2 versions| last 2 versions| last 2 versions

> As browsers are automatically updated, we will keep as reference the last two versions of each but this component can work on older ones as well.

> The webcomponent API (custom elements, shadowDOM, etc...) is not supported in some older browsers like IE10, etc... In order to make them work, you will need to integrate the [corresponding polyfill](https://www.webcomponents.org/polyfills).

<a id="readme-contribute"></a>
## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>
## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.  

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>
## License

The code is available under the [MIT license](LICENSE.txt). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...
