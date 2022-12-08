
/****PLEASE DON'T MAKE CHANGES IN THIS FILE IT'S AFFECT THE CODE IF YOU NEED ANY HELP PLEASE CONTACT TO FLITS TEAM support@getflits.com ****/
(function(Flits) {
  /* To load js in all pages */
  if(Flits.Metafields.IS_SOCIAL_LOGIN_PAID && Flits.Metafields.IS_SOCIAL_LOGIN_ENABLE){
    if(window.flitsObjects.allCssJs.socialLoginJs){
        Flits.LoadStyleScript('socialLoginJs',window.flitsObjects.allCssJs.socialLoginJs.url);
    }
  }
  
  Flits(document).on('Flits:Navigation:Loaded', function(event){
    var settings = event.detail.settings;
    var obj = {
      title: 'Wishlist',
      url:'search/?view=wish',
      target:1,
      badge: null,
      icon: null,
      isShow: 1,
      loader:null,
      body_html: null
    }
    settings.navs.splice(5, 0, obj);
     });
  
  document.addEventListener('click',function() {
//     console.log("loaded");
    let order_numbers = []

    Flits('.return__exchange').each(function(){
      let $self = Flits(this);
      order_numbers.push($self.attr('data-order_name'));
    });
    var url = 'https://admin.returnprime.com/get-fulfilled-order-status';
    var data = {
      order_numbers: order_numbers, 
      store_name: Shopify.shop
    }
    Flits.ajax({
      type: 'POST',
      url: url,
      data: data,
      dataType: 'json',
      success: function(response) { 
        //console.log(response);
        let orders = response.orders;
        Flits('.return__exchange').each(function(){
          let $self = $(this);
          let orderId = $self.attr('data-order_name');
          orders.forEach(function(order){
            if(order.order_id === orderId && !order.status) {
              $self.find(".js-return-exchange").addClass("disabled");
//               $self.find(".js-return-exchange").html("Not Available");
            }
          })
        });
      },
      error: function(xhr, textStatus, errorThrown) {
        //console.log(xhr);
      }
    });

    // on click of return button redirect to returnprime 
    var ReturnButton = Flits('.js-return-exchange');
    let responseUrl = null;
    ReturnButton.on('click', function() {    
      var Self = Flits(this),
          OrderId = Self.attr('data-order'),
          CustomerEmail = Self.attr('data-customer');
      var ReturnUrl = 'https://admin.returnprime.com/fetch_order';
      var data = {
        order_number: OrderId, 
        email: CustomerEmail,
        store : Shopify.shop
      }
      Flits.ajax({
        async:false,
        type: 'POST',
        url: ReturnUrl,
        data: data,
        dataType: 'json',
        success: function(response) { 
          if(response.success == false) {
            var ErrorMessage = response.message;
            alert(ErrorMessage);
          }
          else if(response.success == true) {
            //window.open(response.url, "_blank")
            responseUrl = response.url;

          }
        },
        error: function(xhr, textStatus, errorThrown) {
          var response = JSON.parse(xhr.responseText);
          var ErrorMessage = response.message;
          alert(ErrorMessage);
        }
      });

      if(responseUrl) {
        window.open(responseUrl, "_blank")
      }
    })
  });
  
  
    

  window.Flits.fn.extend({
    appendSocialLoginDivAdded: function(socialLoginBtnGroup, isTrue) {

      var settings = Flits.SocialLogin.settings;
      return this.filter(':not([data-flits="social-login-added"])').each(function(index, el) {
        if (el = Flits(el),
            isTrue && (el.css('display') == 'none'))
          return;
        if (typeof el[0].addEventListener != 'function')
          return;
        var parent = el.parent();
        var cloneNode = socialLoginBtnGroup.clone(!0);
        parent.append(cloneNode),
          el.attr('data-flits', 'social-login-added'),
          parent.attr('data-flits', 'social-login-parent'),
          settings.automaticAppendDivFunction.apply(this, [el, parent, cloneNode]),
          Flits.dispatchEvent('Flits:SocialLoginAutomaticCode:Loaded', {
          el: el,
          parent: parent,
          cloneNode: cloneNode
        });
      }),
        this;
    }
  })

  var  buttonAppendButtons =  function() {
    let selector = Flits.SocialLogin.settings.domSelector;
    let selectorLength = Flits.SocialLogin.settings.domSelector.length;
    let items = Flits.SocialLogin.settings.buttonConfig;
    let socialLoginBtnGroup = Flits('<div />');
    socialLoginBtnGroup.addClass('flits-social-login-btn-grp');
    let socialLoginErrorDiv = Flits('<div />');
    socialLoginErrorDiv.addClass('flits-social-login-error'),
      Flits.each(items, function(index, item) {
      if (Flits.Metafields[item.metafieldName] && item.isDisplay) {
        let btnClone = Flits('#flits-social-login-btn-template').clone();
        btnClone.removeAttr('id');
        let hrefAttr = btnClone.attr('data-href').replace('proxy_name', Flits.proxy_name).replace('app_id', Flits.app_id).replace('shop_id', Flits.shop_id).replace('shop_token', Flits.token).replace('login_type', item.login_type);
        btnClone.attr('href', hrefAttr),
          btnClone.addClass(item.btn_class),
          btnClone.css('order', item.order),
          Flits(btnClone).find('.flits-social-login-btn-img').html(item.icon_img),
          Flits(btnClone).find('.flits-social-login-btn-text').html(item.login_name),
          socialLoginBtnGroup.append(btnClone);
      }
    });
    let code = Flits('<div />');
    for (code.addClass('flits-social-login-container'),
         code.append(socialLoginBtnGroup),
         code.append(socialLoginErrorDiv),
         i = 0; Flits.SocialLogin.settings.domSelector.length > i; i++)
      Flits.SocialLogin.settings.domSelector,
        Flits(window.Flits.SocialLogin.settings.domSelector[i][0]).appendSocialLoginDivAdded(code, Flits.SocialLogin.settings.domSelector[i][1]);    
  };


  Flits(window).on('load', function(event){
    setTimeout(function(){
    buttonAppendButtons();
    },2000);
            
  });

  
  // To change the position of social login buttons in the Login/Register Slider
  Flits(document).on('Flits:SocialLoginAutomaticCode:Loaded', function(event){
    var data = event.detail;
    var el = data.el;
    var parent = data.parent; // parent
    var cloneNode = data.cloneNode; // cloned social login div
    if (Flits(parent).attr("id") == "nt_login_canvas"){
      if(el.find(".fixcl-scroll-content")){
        el.find(".fixcl-scroll-content").append(cloneNode);
      }
    }
  });
  
  $(document).on('pjax:complete', function (xhr, textStatus, options) {
  	setTimeout(function(){
      let collectionBtn = Flits(".flits-wishlist-colection");
      parseInt(Flits.wishlistButton.settings.isCountEnable) && Flits(collectionBtn).find(".flits-wls-count-btn").css("display", "flex"),
        Flits(collectionBtn).show(),
        Flits(".flits-wishlist-colection:not(.flits-template)").parent().attr("data-flits", "wishlist-collection-parent");
    }, 1000);
    setTimeout(function(){
      Flits('.flits-wishlist-colection').each(function(index,ele){
      	let wishProdHandle = Flits(ele).find('.flits-wls-button').attr('data-flits-product-handle');
        if(Flits.isProductAddedInWishlist(wishProdHandle)){ 
          Flits(ele).find('.flits-wls-button').removeClass("flits-wls-inactive")
          Flits(ele).find('.flits-wls-button').addClass("flits-wls-active")
          Flits(ele).find('.flits-wls-button').attr("data-tippy-content",Flits.t('Flits.locals.wishlisted_product_page.remove_from_wishlist_button', 'Remove from Wishlist'))
        }
      });
    },2000);
  });

   Flits(document).on('Flits:StoreCreditCart:Loaded', function(event){  
  localStorage.removeItem('__ui');
   });
  
}(Flits));

