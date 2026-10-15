/* ==========================================================================
   СОДЕРЖИМОЕ САЙТА
   Это единственный файл, который нужно править, чтобы поменять тексты, видео и контакты.
   Кавычки "" и запятые , оставляйте ровно так, как в образце.
   Всё, что помечено ЗАГЛУШКА, это пример текста. Замените его своим.
   ========================================================================== */

window.SITE = {

  /* ---------- Первый экран ---------- */
  name: "JK.rec",               // ЗАГЛУШКА. Слова переносятся на отдельные строки, например "Алексей Орлов".
  role: "Видеомонтаж",
  tagline: "Вертикальный контент для Reels, Shorts и TikTok. Горизонтальный контент для YouTube.",

  availability: {
    show: true,                   // true = показать строку статуса, false = скрыть
    text: "Открыт для новых проектов"  // ЗАГЛУШКА. Измените или скройте, если это не так.
  },

  /* Необязательная кнопка «Смотреть шоурил» в первом экране. Оставьте id/src пустыми (""), чтобы скрыть кнопку.
     Используйте ОДИН вариант: type "youtube" + id, type "vimeo" + id или type "file" + src. */
  showreel: {
    type: "youtube",
    id: "",                       // ID видео на YouTube или ссылка целиком
    src: "",                      // для type "file": "assets/videos/showreel.mp4"
    poster: "",                   // необязательная обложка, например "assets/images/showreel.jpg"
    format: "horizontal"          // "horizontal" (16:9) или "vertical" (9:16)
  },

  /* ---------- Контакты ---------- */
  contacts: {
    telegram: "eugene_egorow",    // ЗАГЛУШКА. Имя пользователя без @ или полная ссылка https://t.me/...
    email: "evgenii.egorov1996@gmail.com",   // ЗАГЛУШКА.
    emailSubject: "Заказ видеомонтажа",   // тема письма, которая подставится заранее
    socials: [
      // Необязательные дополнительные ссылки под кнопками. Примеры:
      // { label: "YouTube",   url: "https://youtube.com/@yourchannel" },
      // { label: "Instagram", url: "https://instagram.com/yourname" }
    ]
  },

  /* ---------- Обо мне ---------- */
  about: {
    heading: "Каждая склейка должна быть оправдана.",
    text: [
      "ЗАГЛУШКА: добавьте короткое представление. Кто вы, где находитесь и какой монтаж вам нравится больше всего.",
      "Превращаю исходники в ролики: понятные, с хорошим ритмом и собранные под ту площадку, где они выйдут."
    ],
    photo: "",                    // необязательно, например "assets/images/me.jpg" (лучше портрет 4:5)
    photoAlt: "Портрет",
    tools: [
      // Необязательно. Добавьте программы, которыми вы действительно пользуетесь. Пример: "Premiere Pro", "DaVinci Resolve"
    ],
    principles: [
      { title: "Сначала история, потом эффекты",
        text: "Сначала структура и ритм. Эффект остаётся, только если помогает зрителю следить за сюжетом." },
      { title: "Под конкретную площадку",
        text: "Вертикальные ролики кадрируются и монтируются под телефон. Видео для YouTube строятся так, чтобы удерживать внимание на длинной дистанции." },
      { title: "Чистый, ровный звук",
        text: "Голос, музыка и эффекты сбалансированы, чтобы видео одинаково звучало в динамиках телефона и в наушниках." },
      { title: "Понятный процесс",
        text: "Короткий бриф в начале, организованные правки и финальные файлы в нужных вам форматах." }
    ]
  },

  /* ---------- Услуги (ЗАГЛУШКА: оставьте только то, что вы действительно предлагаете) ---------- */
  services: [
    { title: "Монтаж коротких видео",
      text: "Ролики для Reels, Shorts и TikTok: плотный ритм, субтитры, звуковой дизайн и правильное вертикальное кадрирование." },
    { title: "Монтаж для YouTube",
      text: "Полный монтаж длинных видео: структура, склейка, перебивки, графика, сведение звука и финальный экспорт." },
    { title: "Субтитры и титры",
      text: "Стилизованные субтитры для коротких роликов и аккуратные субтитры для длинных видео." },
    { title: "Нарезка из длинных видео",
      text: "Превращаю подкасты, стримы и ролики YouTube в серию коротких вертикальных клипов." },
    { title: "Звук и музыка",
      text: "Очистка речи, подбор музыки, звуковые эффекты и финальное сведение." },
    { title: "Цветокоррекция",
      text: "Базовая коррекция и единый вид всего проекта." }
  ],

  /* ---------- Заголовки категорий ---------- */
  categories: {
    short:   { title: "Короткие видео", text: "Вертикальные ролики для Reels, Shorts и TikTok." },
    youtube: { title: "YouTube",        text: "Длинные видео и монтаж каналов." },
    other:   { title: "Другие проекты", text: "Другие форматы и личные проекты." }
  },

  /* ---------- Проекты ----------
     Каждый проект это один блок { ... }. Скопируйте блок, чтобы добавить проект, удалите, чтобы убрать.

     category : "short" | "youtube" | "other"
     featured : true  = показывается в большом блоке «Проекты» вверху
                false = показывается в своей категории ниже (проект никогда не показывается дважды)
     format   : "vertical" (9:16) или "horizontal" (16:9). Необязательно: short = vertical, остальные = horizontal
     title    : название проекта
     note     : необязательное описание в одну строку (что вы делали, клиент, год...). "" = скрыть.
     poster   : необязательная обложка, например "assets/images/my-cover.jpg".
                Для YouTube не нужна (превью подтягивается автоматически).
     video    : откуда берётся видео. Используйте ОДИН вариант:
                { type: "youtube", id: "https://www.youtube.com/watch?v=lHXcnsNUfYs&t=234s" }     // ID на YouTube или ссылка целиком (ссылки на Shorts подходят)
                { type: "vimeo",   id: "123456789" }       // ID или ссылка на Vimeo (добавьте poster)
                { type: "file",    src: "assets/videos/my-video.mp4" }   // ваш MP4 (до 25 МБ)
                Если id/src пустые (""), карточка покажет заглушку «Здесь будет ваше видео».
  */
  projects: [

    /* Избранные (большой блок вверху) */
    { category: "youtube", featured: true, format: "horizontal",
      title: "", note: "",
      poster: "", video: { type: "youtube", id: "lHXcnsNUfYs" } },

    { category: "short", featured: true,
      title: "", note: "",
      poster: "", video: { type: "youtube", id: "https://youtube.com/shorts/1Zb4V2rduEw?feature=share" } },
    { category: "short", featured: true,
      title: "", note: "",
      poster: "", video: { type: "youtube", id: "https://youtube.com/shorts/np8LZUnoLLI?feature=share" } },
    { category: "short", featured: true,
      title: "", note: "",
      poster: "", video: { type: "youtube", id: "https://youtube.com/shorts/jUZKhJn7VD4?feature=share" } },

    /* Короткие видео */
    { category: "short", title: "", note: "", poster: "", video: { type: "youtube", id: "https://youtube.com/shorts/3yiJvNH0To8?feature=share" } },
    { category: "short", title: "", note: "", poster: "", video: { type: "youtube", id: "https://youtube.com/shorts/GrAWaFX3AZQ" } },
    { category: "short", title: "", note: "", poster: "", video: { type: "youtube", id: "https://youtube.com/shorts/jiEoXjDOEuQ?feature=share" } },
    { category: "short", title: "", note: "", poster: "", video: { type: "youtube", id: "" } },

    /* YouTube */
    { category: "youtube", title: "", note: "", poster: "", video: { type: "youtube", id: "https://www.youtube.com/watch?v=bjdoHqfFXlA&list=RDbjdoHqfFXlA&start_radio=1" } },
    { category: "youtube", title: "", note: "", poster: "", video: { type: "youtube", id: "https://www.youtube.com/watch?v=0NmrjDtUAjA&t=15s" } },

    /* Другие проекты */
    { category: "other", format: "horizontal", title: "Название проекта", note: "", poster: "", video: { type: "youtube", id: "" } },
    { category: "other", format: "horizontal", title: "Название проекта", note: "", poster: "", video: { type: "youtube", id: "" } }
  ]
};
