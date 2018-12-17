
//global var
var index, delta, toggle, radius, nbReviews, windowS, clipPath, radiusW, ind;
var pic = [ "croissant.jpg", "noimage.png", "dip.jpg", "croque.jpg", "buche.jpg", "noimage.png"];
var random = [];
var x = 400;

//when page is done loading
$(document).ready(function() {

    index = 1, toggle = false;
    nbReviews = $('.page').length;
    for(i=0; i<nbReviews; i++){
        $('.page-indicator').append('<div class="round"></div>');
    }

    var bodyH = $('body').height();
    var bodyW = $('body').width();
    if(bodyH>=bodyW)
        radius = 2*(bodyH);
    else
        radius = 2*(bodyW);
    radiusW = bodyW-40;
    $('.menu-open').css({'height': radius, 'width': radius, '-webkit-clip-path': 'circle(15px at '+ radiusW + 'px 42px)'});

    //open/close the menu section
    $('.menu').click(function(){
        if (!toggle){
            $('.menu-open').css({'display': 'block'});
            var menu = anime({
                targets: '.menu-open',
                '-webkit-clip-path': 'circle(' + radius + 'px at '+ (radiusW) + 'px 42px)',
                easing: 'linear',
                duration: x
            });
            var color = anime({
                targets: '.menu',
                backgroundColor: 'var(--color2)',
                easing: 'easeOutQuad',
                duration: x/2
            });


            $('.line-1').addClass('line-cross-1');
            $('.line-2').addClass('line-cross-2');
            $('.line-3').addClass('line-cross-3');
            toggle = true;
        }

        else {
            var menu = anime({
                targets: '.menu-open',
                '-webkit-clip-path': 'circle(15px at '+ (radiusW) + 'px 42px)',
                easing: 'linear',
                duration: x
            });
            var color = anime({
                targets: '.menu',
                backgroundColor: 'var(--color1)',
                easing: 'easeOutQuad',
                duration: x/2
            });
            toggle = false;
            setTimeout(function(){
                $('.menu-open').css({'display': 'none'});
            },2*x);
            $('.line-1').removeClass('line-cross-1');
            $('.line-2').removeClass('line-cross-2');
            $('.line-3').removeClass('line-cross-3');
        }

    });


    //go to selcted review
    $('.page').click(function(e){
        ind = $(this).index();
        if ( $(window).width() > 650) {
            windowS = true;
        }
        var circle = anime({
            targets: '.round:nth-child(' + (index) + ')',
            height: '15px',
            width: '15px',
            backgroundColor: '#ff8d97',
            easing: 'easeOutQuad',
            duration: 2*x
        });

        if ($(window).width() > 650){
            if(index>=ind){
                delta = 1;
                index = ind;
            }
            else{
                delta = -1;
                index = ind+2;
            }
        }
        else {
            $('html, body').animate({
                scrollTop: $(".review-container:nth-child(" + (ind+1) + ")").offset().top
            }, 2*x);
        }
        var menu = anime({
            targets: '.menu-open',
            'clip-path': 'circle(15px at '+ (radiusW) + 'px 42px)',
            easing: 'linear',
            duration: 2*x
        });
        var color = anime({
            targets: '.menu',
            backgroundColor: 'var(--color1)',
            easing: 'easeOutQuad',
            duration: x/2
        });
        var color = anime({
            targets: ['.line-1', '.line-2', '.line-3'],
            backgroundColor: 'var(--color2)',
            easing: 'easeOutQuad',
            duration: x/2
        });
        toggle = false;
        setTimeout(function(){
            $('.menu-open').css({'display': 'none'});
        },2*x);
        animation();

       
    });

});


//scroll events on PC -ALL BROWSERS
$('html').on('mousewheel', function (e) {
    delta = e.originalEvent.wheelDelta;
    if ( $(window).width() > 650) {
        windowS = true;
    }
    else {
        windowS = false;
    }
});
$('html').on('mousewheel', _.debounce(animation, x, {
    'leading': true,
    'trailing': false
}));


//scroll events on PC - Firefox


