class HeroSlider{
    constructor(el){
        this.el = el;
        this.swiper = this._initSwiper();
    }

    _initSwiper(){
        //テンプレート
        return new Swiper(this.el, {
            // Optional parameters
            //direction: 'vertical',//verticalは垂直
            loop: true,//ループ処理
            grabCursor: true,//ポインターの変更
            effect: "coverflow",
            //詳細設定
            centeredSlides: true,//スライダーが中央揃え
            slidesPerView: 1,//画面に一枚のスライドを表示
            speed: 1000,
            breakpoints: {
                1024: {
                    slidesPerView: 2,//1024px(ウィンドウ)から2
                }
            },
        });
    }
    start(options = {}){
        options = Object.assign({
            delay: 4000,//４秒ごとに切り変わる
            disableOnInteraction: false,//マウスで切りかわた場合でもオートプレイ
        }, options);

        this.swiper.params.autoplay =  options;
        this.swiper.autoplay.start();
    }
    stop(){
        this.swiper.autoplay.stop();
    }
}