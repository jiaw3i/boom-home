#!/bin/bash

# 接受新版本号作为参数
new_version=$1

# 关闭旧的容器
echo "关闭旧的容器..."
docker stop home
docker rm home

# 启动新的容器
echo "启动新的容器: boom-home:$new_version..."
# docker run -d --name my_container_$new_version my_image:$new_version
docker run -itd -p 3080:80 --name=home boom-home:$new_version
echo "容器更新完成！"
