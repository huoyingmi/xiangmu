/*navtop顶部导航*/
;(function($){
   $('.dropdown')
   .hover(function(){
       // $(this)$this('menu-active');
       $this = $(this);
       var activeClass = $this.data('active')+'-active';
       $this.addClass(activeClass);
   },function(){
       // $(this).removeClass('menu-active');
       $this = $(this);
       var activeClass = $this.data('active')+'-active';
       $this.removeClass(activeClass);
   })
})(jQuery);