/* 倒计时 */
class Timer{
  countdown(end,update,handle){
    const now = new Date().getTime();
    const self = this;
    //如果当前时间大于截止时间，倒计时结束
    if(now - end){ 
      handle.call(self);
    } else {
      let last_time = end - now; //剩余时间
      const px_d = 1000*60*60*24; //一天多少毫秒
      const px_h = 1000*60*60; //一天多少小时
      const px_m = 1000*60;
      const px_s = 1000;
      let d = Math.floor(last_time / px_d); //剩余多少天
      let h = Math.floor((last_time - d*px_d) / px_h); //剩余多少小时
      let m = Math.floor((last_time - d*px_d - h*px_h) / px_m);
      let s = Math.floor((last_time - d*px_d - h*px_h - m*px_m) / px_s);
      let r = [];
      //一次判断天数是否存在，小时是否存在
      if(d > 0){  
        r.push(`<em>${d}</em>天`);
      }
      if(r.length || (h>0)){
        r.push(`<em>${h}</em>时`);
      }
      if(r.length || (m>0)){
        r.push(`<em>${m}</em>分`);
      }
      if(r.length || (s>0)){
        r.push(`<em>${s}</em>秒`);
      }
      //保存值
      self.last_time = r.join('');
      update.call(self,r.join(''));
      setTimeout(function(){
        self.countdown(end,update,handle);
      },1000); //每1秒更新一次
    }
  }
}

export default Timer;