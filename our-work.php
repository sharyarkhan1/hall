<?php

require_once __DIR__ . '/includes/config.php';

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/header.php';

$project_dir = __DIR__ . '/images/our-works';
$before_dir  = $project_dir . '/before';
$after_dir   = $project_dir . '/after';
$video_dir   = __DIR__ . '/media';

$project_url = $site_url . '/images/our-works';
$before_url  = $project_url . '/before';
$after_url   = $project_url . '/after';
$video_url   = $site_url . '/media';

$image_extensions = [
    'jpg',
    'jpeg',
    'png',
    'webp',
    'gif',
    'svg'
];

$video_extensions = [
    'mp4',
    'webm',
    'ogg',
    'mov',
    'm4v'
];


function get_gallery_images($directory, $url)
{
    global $image_extensions;

    $images = [];

    if (!is_dir($directory)) {
        return $images;
    }

    $files = scandir($directory);

    if (!$files) {
        return $images;
    }

    foreach ($files as $file) {

        if ($file === '.' || $file === '..') {
            continue;
        }

        $full_path = $directory . '/' . $file;

        if (!is_file($full_path)) {
            continue;
        }

        $extension = strtolower(
            pathinfo($file, PATHINFO_EXTENSION)
        );

        if (!in_array($extension, $image_extensions, true)) {
            continue;
        }

        $width = null;
        $height = null;

        if ($extension !== 'svg') {
            $dimensions = @getimagesize($full_path);

            if ($dimensions) {
                $width = (int) $dimensions[0];
                $height = (int) $dimensions[1];
            }
        }

        $images[] = [
            'file'   => $file,
            'name'   => pathinfo($file, PATHINFO_FILENAME),
            'url'    => $url . '/' . rawurlencode($file),
            'width'  => $width,
            'height' => $height
        ];
    }

    usort(
        $images,
        function ($a, $b) {
            return strnatcasecmp(
                $a['file'],
                $b['file']
            );
        }
    );

    return $images;
}


function get_gallery_videos($directory, $url)
{
    global $video_extensions;

    $videos = [];

    if (!is_dir($directory)) {
        return $videos;
    }

    $files = scandir($directory);

    if (!$files) {
        return $videos;
    }

    foreach ($files as $file) {

        if ($file === '.' || $file === '..') {
            continue;
        }

        $full_path = $directory . '/' . $file;

        if (!is_file($full_path)) {
            continue;
        }

        $extension = strtolower(
            pathinfo($file, PATHINFO_EXTENSION)
        );

        if (!in_array($extension, $video_extensions, true)) {
            continue;
        }

        $videos[] = [
            'file' => $file,
            'url'  => $url . '/' . rawurlencode($file),
            'type' => $extension
        ];
    }

    usort(
        $videos,
        function ($a, $b) {
            return strnatcasecmp(
                $a['file'],
                $b['file']
            );
        }
    );

    return $videos;
}


$project_images = get_gallery_images(
    $project_dir,
    $project_url
);

$before_images = get_gallery_images(
    $before_dir,
    $before_url
);

$after_images = get_gallery_images(
    $after_dir,
    $after_url
);


function normalize_before_after_name($name)
{
    $name = strtolower(trim($name));

    $name = preg_replace(
        '/^(before|after)[\s_-]*/i',
        '',
        $name
    );

    $name = preg_replace(
        '/[\s_-]+/',
        '-',
        $name
    );

    return trim($name, '-');
}


$before_after_projects = [];


foreach ($before_images as $before) {

    $key = normalize_before_after_name(
        $before['name']
    );

    if ($key === '') {
        $key = strtolower($before['name']);
    }

    if (!isset($before_after_projects[$key])) {
        $before_after_projects[$key] = [];
    }

    $before_after_projects[$key]['before'] = $before;
}


foreach ($after_images as $after) {

    $key = normalize_before_after_name(
        $after['name']
    );

    if ($key === '') {
        $key = strtolower($after['name']);
    }

    if (!isset($before_after_projects[$key])) {
        $before_after_projects[$key] = [];
    }

    $before_after_projects[$key]['after'] = $after;
}


$before_after_projects = array_filter(
    $before_after_projects,
    function ($project) {
        return !empty($project['before'])
            && !empty($project['after']);
    }
);


$project_videos = get_gallery_videos(
    $video_dir,
    $video_url
);


$total_photos = count($project_images);
$total_videos = count($project_videos);
$total_before_after = count($before_after_projects);

$initial_photo_limit = 6;

