(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))v(u);new MutationObserver(u=>{for(const e of u)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&v(i)}).observe(document,{childList:!0,subtree:!0});function a(u){const e={};return u.integrity&&(e.integrity=u.integrity),u.referrerPolicy&&(e.referrerPolicy=u.referrerPolicy),u.crossOrigin==="use-credentials"?e.credentials="include":u.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function v(u){if(u.ep)return;u.ep=!0;const e=a(u);fetch(u.href,e)}})();var ie=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},oe=window.device,r={},M=[];window.device=r;var S=window.document.documentElement,ne=window.navigator.userAgent.toLowerCase(),K=["googletv","viera","smarttv","internet.tv","netcast","nettv","appletv","boxee","kylo","roku","dlnadoc","pov_tv","hbbtv","ce-html"];r.macos=function(){return c("mac")};r.ios=function(){return r.iphone()||r.ipod()||r.ipad()};r.iphone=function(){return!r.windows()&&c("iphone")};r.ipod=function(){return c("ipod")};r.ipad=function(){var t=navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;return c("ipad")||t};r.android=function(){return!r.windows()&&c("android")};r.androidPhone=function(){return r.android()&&c("mobile")};r.androidTablet=function(){return r.android()&&!c("mobile")};r.blackberry=function(){return c("blackberry")||c("bb10")};r.blackberryPhone=function(){return r.blackberry()&&!c("tablet")};r.blackberryTablet=function(){return r.blackberry()&&c("tablet")};r.windows=function(){return c("windows")};r.windowsPhone=function(){return r.windows()&&c("phone")};r.windowsTablet=function(){return r.windows()&&c("touch")&&!r.windowsPhone()};r.fxos=function(){return(c("(mobile")||c("(tablet"))&&c(" rv:")};r.fxosPhone=function(){return r.fxos()&&c("mobile")};r.fxosTablet=function(){return r.fxos()&&c("tablet")};r.meego=function(){return c("meego")};r.cordova=function(){return window.cordova&&location.protocol==="file:"};r.nodeWebkit=function(){return ie(window.process)==="object"};r.mobile=function(){return r.androidPhone()||r.iphone()||r.ipod()||r.windowsPhone()||r.blackberryPhone()||r.fxosPhone()||r.meego()};r.tablet=function(){return r.ipad()||r.androidTablet()||r.blackberryTablet()||r.windowsTablet()||r.fxosTablet()};r.desktop=function(){return!r.tablet()&&!r.mobile()};r.television=function(){for(var t=0;t<K.length;){if(c(K[t]))return!0;t++}return!1};r.portrait=function(){return screen.orientation&&Object.prototype.hasOwnProperty.call(window,"onorientationchange")?k(screen.orientation.type,"portrait"):r.ios()&&Object.prototype.hasOwnProperty.call(window,"orientation")?Math.abs(window.orientation)!==90:window.innerHeight/window.innerWidth>1};r.landscape=function(){return screen.orientation&&Object.prototype.hasOwnProperty.call(window,"onorientationchange")?k(screen.orientation.type,"landscape"):r.ios()&&Object.prototype.hasOwnProperty.call(window,"orientation")?Math.abs(window.orientation)===90:window.innerHeight/window.innerWidth<1};r.noConflict=function(){return window.device=oe,this};function k(t,n){return t.indexOf(n)!==-1}function c(t){return k(ne,t)}function ee(t){return S.className.match(new RegExp(t,"i"))}function l(t){var n=null;ee(t)||(n=S.className.replace(/^\s+|\s+$/g,""),S.className=n+" "+t)}function J(t){ee(t)&&(S.className=S.className.replace(" "+t,""))}r.ios()?r.ipad()?l("ios ipad tablet"):r.iphone()?l("ios iphone mobile"):r.ipod()&&l("ios ipod mobile"):r.macos()?l("macos desktop"):r.android()?r.androidTablet()?l("android tablet"):l("android mobile"):r.blackberry()?r.blackberryTablet()?l("blackberry tablet"):l("blackberry mobile"):r.windows()?r.windowsTablet()?l("windows tablet"):r.windowsPhone()?l("windows mobile"):l("windows desktop"):r.fxos()?r.fxosTablet()?l("fxos tablet"):l("fxos mobile"):r.meego()?l("meego mobile"):r.nodeWebkit()?l("node-webkit"):r.television()?l("television"):r.desktop()&&l("desktop");r.cordova()&&l("cordova");function R(){r.landscape()?(J("portrait"),l("landscape"),Q("landscape")):(J("landscape"),l("portrait"),Q("portrait")),te()}function Q(t){for(var n=0;n<M.length;n++)M[n](t)}r.onChangeOrientation=function(t){typeof t=="function"&&M.push(t)};var D="resize";Object.prototype.hasOwnProperty.call(window,"onorientationchange")&&(D="orientationchange");window.addEventListener?window.addEventListener(D,R,!1):window.attachEvent?window.attachEvent(D,R):window[D]=R;R();function X(t){for(var n=0;n<t.length;n++)if(r[t[n]]())return t[n];return"unknown"}r.type=X(["mobile","tablet","desktop"]);r.os=X(["ios","iphone","ipad","ipod","android","blackberry","macos","windows","fxos","meego","television"]);function te(){r.orientation=X(["portrait","landscape"])}te();const ae=t=>({$loadShader:(u,e=t.VERTEX_SHADER)=>{const i=t.createShader(e);return i?(t.shaderSource(i,u),t.compileShader(i),t.getShaderParameter(i,t.COMPILE_STATUS)?i:(console.error("An error occurred compiling the shader:",t.getShaderInfoLog(i)),t.deleteShader(i),null)):(console.error("Shader created failed:: shader is null!!"),null)},$initShaderProgram:(u,e)=>{const i=t.createProgram();return i?(t.attachShader(i,u),t.attachShader(i,e),t.linkProgram(i),t.getProgramParameter(i,t.LINK_STATUS)?i:(console.error("Unable to initialize the shader program:",t.getProgramInfoLog(i)),null)):(console.error("Program created failed:: program is null!!"),null)},$getUniforms:u=>{let e={},i=t.getProgramParameter(u,t.ACTIVE_UNIFORMS);for(let f=0;f<i;f++){const w=t.getActiveUniform(u,f);if(!w)return;e[w.name]=t.getUniformLocation(u,w.name)}return e}}),ue=(t="light")=>{const n={r:0,g:0,b:0,a:1},a=(u,e,i,f=1)=>{n.r=u,n.g=e,n.b=i,n.a=f};return(()=>{t==="light"?a(0,0,0):a(.901,.905,.909)})(),{...n,setRGB:a}},se=t=>{const n={x:.5*t.width,y:.5*t.height,dx:0,dy:0,moved:!1};return{...n,setPosition:(v,u)=>{n.x=v,n.y=u}}},ce=()=>{const t={autoStart:!0,startTime:0,oldTime:0,elapsedTime:0,running:!1},n=()=>(a(),t.elapsedTime),a=()=>{let e=0;if(t.autoStart&&!t.running)return v(),0;if(t.running){const i=Date.now();e=(i-t.oldTime)/1e3,t.oldTime=i,t.elapsedTime+=e}return e},v=()=>{t.startTime=Date.now(),t.oldTime=t.startTime,t.elapsedTime=0,t.running=!0};return{...t,getElapsedTime:n,getDelta:a,start:v,stop:()=>{n(),t.running=!1,t.autoStart=!1}}},y={SIM_RESOLUTION:128,DYE_RESOLUTION:1024,DENSITY_DISSIPATION:.995,VELOCITY_DISSIPATION:.9,PRESSURE_ITERATIONS:10},le={uniforms:{},vert:`
    precision highp float;
    attribute vec2 aPosition;
    
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 u_vertex_texel;
    
    void main () {
        vUv = aPosition * .5 + .5;
        vL = vUv - vec2(u_vertex_texel.x, 0.);
        vR = vUv + vec2(u_vertex_texel.x, 0.);
        vT = vUv + vec2(0., u_vertex_texel.y);
        vB = vUv - vec2(0., u_vertex_texel.y);
        gl_Position = vec4(aPosition, 0., 1.);
    }
  `,flag:""},b={advection:`
    precision highp float;
    precision highp sampler2D;
    
    varying vec2 vUv;
    uniform sampler2D u_velocity_txr;
    uniform sampler2D u_input_txr;
    uniform vec2 u_vertex_texel;
    uniform vec2 u_output_textel;
    uniform float u_dt;
    uniform float u_dissipation;
    
    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;
    
        vec2 iuv = floor(st);
        vec2 fuv = fract(st);
    
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
    
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }
    
    void main () {
        vec2 coord = vUv - u_dt * bilerp(u_velocity_txr, vUv, u_vertex_texel).xy * u_vertex_texel;
        gl_FragColor = u_dissipation * bilerp(u_input_txr, coord, u_output_textel);
        gl_FragColor.a = 1.;
    }
  `,divergence:`
    precision highp float;
    precision highp sampler2D;
    
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D u_velocity_txr;
    
    void main () {
        float L = texture2D(u_velocity_txr, vL).x;
        float R = texture2D(u_velocity_txr, vR).x;
        float T = texture2D(u_velocity_txr, vT).y;
        float B = texture2D(u_velocity_txr, vB).y;
  
        float div = .5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0., 0., 1.);
    }
  `,pressure:`
    precision highp float;
    precision highp sampler2D;
  
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D u_pressure_txr;
    uniform sampler2D u_divergence_txr;
  
    void main () {
        float L = texture2D(u_pressure_txr, vL).x;
        float R = texture2D(u_pressure_txr, vR).x;
        float T = texture2D(u_pressure_txr, vT).x;
        float B = texture2D(u_pressure_txr, vB).x;
        float C = texture2D(u_pressure_txr, vUv).x;
        float divergence = texture2D(u_divergence_txr, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0., 0., 1.);
    }
  `,gradientSubtract:`
    precision highp float;
    precision highp sampler2D;
  
    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D u_pressure_txr;
    uniform sampler2D u_velocity_txr;
  
    void main () {
        float L = texture2D(u_pressure_txr, vL).x;
        float R = texture2D(u_pressure_txr, vR).x;
        float T = texture2D(u_pressure_txr, vT).x;
        float B = texture2D(u_pressure_txr, vB).x;
        vec2 velocity = texture2D(u_velocity_txr, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0., 1.);
    }
  `,dispersion:`
    precision highp float;
    precision highp sampler2D;
  
    varying vec2 vUv;
    uniform sampler2D u_input_txr;
    uniform float u_ratio;
    uniform vec3 u_point_value;
    uniform vec2 u_point;
    uniform float u_point_size;
  
    void main () {
        vec2 p = vUv - u_point.xy;
        p.x *= u_ratio;
        vec3 splat = pow(2., -dot(p, p) / u_point_size) * u_point_value;
        vec3 base = texture2D(u_input_txr, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.);
    }
  `,display:`
    precision highp float;
    precision highp sampler2D;
  
    varying vec2 vUv;
    uniform sampler2D u_output_texture;
  
    void main () {
        vec3 C = texture2D(u_output_texture, vUv).rgb;
        float a = max(C.r, max(C.g, C.b));
        a = pow(.1 * a, .1);
        a = clamp(a, 0., 1.);
        gl_FragColor = vec4(1. - C, 1. - a);
    }
  `},de=t=>{t.width=t.clientWidth,t.height=t.clientHeight,window.addEventListener("resize",()=>{u.SPLAT_RADIUS=5/window.innerHeight,t.width=t.clientWidth,t.height=t.clientHeight});const n=ue("dark"),a=se(t);t.addEventListener("click",o=>{a.dx=10,a.dy=10,a.x=o.pageX,a.y=o.pageY}),(r.mobile()||r.tablet())&&t.addEventListener("touchmove",o=>{o.preventDefault(),a.moved=!0,a.dx=8*(o.targetTouches[0].pageX-a.x),a.dy=8*(o.targetTouches[0].pageY-a.y),a.x=o.targetTouches[0].pageX,a.y=o.targetTouches[0].pageY}),r.desktop()&&t.addEventListener("mousemove",o=>{a.moved=!0,a.dx=5*(o.pageX-a.x),a.dy=5*(o.pageY-a.y),a.x=o.pageX,a.y=o.pageY});const v=ce();v.start();const u={SPLAT_RADIUS:3/window.innerHeight},e=t.getContext("webgl");if(!e)return;e.getExtension("OES_texture_float");const i=ae(e),f=i.$loadShader(le.vert,e.VERTEX_SHADER);if(!f)return;const w=i.$loadShader(b.advection,e.FRAGMENT_SHADER);if(!w)return;const P=i.$initShaderProgram(f,w);if(!P)return;const p=i.$getUniforms(P),z=i.$loadShader(b.divergence,e.FRAGMENT_SHADER);if(!z)return;const U=i.$initShaderProgram(f,z);if(!U)return;const Y=i.$getUniforms(U),H=i.$loadShader(b.pressure,e.FRAGMENT_SHADER);if(!H)return;const A=i.$initShaderProgram(f,H);if(!A)return;const F=i.$getUniforms(A),G=i.$loadShader(b.gradientSubtract,e.FRAGMENT_SHADER);if(!G)return;const O=i.$initShaderProgram(f,G);if(!O)return;const L=i.$getUniforms(O),W=i.$loadShader(b.dispersion,e.FRAGMENT_SHADER);if(!W)return;const I=i.$initShaderProgram(f,W);if(!I)return;const x=i.$getUniforms(I),V=i.$loadShader(b.display,e.FRAGMENT_SHADER);if(!V)return;const B=i.$initShaderProgram(f,V);if(!B)return;const re=i.$getUniforms(B);let m,s,C,T;const _=o=>{e.bindBuffer(e.ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,e.createBuffer()),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),e.STATIC_DRAW),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(0),o==null?(e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.bindFramebuffer(e.FRAMEBUFFER,null)):(e.viewport(0,0,o.width,o.height),e.bindFramebuffer(e.FRAMEBUFFER,o.fbo)),e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0)},j=o=>{let d=e.drawingBufferWidth/e.drawingBufferHeight;d<1&&(d=1/d);let h=Math.round(o),g=Math.round(o*d);return e.drawingBufferWidth>e.drawingBufferHeight?{width:g,height:h}:{width:h,height:g}},N=(o,d)=>{e.activeTexture(e.TEXTURE0);const h=e.createTexture();e.bindTexture(e.TEXTURE_2D,h),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGB,o,d,0,e.RGB,e.FLOAT,null);const g=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,g),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,h,0),e.viewport(0,0,o,d),e.clear(e.COLOR_BUFFER_BIT),{fbo:g,width:o,height:d,attach:E=>(e.activeTexture(e.TEXTURE0+E),e.bindTexture(e.TEXTURE_2D,h),E)}},$=(o,d)=>{let h=N(o,d),g=N(o,d);return{width:o,height:d,texelSizeX:1/o,texelSizeY:1/d,read:()=>h,write:()=>g,swap:()=>{let E=h;h=g,g=E}}};(()=>{const o=j(y.SIM_RESOLUTION),d=j(y.DYE_RESOLUTION);m=$(d.width,d.height),s=$(o.width,o.height),C=N(o.width,o.height),T=$(o.width,o.height)})();const q=()=>{a.moved&&(a.moved=!1,e.useProgram(I),e.uniform1i(x.u_input_txr,s.read().attach(0)),e.uniform1f(x.u_ratio,t.width/t.height),e.uniform2f(x.u_point,a.x/t.width,1-a.y/t.height),e.uniform3f(x.u_point_value,a.dx,-a.dy,1),e.uniform1f(x.u_point_size,u.SPLAT_RADIUS),_(s.write()),s.swap(),e.uniform1i(x.u_input_txr,m.read().attach(0)),e.uniform3f(x.u_point_value,1-n.r,1-n.g,1-n.b),_(m.write()),m.swap()),e.useProgram(U),e.uniform2f(Y.u_vertex_texel,s.texelSizeX,s.texelSizeY),e.uniform1i(Y.u_velocity_txr,s.read().attach(0)),_(C),e.useProgram(A),e.uniform2f(F.u_vertex_texel,s.texelSizeX,s.texelSizeY),e.uniform1i(F.u_divergence_txr,C.attach(0));for(let o=0;o<y.PRESSURE_ITERATIONS;o++)e.uniform1i(F.u_pressure_txr,T.read().attach(1)),_(T.write()),T.swap();e.useProgram(O),e.uniform2f(L.u_vertex_texel,s.texelSizeX,s.texelSizeY),e.uniform1i(L.u_pressure_txr,T.read().attach(0)),e.uniform1i(L.u_velocity_txr,s.read().attach(1)),_(s.write()),s.swap(),e.useProgram(P),e.uniform2f(p.u_vertex_texel,s.texelSizeX,s.texelSizeY),e.uniform2f(p.u_output_textel,s.texelSizeX,s.texelSizeY),e.uniform1i(p.u_velocity_txr,s.read().attach(0)),e.uniform1i(p.u_input_txr,s.read().attach(0)),e.uniform1f(p.u_dt,v.getDelta()),e.uniform1f(p.u_dissipation,y.VELOCITY_DISSIPATION),_(s.write()),s.swap(),e.uniform2f(p.u_output_textel,m.texelSizeX,m.texelSizeY),e.uniform1i(p.u_velocity_txr,s.read().attach(0)),e.uniform1i(p.u_input_txr,m.read().attach(1)),e.uniform1f(p.u_dissipation,y.DENSITY_DISSIPATION),_(m.write()),m.swap(),e.useProgram(B),e.uniform1i(re.u_output_texture,m.read().attach(0)),_(null),requestAnimationFrame(q)};q()},Z=document.querySelector("canvas");Z&&de(Z);
