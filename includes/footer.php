<?php
if (!isset($site_name)) {
    include_once __DIR__ . '/config.php';
}
?>
<!-- footer start -->
<footer class="footer footer-premium">
    <div class="container mxw-1830">
        <div class="footer-premium__cta">
            <div class="footer-premium__cta-copy">
                <span class="footer-premium__cta-eyebrow">Ready to start?</span>
                <h2 class="footer-premium__cta-title">Tell us about the work.</h2>
            </div>
            <div class="footer-premium__cta-action">
                <p>Whether it's a single repair or a full renovation, one team sees it through.</p>
                <a class="footer-premium__cta-btn" href="<?= $site_url ?>/#contact">Let’s Talk</a>
            </div>
        </div>

        <div class="footer-premium__grid">
            <div class="footer-premium__brand">
                <a class="footer-premium__logo" href="#home">
                    <img src="images/logo.svg" alt="Hall Renovation and Maintenance Services" width="200" height="136">
                </a>
                <p>We look after buildings from the inside out. The rooms people live and work in, and the structure that keeps them standing.</p>
                <ul class="footer-premium__social">
                    <li><a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                    <li><a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a></li>
                    <li><a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a></li>
                    <li><a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a></li>
                </ul>
            </div>

            <nav class="footer-premium__col" aria-label="Company">
                <h3>Company</h3>
                <ul>
                    <li><a class="is-current" href="<?= $site_url ?>/#home">Home</a></li>
                    <li><a href="<?= $site_url ?>/#about">About</a></li>
                    <li><a href="<?= $site_url ?>/#services">Services</a></li>
                    <li><a href="<?= $site_url ?>/#portfolio">Projects</a></li>
                    <li><a href="<?= $site_url ?>/#contact">Contact</a></li>
                </ul>
            </nav>

            <nav class="footer-premium__col" aria-label="Services">
                <h3>Services</h3>
                <ul>
                    <li><a href="<?= $site_url ?>/#services">Kitchens</a></li>
                    <li><a href="<?= $site_url ?>/#services">Bathrooms</a></li>
                    <li><a href="<?= $site_url ?>/#services">Loft conversions</a></li>
                    <li><a href="<?= $site_url ?>/#services">Roofs &amp; windows</a></li>
                    <li><a href="<?= $site_url ?>/#services">Shop fronts</a></li>
                </ul>
            </nav>

            <div class="footer-premium__col footer-premium__contact">
                <h3>Contact us</h3>
                <ul>
                    <li>
                        <span class="footer-premium__icon" aria-hidden="true">
                            <i class="fas fa-phone"></i>
                        </span>
                        <div>
                            <span>Call us</span>
                            <a href="tel:+447712232330">07712 232330</a>
                        </div>
                    </li>
                    <li>
                        <span class="footer-premium__icon" aria-hidden="true">
                            <i class="fas fa-envelope"></i>
                        </span>
                        <div>
                            <span>Email</span>
                            <a href="mailto:hallplastering03@gmail.com">hallplastering03@gmail.com</a>
                        </div>
                    </li>
                    <li>
                        <span class="footer-premium__icon" aria-hidden="true">
                            <i class="fa-solid fa-map-location-dot"></i>
                        </span>
                        <div>
                            <span>Address</span>
                            <a href="https://maps.app.goo.gl/djH1mC8sgQtHvLUA8" target="_blank" rel="noopener noreferrer">123 Main Street, London</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="footer-premium__bar">
            <p>© 2026 Hall Renovation and Maintenance Services. All rights reserved.</p>
            <p>Designed &amp; Developed by <a href="https://www.creativewebsitesolution.co.uk/" target="_blank" rel="noopener noreferrer">CreativeWebsiteSolution</a></p>
        </div>
    </div>
</footer>
<!-- footer end -->

</div>

<!-- jquery include -->
<script src="js/jquery-3.7.1.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>

<!-- Plugins -->
<script src="js/swiper.min.js"></script>
<script src="js/wow.min.js"></script>
<script src="js/appear.js"></script>
<script src="js/imagesloaded.pkgd.min.js"></script>
<script src="js/isotope.pkgd.min.js"></script>
<script src="js/jquery.nice-select.min.js"></script>
<script src="js/jquery.marquee.min.js"></script>
<script src="js/jquery.magnific-popup.min.js"></script>
<script src="js/jqueryui.js"></script>
<script src="js/touchspin.js"></script>
<script src="js/odometer.min.js"></script>

<!-- Parallax & Effects -->
<script src="js/parallaxie.js"></script>
<script src="js/parallax.min.js"></script>
<script src="js/parallax-scroll.js"></script>
<script src="js/cursor-bundle.js"></script>
<script src="js/easing.min.js"></script>
<script src="js/scrollspy.js"></script>

<!-- Special plugins -->
<script src="js/plugin.js"></script>
<script src="js/lenis.js"></script>

<!-- Main custom script -->
<script src="js/main.js?v=6"></script>
<script src="js/services-premium.js?v=5"></script>
<script src="js/projects-premium.js?v=5"></script>
<script src="js/contact-premium.js"></script>



</body>

</html>