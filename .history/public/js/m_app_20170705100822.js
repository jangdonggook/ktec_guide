
/**
 * 글로벌 변수
 */

var str=""; // 코딩내용을 담는 문자열
var total = -1;
var isView = -1;
var pop_img; // 팝업에 표시되는 이미지 저장
var pop_link; // 팝업에 표시되는 이미지 링크 저장
var isBtnNum = 0;
var input_state = false;
var ptemp = -1;
var isWeb = "desktop"; //desktop or mobile
var coding_souce_message = "no"; //소스보기 클릭 유무





function ui_update() {
	coding_souce_message = "no";
	console.log('업데이트')
	/*console.log('pop_img : ' , pop_img)
	console.log('pop_link : ' , pop_link)*/

	str = "";

	//삭제 
	$("#p_wrapper_slide").empty();
	$("#p_wrapper_slide").append(`<div class="slider_wrap">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					
					

				</div>
			</div>			

			<!-- Add Arrows -->
			<div class="swiper-button-next swiper-button-black"></div>
			<div class="swiper-button-prev swiper-button-black"></div>

			<div class="swiper-pagination"></div>
		</div>
			<script>
				setTimeout(function(){
					var swiper01 = new Swiper('#p_wrapper_slide .slider_wrap .swiper-container', {				
						autoplay : false,
						nextButton: '#p_wrapper_slide  .swiper-button-next',
						prevButton: '#p_wrapper_slide  .swiper-button-prev',
						pagination: '#p_wrapper_slide .swiper-pagination',
						paginationClickable: true,
						loop: true,
						autoHeight: true,
						spaceBetween: 0
					});
				},10)
			</script>`)

	//반복 생성
	$('#sortable li').each(function (index) {
		var $this = $(this);
		var linkA = $this.find('img').attr('link')
		var imgA = $this.find('img').attr('src')
		//console.log(index + " : lnkurl "  +$this.find('img').attr('link'))
		//console.log(index + " : imgurl "  +$this.find('img').attr('src'))

		$(".swiper-wrapper").append('' +
			'<div class="swiper-slide">' +
			'<a href="' + linkA + '" target="_blank"><img src="' + imgA + '" alt=""></a>' +
			'</div>');


	});

	//하단 아이콘 x 버튼 제어
	var $this;
	$(".thum_img").on("mouseenter", function () {
		$this = $(this);
		$this.parent().parent().find(".closeBtn").css("display", "block")

	});
	$(".thum_img").on("mouseleave", function () {
		$this = $(this);
		$this.parent().parent().find(".closeBtn").css("display", "none")
	});
	$(".closeBtn").on("mouseenter", function () {
		$this.parent().parent().find(".closeBtn").css("display", "block")

	});
	$(".closeBtn").on("mouseleave", function () {
		$this.parent().parent().find(".closeBtn").css("display", "none")
	});


	

};



/*상태 설정값 모두 초기화*/
function allClear() {
	total = -1;
	isView = -1;
	pop_img; // 팝업에 표시되는 이미지 저장
	pop_link; // 팝업에 표시되는 이미지 링크 저장
	isBtnNum = 0;
	input_state = false;
	ptemp = -1;

	$('#sortable').empty();
	$("#p_wrapper_slide").empty();
	$('#resultArea textarea').val(""); //소스보기창 초기화
	popup_clear();
	coding_souce_message = "no";
}

$(document).ready(function () {

	$("#sortable").sortable({
		revert: false,
		placeholder: "ui-state-highlight",
		update: function (evt) {
			//start , change
			ui_update();
		}
	});

	$("#draggable").click(function () {
		//console.log('상품추가버튼 클릭')
		menuMake()
	});



	//돋보기버튼 클릭
	$(".pop_img_ok").on('click', function () {
		//alert('검색')
		imageCheck();
	});

	$("#popup .linkUrl").on("change", function (e) {
		var $this = $(this);
		var linkUrl = $this.val();
		pop_link = linkUrl;
		//console.log(pop_link)
	});



	$(".new_btn .addBtn").on("click", function (e) {
		e.preventDefault()
		//var $this = $(this);
		//total = $this.parents("#sortable").find("li").length;
		//isView = $this.parent().index();
		//console.log("total  : " , total)
		popup_open()
	});


	$(".downBtn").on('click', function () {
		if (coding_souce_message == "yes") {
			download('noName.html' , str)
		}else{
			alert("소스보기 버튼을 클릭하여 코드를 생성 or 갱신 해주세요!")
		}
	});


	top_event()

	//menuMake();//이벤트 시작
});

