function playvideo(i) {
	var videoBaseUrl = "https://public-media.wangpedersen.com/file/wangpedersen-public/wedding/"
	var videos = [
		{
			'poster': '/images/main_prev.jpg',
			'src': videoBaseUrl + 'Vivian%20og%20Kenneth%20040611.mp4'
		},
		{
			'poster': '/images/ikirken_prev.jpg',
			'src': videoBaseUrl + 'I%20kirken.mp4'
		},
		{
			'poster': '/images/dronningen_prev.jpg',
			'src': videoBaseUrl + 'Dronningen.mp4'
		},
		{
			'poster': '/images/taiwan_prev.jpg',
			'src': videoBaseUrl + 'Bridal%20pictures.mp4'
		}
	];
	var player = videojs('wp-video-player');
	player.poster(videos[i].poster);
	player.src(videos[i].src);
}

function p1_anim() {
	fadein($("#cp").get(0), p2_anim);
}

function p2_anim() {
	fadein($("#ga").get(0), p3_anim);
}

function p3_anim() {
	fadein($("#dr").get(0), p4_anim);
}

function p4_anim() {
	fadein($("#tw").get(0), p5_anim);
}

function p5_anim() {
	fadein($("#os").get(0), title_anim);
}

function fadein(item, complete) {
	if(window.current_item.id == item.id) {
		op = 1;
	} else {
		op = 0.5;
	}
	$(item).find('img').animate({opacity: op}, 200, 'swing', complete);
}

function title_anim() {
	$("#content").animate({opacity: 1}, 1000, 'swing');
}

function menu_enter() {
	//console.log("Enter: " + this);
	//console.log("Current item: " + window.current_item);
	if(this != window.current_item) {
		$(this).find('img').stop(true, true).animate({opacity: 1}, 200);
	}
}

function menu_leave() {
	//console.log("Leave: " + this);
	//console.log("Current item: " + window.current_item);
	if(this != window.current_item) {
		$(this).find('img').stop(true, true).animate({opacity: 0.5}, 200);
	}
}

function menu_click() {
	item_activate(this);
	return false;
}

function item_activate(item) {
	var play_called = false;
	if(item != window.current_item) {
		var newitemid = '#c_' + item.id;
		$('#c_' + window.current_item.id).fadeOut('fast',
				function() { $(newitemid).fadeIn(); });
		if(window.current_item == $("#os").get(0)) {
			$("#playerarea").show();
			$("#playerarea").animate({'margin-top': 0, 'opacity': 1}, 1000);
		}

		if(parseInt($(item).find('img').css('opacity'))<1) {
			$(item).find('img').stop(true, true).animate({opacity: 1}, 200);
		}
		$(window.current_item).find('img').stop(true, true).animate({opacity: 0.5}, 200);
		window.current_item = item;
		//console.log("Current item: " + window.current_item);
	}

	if(!play_called) {
		play_item(item);
	}
}

function play_item(item) {
	if(item == $('#cp').get(0)) {
		playvideo(0);
	}
	if(item == $('#ga').get(0)) {
		playvideo(1);
	}
	if(item == $('#dr').get(0)) {
		playvideo(2);
	}
	if(item == $('#tw').get(0)) {
		playvideo(3);
	}
	if(item == $('#os').get(0)) {
		$("#playerarea").animate({'margin-top': -($("#playerarea").height()),
				'opacity': 0}, 1000, 'swing', function() { $("#playerarea").hide() });
	}
}

$(document).ready(function() {
	$(".menu img,#content").css({opacity: 0});
	$(".divider").css({width: 0});
	$(".divider").animate({
		width:720}, 1000, 'swing', p1_anim);
	$(".menu").mouseover(menu_enter);
	$(".menu").mouseout(menu_leave);
	window.current_item = $("#cp").get(0);

	$(".langtab img").mouseover(lang_enter);
	$(".langtab img").mouseout(lang_leave);
	$(".langtabs").animate({right: 5}, 1000);

	$(".menu").click(menu_click);

	no();
	$("#zh").click(zh);
	$("#no").click(no);
	$("#en").click(en);

	if(window.location.hash) {
		window.current_item = $(window.location.hash).get(0);
		$('#c_cp').hide();
		$('#c_' + $(window.location.hash).get(0).id).show();
	}

});

function zh()
{
	window.current_lang = 'zh';
	$('#zh').find('img').css('opacity', 1);
	$('#no').find('img').css('opacity', 0.5);
	$('#en').find('img').css('opacity', 0.5);
	$('.nopara,.enpara').hide();
	$('.zhpara').fadeIn();
	//$('.nopara,.enpara').fadeOut('fast', function() { $('.zhpara').fadeIn(); });
	return false;
}


function en()
{
	window.current_lang = 'en';
	$('#zh').find('img').css('opacity', 0.5);
	$('#no').find('img').css('opacity', 0.5);
	$('#en').find('img').css('opacity', 1);
	$('.nopara,.zhpara').hide();
	$('.enpara').fadeIn();
	//$('.zhpara,.nopara').fadeOut('fast', function() { $('.enpara').fadeIn(); });
	return false;
}

function no()
{
	window.current_lang = 'no';
	$('#zh').find('img').css('opacity', 0.5);
	$('#no').find('img').css('opacity', 1);
	$('#en').find('img').css('opacity', 0.5);
	$('.zhpara,.enpara').hide();
	$('.nopara').fadeIn();
	//$('.zhpara,.enpara').fadeOut('fast', function() { $('.nopara').fadeIn(); });
	return false;
}

function lang_enter()
{
	$(this).css('opacity', 1);
}

function lang_leave()
{
	if(window.current_lang != $(this).parent().get(0).id) {
		$(this).css('opacity', 0.5);
	}
}
