module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-read-more-component',

	// layout
	layout : 'right',

	// compile server
	compileServer : {

		// compile server port
		port : 4000

	},

	// editors
	editors : {
		html : {
			language : 'html',
			data : `
				<h1 class="h3 m-b-small">
					Coffeekraken s-read-more-component
				</h1>
				<p class="p m-b-bigger">
					Simple tag to easly crop and reveal some contents. The display style is totaly up to you... <br>
					<strong class="strong">Resize your window if you don't see the effect...</strong>
				</p>
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
					<p class="p m-b">
						Nulla tincidunt convallis vehicula. Morbi molestie, arcu eleifend elementum faucibus, sapien diam faucibus sem, ac commodo metus dolor eget odio. Suspendisse et nulla lectus. Mauris facilisis, nulla in maximus lacinia, justo nisi dapibus nibh, quis volutpat neque nulla in ipsum. Pellentesque fermentum lectus eros, nec interdum nisi porttitor non. Suspendisse.
					</p>
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
			`
		},
		css : {
			language : 'sass',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@import 'node_modules/coffeekraken-s-typography-component/index';
				@include s-init();
				@include s-classes();
				@include s-typography-classes();
				body {
					padding: s-space(big);
				}
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
			`
		},
		js : {
			language : 'js',
			data : `
				import 'webcomponents.js/webcomponents-lite'
				import SReadMoreComponent from './dist/index'
			`
		}
	}
}