?>
<style>
.header-premium.header-transparent {
    background-color: #fff;
}
</style>
<main>
    <section class="page-title-section">
        <div class="page-title-overlay"></div>

        <div class="container mxw-1830">
            <div class="page-title-content">

                <span class="page-title-subtitle">
                    Portfolio
                </span>

                <h1 class="page-title">
                    Our Works
                </h1>

                <div class="page-title-breadcrumb">
                    <a href="<?= $site_url ?>">Home</a>
                    <span>/</span>
                    <span>Our Works</span>
                </div>

            </div>
        </div>
    </section>

    <section class="our-work-sec section-space">

        <div class="container mxw-1830">

            <div
                class="text-center mb-50 wow fadeInUp"
                data-wow-delay=".2s"
            >

                <span class="section-sub-title">
                    Selected work
                </span>

                <h1 class="section-title mt-10 mb-20">
                    Projects Completed
                </h1>

                <p class="ism-max-width-center">
                    Kitchens, lofts, roofs and shop fronts. Finished to the same standard, inside and out.
                </p>

            </div>


            <?php if (
                $total_photos > 0 ||
                $total_before_after > 0 ||
                $total_videos > 0
            ): ?>

                <div
                    class="ism-gallery-filters text-center mb-50 wow fadeInUp"
                    data-wow-delay=".3s"
                >

                    <button
                        class="ism-filter-btn active"
                        type="button"
                        data-filter="all"
                    >
                        All
                    </button>


                    <?php if (
                        $total_photos > 0 ||
                        $total_before_after > 0
                    ): ?>

                        <button
                            class="ism-filter-btn"
                            type="button"
                            data-filter="photos"
                        >
                            Photos
                        </button>

                    <?php endif; ?>


                    <?php if ($total_videos > 0): ?>

                        <button
                            class="ism-filter-btn"
                            type="button"
                            data-filter="videos"
                        >
                            Videos
                        </button>

                    <?php endif; ?>

                </div>

            <?php endif; ?>


            <?php if ($total_photos > 0): ?>

                <div
                    class="ism-gallery-section ism-gallery-photos wow fadeInUp"
                    data-wow-delay=".4s"
                >

                    <div class="ism-work-grid ism-work-grid-full">

                        <?php foreach ($project_images as $index => $item): ?>

                            <div
                                class="ism-work-item ism-project-item"
                                data-type="photos"
                                <?= $index >= $initial_photo_limit ? 'style="display:none;"' : '' ?>
                            >

                                <a
                                    class="ism-work-thumb popup-image"
                                    href="<?= $item['url'] ?>"
                                >

                                    <img
                                        src="<?= $item['url'] ?>"
                                        alt=""
                                        loading="<?= $index < $initial_photo_limit ? 'eager' : 'lazy' ?>"
                                        decoding="async"
                                        <?php if ($item['width'] && $item['height']): ?>
                                            width="<?= $item['width'] ?>"
                                            height="<?= $item['height'] ?>"
                                        <?php endif; ?>
                                    >

                                    <span class="ism-work-overlay">
                                        <i class="fal fa-search-plus"></i>
                                    </span>

                                </a>

                            </div>

                        <?php endforeach; ?>

                    </div>


                    <?php if ($total_photos > $initial_photo_limit): ?>

                        <div class="text-center mt-40">

                            <button
                                type="button"
                                class="ism-load-more"
                                id="ismLoadMore"
                            >
                                Load More
                            </button>

                        </div>

                    <?php endif; ?>

                </div>

            <?php endif; ?>


            <?php if ($total_before_after > 0): ?>

                <div
                    class="ism-gallery-section ism-before-after mt-50 wow fadeInUp"
                    data-wow-delay=".45s"
                    data-type="photos"
                >

                    <div class="text-center mb-40">

                        <h2 class="section-title">
                            Before &amp; After
                        </h2>

                        <p class="ism-max-width-center mt-15">
                            Drag the slider to compare the
                            before and after transformation.
                        </p>

                    </div>


                    <div class="row g-4">

                        <?php foreach ($before_after_projects as $project): ?>

                            <div
                                class="col-xxl-6 col-xl-6 col-lg-6 col-md-6"
                            >

                                <div class="ism-comparison-card">

                                    <div class="ism-comparison">

                                        <div class="ism-comparison-after">

                                            <img
                                                src="<?= $project['after']['url'] ?>"
                                                alt=""
                                                loading="lazy"
                                                decoding="async"
                                                <?php if (
                                                    $project['after']['width'] &&
                                                    $project['after']['height']
                                                ): ?>
                                                    width="<?= $project['after']['width'] ?>"
                                                    height="<?= $project['after']['height'] ?>"
                                                <?php endif; ?>
                                            >

                                        </div>


                                        <div
                                            class="ism-comparison-before"
                                            style="width:50%;"
                                        >

                                            <img
                                                src="<?= $project['before']['url'] ?>"
                                                alt=""
                                                loading="lazy"
                                                decoding="async"
                                                <?php if (
                                                    $project['before']['width'] &&
                                                    $project['before']['height']
                                                ): ?>
                                                    width="<?= $project['before']['width'] ?>"
                                                    height="<?= $project['before']['height'] ?>"
                                                <?php endif; ?>
                                            >

                                        </div>


                                        <div
                                            class="ism-comparison-divider"
                                            style="left:50%;"
                                        >

                                            <div class="ism-comparison-handle">
                                                <i class="fal fa-arrows-h"></i>
                                            </div>

                                        </div>


                                        <span
                                            class="ism-comparison-label ism-comparison-label-before"
                                        >
                                            Before
                                        </span>


                                        <span
                                            class="ism-comparison-label ism-comparison-label-after"
                                        >
                                            After
                                        </span>

                                    </div>

                                </div>

                            </div>

                        <?php endforeach; ?>

                    </div>

                </div>

            <?php endif; ?>


            <?php if ($total_videos > 0): ?>

                <div
                    class="ism-gallery-section ism-gallery-videos mt-50 wow fadeInUp"
                    data-wow-delay=".5s"
                    data-type="videos"
                >

                    <div class="text-center mb-40">

                        <h2 class="section-title mt-10">
                            Project Videos
                        </h2>

                    </div>


                    <div class="row g-4">

                        <?php foreach ($project_videos as $video): ?>

                            <div
                                class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 ism-video-col"
                                data-type="videos"
                            >

                                <div class="ism-video-card ism-video-card-full">

                                    <video
                                        controls
                                        preload="metadata"
                                        playsinline
                                    >

                                        <source
                                            src="<?= $video['url'] ?>"
                                            type="video/<?= $video['type'] ?>"
                                        >

                                        Your browser does not support
                                        the video tag.

                                    </video>

                                </div>

                            </div>

                        <?php endforeach; ?>

                    </div>

                </div>

            <?php endif; ?>


            <?php if (
                $total_photos === 0 &&
                $total_videos === 0 &&
                $total_before_after === 0
            ): ?>

                <div class="text-center py-5">

                    <p>
                        Project gallery coming soon.
                    </p>

                </div>

            <?php endif; ?>

        </div>

    </section>

