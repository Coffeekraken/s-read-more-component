import SWebComponent from 'coffeekraken-sugar/js/core/SWebComponent'
import __realHeight from 'coffeekraken-sugar/js/dom/realHeight'
import __getStyleProperty from 'coffeekraken-sugar/js/dom/getStyleProperty'
import __style from 'coffeekraken-sugar/js/dom/style'

/**
 * @name 		SReadMoreComponent
 * @extends 	SWebComponent
 * Simple tag to easly crop and reveal some contents. The display style is totaly up to you...
 *
 * @example 		html
 * <style>
 * 	s-read-more {
 * 		max-height: 150px;
 * 		width: 400px;
 * 	}
 * 	s-read-more:after {
 * 		content: attr(more);
 * 	}
 * 	s-read-more[active]:after {
 * 		content: attr(less);
 * 	}
 * </style>
 * <s-read-more more="More..." less="Less...">
 * 	<p class="p m-b">
 * 		Cras nisl diam, vestibulum sit amet vehicula blandit, ullamcorper sit amet ex. Aliquam pellentesque mauris magna, ac imperdiet arcu vehicula ac. Sed viverra risus in neque ullamcorper aliquam. Phasellus pretium.
 * 	</p>
 * 	<p class="p m-b">
 * 		Cras nisl diam, vestibulum sit amet vehicula blandit, ullamcorper sit amet ex. Aliquam pellentesque mauris magna, ac imperdiet arcu vehicula ac. Sed viverra risus in neque ullamcorper aliquam. Phasellus pretium.
 * 	</p>
 * 	<p class="p m-b">
 * 		Cras nisl diam, vestibulum sit amet vehicula blandit, ullamcorper sit amet ex. Aliquam pellentesque mauris magna, ac imperdiet arcu vehicula ac. Sed viverra risus in neque ullamcorper aliquam. Phasellus pretium.
 * 	</p>
 * </s-read-more>
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */

export default class SReadMoreComponent extends SWebComponent {

	/**
	 * Default props
	 * @definition 		SWebComponent.getDefaultProps
	 * @protected
	 */
	static get defaultProps() {
		return {
			/**
			 * Set the threshold difference height between the content and the
			 * actual read more size under which the read more will not been enabled
			 * @prop
			 * @type 		{Number}
			 */
			threshold : 0,

			/**
			 * Specify if the component is active (opened) or not
			 * @prop
			 * @type	{Boolean}
			 */
			active : false,

			/**
			 * Specify if the component is disabled. This can be added by the component itself if the "threshold" property is used...
			 * @prop
			 * @type 	{Boolean}
			 */
			disabled : false,

			/**
			 * Specify the height to target. If not specified, will try to get the max-height property.
			 * @prop
			 * @type 	{Number}
			 */
			height : null

		};
	}

	/**
	 * Physical props
	 * @definition 		SWebComponent.physicalProps
	 * @protected
	 */
	static get physicalProps() {
		return ['disabled','active'];
	}

	/**
	 * Css
	 * @protected
	 */
	static defaultCss(componentName, componentNameDash) {
		return `
			${componentNameDash} {
				overflow : hidden;
				display : block;
			}
		`;
	}

	/**
	 * Component will mount
	 * @definition 		SWebComponent.componentWillMount
	 * @protected
	 */
	componentWillMount() {
		super.componentWillMount();
		this._targetedHeight;
	}

	/**
	 * Mount component
	 * @definition 		SWebComponent.componentMount
	 * @protected
	 */
	componentMount() {
		super.componentMount();

		// update targeted and original height
		this._updateTargetedAndOriginalHeight();

		// listen for click on the element
		this.addEventListener('click', this._onClick.bind(this));

		// check threshold
		this._checkThreshold();

		// listen for update read more
		this.addEventListener(`update:height`, (e) => {
			this._updateTargetedAndOriginalHeight();
			this._checkThreshold();
		});
		window.addEventListener(`resize`, (e) => {
			this._updateTargetedAndOriginalHeight();
			this._checkThreshold();
		});

		// listen for content mutation
		this._listenMutations();
	}

