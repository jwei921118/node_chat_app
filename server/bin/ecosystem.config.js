'use strict'

module.exports = {
    apps: [
        {
            name: 'mainServer',
            script: './server/nodeServer.js',
            instances: 2,
            exec_mode: 'cluster'
        },
        {
            name: 'scoketServer',
            script: './server/ws/index.js',
            watch: true,
            env: {
                'NODE_ENV': 'development'
            },
            env_production: {
                'NODE_ENV': 'production'
            }
        }
    ]
}

// 启动node程序的配置 format JavaScript