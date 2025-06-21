<template>
    <navbar />
    <div class="welcome-container">
        <h1 class="welcome-title">Welcome to Your Dashboard</h1>
        <p class="welcome-text">
            Manage your users, visualize data, and control your application with ease.
        </p>
        <NuxtLink to="/login" class="get-started-btn">
            Get Started
        </NuxtLink>
    </div>
</template>

<style scoped>
.welcome-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    /* px-4 ~ 16px padding sides */
    background: linear-gradient(90deg, #34d399 0%, #3b82f6 100%);
    /* green-400 to blue-500 */
    color: white;
    text-align: center;
}

.welcome-title {
    font-weight: 800;
    /* extrabold */
    font-size: 3rem;
    /* text-5xl approx */
    margin-bottom: 1.5rem;
    /* mb-6 */
}

.welcome-text {
    font-size: 1.125rem;
    /* text-lg */
    max-width: 42rem;
    /* max-w-xl ~ 672px */
    margin-bottom: 2rem;
    /* mb-8 */
    margin-left: auto;
    margin-right: auto;
}

.get-started-btn {
    display: inline-block;
    background-color: white;
    color: #22c55e;
    /* green-600 */
    font-weight: 600;
    padding: 0.75rem 2rem;
    /* py-3 px-8 */
    border-radius: 0.5rem;
    /* rounded-lg */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    transition: background-color 0.3s ease;
    outline-offset: 2px;
    outline: none;
}

.get-started-btn:hover {
    background-color: #f3f4f6;
    /* gray-100 */
}

.get-started-btn:focus {
    outline: 2px solid #22c55e;
    /* green-500 ring */
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.5);
    /* ring offset */
}
</style>
