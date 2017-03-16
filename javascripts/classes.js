/**
 * Алексей Шварц (Alexej Schwarz) - 16.03.2017
 *
 *  manipulation.getElement( elOrSelector )
 *  manipulation.haveCSSClass( elOrSelector, cssClassname )
 *  toggleClass.getElement( elOrSelector, cssClassname )
 */

var manipulation = {

		getElement : function( elOrSelector ) {
			return typeof elOrSelector === "object" ? elOrSelector : document.querySelector(elOrSelector);
		},

		haveCSSClass : function ( elOrSelector, cssClassname ) {
			elOrSelector = this.getElement(elOrSelector);
			var cssClasses = elOrSelector.className.split(" ");
			for (var i = 0; i < cssClasses.length; i++) if (cssClasses[i] === cssClassname) return true;
			return false;
		},

		toggleClass : function ( elOrSelector, cssClassname ) {
			elOrSelector = this.getElement(elOrSelector);
			if (typeof elOrSelector !== "object") elOrSelector = document.querySelector(elOrSelector);
			if ( this.haveCSSClass(elOrSelector, cssClassname) ) {
				var rx = new RegExp(" " + cssClassname + "|" + cssClassname + " ");
				elOrSelector.className = elOrSelector.className.replace(rx, "");
			} else {
				elOrSelector.className += " " + cssClassname;
			}
		}
	};