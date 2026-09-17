/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */

import { Transport } from '@miaoma-monitor-demo/core'

export interface OnUnhandledRejectionErrorPayload {
    type: string
    stack: string
    message: string
    path: string
}

/**
 * 错误处理
 */
export class Errors {
    constructor(private transport: Transport) {}

    init() {
        window.onerror = (message, source, lineno, colno, error) => {
            console.log('🚀 ~ Errors ~ init ~ message, source:', message, source)
            console.log('🚀 ~ Errors ~ init ~ lineno, colno:', {
                event_type: 'error',
                type: error?.name,
                stack: error?.stack,
                message,
                path: window.location.pathname,
            })
            this.transport.send({
                event_type: 'error',
                type: error?.name,
                stack: error?.stack,
                message,
                path: window.location.pathname,
            })
            console.log('🚀 ~ Errors ~ init ~ this.transport:', this.transport)
        }

        window.onunhandledrejection = event => {
            console.log('🚀 ~ Errors ~ init ~ event:', event)
            console.log('🚀 ~ Errors ~ init ~ event.reason:', event.reason)
            console.log('🚀 ~ Errors ~ init ~ event:', {
                event_type: 'error',
                type: 'unhandledrejection',
                stack: event.reason.stack,
                message: event.reason.message,
                path: window.location.pathname,
            })
            this.transport.send({
                event_type: 'error',
                type: 'unhandledrejection',
                stack: event.reason.stack,
                message: event.reason.message,
                path: window.location.pathname,
            })
            console.log('🚀 ~ Errors ~ init ~ this.transport:', this.transport)
        }
    }
}
