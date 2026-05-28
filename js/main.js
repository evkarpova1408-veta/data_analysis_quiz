let all_questions = [
    {
        text: 'Что такое первичный ключ в таблице данных?',
        answers: [
            'Столбец с пропущенными значениями',
            'Уникальный идентификатор каждой строки',
            'Первый столбец в таблице'
        ],
        right: 1
    },
    {
        text: 'Какой тип данных используется для хранения дат рождения?',
        answers: ['string (строка)', 'float (число с плавающей точкой)', 'date (дата)'],
        right: 2
    },
    {
        text: 'Что делает оператор GROUP BY в SQL?',
        answers: [
            'Сортирует данные по алфавиту',
            'Группирует строки с одинаковыми значениями',
            'Удаляет дубликаты строк'
        ],
        right: 1
    },
    {
        text: 'Какой тип диаграммы лучше всего подходит для сравнения категорий?',
        answers: [
            'Линейный график',
            'Столбчатая диаграмма',
            'Круговая диаграмма'
        ],
        right: 1
    },
    {
        text: 'Что такое "выброс" (outlier) в анализе данных?',
        answers: [
            'Наиболее часто встречающееся значение',
            'Среднее арифметическое всех значений',
            'Значение, сильно отличающееся от остальных наблюдений'
        ],
        right: 2
    },
    {
        text: 'Какую меру центральной тенденции сильнее всего искажают выбросы?',
        answers: [
            'Среднее арифметическое',
            'Медиану',
            'Моду'
        ],
        right: 0
    },
    {
        text: 'Для чего используется сводная таблица (pivot table)?',
        answers: [
            'Для хранения исходных данных',
            'Для агрегации и перегруппировки данных',
            'Для удаления пустых строк'
        ],
        right: 1
    },
    {
        text: 'Что измеряет коэффициент корреляции?',
        answers: [
            'Точное значение зависимой переменной',
            'Количество пропусков в данных',
            'Силу и направление связи между переменными'
        ],
        right: 2
    },
    {
        text: 'Какой инструмент НЕ используется для анализа данных?',
        answers: [
            'Microsoft Excel',
            'Adobe Photoshop',
            'SQL базы данных'
        ],
        right: 1
    },
    {
        text: 'Что представляет собой дашборд (dashboard)?',
        answers: [
            'Интерактивную панель с визуализацией ключевых метрик',
            'Таблицу с необработанными данными',
            'Текстовый файл с логами ошибок'
        ],
        right: 0
    }
];

let current_num = 0;   
let score = 0;         
let can_click = true;  

let q_text_el = document.getElementById("q_text");
let btns_el = document.getElementById("btns");
let hint_el = document.getElementById("hint");
let progress_el = document.getElementById("progress_bar");

show_question();

function show_question() {
    let q = all_questions[current_num];
    
    q_text_el.textContent = q.text;

    hint_el.textContent = "";
    hint_el.className = "hint";
    
    let btns_html = "";
    for (let i = 0; i < q.answers.length; i++) {
        btns_html = btns_html + `<button class="answer_btn" onclick="check_click(${i})">${q.answers[i]}</button>`;
    }
    btns_el.innerHTML = btns_html;
    
    can_click = true;
    
    update_progress();
}

function check_click(clicked_index) {
    if (can_click === false) {
        return;
    }
    can_click = false;
    
    let q = all_questions[current_num];
    let all_btns = document.querySelectorAll(".answer_btn");
    
    for (let i = 0; i < all_btns.length; i++) {
        all_btns[i].classList.add("locked");
    }
    
    if (clicked_index === q.right) {
        all_btns[clicked_index].classList.add("green");
        hint_el.textContent = "Правильно!";
        hint_el.className = "hint green_text";
        score = score + 1;
    } else {
        all_btns[clicked_index].classList.add("red");
        all_btns[q.right].classList.add("green");
        hint_el.textContent = "Неправильно";
        hint_el.className = "hint red_text";
    }
    
    if (current_num < all_questions.length - 1) {
        setTimeout(function() {
            current_num = current_num + 1;
            show_question();
        }, 1500);
    } else {
        setTimeout(show_result, 1500);
    }
}

function update_progress() {
    let percent = Math.round((current_num / all_questions.length) * 100);
    progress_el.style.width = percent + "%";
    progress_el.textContent = current_num + "/" + all_questions.length;
}

function show_result() {
    document.getElementById("question_area").classList.add("hidden");
    document.getElementById("result_area").classList.remove("hidden");
    
    progress_el.style.width = "100%";
    progress_el.textContent = all_questions.length + "/" + all_questions.length;
    
    document.getElementById("score").textContent = score + " из " + all_questions.length;
    
    let message = "";
    if (score === all_questions.length) {
        message = "Идеально!";
    } else if (score >= 7) {
        message = "Хороший результат!";
    } else if (score >= 4) {
        message = "Неплохо, но можно лучше";
    } else {
        message = "Нужно подучить тему";
    }
    document.getElementById("message").textContent = message;
}

function start_again() {
    current_num = 0;
    score = 0;
    
    document.getElementById("question_area").classList.remove("hidden");
    document.getElementById("result_area").classList.add("hidden");
    
    show_question();
}