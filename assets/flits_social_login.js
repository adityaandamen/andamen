
/****PLEASE DON'T MAKE CHANGES IN THIS FILE IT'S AFFECT THE CODE IF YOU NEED ANY HELP PLEASE CONTACT TO FLITS TEAM support@getflits.com ****/
(function (Flits, SocialLogin) {
    (SocialLogin = Flits.SocialLogin = function (options) {
        function submitLoginform(email, pass) {
            let form = Flits("form#customer_login");
            Flits(form).find('input[name="customer[email]"]').val(email), Flits(form).find('input[name="customer[password]"]').val(pass), form.submit();
        }
        function buttonAppend() {
            let selector = Flits.SocialLogin.settings.domSelector;
            let selectorLength = Flits.SocialLogin.settings.domSelector.length;
            let items = Flits.SocialLogin.settings.buttonConfig;
            let socialLoginBtnGroup = Flits("<div />");
            socialLoginBtnGroup.addClass("flits-social-login-btn-grp");
            let socialLoginErrorDiv = Flits("<div />");
            socialLoginErrorDiv.addClass("flits-social-login-error"),
                Flits.each(items, function (index, item) {
                    if (Flits.Metafields[item.metafieldName] && item.isDisplay) {
                        let btnClone = Flits("#flits-social-login-btn-template").clone();
                        btnClone.removeAttr("id");
                        let hrefAttr = btnClone
                            .attr("data-href")
                            .replace("proxy_name", Flits.proxy_name)
                            .replace("app_id", Flits.app_id)
                            .replace("shop_id", Flits.shop_id)
                            .replace("shop_token", Flits.token)
                            .replace("login_type", item.login_type);
                        btnClone.attr("href", hrefAttr),
                            btnClone.addClass(item.btn_class),
                            btnClone.css("order", item.order),
                            Flits(btnClone).find(".flits-social-login-btn-img").html(item.icon_img),
                            Flits(btnClone).find(".flits-social-login-btn-text").html(item.login_name),
                            socialLoginBtnGroup.append(btnClone);
                    }
                });
            let code = Flits("<div />");
            for (code.addClass("flits-social-login-container"), code.append(socialLoginBtnGroup), code.append(socialLoginErrorDiv), i = 0; Flits.SocialLogin.settings.domSelector.length > i; i++)
                Flits.SocialLogin.settings.domSelector, Flits(Flits.SocialLogin.settings.domSelector[i][0]).appendSocialLoginDiv(code, Flits.SocialLogin.settings.domSelector[i][1]);
        }
        function redirectBack() {
            if (!(Flits.SocialLogin.settings.isRedirectToLastPage || Flits.SocialLogin.settings.isRedirectToCheckout)) return !1;
            let redirectUrl = Flits.getLocalStorage(Flits.SocialLogin.settings.beforeLoginVar);
            location.hash.indexOf("contact-form") == -1 && Flits(Flits.SocialLogin.settings.redirectUrlFormSelector.join(",")).addRedirectUrl(redirectUrl);
        }
        Flits.SocialLogin.settings = {};
        var settings = {
            automaticAppendDivFunction: function () {},
            domSelector: [
                ["form#customer_login", !0],
                ["form#create_customer", !0],
                ["form#RegisterForm", !0],
                ['form[action="/account/login"]', !0],
                ['form[action="/account"][method="post"]', !0],
            ],
            buttonConfig: {
                facebook: {
                    login_name: Flits.t("Flits.locals.social_login_page.facebook", "Facebook"),
                    login_type: "facebook",
                    btn_class: "flits-social-login-btn-facebook",
                    icon_img:
                        "<img class='flits-icon-facebook' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IiNGRkZGRkYiID4gICAgPHBhdGggZD0iTTEzLDcuNDI5VjEwaDMuNUwxNiwxM2gtM3Y5SDl2LTlIN3YtM2wyLjAxMiwwLjAwOFY3LjQzNmMwLTIuODU3LDEuMTQzLTQuNDI5LDQuNDI5LTQuNDI5TDE3LDN2M2gtMi41NzEgQzEzLjE0Myw2LDEzLDYuNDI5LDEzLDcuNDI5eiI+PC9wYXRoPjwvc3ZnPg=='/>",
                    order: 1,
                    isDisplay: !0,
                    metafieldName: "IS_FACEBOOK_ENABLE",
                },
                google: {
                    login_name: Flits.t("Flits.locals.social_login_page.google", "Google"),
                    login_type: "google",
                    btn_class: "flits-social-login-btn-googleplus",
                    icon_img:
                        "<svg class='flits-icon-google' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'> <path style='fill:#FBBB00;' d='M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256 c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456 C103.821,274.792,107.225,292.797,113.47,309.408z'/> <path style='fill:#518EF8;' d='M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451 c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535 c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z'/> <path style='fill:#28B446;' d='M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512 c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771 c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z'/> <path style='fill:#F14336;' d='M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012 c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0 C318.115,0,375.068,22.126,419.404,58.936z'/>",
                    order: 2,
                    isDisplay: !0,
                    metafieldName: "IS_GOOGLE_ENABLE",
                },
                twitter: {
                    login_name: Flits.t("Flits.locals.social_login_page.twitter", "Twitter"),
                    login_type: "twitter",
                    btn_class: "flits-social-login-btn-twitter",
                    icon_img:
                        "<img class='flits-icon-twitter' src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjYgMjYiIGZpbGw9IiNGRkZGRkYiID48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgIiBkPSJNIDI1Ljg1NTQ2OSA1LjU3NDIxOSBDIDI0LjkxNDA2MyA1Ljk5MjE4OCAyMy45MDIzNDQgNi4yNzM0MzggMjIuODM5ODQ0IDYuNDAyMzQ0IEMgMjMuOTIxODc1IDUuNzUgMjQuNzU3ODEzIDQuNzIyNjU2IDI1LjE0ODQzOCAzLjQ5NjA5NCBDIDI0LjEzMjgxMyA0LjA5NzY1NiAyMy4wMDc4MTMgNC41MzUxNTYgMjEuODEyNSA0Ljc2OTUzMSBDIDIwLjg1NTQ2OSAzLjc1IDE5LjQ5MjE4OCAzLjExMzI4MSAxNy45ODA0NjkgMy4xMTMyODEgQyAxNS4wODIwMzEgMy4xMTMyODEgMTIuNzMwNDY5IDUuNDY0ODQ0IDEyLjczMDQ2OSA4LjM2MzI4MSBDIDEyLjczMDQ2OSA4Ljc3MzQzOCAxMi43NzczNDQgOS4xNzU3ODEgMTIuODY3MTg4IDkuNTU4NTk0IEMgOC41MDM5MDYgOS4zMzk4NDQgNC42MzY3MTkgNy4yNDYwOTQgMi4wNDY4NzUgNC4wNzAzMTMgQyAxLjU5Mzc1IDQuODQ3NjU2IDEuMzM1OTM4IDUuNzUgMS4zMzU5MzggNi43MTQ4NDQgQyAxLjMzNTkzOCA4LjUzNTE1NiAyLjI2MTcxOSAxMC4xNDA2MjUgMy42NzE4NzUgMTEuMDgyMDMxIEMgMi44MDg1OTQgMTEuMDU0Njg4IDIgMTAuODIwMzEzIDEuMjkyOTY5IDEwLjQyNTc4MSBDIDEuMjkyOTY5IDEwLjQ0OTIxOSAxLjI5Mjk2OSAxMC40Njg3NSAxLjI5Mjk2OSAxMC40OTIxODggQyAxLjI5Mjk2OSAxMy4wMzUxNTYgMy4xMDE1NjMgMTUuMTU2MjUgNS41MDM5MDYgMTUuNjQwNjI1IEMgNS4wNjI1IDE1Ljc2MTcxOSA0LjYwMTU2MyAxNS44MjQyMTkgNC4xMjEwOTQgMTUuODI0MjE5IEMgMy43ODEyNSAxNS44MjQyMTkgMy40NTMxMjUgMTUuNzkyOTY5IDMuMTMyODEzIDE1LjczMDQ2OSBDIDMuODAwNzgxIDE3LjgxMjUgNS43MzgyODEgMTkuMzM1OTM4IDguMDM1MTU2IDE5LjM3NSBDIDYuMjQyMTg4IDIwLjc4NTE1NiAzLjk3NjU2MyAyMS42MjEwOTQgMS41MTU2MjUgMjEuNjIxMDk0IEMgMS4wODk4NDQgMjEuNjIxMDk0IDAuNjc1NzgxIDIxLjU5NzY1NiAwLjI2NTYyNSAyMS41NTA3ODEgQyAyLjU4NTkzOCAyMy4wMzkwNjMgNS4zNDc2NTYgMjMuOTA2MjUgOC4zMTI1IDIzLjkwNjI1IEMgMTcuOTY4NzUgMjMuOTA2MjUgMjMuMjUgMTUuOTA2MjUgMjMuMjUgOC45NzI2NTYgQyAyMy4yNSA4Ljc0MjE4OCAyMy4yNDYwOTQgOC41MTU2MjUgMjMuMjM0Mzc1IDguMjg5MDYzIEMgMjQuMjYxNzE5IDcuNTU0Njg4IDI1LjE1MjM0NCA2LjYyODkwNiAyNS44NTU0NjkgNS41NzQyMTkgIj48L3BhdGg+PC9nPjwvc3ZnPg=='/>",
                    order: 3,
                    isDisplay: !0,
                    metafieldName: "IS_TWITTER_ENABLE",
                },
                amazon: {
                    login_name: Flits.t("Flits.locals.social_login_page.amazon", "Amazon"),
                    login_type: "amazon",
                    btn_class: "flits-social-login-btn-amazon",
                    icon_img:
                        "<img class='flits-icon-amazon' src='data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTAwIiBoZWlnaHQ9IjIyNzMiIHZpZXdCb3g9IjAgMCAxMTAwIDEwMDAiPg0KCTxwYXRoIGQ9Ik0yIDc3NmMzLjMzMy01LjMzMyA4LjY2Ni01LjY2NyAxNi0xIDE2Ni42NjYgOTYuNjY3IDM0OCAxNDUgNTQ0IDE0NSAxMzAuNjY2IDAgMjU5LjY2Ni0yNC4zMzMgMzg3LTczIDMuMzMzLTEuMzMzIDguMTY2LTMuMzMzIDE0LjUtNiA2LjMzMy0yLjY2NyAxMC44MzMtNC42NjcgMTMuNS02IDEwLTQgMTcuODMzLTIgMjMuNSA2IDUuNjY2IDggMy44MzMgMTUuMzMzLTUuNSAyMi0xMiA4LjY2Ny0yNy4zMzQgMTguNjY3LTQ2IDMwLTU3LjMzNCAzNC0xMjEuMzM0IDYwLjMzMy0xOTIgNzktNzAuNjY3IDE4LjY2Ny0xMzkuNjY3IDI4LTIwNyAyOC0xMDQgMC0yMDIuMzM0LTE4LjE2Ny0yOTUtNTQuNUMxNjIuMzMzIDkwOS4xNjcgNzkuMzMzIDg1OCA2IDc5MmMtNC0zLjMzMy02LTYuNjY3LTYtMTAgMC0yIC42NjYtNCAyLTZ6bTMwMS0yODVjMC00NiAxMS4zMzMtODUuMzMzIDM0LTExOCAyMi42NjYtMzIuNjY3IDUzLjY2Ni01Ny4zMzMgOTMtNzQgMzYtMTUuMzMzIDgwLjMzMy0yNi4zMzMgMTMzLTMzIDE4LTIgNDcuMzMzLTQuNjY3IDg4LTh2LTE3YzAtNDIuNjY3LTQuNjY3LTcxLjMzMy0xNC04Ni0xNC0yMC0zNi0zMC02Ni0zMGgtOGMtMjIgMi00MSA5LTU3IDIxcy0yNi4zMzQgMjguNjY3LTMxIDUwYy0yLjY2NyAxMy4zMzMtOS4zMzQgMjEtMjAgMjNsLTExNS0xNGMtMTEuMzM0LTIuNjY3LTE3LTguNjY3LTE3LTE4IDAtMiAuMzMzLTQuMzMzIDEtNyAxMS4zMzMtNTkuMzMzIDM5LjE2Ni0xMDMuMzMzIDgzLjUtMTMyQzQ1MS44MzMgMTkuMzMzIDUwMy42NjYgMy4zMzMgNTYzIDBoMjVjNzYgMCAxMzUuMzMzIDE5LjY2NyAxNzggNTlhMTkwLjUyIDE5MC41MiAwIDAgMSAxOC41IDIxLjVjNS42NjYgNy42NjcgMTAuMTY2IDE0LjUgMTMuNSAyMC41IDMuMzMzIDYgNi4zMzMgMTQuNjY3IDkgMjYgMi42NjYgMTEuMzMzIDQuNjY2IDE5LjE2NyA2IDIzLjUgMS4zMzMgNC4zMzMgMi4zMzMgMTMuNjY3IDMgMjggLjY2NiAxNC4zMzMgMSAyMi44MzMgMSAyNS41djI0MmMwIDE3LjMzMyAyLjUgMzMuMTY3IDcuNSA0Ny41czkuODMzIDI0LjY2NyAxNC41IDMxYzQuNjY2IDYuMzMzIDEyLjMzMyAxNi41IDIzIDMwLjUgNCA2IDYgMTEuMzMzIDYgMTYgMCA1LjMzMy0yLjY2NyAxMC04IDE0LTU1LjMzNCA0OC04NS4zMzQgNzQtOTAgNzgtOCA2LTE3LjY2NyA2LjY2Ny0yOSAyLTkuMzM0LTgtMTcuNS0xNS42NjctMjQuNS0yM3MtMTItMTIuNjY3LTE1LTE2LTcuODM0LTkuODMzLTE0LjUtMTkuNWMtNi42NjctOS42NjctMTEuMzM0LTE2LjE2Ny0xNC0xOS41LTM3LjMzNCA0MC42NjctNzQgNjYtMTEwIDc2LTIyLjY2NyA2LjY2Ny01MC42NjcgMTAtODQgMTAtNTEuMzM0IDAtOTMuNS0xNS44MzMtMTI2LjUtNDcuNVMzMDMgNTQ5IDMwMyA0OTF6bTE3Mi0yMGMwIDI2IDYuNSA0Ni44MzMgMTkuNSA2Mi41UzUyNSA1NTcgNTQ3IDU1N2MyIDAgNC44MzMtLjMzMyA4LjUtMSAzLjY2Ni0uNjY3IDYuMTY2LTEgNy41LTEgMjgtNy4zMzMgNDkuNjY2LTI1LjMzMyA2NS01NCA3LjMzMy0xMi42NjcgMTIuODMzLTI2LjUgMTYuNS00MS41IDMuNjY2LTE1IDUuNjY2LTI3LjE2NyA2LTM2LjUuMzMzLTkuMzMzLjUtMjQuNjY3LjUtNDZ2LTI1Yy0zOC42NjcgMC02OCAyLjY2Ny04OCA4LTU4LjY2NyAxNi42NjctODggNTMuNjY3LTg4IDExMXptNDIwIDMyMmMxLjMzMy0yLjY2NyAzLjMzMy01LjMzMyA2LTggMTYuNjY2LTExLjMzMyAzMi42NjYtMTkgNDgtMjMgMjUuMzMzLTYuNjY3IDUwLTEwLjMzMyA3NC0xMSA2LjY2Ni0uNjY3IDEzLS4zMzMgMTkgMSAzMCAyLjY2NyA0OCA3LjY2NyA1NCAxNSAyLjY2NiA0IDQgMTAgNCAxOHY3YzAgMjMuMzMzLTYuMzM0IDUwLjgzMy0xOSA4Mi41LTEyLjY2NyAzMS42NjctMzAuMzM0IDU3LjE2Ny01MyA3Ni41LTMuMzM0IDIuNjY3LTYuMzM0IDQtOSA0LTEuMzM0IDAtMi42NjctLjMzMy00LTEtNC0yLTUtNS42NjctMy0xMSAyNC42NjYtNTggMzctOTguMzMzIDM3LTEyMSAwLTcuMzMzLTEuMzM0LTEyLjY2Ny00LTE2LTYuNjY3LTgtMjUuMzM0LTEyLTU2LTEyLTExLjMzNCAwLTI0LjY2Ny42NjctNDAgMi0xNi42NjcgMi0zMiA0LTQ2IDYtNCAwLTYuNjY3LS42NjctOC0yLTEuMzM0LTEuMzMzLTEuNjY3LTIuNjY3LTEtNCAwLS42NjcuMzMzLTEuNjY3IDEtM3oiLz4NCjwvc3ZnPg=='/>",
                    order: 4,
                    isDisplay: !0,
                    metafieldName: "IS_AMAZON_ENABLE",
                },
            },
            beforeLoginVar: "flits_before_login_url",
            isRedirectToLastPage: !0,
            isRedirectToCheckout: !0,
            doNotStoreLastURLof: ["customers/login", "customers/register", "customers/account"],
            redirectUrlFormSelector: ["form#customer_login", "form#create_customer", "form#RegisterForm", ".shopify-challenge__container form", ".shopify-challenge__container form"],
        };
        if (
            ((settings = Flits.extend(Flits.SocialLogin.settings, settings, options)),
            Flits.dispatchEvent("Flits:SocialLogin:Loaded", { settings: settings }),
            buttonAppend(),
            Flits.SocialLogin.settings.isRedirectToLastPage &&
                Flits.SocialLogin.settings.doNotStoreLastURLof.indexOf(Flits.request.page_type) == -1 &&
                document.location.pathname.indexOf("/challenge") &&
                Flits.setLocalStorage(Flits.SocialLogin.settings.beforeLoginVar, window.location.pathname),
            Flits.SocialLogin.settings.isRedirectToCheckout && !Flits.isNull(Flits.getURLParameter("checkout_url")) && Flits.setLocalStorage(Flits.SocialLogin.settings.beforeLoginVar, Flits.getURLParameter("checkout_url"), 1),
            Flits.isNull(Flits.getURLParameter("flits_error")))
        ) {
            let w = Flits.getURLParameter("w");
            let o = Flits.getURLParameter("o");
            let email = Flits.isNull(w) ? null : atob(w);
            let password = Flits.isNull(o) ? null : atob(o);
            if (!(Flits.isNull(email) || Flits.isNull(password))) {
                Flits(".flits-social-login-loader").show(), redirectBack();
                let params = "customer[email]=" + email + "&customer[password]=" + password;
                Flits.ajax({
                    type: "POST",
                    url: "/account/login",
                    data: params,
                    contentType: "application/x-www-form-urlencoded",
                    xhr: function () {
                        return (this._xhr = Flits.ajaxSettings.xhr());
                    },
                })
                    .done(function (resp, textStatus, jqXHR) {
                        let url = this._xhr.responseURL;
                        if (url.includes("account/login")) {
                            let params = "email=" + w + "&token=" + Flits.token;
                            Flits.ajax({ type: "POST", url: Flits.base_url + Flits.rest_password_url, data: params, contentType: "application/x-www-form-urlencoded" })
                                .done(function (resp) {
                                    if (resp.status) {
                                        let o = resp.o;
                                        (password = Flits.isNull(o) ? null : atob(o)), Flits.isNull(password) || (submitLoginform(email, password), Flits.setLocalStorage("login_status", "userLogin"));
                                    }
                                })
                                .fail(function (resp) {})
                                .always(function () {});
                        } else submitLoginform(email, password), Flits.setLocalStorage("login_status", "userLogin");
                    })
                    .fail(function (resp) {})
                    .always(function () {});
            }
        } else {
            let div = Flits(".flits-social-login-error").css("display", "block");
            let error = parseInt(Flits.getURLParameter("flits_error"));
            let display_error = "";
            switch (error) {
                case 0:
                    display_error = Flits.t("Flits.locals.socialLogin_msg.something_wrong", "Some thing went wrong please try again.");
                    break;
                case 1:
                    display_error = Flits.t("Flits.locals.socialLogin_msg.not_verfied", "Not verfied social login.");
                    break;
                case 2:
                    display_error = Flits.t("Flits.locals.socialLogin_msg.social_login_uninstalled", "Social login uninstalled contact store admin.");
                    break;
                case 3:
                    display_error = Flits.t("Flits.locals.socialLogin_msg.social_login not_installed", "Social login not installed correctly contact store admin.");
                    break;
                case 4:
                    display_error = Flits.t("Flits.locals.socialLogin_msg.please_authorize_application", "Please authorize application to login.");
                    break;
                case 5:
                    display_error = Flits.t("Flits.locals.socialLogin_msg.something_wrong", "Some thing went wrong please try again.");
                case 6:
                    display_error = Flits.t("Flits.locals.socialLogin_msg.no_email_provided", "No email provided.");
                    break;
                default:
                    display_error = Flits.t("Flits.locals.socialLogin_msg.something_wrong", "Some thing went wrong please try again.");
                    break;
            }
            div.html(display_error), history.pushState(null, null, "login");
        }
        redirectBack();
    }),
        Flits.fn.extend({
            appendSocialLoginDiv: function (socialLoginBtnGroup, isTrue) {
                var settings = Flits.SocialLogin.settings;
                return (
                    this.filter(':not([data-flits="social-login-added"])').each(function (index, el) {
                        if (((el = Flits(el)), isTrue && (el.css("display") == "none" || el.css("visibility") == "hidden"))) return;
                        if (typeof el[0].addEventListener != "function") return;
                        var parent = el.parent();
                        var cloneNode = socialLoginBtnGroup.clone(!0);
                        parent.append(cloneNode),
                            el.attr("data-flits", "social-login-added"),
                            parent.attr("data-flits", "social-login-parent"),
                            settings.automaticAppendDivFunction.apply(this, [el, parent, cloneNode]),
                            Flits.dispatchEvent("Flits:SocialLoginAutomaticCode:Loaded", { el: el, parent: parent, cloneNode: cloneNode });
                    }),
                    this
                );
            },
            addRedirectUrl: function (url) {
                var settings = Flits.SocialLogin.settings;
                var names = ["checkout_url", "return_to"];
                return (
                    this.each(function (index, item) {
                        Flits.each(names, function (name_index, name) {
                            var name_elem = Flits(item).find("[name='" + name + "']");
                            name_elem.length < 1 && ((name_elem = Flits("<input />")), name_elem.attr("type", "hidden"), name_elem.attr("name", name), Flits(item).append(name_elem)), name_elem.attr("value", url);
                        });
                    }),
                    this
                );
            },
        }),
        Flits.Metafields.IS_SOCIAL_LOGIN_ENABLE == 1 && Flits.Metafields.IS_SOCIAL_LOGIN_PAID == 1 && Flits.SocialLogin();
})(Flits);