//Change review to visible/not visible depending on screen size
$(window).on('resize', function(){

    var bodyH = $('body').height();
    var bodyW = $('body').width();
    if(bodyH>=bodyW)
       radius = 2*(bodyH);
    else
        radius = 2*(bodyW);
    radiusW= bodyW-50;
    $('.menu-open').css({'height': radius, 'width': radius, 'clip-path': 'circle(15px at '+ (radiusW) + 'px 42px)'});


    if ( $(window).width() > 650) {
        $('.title, .review, .rating').css({'top': '-40px', 'opacity': '0'});
        $('.review-container:nth-child(1) .title, .review-container:nth-child(1) .review, .review-container:nth-child(1) .rating').css({'top': '0px', 'opacity': '1'});
    }
    else {
        $('.review-container').css({'display': 'block'});
        $('.title, .review, .rating').css({'top': '0px', 'opacity': '1'});
    }

});


//page animation up/down
function animation(){
    if(windowS){    
        coordinate();
        var circle = anime({
            targets: '.round:nth-child(' + (index) + ')',
            height: '15px',
            width: '15px',
            backgroundColor: '#ff8d97',
            easing: 'easeOutQuad',
            duration: 2*x
        });

        if(delta>0 && index<nbReviews){

            var scroll = anime ({
                targets : '.loading-bar1',
                width : '50%',
                easing: 'linear',
                duration: 2.5*x
            });
            setTimeout(function(){
                var scroll = anime ({
                    targets : '.loading-bar2',
                    width : '50%',
                    easing: 'linear',
                    duration: 2*x
                });
            }, 2.5*x);

            var scroll = anime ({
                targets : '.scroll-indicator',
                opacity : 0,
                easing: 'easeOutQuad',
                duration: x
            });


            $('.page').removeClass('selectedP');
            $('.page:nth-child(' + (index+1) +')').addClass('selectedP');
            $('.bar').removeClass('selected');
            $('.page:nth-child(' + (index+1) +') .bar').addClass('selected');

            var circle = anime({
                targets: '.round:nth-child(' + (index) + ')',
                height: '15px',
                width: '15px',
                backgroundColor: '#ff8d97',
                easing: 'easeOutQuad',
                duration: 2*x
            });
            var circle = anime({
                targets: '.round:nth-child(' + (index+1) + ')',
                height: '25px',
                width: '25px',
                backgroundColor: '#FFF',
                easing: 'easeOutQuad',
                duration: 2*x
            });


        var morphing = anime({
                targets: '.morphing',
                points: [
                    { value: '0 0, 200 0, 200 300, 0 300, 0 -1'},
                    { value: '0 0, '+random[0]+ '200 300, 0 300, 0 -1'},
                    { value: random[1] +random[0]+'200 300, 0 300, ' + random[8]},
                    { value: random[1] +random[0]+random[2]+ ' 0 300, ' + random[8] },
                    { value: random[1] +random[0]+random[2]+ random[3] + random[8] },
                    { value: random[1] +random[4]+ random[2]+ random[3] + random[8] },
                    { value: random[5]+random[4]+ random[2]+ random[3] + random[9] },
                    { value: random[5] +random[4]+ random[6] + random[3] + random[9] },
            
                    { value: random[5] +random[4]+ random[6] + random[7] + random[9] },
            
                    { value: random[5] +random[4]+ random[6] + random[3] + random[9] },
                    { value: random[5] +random[4]+ random[2] + random[3] + random[9] },
                    { value: random[1] +random[4] + random[2]+ random[3] +random[8] },
                    { value: random[1] +random[0] + random[2]+ random[3] + random[8] },
                    { value: random[1] +random[0]+random[2]+ ' 0 300, ' + random[8] },
                    { value: random[1] +random[0]+'200 300, 0 300, ' + random[8]},
                    { value: '0 0, '+random[0]+ '200 300, 0 300, 0 -1'},
                    { value: '0 0, 200 0, 200 300, 0 300, 0 -1'},
                ],
                easing: 'easeOutQuad',
                duration: 5*x,
                loop: false
            });
            setTimeout(function(){
                $('image').attr('xlink:href', pic[index]);
            }, 2.5*x);
            setTimeout(function(){
                $('polyline').attr('points', '0 0, 200 0, 200 300, 0 300, 0 -2');
            }, (5*x) + 10);
            var cssProperties = anime({
                targets: '.review-container:nth-child(' + index + ') .title',
                opacity: 0,
                top: '-40px',
                duration: x,
                easing: 'easeOutQuad'
            });

            setTimeout(function(){
                var cssProperties = anime({
                    targets: '.review-container:nth-child(' + index + ') .rating',
                    opacity: 0,
                    top: '-40px',
                    duration: x,
                    easing: 'easeOutQuad'
                });
            }, x);

            setTimeout(function(){
                var cssProperties = anime({
                    targets: '.review-container:nth-child(' + index + ') .review',
                    opacity: 0,
                    top: '-40px',
                    duration: x,
                    easing: 'easeOutQuad'
                });
            }, 2*x);
            
            setTimeout(function(){
                $('.review-container').css({'display': 'none'});
                index++;
                var cssProperties = anime({
                    targets: '.review-container:nth-child(' + index + ') .title',
                    opacity: 1,
                    top: '0px',
                    duration: x,
                    easing: 'easeOutQuad'
                });
                $('.review-container:nth-child(' + index + ')').css({'display': 'block'});
            }, 3*x );

            setTimeout(function(){
                var cssProperties = anime({
                    targets: '.review-container:nth-child(' + index + ') .rating',
                    opacity: 1,
                    top: '0px',
                    duration: x,
                    easing: 'easeOutQuad'
                });
            }, 4*x);

            setTimeout(function(){
                var cssProperties = anime({
                    targets: '.review-container:nth-child(' + index + ') .review',
                    opacity: 1,
                    top: '0px',
                    duration: x,
                    easing: 'easeOutQuad'
                });
            }, 5*x);
        }

        if(delta<0 && index>1){

            var scroll = anime ({
                targets : '.loading-bar1',
                width : '50%',
                easing: 'linear',
                duration: 2.5*x
            });
            setTimeout(function(){
                var scroll = anime ({
                    targets : '.loading-bar2',
                    width : '50%',
                    easing: 'linear',
                    duration: 2.5*x
                });
            }, 2.5*x);

            $('.page').removeClass('selectedP');
            $('.page:nth-child(' + (index-1) +')').addClass('selectedP');
            $('.bar').removeClass('selected');
            $('.page:nth-child(' + (index-1) +') .bar').addClass('selected');

            var circle = anime({
                targets: '.round',
                height: '15px',
                width: '15px',
                backgroundColor: '#ff8d97',
                easing: 'easeOutQuad',
                duration: x
            });
            var circle = anime({
                targets: '.round:nth-child(' + (index-1) + ')',
                height: '25px',
                width: '25px',
                backgroundColor: '#FFF',
                easing: 'easeOutQuad',
                duration: x
            });

            var morphing = anime({
                targets: '.morphing',
                points: [
                { value: '0 0, 200 0, 200 300, 0 300, 0 -1'},
                { value: '0 0, '+random[0]+ '200 300, 0 300, 0 -1'},
                { value: random[1] +random[0]+'200 300, 0 300, ' + random[8]},
                { value: random[1] +random[0]+random[2]+ ' 0 300, ' + random[8] },
                { value: random[1] +random[0]+random[2]+ random[3] + random[8] },
                { value: random[1] +random[4]+ random[2]+ random[3] + random[8] },
                { value: random[5]+random[4]+ random[2]+ random[3] + random[9] },
                { value: random[5] +random[4]+ random[6] + random[3] + random[9] },
        
                { value: random[5] +random[4]+ random[6] + random[7] + random[9] },
        
                { value: random[5] +random[4]+ random[6] + random[3] + random[9] },
                { value: random[5] +random[4]+ random[2] + random[3] + random[9] },
                { value: random[1] +random[4] + random[2]+ random[3] +random[8] },
                { value: random[1] +random[0] + random[2]+ random[3] + random[8] },
                { value: random[1] +random[0]+random[2]+ ' 0 300, ' + random[8] },
                { value: random[1] +random[0]+'200 300, 0 300, ' + random[8]},
                { value: '0 0, '+random[0]+ '200 300, 0 300, 0 -1'},
                { value: '0 0, 200 0, 200 300, 0 300, 0 -1'},
                ],
                easing: 'easeOutQuad',
                duration: 5*x,
                loop: false
            });
            setTimeout(function(){
                $('image').attr('xlink:href', pic[index-1]);
            }, 2.5*x);
            setTimeout(function(){
                $('polyline').attr('points', '0 0, 200 0, 200 300, 0 300, 0 -2');
            }, (5*x) + 10);

            var cssProperties = anime({
                targets: '.review-container:nth-child(' + index + ') .review',
                opacity: 0,
                top: '40px',
                duration: x,
                easing: 'easeOutQuad'
            });

            setTimeout(function(){
                var cssProperties = anime({
                    targets: '.review-container:nth-child(' + index + ') .rating',
                    opacity: 0,
                    top: '40px',
                    duration: x,
                    easing: 'easeOutQuad'
                });
            }, x);

            setTimeout(function(){
                var cssProperties = anime({
                    targets: '.review-container:nth-child(' + index + ') .title',
                    opacity: 0,
                    top: '40px',
                    duration: x,
                    easing: 'easeOutQuad'
                });
            }, 2*x);
            
            setTimeout(function(){
                $('.review-container').css({'display': 'none'});
                index--;
                var cssProperties = anime({
                    targets: '.review-container:nth-child(' + index + ') .review',
                    opacity: 1,
                    top: '0px',
                    duration: x,
                    easing: 'easeOutQuad'
                });
                $('.review-container:nth-child(' + index + ')').css({'display': 'block'});
            }, 3*x );

            setTimeout(function(){
                var cssProperties = anime({
                    targets: '.review-container:nth-child(' + index + ') .rating',
                    opacity: 1,
                    top: '0px',
                    duration: 150,
                    easing: 'easeOutQuad'
                });
            }, 4*x);

            setTimeout(function(){
                var cssProperties = anime({
                    targets: '.review-container:nth-child(' + index + ') .title',
                    opacity: 1,
                    top: '0px',
                    duration: x,
                    easing: 'easeOutQuad'
                });
            }, 5*x);
        }
        
        setTimeout(function(){
            $('.loading-bar1, .loading-bar2').css({'width': '0%'});
        }, 5*x);
    }

}


