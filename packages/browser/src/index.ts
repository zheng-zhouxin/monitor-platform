import { Metrics } from '@miaoma-monitor-demo/browser-utils'
import { Errors } from './integrations/errorsIntegration'
import { BrowserTransport } from './transport'
import { Monitoring, type Integration } from '@miaoma-monitor-demo/core'

export function init(options: { dsn: string; integrations?: Integration[] }) {
    const monitoring = new Monitoring(options)

    const transport = new BrowserTransport(options.dsn)

    monitoring.init(transport)

    new Errors(transport).init()
    new Metrics(transport).init()

    return monitoring
}

/**
 * 使用示例
 * import { init } from '@miaoma-monitor-demo/browser'
 * init({
 *     dsn: 'xxxx',
 *     integrations: [new Errors(), new Metrics()]
 * })
 */
