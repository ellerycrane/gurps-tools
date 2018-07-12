#!/usr/bin/env bash
set -eou pipefail

#
# This script is run by `npm run development` and does the following things:
# 1. It checks that the required executables are installed
# 2. Sets up some intelligent defaults
# 3. Generates an nginx.conf
# 4. Starts nginx
# 5. Starts webpack-dev-server with hot reloading turned on
#

if [ -z "$(which nginx)" ]; then
  echo "nginx not installed or configured!"
fi

if [ -z "$(which npm)" ]; then
  echo "node or npm is not installed or configured!"
fi

echo "Starting app..."

API_URL="${API_URL:-}"
PORT="${PORT:-}"

## SET DEFAULT API URL
if [ -z "${API_URL}" ]; then
  API_URL="https://ma-customer.pxinfra.net/api/"
fi

## SET DEFAULT PORT:
if [ -z "${PORT}" ]; then
  PORT="8000"
fi

WP_PORT="1${PORT}"

## ADD TRAILING SLASH IF NONE EXISTS:
LEN=${#API_URL}-1
if [ "${API_URL:LEN}" != "/" ]; then
  API_URL="${API_URL}/"
fi

echo ""
echo "Setting API_URL to ${API_URL}"
echo "Setting PORT to ${PORT}"
echo "Setting WP_PORT to ${WP_PORT}"

WORKING_DIR="$(pwd | sed 's_/_\\/_g')"
API_URL="$(echo $API_URL | sed 's_/_\\/_g')"

cat config/nginx.conf.dev.in \
  | sed s/@API_URL@/$API_URL/ \
  | sed s/@WORKING_DIR@/$WORKING_DIR/ \
  | sed s/@PORT@/$PORT/ \
  | sed s/@WP_PORT@/$WP_PORT/ \
  > nginx.conf

echo "Starting nginx on port $PORT"
nginx -c $(PWD)/nginx.conf & \
  webpack-dev-server --content-base src --hot --inline --progress --colors --watch --port $WP_PORT && \
  fg