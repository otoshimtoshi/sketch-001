import device from "current-device";
import { $shader } from "../libs/shader";
import { $color } from "../utils/color";
import { $pointer } from "../utils/pointer";
import { $clock } from "../utils/clock";
import { $constants } from "../utils/constants";
import vertShader from "../glsl/vert-shader";
import flagShader from "../glsl/frag-shader";

export const $sketch = (canvas: HTMLCanvasElement) => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  window.addEventListener("resize", () => {
    params.SPLAT_RADIUS = 5 / window.innerHeight;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  });

  /** カラーの設定 */
  const color = $color("dark");

  /** ポインターの設定 */
  const pointer = $pointer(canvas);
  // always attach event
  canvas.addEventListener("click", (e) => {
    pointer.dx = 10;
    pointer.dy = 10;
    pointer.x = e.pageX;
    pointer.y = e.pageY;
  });
  // mobile or tablet only attach evnet
  if (device.mobile() || device.tablet()) {
    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      pointer.moved = true;
      pointer.dx = 8 * (e.targetTouches[0].pageX - pointer.x);
      pointer.dy = 8 * (e.targetTouches[0].pageY - pointer.y);
      pointer.x = e.targetTouches[0].pageX;
      pointer.y = e.targetTouches[0].pageY;
    });
  }
  // desktop only attach evnet
  if (device.desktop()) {
    canvas.addEventListener("mousemove", (e) => {
      pointer.moved = true;
      pointer.dx = 5 * (e.pageX - pointer.x);
      pointer.dy = 5 * (e.pageY - pointer.y);
      pointer.x = e.pageX;
      pointer.y = e.pageY;
    });
  }

  /** タイマーの設定 */
  const clock = $clock();
  clock.start();

  const params = {
    SPLAT_RADIUS: 3 / window.innerHeight,
  };

  const gl = canvas.getContext("webgl");

  if (!gl) return;
  gl.getExtension("OES_texture_float");
  const shader = $shader(gl);

  const vertexShader = shader.$loadShader(vertShader.vert, gl.VERTEX_SHADER);
  if (!vertexShader) return;

  /**
   * 移流
   */
  const advectionFragmentShader = shader.$loadShader(flagShader.advection, gl.FRAGMENT_SHADER);
  if (!advectionFragmentShader) return;
  const advectionProgram = shader.$initShaderProgram(vertexShader, advectionFragmentShader);
  if (!advectionProgram) return;
  const advectionUniforms = shader.$getUniforms(advectionProgram);

  /**
   * 発散
   */
  const divergenceFragmentShader = shader.$loadShader(flagShader.divergence, gl.FRAGMENT_SHADER);
  if (!divergenceFragmentShader) return;
  const divergenceProgram = shader.$initShaderProgram(vertexShader, divergenceFragmentShader);
  if (!divergenceProgram) return;
  const divergenceUniforms = shader.$getUniforms(divergenceProgram);

  /**
   * 圧力
   */
  const pressureFragmentShader = shader.$loadShader(flagShader.pressure, gl.FRAGMENT_SHADER);
  if (!pressureFragmentShader) return;
  const pressureProgram = shader.$initShaderProgram(vertexShader, pressureFragmentShader);
  if (!pressureProgram) return;
  const pressureUniforms = shader.$getUniforms(pressureProgram);

  /**
   * グラデーション減算
   */
  const gradientSubtractFragmentShader = shader.$loadShader(flagShader.gradientSubtract, gl.FRAGMENT_SHADER);
  if (!gradientSubtractFragmentShader) return;
  const gradientSubtractProgram = shader.$initShaderProgram(vertexShader, gradientSubtractFragmentShader);
  if (!gradientSubtractProgram) return;
  const gradientSubtractUniforms = shader.$getUniforms(gradientSubtractProgram);

  /**
   * 散乱
   */
  const dispersionFragmentShader = shader.$loadShader(flagShader.dispersion, gl.FRAGMENT_SHADER);
  if (!dispersionFragmentShader) return;
  const dispersionProgram = shader.$initShaderProgram(vertexShader, dispersionFragmentShader);
  if (!dispersionProgram) return;
  const dispersionUniforms = shader.$getUniforms(dispersionProgram);

  /**
   * 画面用
   */
  const displayFragmentShader = shader.$loadShader(flagShader.display, gl.FRAGMENT_SHADER);
  if (!displayFragmentShader) return;
  const displayProgram = shader.$initShaderProgram(vertexShader, displayFragmentShader);
  if (!displayProgram) return;
  const displayUniforms = shader.$getUniforms(displayProgram);

  let outputColor: any;
  let velocity: any;
  let divergence: any;
  let pressure: any;

  const blit = (target: any) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    if (target == null) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };
  const getResolution = (resolution: any) => {
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1) aspectRatio = 1 / aspectRatio;

    let min = Math.round(resolution);
    let max = Math.round(resolution * aspectRatio);

    if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
    else return { width: min, height: max };
  };
  const createFBO = (w: any, h: any) => {
    gl.activeTexture(gl.TEXTURE0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, w, h, 0, gl.RGB, gl.FLOAT, null);

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return {
      fbo,
      width: w,
      height: h,
      attach: (id: any) => {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      },
    };
  };

  const createDoubleFBO = (w: any, h: any) => {
    let fbo1 = createFBO(w, h);
    let fbo2 = createFBO(w, h);

    return {
      width: w,
      height: h,
      texelSizeX: 1 / w,
      texelSizeY: 1 / h,
      read: () => {
        return fbo1;
      },
      write: () => {
        return fbo2;
      },
      swap: () => {
        let temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      },
    };
  };

  const initFBOs = () => {
    const simRes = getResolution($constants.SIM_RESOLUTION);
    const dyeRes = getResolution($constants.DYE_RESOLUTION);

    outputColor = createDoubleFBO(dyeRes.width, dyeRes.height);
    velocity = createDoubleFBO(simRes.width, simRes.height);
    divergence = createFBO(simRes.width, simRes.height);
    pressure = createDoubleFBO(simRes.width, simRes.height);
  };
  initFBOs();

  const render = () => {
    if (pointer.moved) {
      pointer.moved = false;

      gl.useProgram(dispersionProgram);
      gl.uniform1i(dispersionUniforms.u_input_txr, velocity.read().attach(0));
      gl.uniform1f(dispersionUniforms.u_ratio, canvas.width / canvas.height);
      gl.uniform2f(dispersionUniforms.u_point, pointer.x / canvas.width, 1 - pointer.y / canvas.height);
      gl.uniform3f(dispersionUniforms.u_point_value, pointer.dx, -pointer.dy, 1);
      gl.uniform1f(dispersionUniforms.u_point_size, params.SPLAT_RADIUS);

      blit(velocity.write());
      velocity.swap();

      gl.uniform1i(dispersionUniforms.u_input_txr, outputColor.read().attach(0));
      gl.uniform3f(dispersionUniforms.u_point_value, 1 - color.r, 1 - color.g, 1 - color.b);
      blit(outputColor.write());
      outputColor.swap();
    }

    gl.useProgram(divergenceProgram);
    gl.uniform2f(divergenceUniforms.u_vertex_texel, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(divergenceUniforms.u_velocity_txr, velocity.read().attach(0));
    blit(divergence);

    gl.useProgram(pressureProgram);
    gl.uniform2f(pressureUniforms.u_vertex_texel, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(pressureUniforms.u_divergence_txr, divergence.attach(0));
    for (let i = 0; i < $constants.PRESSURE_ITERATIONS; i++) {
      gl.uniform1i(pressureUniforms.u_pressure_txr, pressure.read().attach(1));
      blit(pressure.write());
      pressure.swap();
    }

    gl.useProgram(gradientSubtractProgram);
    gl.uniform2f(gradientSubtractUniforms.u_vertex_texel, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gradientSubtractUniforms.u_pressure_txr, pressure.read().attach(0));
    gl.uniform1i(gradientSubtractUniforms.u_velocity_txr, velocity.read().attach(1));
    blit(velocity.write());
    velocity.swap();

    gl.useProgram(advectionProgram);
    gl.uniform2f(advectionUniforms.u_vertex_texel, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform2f(advectionUniforms.u_output_textel, velocity.texelSizeX, velocity.texelSizeY);

    gl.uniform1i(advectionUniforms.u_velocity_txr, velocity.read().attach(0));
    gl.uniform1i(advectionUniforms.u_input_txr, velocity.read().attach(0));
    gl.uniform1f(advectionUniforms.u_dt, clock.getDelta());
    gl.uniform1f(advectionUniforms.u_dissipation, $constants.VELOCITY_DISSIPATION);
    blit(velocity.write());
    velocity.swap();

    gl.uniform2f(advectionUniforms.u_output_textel, outputColor.texelSizeX, outputColor.texelSizeY);
    gl.uniform1i(advectionUniforms.u_velocity_txr, velocity.read().attach(0));
    gl.uniform1i(advectionUniforms.u_input_txr, outputColor.read().attach(1));
    gl.uniform1f(advectionUniforms.u_dissipation, $constants.DENSITY_DISSIPATION);
    blit(outputColor.write());
    outputColor.swap();

    gl.useProgram(displayProgram);
    gl.uniform1i(displayUniforms.u_output_texture, outputColor.read().attach(0));
    blit(null);

    requestAnimationFrame(render);
  };
  render();
};
