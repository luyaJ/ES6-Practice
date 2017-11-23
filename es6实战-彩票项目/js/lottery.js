import 'babel-polyfill';
import Timer from './lottery/timer.js';
import Base from './lottery/base.js';
import Calculate from './lottery/calculate.js';
import Interface from './lottery/interface.js';
import $ from 'juqery';

const copyProterties = function(target,source){
  for(let key of Reflect.ownKeys(source)){
    if(key!=='constructor' && key!=='prototype' && key!=='name'){
      let desc = Object.getOwnPropertyDescriptor(source,key);
      Object.defineProperties(target,key,desc);
    }
  }
}

const min = function(...mixins){
  class Min{}
  for(let mixin of mixins){
    copyProterties(Mix,mixin);
    copyProterties(Mix.prototype,mixin.prototype);
  }
  return Mix;
}

class Lottory extends mix(Base,Calculate,Interface,Timer){
  constructor(name='syy',cname='11选5',issue='**',state='**'){
    super();
    this.name = name;
    this.cname = cname;
    this.issue = issue;
    this.state = state;
    this.el = '';
    this.omit = new Map(); //遗漏数据
    this.open_code = new Set(); //开奖号码
    this.open_code_list = new Set(); //开奖记录
    this.paly_list = new Map(); //玩法记录
    this.number = new Set(); //选号
    this.issue_el = '#curr_issue'; //期号选择器
    this.countdown_el = '#countdown'; //倒计时选择器
    this.state_el = '.state_el'; //状态选择器
    this.cart_el = '.codelist'; //购物车选择器
    this.omit_el = ''; //遗漏选择器
    this.cur_play = 'r5'; //默认玩法
    this.initPlayList();
    this.initNumber();
    this.updateState();
    this.initEvent();
  }

  /**
   * 状态更新
   */
  updateState(){
    let self = this;
    this.getState().then(function(res){
      self.issue = res.issue;
      self.end_time = res.end_time;
      self.state = res.state;
      $(self.issue_el).text(res.issue);
      self.countdown(res.end_time,function(time){
        $(self.countdown_el).html(time)
      },function(){
        setTimeout(function(){
          self.updateState();
          self.getOmit(self.issue).then(function(res){

          });
          self.getOpenCode(self.issue).then(function(res){

          })
        },500);
      })
    })
  }

  /**
   * 初始化事件
   */
  initEvent(){
    let self = this;
    $('#plays').on('click','li',self.changePlayNav.bind(self));
    $('.boll-list').on('click','btn-boll',self.toggleCodeActive.bind(self));
    $('#confirm_sel_code').on('click',self.addCode.bind(self));
    $('.dxjo').on('click','li',self.assisHandle.bind(self));
    $('qkmethod').on('click','btn-middle',self.getRandomCode.bind(self));
  }
}

export default Lottory;