#!/bin/bash
npx prisma migrate dev --name init
npx prisma generate
npm run build
npm start
exec "$@"