	/**
	 * Component unmount
	 * @definition 		SWebComponent.componentUnmount
	 * @protected
	 */
	componentUnmount() {
		super.componentUnmount();
		if (this._sReadMoreMutationObserver) {
			this._sReadMoreMutationObserver.disconnect();
		}
	}

	/**
	 * Component will receive prop
	 * @definition 		SWebComponent.componentWillReceiveProp
	 * @protected
	 */
	componentWillReceiveProp(name, newVal, oldVal) {
		switch(name) {
			case 'height':
				this._targetedHeight = newVal;
				this._checkThreshold();
			break;
		}
	}

	/**
	 * Listen mutations
	 */
	_listenMutations() {
		let mutationTimeout = null;
		this._sReadMoreMutationObserver = new MutationObserver((mutations) => {
			//let render = false;
			// mutations.forEach((mutation) => {
			// 	let parentNode = mutation.target.parentNode;
			// 	if (mutation.target.nodeName === '#text') {
			// 		parentNode = parentNode.parentNode;
			// 	}
			// 	if ( mutation.target !== this && ( ! parentNode || parentNode === this)) render = true;
			// });
			clearTimeout(mutationTimeout);
			mutationTimeout = setTimeout(() => {
				// update targeted and original height
				this._updateTargetedAndOriginalHeight();
				// check threshold
				this._checkThreshold();
				// render
				this.render();
			});
		});
		this._sReadMoreMutationObserver.observe(this, {
			childList : true,
			subtree : true,
			characterData : true
		});
	}

	/**
	 * On click on the read more
	 */
	_onClick(e) {
		if (e.target !== this) return;
		// toggle the active state
		if (this.isActive()) this.unactivate();
		else this.activate();
	}

	/**
	 * Update targeted and original height
	 */
	_updateTargetedAndOriginalHeight() {
		// check if has an targeted height
		if ( ! this._targetedHeight) {
			let targetedHeight = this.props.height || this.style.maxHeight || __getStyleProperty(this, 'maxHeight');
			if (targetedHeight === 'none') {
				targetedHeight = null;
			}
			if (targetedHeight) {
				targetedHeight = parseFloat(targetedHeight);
			}
			this._targetedHeight = targetedHeight;
		}

		// check the actual height of the target
		const realHeight = __realHeight(this);
		this._originalHeight = realHeight;
	}

	/**
	 * Check threshold to disable the read more if needed
	 */
	_checkThreshold() {
		// check if the targetedHeight is lower that the actual height
		if (this._targetedHeight + this.props.threshold >= this._originalHeight) {
			// disable the component
			this.setProp('disabled', true);
		} else {
			this.setProp('disabled', false);
		}
	}

	/**
	 * Activate the read more
	 */
	activate() {
		this.setProp('active', true);
	}

	/**
	 * Unactivate the read more
	 */
	unactivate() {
		this.setProp('active', false);
	}

	/**
	 * Toggle the readmore
	 */
	toggle() {
		this.props.active = ! this.props.active;
	}

	/**
	 * Return if the read more is activate or not
	 * @return 		{Boolean} 		True if is active, false if not
	 */
	isActive() {
		return this.props.active;
	}

	/**
	 * Render the component
	 * @definition 		SWebComponent.render
	 * @protected
	 */
	render() {
		if ( ! this.props.disabled) {
			if (this.props.active) {
				setTimeout(() => {
					// open the read more
					__style(this, {
						maxHeight : (this._originalHeight + (this._originalHeight / 100 * 10)) + 'px'
					});
				});
			} else {
				__style(this, {
					maxHeight : this._targetedHeight + 'px'
				});
			}
		} else {
			__style(this, {
				maxHeight : null
			});
		}
	}
}
