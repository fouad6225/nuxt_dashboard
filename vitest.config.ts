/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests/setup.ts', // optional, for global setup (like importing matchers)
        coverage: {
            provider: 'istanbul',
            reporter: ['text', 'json', 'html'],
        },
    },
})
