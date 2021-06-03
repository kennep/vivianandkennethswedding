function title_anim() {
	$("#content").animate({opacity: 1}, 1000, 'swing');
}


$(document).ready(function() {
	$(".menu img,#content").css({opacity: 0});
	$(".divider").css({width: 0});
	$(".divider").animate({
		width:720}, 1000, 'swing', title_anim);
	
	$(".langtab img").mouseover(lang_enter);
	$(".langtab img").mouseout(lang_leave);
	$(".langtabs").animate({right: 5}, 1000);

	if(window.location.hash == '#en') {
		en();
	}
	else if(window.location.hash == '#zh') {
		en();
	} else {
		no();
	}

	$("#zh").click(zh);
	$("#no").click(no);
	$("#en").click(en);
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
