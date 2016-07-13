//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends eui.Component{
    
    private bar:BaseProgressBar;
    private tieshi_txt:eui.Label;
    private bar_width_min:number = 50;
    private bar_width_max:number = 338;
    
    public constructor() {
        super();
        this.skinName = "resource/skins/LoadingSkin.exml";
    }
    
    protected childrenCreated() {
        super.childrenCreated();
        this.bar = new BaseProgressBar("LoadingProgressBar",50,338);
        this.bar.horizontalCenter = -20;
        this.bar.y = this.tieshi_txt.y + 50;
        this.addChild(this.bar);
        
        this.reset();
    }
    
    public reset():void
    {
        this.bar.reset();
    }
    
    /**小贴士文本内容*/
    public setText(str):void
    {
        if(this.bar != null){
            this.bar.setText(str);
        }
    }

    /**进度*/
    public setProgress(current, total):void {
        this.bar.setProgress(current,total);
    }
    
    public clear():void
    {
        if(this.bar != null){
            this.bar.clear();
        }
    }
}
