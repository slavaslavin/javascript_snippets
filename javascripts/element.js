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
		/** Возвращает сам себя если CSS-селектор это объект или элемент по CSS-селектору
		 * Gibt sich selbst falls ein Objekt, oder das Element mittels querySelector zurück */
		getElement: function (elOrSelector) {
			return typeof elOrSelector === "object" ? elOrSelector : window.document.querySelector(elOrSelector);
		},

		/** В зависимости от браузера возвращает элемент прокрутки всего документа html или body
		 * Gibt Scroll-Element (html oder body) des Dokumentes in der Abhängigkeit vom Browser */
		getScrollTopElement : function () {
		/** Если отсутствует doctype (режим quirks), то всегда будет использоваться body */
		if (window.document.compatMode !== "CSS1Compat") return "body";

		var html = window.document.documentElement,
			body = window.document.body,
			/** Определение стартовой позиции страницы, pageYOffset работает во всех браузеров, кроме IE8 и ниже */
			startingY = window.pageYOffset || body.scrollTop || html.scrollTop,
			newY = startingY + 1;
		/** Прокручивает страницу на 1px (scrollTo работает во всех браузерах) */
		window.scrollTo(0, newY);

		/** Проверяет свойство scrollTo какого элемента изменено:
		 * FireFox и IE используют только html,
		 * Safari только body,
		 * Chrome использует оба, но body.scrollTop в режиме Strict считается устаревшим,
		 * поэтому сначала проверка html */
		var element = ( html.scrollTop === newY ) ? "html" : "body";

		/** возврат на стартовую позицию */
		window.scrollTo(0, startingY);

		return element;
	},

		haveCSSClass: function (elOrSelector, cssClassname) {
			elOrSelector = this.getElement(elOrSelector);
			var cssClasses = elOrSelector.className.split(" ");
			for (var i = 0; i < cssClasses.length; i++) if (cssClasses[i] === cssClassname) return true;
			return false;
		},

		/** Добавляет элементу elOrSelector класс cssClassname или убирает этот класс
		 * Fügt dem Element elOrSelector die Klasse cssClassname zu, oder nimmt die Klasse weg */
		toggleClass: function (elOrSelector, cssClassname) {
			elOrSelector = this.getElement(elOrSelector);
			if (this.haveCSSClass(elOrSelector, cssClassname)) {
				var rx = new RegExp(" " + cssClassname + "|" + cssClassname + " ");
				elOrSelector.className = elOrSelector.className.replace(rx, "");
			} else {
				elOrSelector.className += " " + cssClassname;
			}
		},

		/** Меняет элементу elOrSelector класс fromClass на toClass
		 * Tauscht die Klasse fromClass gegen toClass */
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
	};