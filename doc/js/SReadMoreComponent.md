# SReadMoreComponent

Extends **SWebComponent**

Simple tag to easly crop and reveal some contents. The display style is totaly up to you...


### Example
```html
	<style>
	s-read-more {
		max-height: 150px;
		width: 400px;
	}
	s-read-more:after {
		content: attr(more);
	}
	s-read-more[active]:after {
		content: attr(less);
	}
</style>
<s-read-more more="More..." less="Less...">
	<p class="p m-b">
		Cras nisl diam, vestibulum sit amet vehicula blandit, ullamcorper sit amet ex. Aliquam pellentesque mauris magna, ac imperdiet arcu vehicula ac. Sed viverra risus in neque ullamcorper aliquam. Phasellus pretium.
	</p>
	<p class="p m-b">
		Cras nisl diam, vestibulum sit amet vehicula blandit, ullamcorper sit amet ex. Aliquam pellentesque mauris magna, ac imperdiet arcu vehicula ac. Sed viverra risus in neque ullamcorper aliquam. Phasellus pretium.
	</p>
	<p class="p m-b">
		Cras nisl diam, vestibulum sit amet vehicula blandit, ullamcorper sit amet ex. Aliquam pellentesque mauris magna, ac imperdiet arcu vehicula ac. Sed viverra risus in neque ullamcorper aliquam. Phasellus pretium.
	</p>
</s-read-more>
```
Author : Olivier Bossel <olivier.bossel@gmail.com>




## Attributes

Here's the list of available attribute to set on the element.

### threshold

Set the threshold difference height between the content and the
actual read more size under which the read more will not been enabled

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **0**


### active

Specify if the component is active (opened) or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### disabled

Specify if the component is disabled. This can be added by the component itself if the "threshold" property is used...

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### height

Specify the height to target. If not specified, will try to get the max-height property.

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**




## Methods


### activate

Activate the read more


### unactivate

Unactivate the read more


### toggle

Toggle the readmore


### isActive

Return if the read more is activate or not

Return **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }** True if is active, false if not