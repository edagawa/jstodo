$(function () {

//変数設定
var bodyClass = Math.floor(Math.random() * 5) + 1;
//CSSのclassをランダムでbody要素につける
$bodyElm.addClass('is_design' + bodyClass);

//全削除ボタンの非アクティブ化
$deleteAllBtn.css('opacity', '.6').on('click', false);

//TODOの追加
$addTodo.on('click', function(){
	//ul要素を表示
	$todoContent.show().attr('data-todo','added');

	//全削除ボタンのアクティブ化
	$deleteAllBtn.css('opacity', '1');

	//TODOが追加された日付の表示
	var getTime = new Date(),
		getYear = getTime.getFullYear(),
		getMonth = getTime.getMonth() + 1,
		getDate = getTime.getDate(),
		getHours = getTime.getHours(),
		getMinutes = getTime.getMinutes(),
		addNewDate = getYear + '年' + getMonth + '月' + getDate + '日' + getHours + '時' + getMinutes + '分',
		addOldDate = getTime.getMinutes(),
		$checkItem = '<button class="btn_check_item">✓</button>';
		$deleteItem = '<button class="btn_delete_item">×</button>';
	$todoContent.prepend('<li class="js_todo_item bx_todo_item">' + $checkItem + 'Added' + $deleteItem + '<span class="bx_add_time">' + addNewDate + '</span>' + '</li>');
});

//TODOが追加された後の処理
if ($bodyElm.find($todoContent).attr('data-todo') != 'added') {
alert('OK');
	$bodyElm.on('click', '.btn_check_item', function(){
		$(this).parent().addClass('is_checked');
		$(this).fadeOut('slow');
	});

	//TODOを一つ削除
	$bodyElm.on('click', '.btn_delete_item', function(){
		$(this).parent().html('Complete!').fadeOut('slow');
	});
} else {
	console.log('No');
}

//追加した要素の全削除
$deleteAllBtn.on('click', function(){
	if (window.confirm("Are you sure you want to delete all items?")) {
		$todoContent.hide();
		$todoContent.find('li').remove();
	}
});


});
