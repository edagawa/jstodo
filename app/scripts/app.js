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

		//JSONファイルを取得
		var target = $('#js_todos').prepend('<div></div>');
console.log('しりあらいず' + $('#js_todos').serialize());
		$.ajax({
			url: 'http://cshooljs.dynalogue.com/api/memo/',
			type: 'POST',
			data: $('#js_todos').serialize(),
        // data: {
        //   category_id: child_category_id,
        //   page: 1,
        //   per: 10,
        //   sort_by: 'answer_last_updated_at',
        //   sort_order: 'desc'
        // },
			timeout: 10000
		}).done(function(data, status, xhr){
debugger;
			//成功時
		}).fail(function(xhr, status, error){
			//失敗時
			target.html('エラーです。入力項目が空になっていないか、通信が正しく行われているかご確認いただいてから再度お試しください。').css({'color': 'red', 'fontWeight': 'bold'});
		});

		//要素の変数設定
		var getTime = new Date(),
			getYear = getTime.getFullYear(),
			getMonth = getTime.getMonth() + 1,
			getDate = getTime.getDate(),
			getHours = getTime.getHours(),
			getMinutes = getTime.getMinutes(),
			addNewDate = getYear + '年' + getMonth + '月' + getDate + '日' + getHours + '時' + getMinutes + '分',
			js_todo_item = '<li class="js_todo_item bx_todo_item"></li>',
			js_btn_up = '<button class="btn js_btn_up">上へ移動</button>',
			js_btn_down = '<button class="btn js_btn_down">下へ移動</button>',
			js_tx_todo = '<label class="js_tx_todo bx_tx_todo">' + $(js_input_todo).val() + '</label>',
			js_btn_edit = '<button class="btn js_btn_edit">編集</button>',
			js_btn_complete = '<button class="btn js_btn_complete">完了</button>',
			$js_input_edit = '<input type="text" class="js_input_edit bx_input_edit" value=">',
			$js_btn_rewrite = $('<button class="btn js_btn_rewrite bx_btn_rewrite">編集</button>'),
			js_add_time = '<p class="tx_add_time js_add_time">' + addNewDate + '</p>',
			todoElm = $(js_todo_item).append(js_btn_up).append(js_btn_down).append(js_tx_todo).append(js_btn_edit).append($js_input_edit).append($js_btn_rewrite).append(js_btn_complete).append(js_add_time);

		//TODOリストが０個だった場合
		if($('.js_todo_item').length === 0) {
			//全削除ボタンのアクティブ化
			$(deleteAllBtn).css('opacity', '').attr('disabled', false);

			//リストを囲むul要素を表示する
			$(js_todo_content).show();
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

		//Editボタンをクリックして編集可能にする
		$todoElm.find($('.js_btn_edit')).on('click', function(){
			todoEdit($(this));
		});
		//TODOのテキストをダブルクリックして編集可能にする
		$todoElm.find($('.js_tx_todo')).on('dblclick', function(){
			todoEdit($(this));
		});
		//テキストを編集可能にするための関数
		function todoEdit (elm) {
			var $todoItem = elm.parent('.js_todo_item');
			$todoItem.addClass('is_editing');
			$js_btn_rewrite.on('click', function(){
				var text = $(this).prev().val();
				$todoItem.find('.js_tx_todo').html(text);
				$todoItem.removeClass('is_editing');
			});
		}




	} else {
		alert('Todo is empty! Please input todo.')
	}
});

//ボタンを上に移動する
//TASK ここを関数化したい && 一番上か下の場合はボタンを無効化 && バグってる
$(js_todo_content).find('.js_btn_down').on('click', function() {
debugger;
console.log($(this));
console.log($(this).parent());
console.log($(this).parent().next());
	$(this).parent().insertAfter($(this).parent().next()).animate({
		opacity: .4
	}, 400, 'linear', function(){
		$(this).css({'opacity': '', 'backgroundColor': ''});
	});
});

//TASK ここを関数化したい
//Todoリストが２個以上だったら、ボタンを有効化
$('.js_btn_up').on('click', function() {
	$(this).parent().insertBefore($(this).parent().prev()).animate({
		opacity: .4
	}, 400, 'linear', function(){
		$(this).css({'opacity': '', 'backgroundColor': ''});
	});
});

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
