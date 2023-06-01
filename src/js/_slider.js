export default function () {
    $('.slider').slick({
        slidesToShow: 2.6,
        slidesToScroll: 1,
        infinite: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.6,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1.2,
                },
            },
        ],
    });
}
