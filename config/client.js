/**
 * 浏览器端配置
 */
module.exports = {
	client: {
        production: {
            api: {
                host: 'api.taoquanw.com',
                port: 80,
                path: '/v1'
            },
            mock: {
                host: 'mock.taoquanw.com',
                port: 80
            },
            site: {
                host: 'www1.taoquanw.com',
                port: 80
            },
            admin: {
                host: 'admin1.taoquanw.com',
                port: 80
            },
            patent: {
                host: 'zl.taoquanw.com',
                port: 80
            },
            mobile: {
                host: 'm.taoquanw.com',
                port: 80
            },
            socket: {
                host: 'taoquanw.com',
                port: 3000
            },
            img: {
                host: 'img.taoquanw.com',
                port: 80
            }
        },
        testing: {
            api: {
                host: 'api.tqtest.com',
                port: 80,
                path: '/v1'
            },
            mock: {
                host: 'mock.tqtest.com',
                port: 80
            },
            site: {
                host: 'www1.tqtest.com',
                port: 80
            },
            admin: {
                host: 'admin1.tqtest.com',
                port: 80
            },
            patent: {
                host: 'zl.tqtest.com',
                port: 80
            },
            mobile: {
                host: 'm.tqtest.com',
                port: 80
            },
            socket: {
                host: 'tqtest.com',
                port: 3000
            },
            img: {
                host: 'img.tqtest.com',
                port: 80
            }
        },
        development: {
            api: {
                host: 'api.tqtest.com',
                port: 80,
                path: '/v1'
            },
            mock: {
                host: 'mock.tq.com',
                port: 80
            },
            site: {
                host: 'www1.tq.com',
                port: 80
            },
            admin: {
                host: 'admin1.tq.com',
                port: 80
            },
            patent: {
                host: 'zl.tq.com',
                port: 80
            },
            mobile: {
                host: 'm.tq.com',
                port: 80
            },
            socket: {
                host: 'tqest.com',
                port: 3000
            },
            img: {
                host: 'img.tqtest.com',
                port: 80
            }
        }
	}
};