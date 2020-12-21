#!/bin/bash

export NODE_ENV=development
echo 'SET URL_MONGO'
export URL_MONGO='mongodb+srv://users:nH}DaipF0Cgw1SB)v@cluster0.7ok9z.mongodb.net/service-users?retryWrites=true&w=majority'

echo 'SET PORT'
export URL_PORT_API='3000'

echo 'SET ENVS FACEBOOK APP'
export FACEBOOK_APP_ID='150670660180166'
export FACEBOOK_APP_SECRET='ae1f223e9478da1dd1cfa186509c1a52'
export FACEBOOK_URL_CALLBACK='http://localhost:'$URL_PORT_API'/facebook/callback'