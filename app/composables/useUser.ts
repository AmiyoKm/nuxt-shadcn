import type { User } from "~~/shared/types/auth";

export const useUser = () => {
    const user = useState<User | null>("user", () => null);

    const fetchUser = async () => {
        try {
            const headers = useRequestHeaders(["cookie"]);
            const { data } = await $fetch("/api/auth/me", {
                headers,
            });
            user.value = data;
        } catch (error: unknown) {
            console.error("Failed to fetch user:", error);
            user.value = null;
        }
    };

    const logout = async () => {
        const token = useCookie("auth_token");
        token.value = null;
        user.value = null;
        await navigateTo("/");
    };

    const { status } = useAsyncData("is-logged-in", async () => {
        await fetchUser();
        return true;
    });

    const isLoading = computed(() => status.value === "pending");

    return {
        user,
        isLoading,
        fetchUser,
        logout,
    };
};
