// document.addEventListener("DOMContentLoaded", function(){
    // const hero = new HeroSlider(".swiper");//インスタンス化。swiper-containerを渡す
    // hero.start();

    // setTimeout(() => {
    //     hero.stop();
    // }, 5000);

    // const _textAnimation = function (el, inview) {
    //     if(inview) {//画面内に入ったとき
    //         const ta = new TweenTextAnimation(el);
    //         ta.animate();
    //     }
    // }
    // ScrollObserverをnew演算子でインスタンス化(callbackを渡す)
    // const so = new ScrollObserver('.tween-animate-title', _textAnimation);


    // const _inviewAnimation = function (el, inview) {
    //     if(inview) {//画面内に入ったとき
    //         el.classList.add("inview");
    //     }else{
    //         el.classList.remove("inview");
    //     }
    // }
    // .cover-slideをnew演算子でインスタンス化(callbackを渡す)
    // const so2 = new ScrollObserver('.cover-slide', _inviewAnimation);


    //const header = document.querySelector(".header");//header要素にtriggerdをつける
    // const _navAnimation = function (el, inview) {
    //     if(inview) {//画面外に出たとき
    //         header.classList.remove("triggered");
    //     }else{
    //         header.classList.add("triggered");
    //     }
    // }
    // .cover-slideをnew演算子でインスタンス化(callbackを渡す)
    //const so3 = new ScrollObserver('.nav-trigger', _navAnimation, {once: false});//{once: false})は一回で監視が切れないようにする

    //new MobileMenu;//MobileMenuを呼び込む

    // new Main;

// });


// コードの整理
class Main{
    constructor(){
        // thisのDOMに格納
        this.header = document.querySelector(".header");//header要素にtriggerdをつける
        this.hero = new HeroSlider(".swiper");//インスタンス化。swiper-containerを渡す
        this.sides = document.querySelectorAll(".side");
        //インスタンスを格納する空の配列
        this._observers = [];
        this._init();
    }
    _init(){//MobileMenuの初期化処理
        new MobileMenu;
        // ローディングが完了した時点でアニメーションさせたい(完了してる状態だと見てもらえない)
        Pace.on("done", this._scrollInit.bind(this));//this._scrollInitが完了したお知らせ
        // 実行
        // this._scrollInit();
    }
    _scrollInit(){//スクロールの初期化処理
        this._observers.push(
            // インスタンス
            new ScrollObserver('#main-content', this._sideAnimation.bind(this), {once: false,
            rootMargin: "-300px 0px"}),//要素が300px入った時点で実行
            new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false}),//{once: false})は一回で監視が切れないようにする
            new ScrollObserver('.swiper', this._toggleSlideAnimation.bind(this), {once: false}),//メソッドの中でthisを使っている場合bindが必要
            new ScrollObserver('.cover-slide', this._inviewAnimation),
            new ScrollObserver('.appear', this._inviewAnimation),
            new ScrollObserver('.tween-animate-title', this._textAnimation)
        )
        console.log(this._observers);
    }
    _toggleSlideAnimation(el, inview) {
        if(inview) {//画面内に入ったとき
            this.hero.start();//オートプレイを開始
        }else{
            this.hero.stop();
            // console.log("stop!!!!")画面外に出たときオートプレイが止まっているかの確認
        }
    }
    _textAnimation(el, inview) {
        if(inview) {//画面内に入ったとき
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }
    _navAnimation(el, inview) {
        if(inview) {//画面外に出たとき
            this.header.classList.remove("triggered");
        }else{
            this.header.classList.add("triggered");
        }
    }
    _sideAnimation(el, inview) {//サイドバーのアニメーション
        if(inview) {//画面内に入ったとき
            this.sides.forEach(side => {//２つ要素があるのでforEachで一つずつ処理
                side.classList.add("inview");
            });
        }else{
            this.sides.forEach(side => {//２つ要素があるのでforEachで一つずつ処理
                side.classList.remove("inview");
            });
        }
    }
    _inviewAnimation(el, inview) {
        if(inview) {//画面内に入ったとき
            el.classList.add("inview");
        }else{
            el.classList.remove("inview");
        }
    }
}
new Main;