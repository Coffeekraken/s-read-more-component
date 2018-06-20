'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SWebComponent2 = require('coffeekraken-sugar/js/core/SWebComponent');

var _SWebComponent3 = _interopRequireDefault(_SWebComponent2);

var _realHeight = require('coffeekraken-sugar/js/dom/realHeight');

var _realHeight2 = _interopRequireDefault(_realHeight);

var _getStyleProperty = require('coffeekraken-sugar/js/dom/getStyleProperty');

var _getStyleProperty2 = _interopRequireDefault(_getStyleProperty);

var _style = require('coffeekraken-sugar/js/dom/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var SReadMoreComponent = function (_SWebComponent) {
	_inherits(SReadMoreComponent, _SWebComponent);

	function SReadMoreComponent() {
		_classCallCheck(this, SReadMoreComponent);

		return _possibleConstructorReturn(this, (SReadMoreComponent.__proto__ || Object.getPrototypeOf(SReadMoreComponent)).apply(this, arguments));
	}

	_createClass(SReadMoreComponent, [{
		key: 'componentWillMount',


		/**
   * Component will mount
   * @definition 		SWebComponent.componentWillMount
   * @protected
   */
		value: function componentWillMount() {
			_get(SReadMoreComponent.prototype.__proto__ || Object.getPrototypeOf(SReadMoreComponent.prototype), 'componentWillMount', this).call(this);
			this._targetedHeight;
		}

		/**
   * Mount component
   * @definition 		SWebComponent.componentMount
   * @protected
   */

	}, {
		key: 'componentMount',
		value: function componentMount() {
			var _this2 = this;

			_get(SReadMoreComponent.prototype.__proto__ || Object.getPrototypeOf(SReadMoreComponent.prototype), 'componentMount', this).call(this);

			// update targeted and original height
			this._updateTargetedAndOriginalHeight();

			// listen for click on the element
			this.addEventListener('click', this._onClick.bind(this));

			// check threshold
			this._checkThreshold();

			// listen for update read more
			this.addEventListener('update:height', function (e) {
				_this2._updateTargetedAndOriginalHeight();
				_this2._checkThreshold();
			});
			window.addEventListener('resize', function (e) {
				_this2._updateTargetedAndOriginalHeight();
				_this2._checkThreshold();
			});

			// listen for content mutation
			this._listenMutations();
		}

		/**
   * Component unmount
   * @definition 		SWebComponent.componentUnmount
   * @protected
   */

	}, {
		key: 'componentUnmount',
		value: function componentUnmount() {
			_get(SReadMoreComponent.prototype.__proto__ || Object.getPrototypeOf(SReadMoreComponent.prototype), 'componentUnmount', this).call(this);
			if (this._sReadMoreMutationObserver) {
				this._sReadMoreMutationObserver.disconnect();
			}
		}

		/**
   * Component will receive prop
   * @definition 		SWebComponent.componentWillReceiveProp
   * @protected
   */

	}, {
		key: 'componentWillReceiveProp',
		value: function componentWillReceiveProp(name, newVal, oldVal) {
			switch (name) {
				case 'height':
					this._targetedHeight = newVal;
					this._checkThreshold();
					break;
			}
		}

		/**
   * Listen mutations
   */

	}, {
		key: '_listenMutations',
		value: function _listenMutations() {
			var _this3 = this;

			var mutationTimeout = null;
			this._sReadMoreMutationObserver = new MutationObserver(function (mutations) {
				//let render = false;
				// mutations.forEach((mutation) => {
				// 	let parentNode = mutation.target.parentNode;
				// 	if (mutation.target.nodeName === '#text') {
				// 		parentNode = parentNode.parentNode;
				// 	}
				// 	if ( mutation.target !== this && ( ! parentNode || parentNode === this)) render = true;
				// });
				clearTimeout(mutationTimeout);
				mutationTimeout = setTimeout(function () {
					// update targeted and original height
					_this3._updateTargetedAndOriginalHeight();
					// check threshold
					_this3._checkThreshold();
					// render
					_this3.render();
				});
			});
			this._sReadMoreMutationObserver.observe(this, {
				childList: true,
				subtree: true,
				characterData: true
			});
		}

		/**
   * On click on the read more
   */

	}, {
		key: '_onClick',
		value: function _onClick(e) {
			if (e.target !== this) return;
			// toggle the active state
			if (this.isActive()) this.unactivate();else this.activate();
		}

		/**
   * Update targeted and original height
   */

	}, {
		key: '_updateTargetedAndOriginalHeight',
		value: function _updateTargetedAndOriginalHeight() {
			// check if has an targeted height
			if (!this._targetedHeight) {
				var targetedHeight = this.props.height || this.style.maxHeight || (0, _getStyleProperty2.default)(this, 'maxHeight');
				if (targetedHeight === 'none') {
					targetedHeight = null;
				}
				if (targetedHeight) {
					targetedHeight = parseFloat(targetedHeight);
				}
				this._targetedHeight = targetedHeight;
			}

			// check the actual height of the target
			var realHeight = (0, _realHeight2.default)(this);
			this._originalHeight = realHeight;
		}

		/**
   * Check threshold to disable the read more if needed
   */

	}, {
		key: '_checkThreshold',
		value: function _checkThreshold() {
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

	}, {
		key: 'activate',
		value: function activate() {
			this.setProp('active', true);
		}

		/**
   * Unactivate the read more
   */

	}, {
		key: 'unactivate',
		value: function unactivate() {
			this.setProp('active', false);
		}

		/**
   * Toggle the readmore
   */

	}, {
		key: 'toggle',
		value: function toggle() {
			this.props.active = !this.props.active;
		}

		/**
   * Return if the read more is activate or not
   * @return 		{Boolean} 		True if is active, false if not
   */

	}, {
		key: 'isActive',
		value: function isActive() {
			return this.props.active;
		}

		/**
   * Render the component
   * @definition 		SWebComponent.render
   * @protected
   */

	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			if (!this.props.disabled) {
				if (this.props.active) {
					setTimeout(function () {
						// open the read more
						(0, _style2.default)(_this4, {
							maxHeight: _this4._originalHeight + _this4._originalHeight / 100 * 10 + 'px'
						});
					});
				} else {
					(0, _style2.default)(this, {
						maxHeight: this._targetedHeight + 'px'
					});
				}
			} else {
				(0, _style2.default)(this, {
					maxHeight: null
				});
			}
		}
	}], [{
		key: 'defaultCss',


		/**
   * Css
   * @protected
   */
		value: function defaultCss(componentName, componentNameDash) {
			return '\n\t\t\t' + componentNameDash + ' {\n\t\t\t\toverflow : hidden;\n\t\t\t\tdisplay : block;\n\t\t\t}\n\t\t';
		}
	}, {
		key: 'defaultProps',


		/**
   * Default props
   * @definition 		SWebComponent.getDefaultProps
   * @protected
   */
		get: function get() {
			return {
				/**
     * Set the threshold difference height between the content and the
     * actual read more size under which the read more will not been enabled
     * @prop
     * @type 		{Number}
     */
				threshold: 0,

				/**
     * Specify if the component is active (opened) or not
     * @prop
     * @type	{Boolean}
     */
				active: false,

				/**
     * Specify if the component is disabled. This can be added by the component itself if the "threshold" property is used...
     * @prop
     * @type 	{Boolean}
     */
				disabled: false,

				/**
     * Specify the height to target. If not specified, will try to get the max-height property.
     * @prop
     * @type 	{Number}
     */
				height: null

			};
		}

		/**
   * Physical props
   * @definition 		SWebComponent.physicalProps
   * @protected
   */

	}, {
		key: 'physicalProps',
		get: function get() {
			return ['disabled', 'active'];
		}
	}]);

	return SReadMoreComponent;
}(_SWebComponent3.default);

exports.default = SReadMoreComponent;