function imageCheck() {
	//이미지 유효성체크
	var $this = $("#popup .imgUrl");
	var imgUrl = $this.val();

	//alert($this.val())


	if (input_state == true) {
		$("#holder").empty()
	};

	if (imgUrl.indexOf(".jpg") != -1 || imgUrl.indexOf(".JPG") != -1 || imgUrl.indexOf(".PNG") != -1 || imgUrl.indexOf(".png") != -1) {


		//alert("이미지 경로가 정상으로 보임")
		$("#popup").animate({}, 5,
			function () {

				$this.parents("#popup").find("#holder").append('' +
					'<img class="popup_in_img" src="' + imgUrl + '"/>')
				pop_img = imgUrl;


				$('.popup_in_img').error(function () {
					//로드된 팝업이미지가 404 error 이면 실행
					//alert("이미지 경로가 입력되었으나, 잘못되었습니다.");
					$('.popup_in_img').css("display", "none");

					$this.parents("#popup").find("#holder").append('' +
						'<div class="not_img_message" style="display:block;">해당 링크의 정보를 불러올수 없습니다<br>링크를 다시 확인 해 주세요</div>');

					$(".imgUrl").val("");
					popup_resize(1); //팝업창 리사이즈 타입1번
					//}).attr( "src", imgUrl);
				}).load(function () {

					console.log('------------------------------------');
					console.log('정상적인 이미지 로드');
					console.log('------------------------------------');
					$('.popup_in_img').css("display", "block");
					popup_resize(2); //팝업창 리사이즈 타입2번
				});

				input_state = true;

			})

	} else {
		popup_clear();
		alert("정상적인 이미지 경로가 아닙니다.")
	}
}

function menuMake() {
	var data_index = 1;
	$("#sortable .btn>a").off(); //이벤주 중첩방지를 위한 초기화
	$('#sortable').append('' +
		'<li class="ui-state-default btn" data-src=' + data_index + '>' +
		'<a class="closeBtn" href="#" onclick="menuRemove(this);"><img src="images/close_btn.png" /></a>' +
		'<a href="javascript:;"><img src="images/plus_btn.jpg" />' +
		'</a></li>');
	//하단 생성 버튼관련
	$(".new_btn .btn>a").on("click", function (e) {
		e.preventDefault()
		var $this = $(this);
		total = $this.parents("#sortable").find("li").length;
		isView = $this.parent().index();
		//console.log("클릭  : " , isView)
		popup_open()
	});
};

function menuRemove(e) {
	var mc = $(e)
	mc.parent().remove();
	//console.log(e)
	ui_update();
}

//팝업 : 보이기 
function popup_open() {
	popup_resize(0) //팝업창 리사이즈 타입0번

	// pop_img = "";
	// pop_link="";
	//  $( "#popup" ).animate({
	// 	 top:"30%",
	// 	 marginTop:"-155"

	// },200,function(){})
};

//팝업 : 감추기
function popup_close() {
	$("#popup").animate({
		top: "-500"

	}, 300, function () {})
	popup_clear()
}
//팝업 : 종류별 자동 리사이징
function popup_resize(n) {
	var pos_margin_y = ['-160px', '-247px', '-342px'];
	var heightY = ['215px', '295px', '480px'];
	var spd = [300, 100, 100]

	$("#popup").animate({
		'top': '50%',
		'marginTop': pos_margin_y[n],
		'height': heightY[n]

	}, spd[n], function () {})

}

//팝업 : 내용 클리어
function popup_clear() {
	$(".imgUrl").val(""); //입력창 이미지 경로
	$(".linkUrl").val(""); //입력창 링크 경로
	$(".popup_in_img").remove();
	imgUrl = ""; //입력창 이미지 유효시 저장되는 변수 
	$("#popup").css({
		height: "260px"
	});
	input_state = false;
	$('.not_img_message').css("display", "none");
}


//팝업 - 확인 클릭 - 하단썸네일 생성( ui-update )
function popup_info_check() {
	if (input_state == false) {
		alert("이미지 검색을 버튼을 클릭해주세요")
		return;
	}
	var img_str = $(".imgUrl").val()
	var link_str = $(".lineUrl").val()
	if (img_str == null || img_str == undefined || img_str == "") {
		//alert("이미지 경로를 입력해주세요")
	} else {
		menuMake();
		popup_close();
		//마지막 두번째 요소에 이미지 삽입
		$(".btn:nth-last-child(1)").prepend('' +
			'<a href="javascript:;" ><img class="thum_img" link="' + pop_link + '" src="' + pop_img + '"/></a>');

		ui_update();
	}
}

