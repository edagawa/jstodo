$(function () {

//変数設定
var js_todo_content = $('#js_todo_content'),
		js_input_todo = $('#js_input_todo'),
		deleteAllBtn = $('#js_delete_all');

//body要素にランダムでclassをつけて、見出しの色を変更
$('#js_body').addClass('is_design' + (Math.floor(Math.random() * 5) + 1));

//TODOリストが０の場合
if($('.js_todo_item').length === 0) {
	//リストを囲むul要素を非表示にする
	$(js_todo_content).hide();

	//全削除ボタンの無効化
	$(deleteAllBtn).css('opacity', '.6').attr('disabled', true);
}


//TODOの追加
$('#js_add_todo').on('click', function(){
	//フォームにテキストが入っていたらTodoリストを追加する
	if($(js_input_todo).val() !== '') {

		//要素の変数設定
		var getTime = new Date(),
			getYear = getTime.getFullYear(),
			getMonth = getTime.getMonth() + 1,
			getDate = getTime.getDate(),
			getHours = getTime.getHours(),
			getMinutes = getTime.getMinutes(),
			addNewDate = getYear + '年' + getMonth + '月' + getDate + '日' + getHours + '時' + getMinutes + '分',
			js_todo_item = '<li class="js_todo_item bx_todo_item"></li>',
			js_btn_up = '<button class="btn js_btn_up">Up</button>',
			js_btn_down = '<button class="btn js_btn_down">Down</button>',
			js_tx_todo = '<p class="js_tx_todo">' + $(js_input_todo).val() + '</p>',
			js_btn_edit = '<button class="btn js_btn_edit">Edit</button>',
			js_btn_delete = '<button class="btn js_btn_delete">Complete</button>',
			js_add_time = '<p class="tx_add_time js_add_time">' + addNewDate + '</p>',
			todoElm = $(js_todo_item).append(js_btn_up).append(js_btn_down).append(js_tx_todo).append(js_btn_edit).append(js_btn_delete).append(js_add_time);

		//要素を生成
		$(todoElm).prependTo(js_todo_content);

		//全削除ボタンのアクティブ化
		$(deleteAllBtn).css('opacity', '').attr('disabled', false);

		//TODOリストが１つ以上あれば
		if($('.js_todo_item').length > 0) {

			//リストを囲むul要素を表示する
			$(js_todo_content).show();

			//追加した要素の全削除
			$(deleteAllBtn).on('click', function(){
				if (confirm('Are you sure you want to delete all items?')) {
					$(js_todo_content).remove();
					$(deleteAllBtn).css('opacity', '.6').attr('disabled', true);
				}
			});
			debugger
		}

		//ボタンを上に移動する
		//TASK ここを関数化したい && 一番上か下の場合はボタンを無効化 && バグってる
		if ($('.js_todo_item').length > 1 && $('.js_todo_item').not(':last-child')) {
			//Todoリストが２個以上だったら、ボタンを有効化
			$('.js_btn_down').on('click', function() {
				$(this).parent().insertAfter($(this).parent().next()).animate({
					opacity: .4
				}, 400, 'linear', function(){
					$(this).css({'opacity': '', 'backgroundColor': ''});
				});
			}).attr('disabled', false);
		} else {
			//Todoリストが１以下だったら、ボタンを無効化
			$('.js_btn_down').attr('disabled', true)
		}

		//TASK ここを関数化したい
		if ($('.js_todo_item').length > 1 && $('.js_todo_item').not(':first-child')) {
			//Todoリストが２個以上だったら、ボタンを有効化
			$('.js_btn_up').on('click', function() {
				$(this).parent().insertBefore($(this).parent().prev()).animate({
					opacity: .4
				}, 400, 'linear', function(){
					$(this).css({'opacity': '', 'backgroundColor': ''});
				});
			}).attr('disabled', false);
		} else {
			//Todoリストが１以下だったら、ボタンを無効化
			$('.js_btn_up').attr('disabled', true);
		}

		//TODOを一つ削除
		//Task $(this)使ってキレイに書きたい
		$('.js_btn_delete').on('click', function(){
			$(this).parent().html('Complete!').fadeOut('slow', function() {
				$(this).remove();

				//Todoリストが０になった場合、ul要素を非表示にする
				if ($('.js_todo_item').length === 0) {
					$('#js_todo_content').hide();
				}
			});
		});
	} else {
		alert('Todo is empty! Please input todo.')
	}
});

});
