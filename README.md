#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;   // vaqt (animatsiya uchun)
uniform vec2 u_resolution; // ekran o‘lchami

void main() {
    // piksel koordinatalarini normallashtirish
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    // markazdan masofa
    float r = length(uv);

    // rangli sinusoidal effekt
    float col = 0.5 + 0.5 * sin(10.0 * r - u_time);

    gl_FragColor = vec4(
        0.5 + 0.5 * sin(u_time + r * 5.0), // qizil
        0.5 + 0.5 * sin(u_time + r * 5.0 + 2.0), // yashil
        0.5 + 0.5 * sin(u_time + r * 5.0 + 4.0), // ko‘k
        1.0
    );
}
