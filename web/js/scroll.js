$(document).ready(function() {

   // Выбираем все ссылки, на которые будет распространяться работа данного скрипта
   var links = document.body.querySelectorAll('.smoothScroll');

   for (var i = 0; i < links.length; i++) {
      var elem = links[i];
      elem.addEventListener('click', function(e) {
         e.preventDefault();

         var link = e.target;

         // Получаем элемент a, у которого id равен атрибуту href текущей ссылки
         var id = link.getAttribute('href').slice(1);
         var targetLink = document.getElementById(id);

         // Определяем его координаты
         var coordinates = targetLink.getBoundingClientRect(),
             linkOffsetY = coordinates.top;

         // Определяем текущую прокрутку
         var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

         // Высчитываем дельту, на которую необходимо прокрутить окно
         var delta = linkOffsetY + scrollTop;

         // Выполняем прокрутку
         $('body, html').animate({scrollTop: delta}, 800, "swing");

      });
   }

});