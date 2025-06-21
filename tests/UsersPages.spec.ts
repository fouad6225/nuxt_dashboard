import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import UsersPage from '~/pages/users.vue'

// Mock Nuxt composables
vi.mock('#app', () => ({
    definePageMeta: () => { },
    useAsyncData: () => ({
        data: ref([
            { name: 'Alice', email: 'alice@example.com', age: 25, role: 'admin', country: 'USA' },
            { name: 'Bob', email: 'bob@example.com', age: 30, role: 'viewer', country: 'Canada' },
            { name: 'Carol', email: 'carol@example.com', age: 22, role: 'admin', country: 'USA' },
            // Add more mock users if needed
        ]),
    }),
}))

vi.mock('vue', async () => {
    const actual = await vi.importActual('vue')
    return {
        ...actual,
        ref: actual.ref,
        computed: actual.computed,
    }
})

describe('UsersPage', () => {
    let wrapper: ReturnType<typeof mount>

    beforeEach(async () => {
        wrapper = mount(UsersPage)
        await flushPromises()
    })

    it('renders table with users', () => {
        const rows = wrapper.findAll('tbody tr')
        expect(rows.length).toBe(3) // 3 mock users
        expect(wrapper.text()).toContain('Alice')
        expect(wrapper.text()).toContain('Bob')
    })

    it('filters users by search query', async () => {
        const input = wrapper.find('input[placeholder="Search name or email"]')
        await input.setValue('alice')
        expect(wrapper.findAll('tbody tr').length).toBe(1)
        expect(wrapper.text()).toContain('Alice')
        expect(wrapper.text()).not.toContain('Bob')
    })

    it('filters users by selected country', async () => {
        const select = wrapper.find('select')
        await select.setValue('Canada')
        expect(wrapper.findAll('tbody tr').length).toBe(1)
        expect(wrapper.text()).toContain('Bob')
        expect(wrapper.text()).not.toContain('Alice')
    })

    it('shows "No users match your search." if no users', async () => {
        const input = wrapper.find('input[placeholder="Search name or email"]')
        await input.setValue('nonexistent')
        expect(wrapper.text()).toContain('No users match your search.')
    })

    it('pagination buttons disable appropriately', async () => {
        // Initially on page 1 and totalPages is 1 because 3 users < pageSize=10
        const prevBtn = wrapper.find('button:contains("Previous")')
        const nextBtn = wrapper.find('button:contains("Next")')
        expect(prevBtn.attributes('disabled')).toBeDefined()
        expect(nextBtn.attributes('disabled')).toBeDefined()
    })
})
