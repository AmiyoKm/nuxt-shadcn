export default defineNuxtRouteMiddleware((_, __) => {
    const token = useCookie("auth_token");

    if (!token.value) {
        return navigateTo("/login");
    }
});
