<!-- Footer-->
<footer class="bg-dark py-4 px-5-xs mt-auto">
    <div class="container px-5-xs px-2">
        <div class="row align-items-center justify-content-between flex-column flex-sm-row">
            <div class="col-auto"><div class="small m-0 text-white"><?php echo $copyright; ?></div></div>
            <div class="col-auto">
                <a class="link-light small" href="/about-us">About Us</a>
                <span class="text-white mx-1">&middot;</span>
                <a class="link-light small" href="/faq">FAQ</a>
                <span class="text-white mx-1">&middot;</span>
                <a class="link-light small" href="/contact-us">Contact</a>
                <span class="text-white mx-1">&middot;</span>
                <a class="link-light small" href="/privacy">Privacy</a>
                <span class="text-white mx-1">&middot;</span>
                <a class="link-light small" href="/terms">Terms</a>
                <span class="text-white mx-1">&middot;</span>
                <a class="link-light small" href="/data-retention">Data Retention</a>
            </div>
        </div>
        <div class="row mt-3">
            <div class="column small text-white">
                <?php include('disclaimer.php');?>
            </div>
        </div>
    </div>
</footer>
<!-- Bootstrap core JS-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- Core theme JS-->
<script src="/dist/js/scripts.js"></script>
<script src="https://kit.fontawesome.com/26ea0045ab.js" crossorigin="anonymous"></script>

<!-- extra js -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-kQtW33rZJAHjgefvhyyzcGF3C5TFyBQBA13V1RKPf4uH+bwyzQxZ6CmMZHmNBEfJ" crossorigin="anonymous"></script>
<?php include("scripts.php"); ?>


<script>
    /* Javascript to show and hide cookie banner using localstorage */
    /* Shows the Cookie banner */
    function showCookieBanner(){
        let cookieBanner = document.getElementById("cb-cookie-banner");
        cookieBanner.style.display = "block";
    }

    /* Hides the Cookie banner and saves the value to localstorage */
    function hideCookieBanner(){
        localStorage.setItem("cb_isCookieAccepted", "yes");
        let cookieBanner = document.getElementById("cb-cookie-banner");
        cookieBanner.style.display = "none";
    }

    /* Checks the localstorage and shows Cookie banner based on it. */
    function initializeCookieBanner(){
        let isCookieAccepted = localStorage.getItem("cb_isCookieAccepted");
        if(isCookieAccepted === null)
        {
            localStorage.setItem("cb_isCookieAccepted", "no");
            showCookieBanner();
        }
        if(isCookieAccepted === "no"){
            showCookieBanner();
        }
    }

    // Assigning values to window object
    window.onload = initializeCookieBanner();
    // window.cb_hideCookieBanner = hideCookieBanner();
</script>

<!-- tidio -->
<!--<script src="//code.tidio.co/yqixs9p63qre4piakpv5zqex1fxmjfaa.js" async></script>-->
<!---->

<!-- chatwoot.com - chat script -->
<script>
    if ( false ) {
        (function(d,t) {
            var BASE_URL="https://app.chatwoot.com";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.defer = true;
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
                window.chatwootSDK.run({
                    websiteToken: 'yzGBwn1AjnXZS1YNBZoSKiVx',
                    baseUrl: BASE_URL
                })
            }
        })(document,"script");
    }
</script>



</body>
</html>
