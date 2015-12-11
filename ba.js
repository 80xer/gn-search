$(function(){
	var site = '';
	var engine = {
		url: {
			'Google': 'https://www.google.co.kr/#q=',
			'Naver': 'http://search.naver.com/search.naver?query='
		},
		color: {
			'Google': '#7CC3FB',
			'Naver': '#C9FFB6'
		}
	}

	$("#searchKeyword").keydown(function(e) {

		var keyword = $(this).val();
		if (site !== '' && keyword.length === 0 && e.which === 8) {
			clearSite();
		};

	}).keyup(function(e) {
		// 13: enter
		// 71: g
		// 78: n
		// 9: tab
		// 8: backspace
		var keyword = $(this).val();
		if (keyword.length === 1 && keyword === 'g') {
			setHelp('Google');
		} else if (keyword.length === 1 && keyword === 'n') {
			setHelp('Naver');
		} else {
			clearHelp();
		};

		if (keyword.toLowerCase() === 'g' && e.which === 9) {
			$(this).val('');
			setSite('Google');
		};


		if (keyword.toLowerCase() === 'n' && e.which === 9) {
			$(this).val('');
			setSite('Naver');
		};

		if (e.which === 13 && $(this).val()) {
			if (site !== '')
				chrome.runtime.sendMessage({"message": "open_new_tab", "url": engine.url[site] + $(this).val()});
			else {
				chrome.runtime.sendMessage({"message": "open_new_tab", "url": engine.url['Google'] + $(this).val()});
				chrome.runtime.sendMessage({"message": "open_new_tab", "url": engine.url['Naver'] + $(this).val()});
			}
		};
	});

	function setSite(s) {
		site = s;
		$("#searchSite").css('background-color',engine.color[site]).text(site + ' 검색:').show();
		$("#description").text(site + '에서 검색합니다.');
		clearHelp();
	}

	function setHelp(s) {
		$("#help").text('Tab을 눌러 ' + s + ' 검색').show();
	}

	function clearSite() {
		site = '';
		$("#searchSite").hide();
		$("#description").text('Google 과 Naver에서 모두 검색합니다.');
	}

	function clearHelp() {
		$("#help").hide().text('');
	}
});