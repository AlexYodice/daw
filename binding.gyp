{
  "targets": [{
    "target_name": "audioengine",
    "cflags!": [ "-fno-exceptions" ],
    "cflags_cc!": [ "-fno-exceptions" ],
    "sources": [ "src/native/audio.cpp" ],
    "include_dirs": [
      "<!@(node -p \"require('node-addon-api').include\")"
    ],
    'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
  }]
} 