</main>


<script>

document.addEventListener('DOMContentLoaded', function () {

    const filterButtons =
        document.querySelectorAll('.ism-filter-btn');

    const photoSections =
        document.querySelectorAll(
            '.ism-gallery-photos, .ism-before-after'
        );

    const videoSection =
        document.querySelector('.ism-gallery-videos');


    filterButtons.forEach(function (button) {

        button.addEventListener('click', function () {

            const filter =
                this.getAttribute('data-filter');

            filterButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });

            this.classList.add('active');


            if (filter === 'all') {

                photoSections.forEach(function (section) {
                    section.style.display = '';
                });

                if (videoSection) {
                    videoSection.style.display = '';
                }

                return;
            }


            if (filter === 'photos') {

                photoSections.forEach(function (section) {
                    section.style.display = '';
                });

                if (videoSection) {
                    videoSection.style.display = 'none';
                }

                return;
            }


            if (filter === 'videos') {

                photoSections.forEach(function (section) {
                    section.style.display = 'none';
                });

                if (videoSection) {
                    videoSection.style.display = '';
                }

            }

        });

    });


    const loadMoreButton =
        document.getElementById('ismLoadMore');

    if (loadMoreButton) {

        const hiddenItems =
            Array.from(
                document.querySelectorAll(
                    '.ism-project-item'
                )
            ).filter(function (item) {
                return item.style.display === 'none';
            });


        let currentIndex = 0;

        const loadCount = 6;


        loadMoreButton.addEventListener(
            'click',
            function () {

                const nextItems =
                    hiddenItems.slice(
                        currentIndex,
                        currentIndex + loadCount
                    );


                nextItems.forEach(function (item) {

                    item.style.display = '';

                    const image =
                        item.querySelector('img');

                    if (image) {
                        image.loading = 'lazy';
                    }

                });


                currentIndex += nextItems.length;


                if (
                    currentIndex >= hiddenItems.length
                ) {

                    loadMoreButton.style.display =
                        'none';

                }

            }
        );

    }


    document.querySelectorAll(
        '.ism-comparison'
    ).forEach(function (comparison) {

        const before =
            comparison.querySelector(
                '.ism-comparison-before'
            );

        const beforeImage =
            before.querySelector('img');

        const divider =
            comparison.querySelector(
                '.ism-comparison-divider'
            );

        let dragging = false;


        function setImageWidth() {

            beforeImage.style.width =
                comparison.offsetWidth + 'px';

        }


        function updateSlider(clientX) {

            const rect =
                comparison.getBoundingClientRect();

            let position =
                (
                    (clientX - rect.left) /
                    rect.width
                ) * 100;

            position =
                Math.max(
                    0,
                    Math.min(
                        100,
                        position
                    )
                );

            before.style.width =
                position + '%';

            divider.style.left =
                position + '%';

        }


        function startDrag(event) {

            dragging = true;

            if (comparison.setPointerCapture) {

                comparison.setPointerCapture(
                    event.pointerId
                );

            }

            updateSlider(event.clientX);

        }


        function moveDrag(event) {

            if (!dragging) {
                return;
            }

            updateSlider(event.clientX);

        }


        function stopDrag() {
            dragging = false;
        }


        comparison.addEventListener(
            'pointerdown',
            startDrag
        );

        comparison.addEventListener(
            'pointermove',
            moveDrag
        );

        comparison.addEventListener(
            'pointerup',
            stopDrag
        );

        comparison.addEventListener(
            'pointercancel',
            stopDrag
        );


        setImageWidth();


        window.addEventListener(
            'resize',
            setImageWidth
        );

    });

});

</script>


<?php

include __DIR__ . '/includes/footer.php';

?>