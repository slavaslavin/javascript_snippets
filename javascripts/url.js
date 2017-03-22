/**
 * Алексей Шварц (Alexej Schwarz) - 16.03.2017
 *
 *  manipulation.getElement( elOrSelector )
 *  manipulation.haveCSSClass( elOrSelector, cssClassname )
 *  toggleClass.getElement( elOrSelector, cssClassname )
 */

var locationOrigin = function () {
		if (!window.location.origin) window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
	},

	/** Добавляет параметры в URL без перезагрузки документа
	 * Fügt die Parameter der URL zu, ohne das Dokument neu zu laden */
	replaceUrl = function (urlParemeter) {
		if (!urlParemeter) urlParemeter = "";
		window.document.location.replace(window.document.location.origin + window.document.location.pathname + urlParemeter);
	};