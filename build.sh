#!/bin/bash

# 接受新版本号作为参数
new_version=$1
echo "start build image..."
docker build -t home:$new_version .

echo "build successed.  home:$new_version"
