// JavaScript Document


<!-- start of JavaScript  
function CountdownTimer( elemID, timeLimit, limitMessage, msgClass ) {  
    this.initialize.apply( this, arguments );  
}  
  
CountdownTimer.prototype =  {  
  
    /** 
     * Constructor 
     */  
    initialize: function( elemID, timeLimit, limitMessage, msgClass ) {  
        this.elem = document.getElementById( elemID );  
        this.timeLimit = timeLimit;  
        this.limitMessage = limitMessage;  
        this.msgClass = msgClass;  
    },  
  
     /** 
     * カウントダウン 
     */  
    countDown : function()  {  
        var timer;  
        var today = new Date()  
        var days = Math.floor( ( this.timeLimit - today ) / ( 24 * 60 * 60 * 1000 ) );  
        
        days = days * 24;
        var hours = Math.floor( ( ( this.timeLimit - today ) % ( 24 * 60 * 60 * 1000 ) ) / ( 60 * 60 * 1000 ) );  
        hours =days+hours;
        
        var mins = Math.floor( ( ( this.timeLimit - today ) % ( 24 * 60 * 60 * 1000 ) ) / ( 60 * 1000 ) ) % 60;  
        var secs = Math.floor( ( ( this.timeLimit - today ) % ( 24 * 60 * 60 * 1000 ) ) / 1000 ) % 60 % 60;  
        var milis = Math.floor( ( ( this.timeLimit - today ) % ( 24 * 60 * 60 * 1000 ) ) / 10 ) % 100;  
        var me = this;  
  
            if( ( this.timeLimit - today ) > 0 ){  
            timer = '' + this.addZero( hours ) + '<span>時間</span>' + this.addZero( mins ) + '<span>分</span>'+ this.addZero( secs ) + '<span>秒</span>' + ''  
            this.elem.innerHTML = timer;  
            tid = setTimeout( function() { me.countDown(); }, 10 );  
  
            }else{  
            this.elem.innerHTML = this.limitMessage;  
            if( this.msgClass ) {  
                this.elem.setAttribute( 'class', this.msgClass );  
            }  
            return;  
            }  
    },  
  
    /** 
     * ゼロを付与 
     */  
    addZero : function( num )   {  
        num = '' + num;  
        str = num.substring( num.length - 3, num.length );  
  
        return str ;  
    }  
}  
  
// end of JavaScript -->  