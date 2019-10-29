precision lowp float;
precision lowp int;

uniform sampler2D texture;
uniform vec4 color;
uniform mat3 uvTransform;

void main(){
  vec2 uv = (uvTransform * vec3(gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1.0)).xy;
  vec4 textureColor = texture2D(texture, uv);
  if (textureColor.a < 0.5){
    discard;
  }else{
    gl_FragColor = color * textureColor;
  }
}
