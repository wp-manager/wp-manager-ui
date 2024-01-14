import { useFetch } from "@/composables/fetch";
import { reactive, ref } from "vue";

let apiBase = import.meta.env.APP_SERVER_URL;

class WPSite {
    public url: string;

    data: any = reactive({});
    favicon = "";
    screenshot = "";
    mobileScreenshot = "";

    constructor(url: string) {
        this.url = url;
        this.favicon = `https://${url}/favicon.ico`;
        this.screenshot = `https://localhost:8443/site/${this.url}/screenshot`;
        this.mobileScreenshot = `https://localhost:8443/site/${this.url}/screenshot/mobile`;
    }

    makeRequest(path: string) {
        if (this.data[path]) return this.data[path];
        return (this.data[path] = useFetch(
            `https://localhost:8443/site/${this.url}/wp-json${path}`,
            { credentials: "include" }
        ));
    }

    hasNamespace(namespace: string) {
        if (!this.data["/"]) return false;
        if (!this.data["/"].data) return false;
        if (!this.data["/"].data.namespaces) return false;
        return this.data["/"].data.namespaces.includes(namespace);
    }

    discover() {
        return this.makeRequest("/");
    }

    plugins() {
        return this.makeRequest("/wp/v2/plugins");
    }

    users() {
        return this.makeRequest("/wp/v2/users?context=edit");
    }

    themes() {
        return this.makeRequest("/wp/v2/themes");
    }

    // WP Manager Companion
    wpm_core_version() {
        return this.makeRequest("/wp-manager/v1/wp-core");
    }

    // StrategiQ Dev Toolkit
    stq_gravity_forms() {
        return this.makeRequest("/stq/v1/gravity-forms");
    }
    stq_cf7_forms() {
        return this.makeRequest("/stq/v1/cf7-forms");
    }
    stq_wp_core() {
        return this.makeRequest("/stq/v1/wp-core");
    }
    stq_plugin_audit() {
        return this.makeRequest("/stq/v1/plugin-audit");
    }
    stq_akismet() {
        return this.makeRequest("/stq/v1/akismet");
    }
    stq_password_cycle() {
        return this.makeRequest("/stq/v1/strategiq-password-cycle");
    }
    stq_sucuri_audit() {
        return this.makeRequest("/stq/v1/sucuri-audit");
    }
    stq_sucuri_audit_logs() {
        return this.makeRequest("/stq/v1/sucuri-audit/logs");
    }
}

export default WPSite;