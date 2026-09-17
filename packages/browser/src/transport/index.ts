/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
// packages/monitor-sdk-browser/src/transport.ts
import { getBrowserInfo } from '@miaoma-monitor-demo/browser-utils'
import { Transport } from '@miaoma-monitor-demo/core'

export class BrowserTransport implements Transport {
    constructor(private dsn: string) {}

    // 按数量或者按时间间隔来上报
    send(data: Record<string, unknown>) {
        const browserInfo = getBrowserInfo()
        const payload = {
            ...data,
            browserInfo,
        }
        fetch(this.dsn, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).catch(err => console.error('Failed to send data', err))
    }
}
/**
 * 基于数量与时间间隔的上报队列实现
 */
// export class BrowserTransport implements Transport {
//     constructor(private dsn: string) {}

//     private batchSize = 10
//     private batchInterval = 2000
//     private batch: Record<string, unknown>[] = []

//     // 按数量或者按时间间隔来上报
//     send(data: Record<string, unknown>) {
//         const browserInfo = getBrowserInfo()
//         const payload = {
//             ...data,
//             browserInfo,
//         }
//         this.batch.push(payload)
//         if (this.batch.length >= this.batchSize) {
//             this.flush()
//         }
//     }

//     private flush() {
//         const batchItems = this.batch.slice(0, this.batchSize)
//         this.batch = this.batch.slice(this.batchSize)

//         fetch(this.dsn, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(batchItems),
//         }).catch(err => console.error('Failed to send data', err))
//     }
// }
