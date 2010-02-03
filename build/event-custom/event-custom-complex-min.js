YUI.add("event-custom-complex",function(A){(function(){var C,E,B=A.CustomEvent.prototype,D=A.EventTarget.prototype;A.EventFacade=function(G,F){G=G||{};this.details=G.details;this.type=G.type;this._type=G.type;this.target=G.target;this.currentTarget=F;this.relatedTarget=G.relatedTarget;this.stopPropagation=function(){G.stopPropagation();};this.stopImmediatePropagation=function(){G.stopImmediatePropagation();};this.preventDefault=function(){G.preventDefault();};this.halt=function(H){G.halt(H);};};B.fireComplex=function(M){var N=A.Env._eventstack,I,F,K,G,L,Q,H,P=this,O=P.host||P,J;if(N){if(P.queuable&&P.type!=N.next.type){P.log("queue "+P.type);N.queue.push([P,M]);return true;}}else{A.Env._eventstack={id:P.id,next:P,silent:P.silent,stopped:0,prevented:0,type:P.type,afterQueue:new A.Queue(),queue:[]};N=A.Env._eventstack;}H=P.getSubs();P.stopped=(P.type!==N.type)?0:N.stopped;P.prevented=(P.type!==N.type)?0:N.prevented;P.target=P.target||O;Q=new A.EventTarget({fireOnce:true,context:O});P.events=Q;if(P.preventedFn){Q.on("prevented",P.preventedFn);}if(P.stoppedFn){Q.on("stopped",P.stoppedFn);}P.currentTarget=O;P.details=M.slice();P.log("Firing "+P.type);P._facade=null;I=P._getFacade(M);if(A.Lang.isObject(M[0])){M[0]=I;}else{M.unshift(I);}if(H[0]){P._procSubs(H[0],M,I);}if(P.bubbles&&O.bubble&&!P.stopped){if(N.type!=P.type){N.stopped=0;N.prevented=0;}L=O.bubble(P);P.stopped=Math.max(P.stopped,N.stopped);P.prevented=Math.max(P.prevented,N.prevented);}if(P.defaultFn&&!P.prevented&&((!P.defaultTargetOnly)||O===I.target)){P.defaultFn.apply(O,M);}P._broadcast(M);if(H[1]&&!P.prevented&&P.stopped<2){if(N.id===P.id){P._procSubs(H[1],M,I);while((J=N.afterQueue.last())){J();}}else{N.afterQueue.add(function(){P._procSubs(H[1],M,I);});}}if(N.id===P.id){K=N.queue;while(K.length){F=K.pop();G=F[0];N.next=G;G.fire.apply(G,F[1]);}A.Env._eventstack=null;}L=!(P.stopped);if(P.type!=O._yuievt.bubbling){N.stopped=0;N.prevented=0;P.stopped=0;P.prevented=0;}return L;};B._getFacade=function(){var F=this._facade,I,H,G=this.details;if(!F){F=new A.EventFacade(this,this.currentTarget);}I=G&&G[0];if(A.Lang.isObject(I,true)){H={};A.mix(H,F,true,E);A.mix(F,I,true);A.mix(F,H,true,E);F.type=I.type||F.type;}F.details=this.details;F.target=this.originalTarget||this.target;F.currentTarget=this.currentTarget;F.stopped=0;F.prevented=0;this._facade=F;return this._facade;};B.stopPropagation=function(){this.stopped=1;A.Env._eventstack.stopped=1;this.events.fire("stopped",this);};B.stopImmediatePropagation=function(){this.stopped=2;A.Env._eventstack.stopped=2;this.events.fire("stopped",this);};B.preventDefault=function(){if(this.preventable){this.prevented=1;A.Env._eventstack.prevented=1;this.events.fire("prevented",this);}};B.halt=function(F){if(F){this.stopImmediatePropagation();}else{this.stopPropagation();}this.preventDefault();};D.addTarget=function(F){this._yuievt.targets[A.stamp(F)]=F;this._yuievt.hasTargets=true;};D.removeTarget=function(F){delete this._yuievt.targets[A.stamp(F)];};D.bubble=function(P,N,L){var J=this._yuievt.targets,M=true,Q,O=P&&P.type,G,I,K,H,F=L||(P&&P.target)||this;if(!P||((!P.stopped)&&J)){for(I in J){if(J.hasOwnProperty(I)){Q=J[I];G=Q.getEvent(O,true);H=Q.getSibling(O,G);if(H&&!G){G=Q.publish(O);}Q._yuievt.bubbling=O;if(!G){if(Q._yuievt.hasTargets){Q.bubble(P,N,F);}}else{G.sibling=H;G.originalTarget=F;G.currentTarget=Q;K=G.broadcast;G.broadcast=false;M=M&&G.fire.apply(G,N||P.details||[]);G.broadcast=K;G.originalTarget=null;if(G.stopped){break;}}Q._yuievt.bubbling=null;}}}return M;};C=new A.EventFacade();E=A.Object.keys(C);})();},"@VERSION@",{requires:["event-custom-base"]});