/**
 * Алексей Шварц (Alexej Schwarz) - 16.03.2017
 *
 *  manipulation.getElement( elOrSelector )
 *  manipulation.haveCSSClass( elOrSelector, cssClassname )
 *  toggleClass.getElement( elOrSelector, cssClassname )
 */

/** Позволяет просматривать елементы объекта Nodelist оператором forEach.
 *  Erlaubt durch die Nodelist-Objekt zu iterrieren */
NodeList.prototype.forEach = Array.prototype.forEach;

var manipulation = {

		getElement: function (elOrSelector) {
			return typeof elOrSelector === "object" ? elOrSelector : window.document.querySelector(elOrSelector);
		},

		haveCSSClass: function (elOrSelector, cssClassname) {
			elOrSelector = this.getElement(elOrSelector);
			var cssClasses = elOrSelector.className.split(" ");
			for (var i = 0; i < cssClasses.length; i++) if (cssClasses[i] === cssClassname) return true;
			return false;
		},

		/** Добавляет элементу elOrSelector класс fromClass или убирает этот класс */
		toggleClass: function (elOrSelector, cssClassname) {
			elOrSelector = this.getElement(elOrSelector);
			if (this.haveCSSClass(elOrSelector, cssClassname)) {
				var rx = new RegExp(" " + cssClassname + "|" + cssClassname + " ");
				elOrSelector.className = elOrSelector.className.replace(rx, "");
			} else {
				elOrSelector.className += " " + cssClassname;
			}
		},

		/** Меняет элементу elOrSelector класс fromClass на toClass */
		switchClasses: function (elOrSelector, fromClass, toClass) {
			if (!fromClass) fromClass = "open";
			if (!toClass) toClass = "closed";

			elOrSelector = this.getElement(elOrSelector);

			var hasClass = toClass,
				replayClass = fromClass;

			if (this.haveCSSClass(elOrSelector, fromClass)) {
				hasClass = fromClass;
				replayClass = toClass;
			}

			var rx = new RegExp(hasClass);
			elOrSelector.className = elOrSelector.className.replace(rx, replayClass);
		}
	},

	/** Возвращает элемент прокрутки документа в зависимости от браузера html или body */
	getScrollTopElement = function () {
		// if missing doctype (quirks mode) then will always use 'body'
		if (window.document.compatMode !== "CSS1Compat") return "body";

		var html = window.document.documentElement,
			body = window.document.body,
			startingY = window.pageYOffset || body.scrollTop || html.scrollTop, // get our starting position. pageYOffset works for all browsers except IE8 and below
			newY = startingY + 1;   // scroll the window down by 1px (scrollTo works in all browsers)

		window.scrollTo(0, newY);

		// And check which property changed
		// FF and IE use only html. Safari uses only body.
		// Chrome has values for both, but says
		// body.scrollTop is deprecated when in Strict mode.,
		// so let's check for html first.
		var element = ( html.scrollTop === newY ) ? "html" : "body";

		// now reset back to the starting position
		window.scrollTo(0, startingY);

		return element;
	},

	locationOrigin = function () {
		if (!window.location.origin) window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
	},

	/** Добавляет параметры в адрессную строку без перезагрузки документа */
	replaceUrl = function (urlParemeter) {
		if (!urlParemeter) urlParemeter = "";
		window.document.location.replace(window.document.location.origin + window.document.location.pathname + urlParemeter);
	};