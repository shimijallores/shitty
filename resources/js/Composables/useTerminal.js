import { onMounted, onUnmounted, ref } from "vue";
import TerminalService from "primevue/terminalservice";

export function useTerminal() {
    const key = ref(0);

    const commandHandler = async (input) => {
        let response;
        switch (input) {
            case "ls":
                try {
                    const res = await fetch("api/files");
                    const data = await res.json();

                    response = data.map((item) => item.name).join("\n");
                } catch (err) {
                    response = `Error fetching files ${err}`;
                }
                break;
            case "hello":
                response = "👋 Hi! Visit for more:  github.com/shimijallores";
                break;
            case "clear":
                key.value++;
                break;
            case "date":
                response = new Date().toLocaleString();
                break;
            case "commands":
                response = "Available commands: hello, date, help, clear";
                break;
            default:
                response = `Unknown command: ${input}`;
        }
        TerminalService.emit("response", response);
    };

    onMounted(() => TerminalService.on("command", commandHandler));
    onUnmounted(() => TerminalService.off("command", commandHandler));

    return { key };
}
