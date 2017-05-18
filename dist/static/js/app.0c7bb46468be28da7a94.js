webpackJsonp([0],[,function(t,e,n){n(26);var i=n(0)(n(18),n(35),"data-v-0c5d48d0",null);t.exports=i.exports},function(t,e,n){n(32);var i=n(0)(n(19),n(41),"data-v-c5e332d8",null);t.exports=i.exports},function(t,e,n){n(33);var i=n(0)(n(20),n(42),"data-v-d8666916",null);t.exports=i.exports},function(t,e,n){n(28);var i=n(0)(n(21),n(37),"data-v-32fb234c",null);t.exports=i.exports},function(t,e,n){n(27);var i=n(0)(n(22),n(36),"data-v-1f5f08cc",null);t.exports=i.exports},function(t,e,n){n(31);var i=n(0)(n(23),n(40),"data-v-c3704dba",null);t.exports=i.exports},function(t,e,n){n(34);var i=n(0)(n(24),n(43),"data-v-fe738cbe",null);t.exports=i.exports},function(t,e,n){n(29);var i=n(0)(n(25),n(38),"data-v-3bec619c",null);t.exports=i.exports},,function(t,e,n){"use strict";e.a={permutations:function(t,e){var n,i;return i=[],n=function(t,e,s){var r,o;if(0===s)return i.push(t);for(r=0,o=e.length;r<o;)n(t.concat(e[r]),e.slice(0,r).concat(e.slice(r+1)),s-1),r++},n([],t,e),i},combinations:function(t,e){var n,i;return i=[],n=function(t,e,s){var r,o;if(0===s)return i.push(t);for(r=0,o=e.length;r<=o-s;)n(t.concat(e[r]),e.slice(r+1),s-1),r++},n([],t,e),i},shuffle:function(t,e){var n,i,s,r;for(i=t.length,s=[],null==e&&(e=i);i&&s.length<e;)n=Math.floor(Math.random()*i--),r=t[i],t[i]=t[n],t[n]=r,s.push(t[i]);return s},fermat:function(t,e,n){var i,s,r,o,a,h,u,c,l,d,p,f,x,g,v,m,_;return function(t,e,n){return t.y=-1*t.y,e.y=-1*e.y,n.y=-1*n.y},p=function(t,e){return[e.x-t.x,e.y-t.y]},l=function(t,e){return[t[0]-e[0],t[1]-e[1]]},h=function(t,e){var n,i,s;return i=[t[1],-1*t[0]],s=[-1*t[1],t[0]],n=i[0]*e[0]+i[1]*e[1],n<0?i:s},d=function(t,e){return[.5*(t[0]+Math.sqrt(3)*e[0]),.5*(t[1]+Math.sqrt(3)*e[1])]},r=function(t,e){return{a:t[1],b:-1*t[0],c:t[0]*e.y-t[1]*e.x}},s=function(t,e){return{x:(t.b*e.c-e.b*t.c)/(t.a*e.b-e.a*t.b),y:(e.a*t.c-t.a*e.c)/(t.a*e.b-e.a*t.b)}},f=p(t,e),x=p(t,n),u=h(x,f),c=h(f,x),g=d(x,u),v=d(f,c),m=l(g,f),_=l(v,x),a=r(_,n),o=r(m,e),i=s(o,a),i}}},,,function(t,e,n){"use strict";var i,s,r=n(9),o=n(44);r.a.use(o.a),i=function(t){return function(){return n(47)("./"+t+".vue")}},s=[{path:"/",component:i("home")},{path:"/Brownian-motion",component:i("brownian-motion")},{path:"/Chat-Noir",component:i("chat-noir")},{path:"/Minimum-Spanning-Tree",component:i("minimum-spanning-tree")},{path:"/Mine-Sweeper",component:i("mine-sweeper")},{path:"/Pinball",component:i("pin-ball")}],s.push({path:"*",component:i("Hello")}),e.a=new o.a({routes:s})},function(t,e,n){n(30);var i=n(0)(n(17),n(39),null,null);t.exports=i.exports},function(t,e,n){function i(t){return n(s(t))}function s(t){var e=r[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var r={"./brownian-motion":1,"./brownian-motion.vue":1,"./chat-noir":2,"./chat-noir.vue":2,"./hexagon":3,"./hexagon.vue":3,"./home":4,"./home.vue":4,"./mine-sweeper":5,"./mine-sweeper.vue":5,"./minimum-spanning-tree":6,"./minimum-spanning-tree.vue":6,"./navi":7,"./navi.vue":7,"./pin-ball":8,"./pin-ball.vue":8};i.keys=function(){return Object.keys(r)},i.resolve=s,t.exports=i,i.id=15},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(9),s=n(14),r=n.n(s),o=n(13);i.a.config.productionTip=!1,i.a.prototype.$prefix="aha-",["navi","hexagon"].forEach(function(t){return i.a.component(i.a.prototype.$prefix+t,n(15)("./"+t))}),new i.a({el:"#app",router:o.a,render:function(t){return t(r.a)}})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={name:"app",created:function(){return console.log("App Start")}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(11),s=n.n(i);e.default={name:"brownian-motion",data:function(){return{width:"300",height:"150"}},mounted:function(){return window.onresize=this.resize},methods:{init:function(){},resize:s.a.throttle(function(t){return console.log("resize"),this.width=Math.max(window.innerWidth*this.scale,this.px),this.height=Math.max(window.innerHeight*this.scale,this.py)},500)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={name:"chatnoir",data:function(){return{radius:24,col:11,row:11,interval:1.5,block_num:10,showPath:!1,showCoord:!1,showInsight:!1,lazyPath:!0,step:0,revert:0,finish:null,cells:{},selected:{},cat:{},path:[],even:[[1,-1],[1,0],[1,1],[0,1],[-1,0],[0,-1]],odd:[[0,-1],[1,0],[0,1],[-1,1],[-1,0],[-1,-1]],bfs:{}}},computed:{width:function(){return(this.radius+this.interval)*(this.col+1)*2},height:function(){return(this.radius+this.interval)*this.row*2*.9},transform:function(){return"translate("+this.radius+", "+this.radius+")"},pixels:function(){var t,e,n,i;n={},i=this.cells;for(e in i)t=i[e],n[e]={},n[e].x=t.x,n[e].y=t.y,t.selected?n[e].selected=!0:n[e].selected=!1,e===this.hex2key(this.cat)?n[e].caught=!0:n[e].caught=!1,this.showPath&&t.path?n[e].path=!0:n[e].path=!1,this.showInsight&&t.insight?n[e].insight=!0:n[e].insight=!1;return n},status:function(){switch(this.finish){case"win":return"POOR CAT "+this.step;case"lose":return"NEKO RUN";default:return"Chat Noir "+this.step}},pathText:function(){return this.showPath?"Hide Path":"Show Path"},coordText:function(){return this.showCoord?"Hide Coord":"Show Coord"},insightText:function(){return this.showInsight?"Hide Insight":"Show Insight"}},created:function(){return this.init()},methods:{init:function(){return this.cat=this.point(5,5),this.selected={},this.finish=null,this.step=0,this.create_cell(),this.create_block(),this.update_path(),this.is_finish(),this.draw_path()},create_cell:function(){var t,e,n,i,s,r,o,a;for(t={},o=e=0,s=this.col;0<=s?e<s:e>s;o=0<=s?++e:--e)for(a=i=0,r=this.row;0<=r?i<r:i>r;a=0<=r?++i:--i)n=this.hex_key(o,a),t[n]=this.point(o,a),t[n].selected=!1,t[n].caught=!1,t[n].path=!1,t[n].insight=!1;return this.cells=t},create_block:function(){var t,e,n,i,s,r;for(t={},e=0,i=this.block_num;0<=i?e<i:e>i;0<=i?++e:--e)s=Math.trunc(Math.random()*this.col),r=Math.trunc(Math.random()*this.row),(n=this.hex_key(s,r))!==this.hex2key(this.cat)&&(t[n]=this.point(s,r),this.cells[n].selected=!0);return this.selected=t},toggle_path:function(){return this.showPath=!this.showPath},toggle_coord:function(){return this.showCoord=!this.showCoord},toggle_insight:function(){return this.showInsight=!this.showInsight},hex_key:function(t,e){return t+"-"+e},hex2key:function(t){return this.hex_key(t.x,t.y)},hex_neighbor:function(t,e){var n;return n=[],1&e?this.even.forEach(function(i){return function(s){return n.push(i.point(s[0]+t,s[1]+e))}}(this)):this.odd.forEach(function(i){return function(s){return n.push(i.point(s[0]+t,s[1]+e))}}(this)),n},point:function(t,e){return{x:t,y:e}},hex:function(t,e,n){return{x:t,y:e,z:n}},point2hex:function(t,e){return this.hex(t,e,1-t-e)},hex_border:function(t){return 0===t.x||0===t.y||t.x===this.col-1||t.y===this.row-1},out_of_hex:function(t){return t.x<0||t.y<0||t.x>this.col-1||t.y>this.row-1},pick:function(t,e){var n,i;if(!this.finish)return console.log(t,e),i=this.hex_key(t,e),n=this.point(t,e),this.selected[i]=n,this.cells[i].selected=!0,this.step+=1,this.lazy_next(n)},unpick:function(t,e){var n;return this.finish&&(this.finish=null),console.log(t,e),n=this.hex_key(t,e),this.point(t,e),this.selected[n]=null,this.cells[n].selected=!1,this.revert+=1,this.update_path(),this.is_finish(),this.next()},next_path:function(t,e,n){var i,s,r,o,a;if(!this.finish&&this.showInsight)return!this.lazyPath||n?(o=this.hex_key(t,e),r=this.point(t,e),s=JSON.parse(JSON.stringify(this.selected)),s[o]||(s[o]=r),i=this.get_bfs(null,s),a=this.get_path(i),this.draw_path(a,"insight")):void 0},reset_path:function(t){if(this.lazyPath&&t)return this.draw_path(this.path,"insight")},get_goals:function(t){var e,n,i,s,r;e=[],n=null,i=function(t){return function(i){var s,o,a;if(o=~~i.split("-")[0],a=~~i.split("-")[1],s=t.point(o,a),t.hex_border(s)&&(s.distance=r,e.push(s),null==n||n>s.distance))return n=s.distance}}(this);for(s in t)r=t[s],i(s);return e.sort(function(t,e){return t.distance-e.distance}),e.filter(function(t){return t.distance===n})},get_bfs:function(t,e){return t||(t=(this.col+1)*(this.row+1)),e||(e=this.selected),this.breadth_first_search(this.cat,t,e)},get_path:function(t){var e,n,i,s;for(s=[],n=this.get_goals(t.cost_so_far),e=n[0],i=e;i&&this.hex2key(i)!==this.hex2key(this.cat);)s.push(i),i=t.came_from[this.hex2key(i)];return s.reverse()},update_path:function(){var t,e;return t=this.get_bfs(null,this.selected),e=this.get_path(t),this.bfs=t,this.path=e},next:function(){var t;return this.finish||(t=this.path.shift(),this.cells[this.hex2key(this.cat)].caught=!1,this.cells[this.hex2key(t)].caught=!0,this.cat=t,this.is_finish()),this.draw_path()},lazy_next:function(t){return this.lazyPath&&t&&-1!==this.path.findIndex(function(e){return e.x===t.x&&e.y===t.y})&&(this.update_path(),this.is_finish()),this.next()},is_finish:function(){if(this.hex_border(this.cat)?this.finish="lose":0===this.path.length&&(this.finish="win"),this.finish)return setTimeout(function(t){return function(){return t.init()}}(this),2e3)},draw_path:function(t,e){var n,i,s,r,o;t||(t=this.path),e||(e="path"),r=this.cells,o=[];for(s in r)n=r[s],i=t.findIndex(function(t){return t.x===n.x&&t.y===n.y}),-1!==i?o.push(n[e]=!0):o.push(n[e]=!1);return o},breadth_first_search:function(t,e,n){var i,s,r,o,a,h,u,c,l,d,p,f,x,g,v,m;for(m=this.hex2key(t),x={},x[""+m]=0,r=x,g={},g[""+m]=null,i=g,o=[[t]],h=0;h<e&&o[h].length>0;){for(o[h+1]=[],v=o[h],a=0,l=v.length;a<l;a++)for(s=v[a],f=this.hex_neighbor(s.x,s.y),c=0,d=f.length;c<d;c++)p=f[c],u=this.hex2key(p),r[u]||n[u]||this.out_of_hex(p)||(r[u]=h+1,i[u]=s,o[h+1].push(p));h++}return{cost_so_far:r,came_from:i}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={name:"hexagon",props:{radius:Number,cell:Object,interval:Number,showCoord:Boolean},data:function(){return{sqrt3:Math.sqrt(3)}},computed:{caught:function(){return this.cell.caught||!1},path:function(){return this.cell.path||!1},selected:function(){return this.cell.selected||!1},insight:function(){return this.cell.insight||!1},x:function(){return this.cell.x},y:function(){return this.cell.y},transformG:function(){var t,e;return t=((1&this.y)+2*this.x)*(this.radius+this.interval),e=(this.radius+this.interval)*this.y*this.sqrt3,"translate("+t+", "+e+")"},status:function(){return this.caught?this.$parent.finish?"finished":"caught":this.selected?"selected":this.insight?"insight":this.path?"path":""}},methods:{hello:function(){return console.log("hello")},select:function(){if(!this.selected&&!this.caught)return this.$parent.pick(this.x,this.y)},unselect:function(){if(this.selected&&!this.caught)return this.$parent.unpick(this.x,this.y)},enter:function(){if(!this.selected&&!this.caught)return this.$parent.next_path(this.x,this.y,this.path)},out:function(){if(!this.selected&&!this.caught)return this.$parent.reset_path(this.path)}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={name:"hello",data:function(){return{msg:"Enjoy Games"}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(10);e.default={name:"minesweeper",data:function(){return{risk:null,density:.15625,counter:"∞",counting:!1,col:30,row:16,colspan:4,finished:!1,exploded:!1,exposed:0,flaged:0,cells:{},exposes:{},flags:{},neighbor:[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]}},computed:{img:function(){return this.exploded?"sad.gif":this.exposed===this.row*this.col-this.mines?"happy.gif":"peace.gif"},mines:function(){return this.risk?this.risk:30===this.col&&16===this.row?99:8===this.col&&8===this.row||16===this.col&&16===this.row?10:10*Math.round(this.col*this.row*this.density*.1)},remained:function(){return this.mines-this.flaged},interval:function(){return.5*(this.col-2*this.colspan-2)}},created:function(){return this.init()},activated:function(){return console.log("activated"),document.body.style.backgroundColor="#666666"},deactivated:function(){return console.log("deactivated"),document.body.style.backgroundColor="#ffffff"},methods:{init:function(){return console.log("init"),this.exploded=!1,this.exposed=0,this.counting=!1,this.counter="∞",this.cells={},this.createCells(),this.createMines(),this.updateNeighbor()},count:function(){if(!this.exploded)return this.counting=!0,this.counter+=1,setTimeout(function(t){return function(){return t.count()}}(this),1e3)},key:function(t,e){return t+"-"+e},isExposed:function(t,e){var n,i;return i=this.key(t,e),!(!(n=this.cells[i])||!n.exposed)},cellStatus:function(t,e){var n,i;return i=this.key(t,e),n=this.cells[i],this.exploded?"flaged"===n.flaged?n.mined?"!":"×":n.mined?"☀":n.mines>0?n.mines:"":n.exposed?n.mines>0?n.mines:"":"flaged"===n.flaged?"!":"unsettled"===n.flaged?"?":""},cellClass:function(t,e){var n,i,s;return s=this.key(t,e),i=this.cells[s],n=[],this.exploded?("flaged"===i.flaged?i.mined||(n.push("incorrect"),n.push("exposed")):n.push("exposed"),i.exploded?n.push("exploded"):!i.mined&&i.mines>0&&!i.flaged&&n.push("m"+i.mines)):i.exposed&&(n.push("exposed"),i.mines>0&&n.push("m"+i.mines)),n},createCells:function(){var t,e,n,i,s,r,o,a;for(t={},e=i=1,o=this.col;1<=o?i<=o:i>=o;e=1<=o?++i:--i)for(n=r=1,a=this.row;1<=a?r<=a:r>=a;n=1<=a?++r:--r)s=this.key(e,n),t[s]={x:e,y:n,mined:!1,flaged:!1,exposed:!1,neighbor:[],mines:0};return this.cells=t},createMines:function(t){var e,n,s,r,o;for(e=0,o=0,t||(t=i.a.shuffle(Object.keys(this.cells),this.mines)),n=0,r=t.length;n<r;n++)s=t[n],this.cells[s].mined?e+=1:(this.cells[s].mined=!0,o+=1);if(o!==this.mines)return console.error(t,o)},clearMines:function(){var t,e,n,i;n=this.cells,i=[];for(e in n)t=n[e],t.mined=!1,t.mines=0,i.push(t.neighbor=[]);return i},updateNeighbor:function(){var t,e,n,i;e=JSON.parse(JSON.stringify(this.cells));for(n in e)t=e[n],i=this.getNeighbor(t),t.neighbor=i.neighbor,t.mines=i.mines;return this.cells=e},getNeighbor:function(t){var e,n;return n=[],e=0,this.neighbor.forEach(function(i){return function(s){var r,o,a,h;if(a=s[0]+t.x,h=s[1]+t.y,r=i.key(a,h),(o=i.cells[r])&&(n.push(o),o.mined))return e+=1}}(this)),{neighbor:n,mines:e}},moveMines:function(t){var e,n,s;return console.log("move mines"),e=[],e.push(t),e=e.concat(t.neighbor),n=Object.keys(this.cells),n=n.filter(function(t){var n;return n=t.split("-"),-1===e.findIndex(function(t){return t.x===~~n[0]&&t.y===~~n[1]})}),s=i.a.shuffle(n,this.mines),this.clearMines(),this.createMines(s),this.updateNeighbor()},mouse:function(t,e,n){var i,s;if(console.log(e,n),0!==this.exposed||this.counting||(this.counter=0,this.count()),s=this.key(e,n),i=this.cells[s],!i.exposed)return 0===t.button?this.sweep(i):2===t.button?this.flag(i):void 0},sweep:function(t){var e;if(console.log("sweep"),"flaged"!==t.flaged)return 0===this.exposed&&(t.mined||t.mines>0)?(this.moveMines(t),e=this.key(t.x,t.y),this.expose(this.cells[e])):t.mined?this.explode(t):this.expose(t)},flag:function(t){var e,n;return console.log("flag"),e=["flaged","unsettled",!1],n=e.indexOf(t.flaged),n===e.length-1?(t.flaged=e[0],this.flaged+=1):(t.flaged=e[n+1],this.flaged-=1)},expose:function(t){var e,n,i,s,r,o,a;if(!0!==t.exposed&&(t.exposed=!0,this.exposed+=1,0===t.mines)){for(o=t.neighbor,a=[],e=0,i=o.length;e<i;e++)r=o[e],n=this.key(r.x,r.y),s=this.cells[n],a.push(this.expose(s));return a}},explode:function(t){return console.log("explode"),t.exploded=!0,this.exploded=!0}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(11),s=n.n(i),r=n(10);e.default={name:"minimum-spanning-tree",data:function(){return{width:600,height:300,radius:20,scale:.7,points:[],updating:!1,spanning:!1,moving:!1,current:null,index:0,px:0,py:0,tree:[],border:[],vertex:[],dynamic_border:[],dynamic_vertex:[],ptree:[],ktree:[],pmst:null,kmst:null,steinering:!1,fermat_angle:2*Math.PI/3,deviation:.01,fermat_vertex:[],fpoints:[],ftree:[],flength:0,steinered:0,need_updated:!0}},computed:{updateText:function(){return this.updating?"Drawing":this.moving?"Moving":"Add Point"},spanningText:function(){return this.spanning?"Spanning":"Auto Span"},steinerText:function(){return this.steinering?"Steinering":"Auto Steiner"},buttonClass:function(){return this.moving?"disabled":""},spanClass:function(){return this.moving||this.updating?"disabled":""},pointClass:function(){return this.updating||this.moving?"":"movable"}},created:function(){return window.onresize=this.resize},mounted:function(){return this.resize()},methods:{init:function(){},toggleUpdating:function(){if(!this.moving)return this.updating=!this.updating,this.index=this.points.length,this.dynamic_border=[],this.dynamic_vertex=[],this.span(),null==this.current?this.current={x:.5*this.width,y:.5*this.height,index:0}:void 0},toggleSpanning:function(){if(!this.updating&&!this.moving)return this.spanning=!this.spanning,this.span()},toggleSteiner:function(){if(!this.updating&&!this.moving)return this.steinering=!this.steinering,this.steiner()},resize:s.a.throttle(function(t){return console.log("resize"),this.width=Math.max(window.innerWidth*this.scale,this.px),this.height=Math.max(window.innerHeight*this.scale,this.py)},500),clear:function(){if(!this.moving)return this.current=null,this.index=0,this.points=[],this.tree=[],this.border=[],this.vertex=[],this.dynamic_border=[],this.dynamic_vertex=[],this.ptree=[],this.ktree=[],this.ftree=[],this.kmst=null,this.pmst=null,this.fermat_vertex=[],this.fpoints=[],this.flength=0,this.steinered=0,this.need_updated=!0},point:function(t,e){var n,i;return n=this.$refs.board.getScreenCTM(),i=this.$refs.board.createSVGPoint(),i.x=t,i.y=e,i=i.matrixTransform(n.inverse()),{x:i.x,y:i.y,index:this.index}},drag:function(t){if(this.updating||this.moving)return this.current=this.point(t.clientX,t.clientY),this.need_updated=!0,this.span(),this.spanning?void 0:this.steiner()},drop:function(t){if(this.updating||this.moving)return this.merge(),this.updating?this.points.push(this.current):this.moving&&(this.moving=!1,this.points.splice(this.index,1,this.current)),this.index=this.points.length,this.limit()},move:function(t){var e;if(this.updating);else if(!this.moving)return this.moving=!0,this.index=t,e=this.points.splice(t,1,null)[0],this.current={x:e.x,y:e.y,index:t},this.unmerge(t),this.span()},limit:function(){var t,e;if((null!=(t=this.current)?t.x:void 0)>this.px&&(this.px=this.current.x+2*this.radius),(null!=(e=this.current)?e.y:void 0)>this.py)return this.py=this.current.y+2*this.radius},distance:function(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))},abs_angle:function(t,e){var n,i;return i=this.distance(t,e),n=e.x-t.x,e.y<t.y?Math.acos(n/i):2*Math.PI-Math.acos(n/i)},rel_angle:function(t,e,n){var i,s,r;return r=this.distance(e.point,n.point),i=this.distance(t,e.point),s=this.distance(t,n.point),i>0&&s>0&&r>0&&i+s>r&&i+r>s&&s+r>i?Math.acos((i*i+s*s-r*r)/(2*i*s)):0},link:function(t,e,n){var i,s,r,o,a,h,u;for(i=[],u=[],u[n]=[],r=o=0,a=t.length;o<a;r=++o)(h=t[r])&&(u[r]=[],s=this.distance(h,e),i.push({0:h,1:e,distance:s}),u[r].push({couple:e,distance:s}),u[n].push({couple:h,distance:s}));return i=i.sort(function(t,e){return t.distance-e.distance}),{border:i,vertex:u}},merge_border:function(t,e){return t=t.concat(e),t.sort(function(t,e){return t.distance-e.distance})},merge_vertex:function(t,e){var n,i,s,r;for(n=i=0,s=e.length;i<s;n=++i)r=e[n],t[n]?t[n]=t[n].concat(r):t[n]=r;return t.map(function(t){return t.sort(function(t,e){return t.distance-e.distance})})},merge:function(){var t;return t=this.link(this.points,this.current,this.index),this.dynamic_border=t.border,this.dynamic_vertex=t.vertex,this.border=this.merge_border(this.border,this.dynamic_border),this.vertex=this.merge_vertex(this.vertex,this.dynamic_vertex)},unmerge:function(t){return this.border=this.border.filter(function(e){return e[0].index!==t&&e[1].index!==t}),this.vertex=this.vertex.map(function(e){return e.filter(function(e){return e.couple.index!==t})}),this.vertex.splice(t,1,null)},bpv:function(t,e){var n,i,s;return i=JSON.parse(JSON.stringify(this.points)),s=JSON.parse(JSON.stringify(this.vertex)),n=JSON.parse(JSON.stringify(this.border)),(this.updating||this.moving)&&(i.splice(this.index,1,{x:this.current.x,y:this.current.y,index:this.index}),n=this.merge_border(n,t),s=this.merge_vertex(s,e)),{border:n,points:i,vertex:s}},span:function(){var t,e,n,i,s;if(this.spanning&&!(this.points.length<=1)&&(e=this.link(this.points,this.current,this.index),this.dynamic_border=e.border,this.dynamic_vertex=e.vertex,t=this.bpv(this.dynamic_border,this.dynamic_vertex),i=this.prim(t.vertex,t.points),this.pmst=i,this.ptree=i.tree,n=this.kruskal(t.border,t.points),this.kmst=n,this.ktree=n.tree,this.steinering))return s=this.border2vertex(n.tree,t.points),this.fermat_vertex=s,this.need_updated=!1,this.steinered=0,this.steiner()},next:function(t,e){var n,i,s,r,o;for(n=[],s=0,r=t.length;s<r;s++)i=t[s],null!=(null!=(o=e[i])?o[0]:void 0)&&n.push({couple:e[i][0].couple,distance:e[i][0].distance,previous:i});return n.sort(function(t,e){return t.distance-e.distance}),n[0]},trim:function(t,e){var n,i,s;for(i=0,s=e.length;i<s;i++)n=e[i],t[n].length>0&&(t[n]=t[n].filter(function(t){return-1===e.indexOf(t.couple.index)}));return t},prim:function(t,e){var n,i,s,r,o;for(o=[],r=[0],i=0,n=0;n<e.length-1;)s=this.next(r,t),s?(r.push(s.couple.index),t=this.trim(t,r),i+=s.distance,o.push({0:e[s.previous],1:e[s.couple.index],distance:s.distance})):console.info(s,r,t),n++;return{tree:o,start:r,vertex:t,length:i}},border2set:function(t,e,n,i){var s,r,o,a,h,u,c,l,d,p,f,x,g,v,m;for(a=t[0].index,h=t[1].index,d=[],s=!1,r=!0,p=!1,l=0,x={vertex_set:e,border_set:n,index:i,length:l},o=u=0,c=e.length;u<c;o=++u)g=e[o],v=!!g[a],m=!!g[h],v&&m?(s=!0,r=!1):v||m?(r=!1,p?d.push(o):(p=!0,d.push(o),n.push(t),i++,l+=t.distance,v?g[h]={index:h,border:t}:g[a]={index:a,border:t})):r=r;return s?x:r?(e.push((f={},f[""+a]={index:a,border:t},f[""+h]={index:h,border:t},f)),n.push(t),i++,l+=t.distance,x.index=i,x.length=l,x):p&&2===d.length?(e[d[0]]=Object.assign({},e[d[0]],e[d[1]]),e.splice(d[1],1),x.index=i,x.length=l,x):(x.index=i,x.length=l,x)},kruskal:function(t,e){var n,i,s,r,o,a;for(a=[],i=[],r=0,0,s=0;t.length>0&&s<e.length;)n=t.shift(),o=this.border2set(n,a,i,s),a=o.vertex_set,i=o.border_set,s=o.index,r+=o.length;return{tree:i,vertex:a,length:r}},border2vertex:function(t,e){var n,i,s,r,o,a;for(a=[],r=0,o=t.length;r<o;r++)n=t[r],i=n[0].index,s=n[1].index,a[i]=a[i]||{couple:[],point:e[i]},a[s]=a[s]||{couple:[],point:e[s]},a[i].couple.push({point:e[s],distance:n.distance}),a[s].couple.push({point:e[i],distance:n.distance});return a},vertex2border:function(t){var e,n,i,s;for(e=[],n=0,i=t.length;n<i;n++)s=t[n],s.couple.forEach(function(t){return e.length>0?-1===e.findIndex(function(e){return e.distance===t.distance&&t.point.index===e[0].index&&s.point.index===e[1].index||t.point.index===e[1].index&&s.point.index===e[0].index})?e.push({0:s.point,1:t.point,distance:t.distance}):void 0:e.push({0:s.point,1:t.point,distance:t.distance})});return e},vertex2point:function(t){var e,n,i,s;for(i=[],e=0,n=t.length;e<n;e++)s=t[e],i.push(s.point);return i},steiner:function(){var t,e,n,i;if(this.steinering&&!(this.points.length<=1))return this.need_updated?(e=this.link(this.points,this.current,this.index),t=this.bpv(e.border,e.vertex),i=this.kruskal(t.border,t.points),this.fermat_vertex=this.border2vertex(i.tree,t.points),this.steinered=0,this.need_updated=!1,this.steiner()):(this.steinered+=1,n=this.fermat(this.fermat_vertex),this.fermat_vertex=n,this.fpoints=this.vertex2point(n),this.ftree=this.vertex2border(n),this.flength=this.total_length(this.ftree),this.need_updated=!1)},total_length:function(t){var e,n,i,s;for(i=0,e=0,n=t.length;e<n;e++)s=t[e],i+=s.distance;return i},fermat:function(t){var e,n,i,s,r,o;for(s=[],o=JSON.parse(JSON.stringify(t)),i=o.length,n=0;n<999&&o.length>0;)r=o.shift(),e=this.find_fermat(r,i),e.fermat?(this.update_fv(e,r,s),this.update_vertexs(e,r,o),e.fermat.index!==r.point.index&&i++):s[r.point.index]={point:r.point,couple:r.couple},n++;return s},update_fv:function(t,e,n){var i,s,r;return r=t.fermat,s=r.index,i=t.couple,n[s]={point:r,couple:i},i.forEach(function(t){var i,s,o;return s=t.distance,o=n.findIndex(function(e){return e&&e.point.index===t.point.index}),-1!==o?(i=n[o].couple,i=i.map(function(t){return t.point.index===e.point.index?(t.point=r,t.distance=s,t):t}),n[o].couple=i):null})},update_vertexs:function(t,e,n){var i,s,r;return r=t.fermat,s=r.index,i=t.couple,i.forEach(function(t){var o;if(o=n.findIndex(function(e){return e.point.index===t.point.index}),-1!==o&&(n[o].couple=n[o].couple.map(function(n){return n.point.index===e.point.index?(n.point=r,n.distance=t.distance,n):n})),t.point.index===e.point.index)return e.couple=e.couple.filter(function(t){return-1===i.findIndex(function(e){return e.point.index===t.point.index})}),e.couple.push({point:r,distance:t.distance}),e.point.index!==s?n.push(e):e.point=r})},find_fermat:function(t,e){var n,i,s,o,a,h,u,c;return h=t.point,u={},a=this.min_angle(t),n=a.angle,i=a.couple,n&&n<this.fermat_angle?(s=r.a.fermat(h,i[0].point,i[1].point),isNaN(s.x||isNaN(s.x))?(console.error(s,h,i),u=this.fermat2point(!1,i,e)):(h.fermat?(o=h.index,c=this.the_other(i,t)):(o=e,c=h),u=this.fermat2point(s,[c,i[0].point,i[1].point],o))):u=this.fermat2point(!1,i,e),u},the_other:function(t,e){var n,i,s,r,o;for(r=null,s=e.couple,n=0,i=s.length;n<i;n++)o=s[n],-1===t.findIndex(function(t){return t.point.index===o.point.index})&&(r=o.point);return r},min_angle:function(t){var e,n,i,s,r,o;return o=t.point,s=t.couple,r=!1,i=[],1===s.length?i=s:2===s.length?(r=this.rel_angle(o,s[0],s[1]),i=s):(e=s.map(function(t){return function(e){return{angle:t.abs_angle(o,e.point),point:e.point}}}(this)),e=e.sort(function(t,e){return t.angle>e.angle}),n=e.length,e=e.map(function(t,i){var s;return i<n-1?(s=Math.abs(t.angle-e[i+1].angle),{angle:Math.min(s,2*Math.PI-s),couple:[t.point,e[i+1].point]}):(s=Math.abs(t.angle-e[0].angle),{angle:Math.min(s,2*Math.PI-s),couple:[t.point,e[0].point]})}),e.sort(function(t,e){return t.angle>e.angle}),r=e[0].angle,i=[{point:e[0].couple[0]},{point:e[0].couple[1]}]),{angle:r,couple:i}},fermat2point:function(t,e,n){return t?{fermat:{x:t.x,y:t.y,index:n,fermat:!0},couple:[{point:e[0],distance:this.distance(e[0],t)},{point:e[1],distance:this.distance(e[1],t)},{point:e[2],distance:this.distance(e[2],t)}]}:{fermat:!1,couple:e}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={name:"navi",computed:{active:function(){var t;switch(t=["","","","","",""],this.$route.path){case"/":t[0]="highlighted";break;case"/Brownian-Motion":t[1]="highlighted";break;case"/Chat-Noir":t[2]="highlighted";break;case"/Mine-Sweeper":t[3]="highlighted";break;case"/Minimum-Spanning-Tree":t[4]="highlighted";break;case"/Pinball":t[5]="highlighted"}return t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default={name:"pinball"}},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"body"},[n("canvas",{attrs:{width:t.width,height:t.height}})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",[t._v("Mine Sweeper")]),t._v(" "),n("div",{staticClass:"board"},[n("table",{staticClass:"table",attrs:{summary:"Mine Sweeper"}},[n("thead",[n("th",{attrs:{colspan:t.colspan}},[n("div",{staticClass:"counter",domProps:{textContent:t._s(t.remained)}})]),t._v(" "),n("th",{attrs:{colspan:t.interval}}),t._v(" "),n("th",{attrs:{colspan:"2"}},[n("img",{attrs:{src:"/static/img/"+t.img},on:{click:t.init}})]),t._v(" "),n("th",{attrs:{colspan:t.interval}}),t._v(" "),n("th",{attrs:{colspan:t.colspan}},[n("div",{staticClass:"counter",domProps:{textContent:t._s(t.counter)}})])]),t._v(" "),n("tbody",t._l(t.row,function(e){return n("tr",[t._l(t.col,function(i){return[n("td",{class:t.cellClass(i,e),domProps:{textContent:t._s(t.cellStatus(i,e))},on:{contextmenu:function(t){t.preventDefault()},mousedown:function(n){n.preventDefault(),t.mouse(n,i,e)}}})]})],2)}))])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("h1",{domProps:{textContent:t._s(t.msg)}}),t._v(" "),n("h2",[t._v("Game Links")]),t._v(" "),n("ul",[n("li",[n("router-link",{attrs:{to:"/Mine-Sweeper"}},[t._v("Mine Sweeper")])],1),t._v(" "),n("li",[n("router-link",{attrs:{to:"/Minimum-Spanning-Tree"}},[t._v("Minmum Spanning Tree")])],1),t._v(" "),n("li",[n("router-link",{attrs:{to:"/Pinball"}},[t._v("Pinball")])],1),t._v(" "),n("li",[n("router-link",{attrs:{to:"/Brownian-Motion"}},[t._v("Brownian Motion")])],1)]),t._v(" "),n("h2",[t._v("Source Code")]),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/makaria/aha",target:"_blank"}},[t._v("Github")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"body"},[n("canvas")])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("aha-navi"),t._v(" "),n("keep-alive",[n("router-view")],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",[t._v("Minimum Spanning Tree")]),t._v(" "),n("div",{staticClass:"action"},[n("button",{class:t.spanClass,domProps:{textContent:t._s(t.spanningText)},on:{click:t.toggleSpanning}}),t._v(" "),n("button",{class:t.spanClass,domProps:{textContent:t._s(t.steinerText)},on:{click:t.toggleSteiner}}),t._v(" "),n("button",{class:t.spanClass,domProps:{textContent:t._s("Steiner X"+t.steinered)},on:{click:t.steiner}}),t._v(" "),n("button",{class:t.buttonClass,domProps:{textContent:t._s(t.updateText)},on:{click:t.toggleUpdating}}),t._v(" "),n("button",{class:t.buttonClass,on:{click:t.clear}},[t._v("Clear")])]),t._v(" "),n("div",{staticClass:"board"},[n("svg",{ref:"board",attrs:{id:"board",width:t.width,height:t.height},on:{contextmenu:function(t){t.preventDefault()},mousemove:t.drag,click:t.drop,dblclick:t.toggleUpdating}},[n("rect",{attrs:{width:t.width,height:t.height,rx:"5",ry:"5"}}),t._v(" "),n("g",[t.kmst?n("text",{staticClass:"ktext",attrs:{x:"5",y:"20"},domProps:{textContent:t._s("Kruskal Tree: "+t.kmst.length)}}):t._e(),t._v(" "),t.pmst?n("text",{staticClass:"ptext",attrs:{x:"5",y:"40"},domProps:{textContent:t._s("Prime Tree: "+t.pmst.length)}}):t._e(),t._v(" "),t.flength?n("text",{staticClass:"ftext",attrs:{x:"5",y:"60"},domProps:{textContent:t._s("Steiner Tree: "+t.flength)}}):t._e()]),t._v(" "),t.points.length>0?n("g",{staticClass:"trees"},[t.tree.length>0?n("g",{staticClass:"line"},t._l(t.tree,function(t){return n("line",{staticClass:"tree",attrs:{x1:t[0].x,y1:t[0].y,x2:t[1].x,y2:t[1].y}})})):t._e(),t._v(" "),t.ptree.length>0&&t.spanning?n("g",{staticClass:"line"},t._l(t.ptree,function(t){return n("line",{staticClass:"ptree",attrs:{x1:t[0].x,y1:t[0].y,x2:t[1].x,y2:t[1].y}})})):t._e(),t._v(" "),t.ktree.length>0&&t.spanning?n("g",{staticClass:"line"},t._l(t.ktree,function(t){return n("line",{staticClass:"ktree",attrs:{x1:t[0].x,y1:t[0].y,x2:t[1].x,y2:t[1].y}})})):t._e(),t._v(" "),t.ftree.length>0&&t.steinering?n("g",{staticClass:"line"},t._l(t.ftree,function(t){return n("line",{staticClass:"ftree",attrs:{x1:t[0].x,y1:t[0].y,x2:t[1].x,y2:t[1].y}})})):t._e()]):t._e(),t._v(" "),t.fpoints.length>0&&t.steinering?n("g",{staticClass:"points"},t._l(t.fpoints,function(e,i){return e&&e.index>=t.points.length?n("g",{staticClass:"points",attrs:{index:i}},[n("circle",{staticClass:"point",attrs:{cx:e.x,cy:e.y,r:3}}),t._v(" "),n("text",{staticClass:"fermat",attrs:{x:e.x,y:e.y},domProps:{textContent:t._s(e.index)}})]):t._e()})):t._e(),t._v(" "),t.points.length>0?n("g",{staticClass:"points"},t._l(t.points,function(e,i){return e?n("g",{staticClass:"points",class:t.pointClass,attrs:{index:i},on:{click:function(e){e.stopPropagation(),t.move(i)}}},[n("circle",{staticClass:"ring",attrs:{cx:e.x,cy:e.y,r:t.radius}}),t._v(" "),n("circle",{staticClass:"point",attrs:{cx:e.x,cy:e.y,r:5}}),t._v(" "),n("text",{staticClass:"text",attrs:{x:e.x,y:e.y},domProps:{textContent:t._s(e.index)}})]):t._e()})):t._e(),t._v(" "),(t.updating||t.moving)&&t.current?n("g",{staticClass:"current",class:t.moving?"moving":""},[n("g",[n("circle",{staticClass:"ring",attrs:{cx:t.current.x,cy:t.current.y,r:t.radius}}),t._v(" "),n("circle",{staticClass:"point",attrs:{cx:t.current.x,cy:t.current.y,r:5}}),t._v(" "),n("text",{staticClass:"text",attrs:{x:t.current.x,y:t.current.y},domProps:{textContent:t._s(t.index)}})])]):t._e()])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"chatnoir"}},[n("h2",{domProps:{textContent:t._s(t.status)}}),t._v(" "),n("div",{staticClass:"board"},[n("svg",{attrs:{width:t.width,height:t.height}},[n("g",{attrs:{transform:t.transform}},t._l(t.pixels,function(e,i){return n("aha-hexagon",{key:i,attrs:{cell:e,showCoord:t.showCoord,radius:t.radius,interval:t.interval}})}))])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("g",{staticClass:"title",attrs:{transform:t.transformG},on:{mouseenter:t.enter,mouseout:t.out,contextmenu:function(t){t.stopPropagation(),t.preventDefault()},dblclick:function(e){e.stopPropagation(),e.preventDefault(),t.unselect(e)},click:function(e){return"button"in e||!t._k(e.keyCode,"left",37)?"button"in e&&0!==e.button?null:(e.preventDefault(),void t.select(e)):null}}},[n("ellipse",{class:t.status,attrs:{rx:t.radius,ry:.9*t.radius}}),t._v(" "),n("text",{directives:[{name:"show",rawName:"v-show",value:t.showCoord,expression:"showCoord"}],attrs:{y:"0.4em"}},[n("tspan",{staticClass:"q",domProps:{textContent:t._s(t.x)}}),t._v(" "),n("tspan",[t._v(",")]),t._v(" "),n("tspan",{staticClass:"r",domProps:{textContent:t._s(t.y)}})]),t._v(" "),n("text",{directives:[{name:"show",rawName:"v-show",value:t.caught,expression:"caught"}],attrs:{y:"0.4em"}},[n("tspan",[t._v("Cat")])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"navi"},[n("ul",[n("li",[n("router-link",{class:t.active[0],attrs:{to:"/"}},[t._v("Home")])],1),t._v(" "),n("li",[n("router-link",{class:t.active[1],attrs:{to:"/Brownian-Motion"}},[t._v("Brownian Motion")])],1),t._v(" "),n("li",[n("router-link",{class:t.active[2],attrs:{to:"/Chat-Noir"}},[t._v("Chat Noir")])],1),t._v(" "),n("li",[n("router-link",{class:t.active[3],attrs:{to:"/Mine-Sweeper"}},[t._v("Mine Sweeper")])],1),t._v(" "),n("li",[n("router-link",{class:t.active[4],attrs:{to:"/Minimum-Spanning-Tree"}},[t._v("Minmum Spanning Tree")])],1),t._v(" "),n("li",[n("router-link",{class:t.active[5],attrs:{to:"/Pinball"}},[t._v("Pinball")])],1)])])},staticRenderFns:[]}},,,,function(t,e,n){function i(t){var e=s[t];return e?Promise.all(e.slice(1).map(n.e)).then(function(){return n(e[0])}):Promise.reject(new Error("Cannot find module '"+t+"'."))}var s={"./brownian-motion.vue":[1],"./chat-noir.vue":[2],"./hexagon.vue":[3],"./home.vue":[4],"./mine-sweeper.vue":[5],"./minimum-spanning-tree.vue":[6],"./navi.vue":[7],"./pin-ball.vue":[8]};i.keys=function(){return Object.keys(s)},t.exports=i,i.id=47}],[16]);
//# sourceMappingURL=app.0c7bb46468be28da7a94.js.map