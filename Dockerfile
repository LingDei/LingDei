# 基础 image
FROM node:18-alpine

RUN yarn config set registry https://registry.npmmirror.com/

WORKDIR /app

# 复制项目文件
COPY . .

# 打包
RUN yarn && \
    yarn build
# RUN yarn install --production

# 运行命令
EXPOSE 4173
CMD yarn preview --host 0.0.0.0