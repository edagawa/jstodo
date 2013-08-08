$(function () {

//変数設定
var js_todo_content = $('#js_todo_content'),
		js_input_todo = $('#js_input_todo'),
		deleteAllBtn = $('#js_delete_all');

//body要素にランダムでclassをつけて、見出しの色を変更
$('#js_body').addClass('is_design' + (Math.floor(Math.random() * 5) + 1));


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
			js_tx_todo = '<label class="js_tx_todo">' + $(js_input_todo).val() + '</label>',
			js_btn_edit = '<button class="btn js_btn_edit">Edit</button>',
			js_btn_complete = '<button class="btn js_btn_complete">Complete</button>',
			$js_input_edit = '<input type="text" class="js_input_edit" value="' + $(js_input_todo).val() + '">',
			$js_btn_rewrite = '<button class="btn js_btn_rewrite">Rewrite</button>',
			js_add_time = '<p class="tx_add_time js_add_time">' + addNewDate + '</p>',
			todoElm = $(js_todo_item).append(js_btn_up).append(js_btn_down).append(js_tx_todo).append(js_btn_edit).append($js_input_edit).append($js_btn_rewrite).append(js_btn_complete).append(js_add_time);

		//TODOリストが０個だった場合
		if($('.js_todo_item').length === 0) {
			//全削除ボタンのアクティブ化
			$(deleteAllBtn).css('opacity', '').attr('disabled', false);

			//リストを囲むul要素を表示する
			$(js_todo_content).show();
		} else if($('.js_todo_item').length > 0) {

			//ボタンを上に移動する
			//TASK ここを関数化したい && 一番上か下の場合はボタンを無効化 && バグってる
			if ($('.js_todo_item').not(':last-child')) {
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
			if ($('.js_todo_item').not(':first-child')) {
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

		}

		//要素を生成
		var $todoElm = $(todoElm);
		$todoElm.prependTo(js_todo_content);

		//Completeボタンをクリック
		$todoElm.find($('.js_btn_complete')).on('click', function(){
			//テキストを「Complete!」として表示を消す
			$(this).parent().html('Complete!').fadeOut('slow', function() {
				$(this).remove();

				//Todoリストが０になった場合、ul要素を非表示にする
				if ($('.js_todo_item').length === 0) {
					$('#js_todo_content').hide();
				}
			});
		});

		//Taskテキストを編集する
		$todoElm.find($('.js_btn_edit')).on('click', function(){
			$js_btn_rewrite.on('click', function(){
console.log($(this));
console.log($(this).next());
console.log($(this).prev());
				var text = $(this).next().val();
				$(this).prev().html(text);
			});
		});

	} else {
		alert('Todo is empty! Please input todo.')
	}
});
function onClick() {

}
//TODOリストが０の場合
if($('.js_todo_item').length === 0) {
	//リストを囲むul要素を非表示にする
	$(js_todo_content).hide();

	//全削除ボタンの無効化
	$(deleteAllBtn, '#js_add_todo').css('opacity', '.6').attr('disabled', true);
}

//追加した要素の全削除
$(deleteAllBtn).on('click', function(){
	if (confirm('Are you sure you want to delete all items?')) {
		//ul要素を非表示にして、li要素を削除する
		$(js_todo_content).hide().find('li').remove();

		//全削除ボタンの無効化
		$(deleteAllBtn).css('opacity', '.6').attr('disabled', true);
	}
});

});
