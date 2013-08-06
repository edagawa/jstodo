$(function () {

//変数設定
var js_todo_content = $('#js_todo_content'),
	js_input_todo = $('#js_input_todo');
	deleteAllBtn = $('#js_delete_all');

//TODOリストが０の場合、リストを囲むul要素を非表示にする
if($(js_todo_content).children().length === 0) {
	$(js_todo_content).hide();
}

//body要素にランダムでclassをつけて、見出しの色を変更
$('#js_body').addClass('is_design' + (Math.floor(Math.random() * 5) + 1));

//全削除ボタンの非アクティブ化
$(deleteAllBtn).css('opacity', '.6').attr('disabled', true);


//TODOの追加
$('#js_add_todo').on('click', function(){
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
			js_btn_up = '<button class="js_btn_up">↑</button>',
			js_btn_down = '<button class="js_btn_down">↓</button>',
			js_tx_todo = '<p class="js_tx_todo">' + $(js_input_todo).val() + '</p>',
			js_btn_edit = '<button class="js_btn_edit">✓</button>',
			js_btn_delete = '<button class="js_btn_delete">×</button>',
			js_add_time = '<p class="js_add_time">' + addNewDate + '</p>',
			todoElm = $(js_todo_item).append(js_btn_up).append(js_btn_down).append(js_tx_todo).append(js_btn_edit).append(js_btn_delete).append(js_add_time);

		//TODOリストが０の場合、リストを囲むul要素を表示する
		if($(js_todo_content).children().length === 0) {
			$(js_todo_content).show();
		}

		//要素を生成
		$(todoElm).children('.js_btn_up').on('click', function() {
			// //ボタンを上に移動する
console.log($(this).parent());
console.log($(this).parent().next());
			$(this).parent().insertAfter('#js_todo_content');
		}).end().prependTo(js_todo_content);

		//全削除ボタンのアクティブ化
		$(deleteAllBtn).css('opacity', '1').attr('disabled', false);
	}
});

// $addTodo.on('click', function(){
// 	//ul要素を表示
// 	$todoContent.show().attr('data-todo','added');

// 	//TODOが追加された日付の表示
// 	var getTime = new Date(),
// 		getYear = getTime.getFullYear(),
// 		getMonth = getTime.getMonth() + 1,
// 		getDate = getTime.getDate(),
// 		getHours = getTime.getHours(),
// 		getMinutes = getTime.getMinutes(),
// 		addNewDate = getYear + '年' + getMonth + '月' + getDate + '日' + getHours + '時' + getMinutes + '分',
// 		addOldDate = getTime.getMinutes(),
// 		$checkItem = '<button class="btn_check_item">✓</button>';
// 		$deleteItem = '<button class="btn_delete_item">×</button>';
// 	$todoContent.prepend('<li class="js_todo_item bx_todo_item">' + $checkItem + 'Added' + $deleteItem + '<span class="bx_add_time">' + addNewDate + '</span>' + '</li>');
// });

//TODOが追加された後の処理
// if ($bodyElm.find($todoContent).attr('data-todo') != 'added') {
// 	$bodyElm.on('click', '.btn_check_item', function(){
// 		$(this).parent().addClass('is_checked');
// 		$(this).fadeOut('slow');
// 	});

// 	//TODOを一つ削除
// 	$bodyElm.on('click', '.btn_delete_item', function(){
// 		$(this).parent().html('Complete!').fadeOut('slow');
// 	});
// } else {
// 	console.log('No');
// }

//追加した要素の全削除
$(deleteAllBtn).on('click', function(){
	if (window.confirm("Are you sure you want to delete all items?")) {
		$(js_todo_content).hide().find('li').remove();
		$(deleteAllBtn).css('opacity', '.6').attr('disabled', true);
	}
});


});
