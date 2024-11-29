{
  "targets": [
    {
      "target_name": "macorps",
      "sources": [ "src/your_source_file.cpp" ],
      "include_dirs": [
        "<!(node -e \"require('node-addon-api').include\")"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags!": [ "-fno-rtti" ]
    }
  ]
}