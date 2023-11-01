# 基础 image
FROM node:18-alpine

RUN yarn config set registry https://registry.npmmirror.com/

WORKDIR /app

# 复制项目文件
COPY . .

# 打包
RUN yarn
# RUN yarn install --production
# RUN yarn build

# 运行命令
EXPOSE 5173
CMD yarn dev --host 0.0.0.0