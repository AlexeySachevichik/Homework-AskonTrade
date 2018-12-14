$(document).ready( function(){

	var 

	// Список производителей
	firmList = {
		0: {name: 'DEXEN',		factor: 1},
		1: {name: 'BRUSBOX',	factor: 2},
		2: {name: 'KBE',		factor: 3},
		3: {name: 'REHAU',		factor: 4},
		4: {name: 'SALAMANDER', factor: 5}
	},

	// Список конструкций
	constList = {
		0: {
			name: 'Окна',
			title: 'Окно',
			img: 'window_size.png',
			factor: 1,
			minH: 1,
			maxH: 1000,
			minV: 1,
			maxV: 1100,
			type: {
				'Одностворчатые': {
					'Глухое': 1,
					'Поворотное': 2,
					'Фрамужное': 3
				},
				'Двухстворчатое': {
					'Пункт 1': 1,
					'Пункт 2': 2,
					'Пункт 3': 3,
					'Пункт 4': 4,
				},
				'Трехстворчатое': 5
			},
			additional: {
				'Подоконник': 6,
				'Отлив': 7,
				'Сетка': 8,
				'Монтаж': 9,
				'Теплый откос': 10
			}
		},
		1: {
			name: 'Балконные рамы',
			title: 'Балконная рама',
			img: 'window_size_2.png',
			factor: 1,
			minH: 1,
			maxH: 2000,
			minV: 1,
			maxV: 2200,
			type: {
				'Пункт 1': 1,
				'Пункт 2': 1,
				'Пункт 3': 1
			},
			additional: {
				'Подоконник': 1,
				'Отлив': 1,
				'Сетка': 1,
				'Монтаж': 1
			}
		},
		2: {
			name: 'Балконные блоки',
			title: 'Балконный блок',
			img: 'window_size_2.png',
			factor: 1,
			minH: 1,
			maxH: 3000,
			minV: 1,
			maxV: 3300,
			type: {
				'Пункт 5': 1,
				'Пункт 6': 1
			},
			additional: {
				'Подоконник': 1,
				'Отлив': 1,
				'Сетка': 1
			}
		},
		3: {
			name: 'Двери',
			title: 'Дверь',
			img: 'window_size.png',
			factor: 1,
			minH: 1,
			maxH: 4000,
			minV: 1,
			maxV: 4400,
			type: {
				'Пункт4': 1
			},
			additional: {
				'Подоконник': 1,
				'Отлив': 1
			}
		}
	},
	

	// Индекс выбранного производителя
	firmIndex = undefined,

	// Индекс выбранной конструкции
	constIndex = undefined,

	// Папка с изображениями окон/рам/дверей
	windowImageFolder = 'img/',

	// Размеры окна
	sizeHorizontalMin = 0,
	sizeHorizontalMax = 0,
	sizeHorizontal = 0,
	stepHorizontal = 1,

	sizeVerticalMin = 0,
	sizeVerticalMax = 0,
	sizeVertical = 0,
	stepVertical = 1,

	// Итоговый массивы
	totalTYPE = {},
	totalADD = {},

	// Площадь окна
	sizeArea = 0,

	// Показывать площадь рядом с полями ввода размера
	viewSizeArea = true,

	// На гарячую пересчитывать таблицу
	hotReCalculate = false;


	// Отображение списка фирм
	function showFirm(){

		var html = '', // Код html добавления
			firmCount = 0, // Колличество фирм
			width = 0;	// ширина блока списка

		// Создаем код html
		for(var id in firmList){
			html += '<li>' + firmList[id].name + '</li>';
			firmCount++; // считаем кол-во фирм
		}

		// исходя из кол-ва фирм высчитаем ширину блока списка
		width = 100 / firmCount;
		
		// Добавим код html в блок фирм
		$('.firmname').append(html);

		// Установим ширину блоков
		$('.firmname > li').css('width', width + '%' );
	}

	// Отображение списка конструкций
	function showConst(){

		var html = '', // Код html добавления
			constCount = 0, // Колличество конструкций
			width = 0;	// ширина блока списка

		// Создаем код html
		for(var id in constList){
			html += '<li>' + constList[id].name + '</li>';
			constCount++; // считаем кол-во фирм
		}

		// исходя из кол-ва фирм высчитаем ширину блока списка
		width = 100 / constCount;
		
		// Добавим код html в блок фирм
		$('.construction').append(html);

		// Установим ширину блоков
		$('.construction > li').css('width', width + '%' );
	}

	// Отображаем опции
	function showOptions(){

		$('.option').css('display', 'block');
	}

	// Прячем опции
	function hideOptions(){

		$('.option').css('display', 'none');
	}

	// Отображение списка типа конструкций
	function showConstType(){

		var html = '',	// ширина блока списка
			constTypeList = constList[constIndex]['type'];

		for(var id in constTypeList){

			if(typeof constTypeList[id] == 'object'){

				html += '<li class="accordion close"><span>' + id + '</span><ul>';

				for(var i in constTypeList[id]){
					html += '<li><span class="constTypeLink" data-factor="' + constTypeList[id][i] + '">' + i + '</span></li>';
				}

				html += '</ul></li>';

			}
			else{
				html += '<li><span class="constTypeLink" data-factor="' + constTypeList[id] + '">' + id + '</span></li>';
			}
		}

		$('.construction_type').empty();	// Очистим блок для меню
		$('.construction_type').append(html);

		// Обнуляем выбранный тип конструкций
		totalTYPE = {};
	}

	// Отображение изображения окна/рамы/двери
	function showWindowImage(id){
		var src = windowImageFolder + constList[id]['img'],
			html = '<img src="' + src + '" alt="">',
			img = $('.window_size_block').children('img');

		img.replaceWith(html);
	}

	// Отображение дополнительных пунктов
	function showAdditionalItems(){
		var html = '',
			additionalItemList = constList[constIndex]['additional'];

		for(var id in additionalItemList){
			html += '<div class="item additionalItemLink" data-factor="' + additionalItemList[id] + '"><div class="check"><svg viewBox="0 0 26 26"><path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"/></svg></div><div class="title">' + id + '</div></div>';
		}

		$('.calculator .option .additional').empty();
		$('.calculator .option .additional').append(html);
		$('.calculator .option .additional').append('<div class="sumbit">Рассчитать</div>');

		// Обнуляем список дополнительных услуг
		totalADD = {};
	}

	// Отображение и изменение площади
	function viewArea(){
		sizeArea = sizeHorizontal / 1000 * sizeVertical / 1000;
		$('.size_result').html(' = ' + sizeArea.toFixed(4) + ' м<sup>2</sup>');
	}

	// Пересчет и отображение итоговой таблицы
	function reCalculate(){
		$('.additional').children('.sumbit').hide();
		showTotalTable();
	}

	// Устанавливаем размеры окна
	function setMinValueSizeWindow(){

		sizeHorizontalMin = constList[constIndex]['minH'];
		sizeHorizontalMax = constList[constIndex]['maxH'];
		sizeHorizontal    = sizeHorizontalMin;

		sizeVerticalMin   = constList[constIndex]['minV'];
		sizeVerticalMax   = constList[constIndex]['maxV'];
		sizeVertical      = sizeVerticalMin;

		if(viewSizeArea) viewArea();
		if(hotReCalculate) reCalculate();
	}

	// Активация горизонтального ползунока
	function activateHorizontalScroll(){

		$(".resize_horizantal_slider").slider({
			value: sizeHorizontal,
			min: sizeHorizontalMin,
			max: sizeHorizontalMax,
			step: stepHorizontal,
			slide: function( event, ui ) {
				$('.horizontal').val(ui.value);
				$('.titleHorizontal').html(ui.value + ' мм');
				sizeHorizontal = ui.value;
				if(viewSizeArea) viewArea();
				if(hotReCalculate) reCalculate();
			}
		});

		// Добавляем кнопку ползунка
		$('.resize_horizantal_slider .ui-slider-handle').html('<div class="scroll_button"><svg viewBox="0 0 100 100"><circle class="fil0" cx="50" cy="50" r="50"/><circle class="fil1" cx="50" cy="50" r="20"/></svg><div class="titleHorizontal"></div></div>');
		
		// Устанавливаем значения по-умолчанию
		$('.horizontal').val($('.resize_horizantal_slider').slider('value'));
		$('.titleHorizontal').html($('.resize_horizantal_slider').slider('value') + ' мм');
	}

	// Активация вертикального ползунока
	function activateVerticalScroll(){

		$(".resize_vertical_slider").slider({
			value: sizeVertical,
			min: sizeVerticalMin,
			max: sizeVerticalMax,
			step: stepVertical,
			orientation: 'vertical',
			slide: function( event, ui ) {
				$('.vertical').val(ui.value);
				$('.titleVertical').html(ui.value + ' мм');
				sizeVertical = ui.value;
				if(hotReCalculate) reCalculate();
				if(viewSizeArea) viewArea();
			}
		});

		// Добавляем кнопку ползунка
		$('.resize_vertical_slider .ui-slider-handle').html('<div class="scroll_button"><svg viewBox="0 0 100 100"><circle class="fil0" cx="50" cy="50" r="50"/><circle class="fil1" cx="50" cy="50" r="20"/></svg><div class="titleVertical"></div></div></div>');

		// Устанавливаем значения по-умолчанию
		$('.vertical').val($('.resize_vertical_slider').slider('value'));
		$('.titleVertical').html($('.resize_vertical_slider').slider('value') + ' мм');
	}

	// Показать таблицу ИТОГО
	function showTotalTable(){
		var
			// HTML код таблицы для добавления
			table = '',

			// Название фирмы
			firm = firmList[firmIndex]['name'],

			// Название конструкции
			constTitle = constList[constIndex]['title'],

			// Название типа конструкции
			typeTitle = '',

			// Коэфицент типа конструкции
			typeFactor = 0,

			// Итоговая сумма
			sum = 0,

			// Итоговая скидка
			sale = 0,

			// Стоимость окна исходя из площади
			cost = sizeArea * firmList[firmIndex]['factor'];


		// Получим название типа конструкции
		if(totalTYPE == undefined){
			typeTitle = '';
			typeFactor = undefined;
		}
		else{
			for(var i in totalTYPE){
				typeTitle = ' - ' + i;
				typeFactor = totalTYPE[i];
			}
		}
			
		// Очистим блок таблицы
		$('.total_table').empty();

		table += '<table><tr><th>наименование</th><th>цена</th></tr>';
		table += '<tr><td>Производитель - ' + firm + '</td><td></td></tr>';
		table += '<tr><td>' + constTitle + typeTitle + '</td><td>' + cost.toFixed(2) + ' бел. руб</td></tr>';
		
		// К сумме добавим цену площади окна
		sum += cost;

		// Выведим и прибавим все дополнительные опции
		for(var i in totalADD){
			table += '<tr><td>' + i + '</td><td>' + totalADD[i] + ' бел. руб</td></tr>';
			sum += totalADD[i];
		}
		table += '</table>';

		// Рассчитаем скидку
		sale = sum * 0.75;
		table += '<h1 class="total_title"><span class="open_sans">Итого:</span><span class="line">' + sum.toFixed(2) + '</span><span class="rub">бел. руб.</span><span class="sale">' + sale.toFixed(2) + '</span><span class="rub">бел. руб.</span></h1>';
		table += '<p>Возможна рассрочка до 10 месяцев (' + (sale/10).toFixed(2) +' бел.руб в месяц)</p>';

		$('.total_table').append(table);
	}

	// Отобразим блоки с название фирм и конструкций
	showFirm();
	showConst();

	// Активировали кнопку Производителя
	$('.firmname > li').on('click', function(e){
		e.preventDefault();

		// текущий индекс блока
		var firmIndexCurrent = $(this).closest('li').index();

		// console.log(firmIndexCurrent);
		// console.log(firmIndex);

		// если была нажат другой блок
		if(firmIndex != firmIndexCurrent){

			// выделяем нажатый блок
			$(this).addClass('selected').siblings().removeClass('selected');
			
			// записываем индекс нажатого блока
			firmIndex = $(this).closest('li').index();

			if(hotReCalculate && constIndex != undefined){
				reCalculate();
			}
		}
		// если нажали тот же блок
		else{

			// удаляем форматирование блока
			$('.firmname > li').removeClass('selected');

			// удаляем значение индексы блока
			firmIndex = undefined;

			if(hotReCalculate && constIndex != undefined){
				// Очистим таблицу
				$('.total_table').empty().append('<h1 class="total_title"><span class="open_sans">Итого: 0</span><span class="rub">бел. руб.</span></h1>');
			}
		}
	});

	// Активировали кнопку Конструкции
	$('.construction li').on('click', function(e){
		e.preventDefault();

		// текущий индекс блока
		var constIndexCurrent = $(this).closest('li').index();

		// если был нажат другой блок
		if(constIndex != constIndexCurrent && firmIndex != undefined){

			// выделяем нажатый блок
			$(this).addClass('selected').siblings().removeClass('selected');
			
			// записываем индекс нажатого блока
			constIndex = $(this).closest('li').index();

			// Показываем блок опций
			showOptions();

			// Показывааем меню типа конструкций
			showConstType();

			// Показываем изображение окна
			showWindowImage(constIndexCurrent);

			// Показываеем дополнительные опции
			showAdditionalItems();

			// Устанавливаем минимальные размеры окна
			setMinValueSizeWindow();

			// Активируем горизонтальный ползунок
			activateHorizontalScroll();

			// Активируем вертикальный ползунок
			activateVerticalScroll();

			// Очистим таблицу
			$('.total_table').empty().append('<h1 class="total_title"><span class="open_sans">Итого: 0</span><span class="rub">бел. руб.</span></h1>');

		}
		// если нажали тот же блок
		else{

			// Прячем опции
			hideOptions();

			// удаляем форматирование блока
			$('.construction > li').removeClass('selected');

			// удаляем значение индекса блока
			constIndex = undefined;

			// удаляем значение типа конструкции
			constTypeFactor = undefined;

			// Обнуляем масивы
			totalTYPE = {};
			totalADD = {};

			// Очистим таблицу
			$('.total_table').empty().append('<h1 class="total_title"><span class="open_sans">Итого: 0</span><span class="rub">бел. руб.</span></h1>');
		}

		// Открытие/Закрытие аккордеона
		$('.accordion > span').on('click', function(e){
			e.preventDefault();
			var par = $(this).parent();

			// Раскрыть аккордеон
			if(par.hasClass('close')){

				par.removeClass('close');
				par.addClass('open');
				par.children('ul').css('display','block');
			}
			// Скрыть аккордеон
			else{
				par.removeClass('open');
				par.addClass('close');
				par.children('ul').css('display','none');
			}
		});

		// Активировали кнопку Тип Конструкции
		$('.constTypeLink').on('click', function(e){
			e.preventDefault();

			// Выключаем
			if( $(this).hasClass('selected') ) {
				$('.constTypeLink').removeClass('selected');
				if(hotReCalculate) reCalculate();
			}

			// Включаем
			else{
				$('.constTypeLink').removeClass('selected');
				$(this).addClass('selected');
				totalTYPE = {};
				totalTYPE[$(this).html()] = $(this).data('factor');
				if(hotReCalculate) reCalculate();
			}
		});

		// Активировали дополнительные опции
		$('.additionalItemLink').on('click', function(e){
			e.preventDefault();
			var factor = $(this).data('factor'),
				svg = $(this).children('.check').children('svg'),
				title = $(this).children('.title').html();

			// Выключаем
			if( svg.hasClass('checked') ) {

				svg.removeClass('checked');
				svg.css('display','none');
				delete totalADD[title];
				if(hotReCalculate) reCalculate();
				
			}
			// Включаем
			else{

				svg.addClass('checked');
				svg.css('display','block');
				totalADD[title] = factor;
				if(hotReCalculate) reCalculate();
			}
		});

		// Активировали кнопку рассчитать
		$('.calculator .sumbit').on('click', function(e){
			e.preventDefault();

			showTotalTable();
		});
	});

	// Изменили INPUT горизонтального размера
	$('.horizontal').on('change', function(e){
		e.preventDefault();

		var sizeCurrent = $('.horizontal').val();

		if(sizeHorizontalMin <= sizeCurrent && sizeCurrent <= sizeHorizontalMax ){
			sizeHorizontal = sizeCurrent;
			$('.titleHorizontal').html(sizeHorizontal + ' мм');
			$(".resize_horizantal_slider").slider( "option", "value", sizeHorizontal );
			if(viewSizeArea) viewArea();
			if(hotReCalculate) reCalculate();
		}
		else {
			$('.horizontal').val(sizeHorizontal);
			$('.titleHorizontal').html(sizeHorizontal + ' мм');
			$(".resize_horizantal_slider").slider( "option", "value", sizeHorizontal );
			if(viewSizeArea) viewArea();
			if(hotReCalculate) reCalculate();
		}
	});

	// Уменьшаем горизонтальный размер окна стрелкой влево
	$('.resize_horizantal .left').on('click', function(e){
		e.preventDefault();

		var sizeCurrent = sizeHorizontal - stepHorizontal;

		if( sizeHorizontalMin <= sizeCurrent ){
			sizeHorizontal = sizeCurrent;
			$('.horizontal').val(sizeHorizontal);
			$('.titleHorizontal').html(sizeHorizontal + ' мм');
			$(".resize_horizantal_slider").slider( "option", "value", sizeHorizontal );
			if(viewSizeArea) viewArea();
			if(hotReCalculate) reCalculate();
		}
	});

	// Увеличиваем горизонтальный размер окна стрелкой вправо
	$('.resize_horizantal .rigth').on('click', function(e){
		e.preventDefault();

		var sizeCurrent = sizeHorizontal + stepHorizontal;

		if( sizeCurrent <= sizeHorizontalMax ){
			sizeHorizontal = sizeCurrent;
			$('.horizontal').val(sizeHorizontal);
			$('.titleHorizontal').html(sizeHorizontal + ' мм');
			$(".resize_horizantal_slider").slider( "option", "value", sizeHorizontal );
			if(viewSizeArea) viewArea();
			if(hotReCalculate) reCalculate();
		}
	});

	// Изменили INPUT вертикального размера
	$('.vertical').on('change', function(e){
		e.preventDefault();

		var sizeCurrent = $('.vertical').val();

		if(sizeVerticalMin <= sizeCurrent && sizeCurrent <= sizeVerticalMax ){
			sizeVertical = sizeCurrent;
			$('.titleVertical').html(sizeVertical + ' мм');
			$(".resize_vertical_slider").slider( "option", "value", sizeVertical );
			if(viewSizeArea) viewArea();
			if(hotReCalculate) reCalculate();
		}
		else {
			$('.vertical').val(sizeVertical);
			$('.titleVertical').html(sizeVertical + ' мм');
			$(".resize_vertical_slider").slider( "option", "value", sizeVertical );
			if(viewSizeArea) viewArea();
			if(hotReCalculate) reCalculate();
		}
	});

	// Уменьшаем вертикальный размер окна стрелкой вниз
	$('.resize_vertical .bottom').on('click', function(e){
		e.preventDefault();

		var sizeCurrent = sizeVertical - stepVertical;

		if( sizeVerticalMin <= sizeCurrent ){
			sizeVertical = sizeCurrent;
			$('.vertical').val(sizeVertical);
			$('.titleVertical').html(sizeVertical + ' мм');
			$(".resize_vertical_slider").slider( "option", "value", sizeVertical );
			if(viewSizeArea) viewArea();
			if(hotReCalculate) reCalculate();
		}
	});

	// Увеличиваем вертикальный размер окна стрелкой вверх
	$('.resize_vertical .top').on('click', function(e){
		e.preventDefault();

		var sizeCurrent = sizeVertical + stepVertical;

		if( sizeCurrent <= sizeVerticalMax ){
			sizeVertical = sizeCurrent;
			$('.vertical').val(sizeVertical);
			$('.titleVertical').html(sizeVertical + ' мм');
			$(".resize_vertical_slider").slider( "option", "value", sizeVertical );
			if(viewSizeArea) viewArea();
			if(hotReCalculate) reCalculate();
		}
	});

});