/**
	웹 & 모바일 버튼 
**/
function top_event() {
	var isView = 0;

	/*$(".icon li>a").each(function(index){
		var $this = $(this)
		$this.click(function(){
			isView = index;
			if(isView == 0){
				isWeb = "desktop"
			}else{
				isWeb = "mobile"
			}
			selectMenu(isView)
			allClear()
		});
		

	});*/

	selectMenu = function (n) {
		$(".icon li").removeClass("select");
		$(".icon li").eq(n).addClass("select");
	};

	$('.downBtn').on("click", function (e) {
		e.preventDefault()
	});
	$('.viewBtn').on("click", function (e) {
		e.preventDefault()
		copyHtml()
	});

}

function copyHtml() {
	str="";
	str = `<!DOCTYPE html>
				<html lang="ko">
				<head>
					<meta charset="euc-kr">
					<title>mobile swiper</title>
					<meta id="viewport" name="viewport" content="width=device-width,initial-scale=1, user-scalable=no" />
					<meta http-equiv="cleartype" content="on"/>
					<link rel="stylesheet" href="http://eventimg.auction.co.kr/md/auction/0868D4BD4A/swiper.min.css">	
					<style type="text/css">
						*{margin:0;padding:0}
						img{border:0;vertical-align:top}
						li{list-style:none}
						
							#p_wrapper_slide{margin:0 auto;position:relative}
							#p_wrapper_slide img{width:100%}
							#p_wrapper_slide .slider_wrap{position:relative;overflow:hidden;background:#fff;}
							#p_wrapper_slide .swiper-container {overflow:hidden;position:relative}
							#p_wrapper_slide .swiper-wrapper {width:100%;height:100%}
							#p_wrapper_slide .swiper-slide {overflow:hidden;position:relative}		
							#p_wrapper_slide .swiper-pagination{width:100%;text-align:center;position:absolute;left:0;bottom:3%;}
							#p_wrapper_slide .swiper-pagination-bullet{width:6px;height:6px;margin:0 5px;background:#000;border:2px #000 solid;border-radius:100%;opacity:1}
							#p_wrapper_slide .swiper-pagination-bullet-active{border:2px #000 solid;opacity:1;background:transparent}
							#p_wrapper_slide .swiper-button-prev{opacity:0.3;width:40px;height:40px;z-index:10;top:50%;background-color:#fff;background-size:30px 20px;margin-top:-20px;left:0}
							#p_wrapper_slide .swiper-button-next{opacity:0.3;width:40px;height:40px;z-index:10;top:50%;background-color:#fff;background-size:30px 20px;margin-top:-20px;right:0}



					</style>
					<script type="text/javascript" src="http://eventimg.auction.co.kr/md/auction/086A428A1C/jquery-1.11.3.min.js"></script>
					<script src="http://eventimg.auction.co.kr/md/auction/0868D4BD4A/swiper.min.js"></script>
				</head>
				<body>`;

	var option = `<script>
							var swiper01 = new Swiper('#p_wrapper_slide .slider_wrap .swiper-container', {				
								autoplay : 4500,
								nextButton: '#p_wrapper_slide .slider_wrap .swiper-button-next',
								prevButton: '#p_wrapper_slide .slider_wrap .swiper-button-prev',
								pagination: '#p_wrapper_slide .swiper-pagination',
								paginationClickable: true,
								loop: true,
								autoHeight: true,
								spaceBetween: 0
							});
					</script>`;

	str = str + '<div id="p_wrapper_slide">' + changeTarget($("#p_wrapper_slide").html().split('<script>')[0]) + option + '</div></body>';

	//window.prompt("Copy to clipboard: Ctrl+C, Enter", str);
	//console.log(str)
	//console.log(str)

	//console.log($("#p_wrapper_slide").html().split('<script>')[0])


	$('#resultArea textarea').val(str)

	$("#resultArea").animate({
		right: "0"
	}, 200, function () {

	});

	coding_souce_message = "yes";

}
function changeTarget(str){
	var _str = str;
	return _str.replace(/target="_blank"/g,'target="_parent"');//모바일
	// if(isWeb == "desktop"){
	// 	return _str.replace(/target="_blank"/g,'target="_blank"');//데스크탑
	// }else{
	// 	return _str.replace(/target="_blank"/g,'target="_parent"');//모바일
	// }
}
//파일 다운 로드 관련
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=euc-kr,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}