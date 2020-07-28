(function($) {
  "use strict"; // Start of use strict

  _2ClickIframePrivacy.init({
    'enableCookies':false
  });

  // bootstrap modals
  // open subpages in modals
  $("#footerMenu a").click(function(e){
    e.preventDefault();
    console.log('clicked footer menu link', this, $(this));
    $.get({
      url: $(this).attr('href'),
      success: function(response){
        console.log('sucess',response);
        // Add response in Modal body
        $('#exampleModal .modal-body').html(response);
        // Display Modal
        $('#exampleModal').modal('show');
      }
    });

  });

  // scrollProgress
  const progressElement = document.querySelector('.progress-bar');

  const progressObserver = new ScrollProgress((x, y) => {
    progressElement.style.width = y * 100 + '%';
  });



})(jQuery); // End of use strict
