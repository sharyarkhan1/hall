<?php
if (!isset($site_name)) {
    include_once __DIR__ . '/config.php';
}
?>
<!-- header start -->
<header id="xb-header-area" class="header-area header-area--two header-transparent header-premium">
    <div class="xb-header stricky">
        <div class="container mxw-1830">
            <div class="header__wrap header-premium__bar">
                <div class="xb-header-logo">
                    <a href="<?= $site_url ?>/#home" class="logo-one"><img src="images/logo.svg" alt="Hall Renovation and Maintenance Services" width="200" height="136"></a>
                    <a href="<?= $site_url ?>/#home" class="logo-two"><img src="images/logo.svg" alt="Hall Renovation and Maintenance Services" width="200" height="136"></a>
                </div>
                <nav class="header-premium__nav" aria-label="Primary">
                    <ul>
                        <li class="active"><a href="<?= $site_url ?>/#home">Home</a></li>
                        <li><a href="<?= $site_url ?>/#about">About Us</a></li>
                        <li><a href="<?= $site_url ?>/#services">Services</a></li>
                        <li><a href="<?= $site_url ?>/#portfolio">Portfolio</a></li>
                        <li><a href="<?= $site_url ?>/#contact">Contact Us</a></li>
                    </ul>
                </nav>
                <div class="header-premium__actions">
                    <a class="header-premium__cta" href="#contact">Get in Touch</a>
                    <a class="header-menu-bar offcanvas-sidebar-btn" href="javascript:void(0);" aria-label="Open menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>
<!-- header end -->

<!-- offcanvas start -->
<div class="offcanvas-sidebar"> 
    <div class="container mxw-1830">
        <div class="sidebar-menu-close sidebar-item">
            <a class="xb-close" href="javascript:void(0);"></a>
        </div>
        <div class="row g-0">
            <div class="col-lg-7 col-md-7">
                <div class="sidebar-item-left">
                    <div class="xb-header-wrap">
                        <div class="xb-header-menu active">
                            <div class="xb-header-menu-scroll">
                                <nav class="xb-header-nav">
                                    <ul class="xb-menu-primary">
                                        <li class="menu-item current-menu-item"><a href="<?= $site_url ?>/#home"><span>Home</span></a></li>
                                        <li class="menu-item"><a href="<?= $site_url ?>/#about"><span>About Us</span></a></li>
                                        <li class="menu-item"><a href="<?= $site_url ?>/#services"><span>Services</span></a></li>
                                        <li class="menu-item"><a href="<?= $site_url ?>/#portfolio"><span>Portfolio</span></a></li>
                                        <li class="menu-item"><a href="<?= $site_url ?>/#contact"><span>Contact Us</span></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 col-md-5">
                <div class="sidebar-item-right">
                    <div class="sidebar-contact-info">
                        <ul class="sidebar-info-list list-unstyled">
                            <li>
                                <span>menu</span>
                            </li>
                            <li>
                                <span>Contact Us</span>
                                <a href="tel:+447712232330">07712 232330</a>
                            </li>
                            <li>
                                <span>Email Us</span>
                                <a href="mailto:info@hallrenovation.co.uk">info@hallrenovation.co.uk</a>
                            </li>
                            <li>
                                <span>Website</span>
                                <a href="https://www.hallrenovation.co.uk">www.hallrenovation.co.uk</a>
                            </li>
                        </ul>
                    </div>
                    <div class="sidebar-newsletter">
                        <span class="title">Get Updated</span>
                        <form class="sidebar-newsletter-from" action="#">
                            <input type="text" placeholder="Enter mail">
                            <button type="submit"><i class="fas fa-paper-plane"></i></button>
                        </form>
                    </div>
                    <div class="sidebar-architecture-video">
                        <div class="text-cylinder" aria-label="Maintenance">
                            <div class="text-cylinder__wheel">
                                <span style="--i:0">MAINTENANCE</span>
                                <span style="--i:1">MAINTENANCE</span>
                                <span style="--i:2">MAINTENANCE</span>
                                <span style="--i:3">MAINTENANCE</span>
                                <span style="--i:4">MAINTENANCE</span>
                                <span style="--i:5">MAINTENANCE</span>
                                <span style="--i:6">MAINTENANCE</span>
                                <span style="--i:7">MAINTENANCE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="sidebar-bg-shape">
        <img src="images/side_bar_img.png" alt="">
    </div>
</div> 
<!-- offcanvas end -->

<!-- body overlay -->
<div class="body-overlay"></div>

<!-- blur effect -->
<div class="xb-blur-effect-bottom"></div>