//random coordinate for the svg morphing 
function coordinate (){
    for (i=0; i<8; i++){
        if(i == 0){
            var text = Math.floor((Math.random() * 100) + 100);
            text += ' ' + Math.floor((Math.random() * 50) + 0) + ', ';
        }
        if(i == 1){
            var text1 = Math.floor((Math.random() * 50) + 0);
            var text2 = Math.floor((Math.random() * 50) + 0);
            text = text1 + ' ' + text2 + ', ';
            text2 = text1 + ' ' + (text2-2);
            random[8] = text2;
        }
        if(i == 2){
            var text = Math.floor((Math.random() * 100) + 100);
            text += ' ' + Math.floor((Math.random() * 150) + 150) + ', ';
        }
        if(i == 3){
            var text = Math.floor((Math.random() * 50));
            text += ' ' + Math.floor((Math.random() * 150) + 150) + ', ';
        }
        if(i == 4){
            var text = Math.floor((Math.random() * 5)+100);
            text += ' ' + Math.floor((Math.random() * 5) + 145) + ', ';
        }
        if(i == 5){
            var text1 = Math.floor((Math.random() * 5)+90);
            var text2 = Math.floor((Math.random() * 5) + 140);
            text = text1 + ' ' + text2 + ', ';
            text2 = text1 + ' ' + (text2-2);
            random[9] = text2;
        }
        if(i == 6){
            var text = Math.floor((Math.random() * 5)+100);
            text += ' ' + Math.floor((Math.random() * 5) + 150) + ', ';
        }
        if(i == 7){
            var text = Math.floor((Math.random() * 5)+90);
            text += ' ' + Math.floor((Math.random() * 5) + 150) + ', ';
        }
        random[i] = text;
    }
}