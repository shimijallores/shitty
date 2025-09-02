import { onMounted, onUnmounted, ref } from "vue";
import TerminalService from "primevue/terminalservice";

export function useTerminal() {
    const key = ref(0);

    const commandHandler = async (input) => {
        let response;

        let inputArray = input.split(" ");
        let [command, argument] = inputArray;

        switch (command) {
            case "ls":
                try {
                    const res = await fetch("api/files");
                    const data = await res.json();

                    response = data.map((item) => item.name).join("\n");
                } catch (e) {
                    response = `Error fetching files ${e}`;
                }
                break;
            case "mkdir":
                if (!argument) {
                    response = "Enter a valid folder name";
                    break;
                }

                try {
                    const res = await fetch("api/folders", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ name: argument }),
                    });

                    response = `Directory ${argument
                        .toLowerCase()
                        .trim()} created`;
                } catch (e) {
                    response = `Failed to create directory ${argument
                        .toLowerCase()
                        .trim()}`;
                }
                break;
            case "touch":
                if (!argument) {
                    response = "Enter a valid file name";
                    break;
                }

                try {
                    const res = await fetch("api/files", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ name: argument }),
                    });

                    response = `File ${argument.toLowerCase().trim()} created`;
                } catch (e) {
                    response = `Failed to create file ${argument
                        .toLowerCase()
                        .trim()}`;
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
            case "estephanie":
                response = `
                    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣿⣿⡿⠟⢿⣿⣿⣛⣛⣛⠛⠿⣿⣯⠈⣈⣤⡤⠤⢈⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⣿⠟⢿⣿⣿⣿⠿⠿⠿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⡿⢀⣿⣿⣿
                    ⣿⣿⣿⣿⡁⢨⣤⣴⣿⣿⣿⠉⣿⣿⣿⣿⡄⢸⣿⡇⢉⣁⣀⠐⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠻⣿⠁⣄⠙⢿⡗⢸⣿⣿⣶⡌⢻⡟⢀⣿⣿⠏⠀⢿⣿⣿⠇⢸⣿⣿⣿
                    ⣿⣿⣿⣿⡇⠸⣿⠿⢿⣿⣿⠐⣿⣿⣿⣿⠃⣼⣿⣿⠈⣿⣿⣿⣿⣦⡌⢿⣿⣿⣿⣿⣿⣿⣿⣤⣉⣴⣿⡇⢸⣿⠘⣿⣿⣿⠇⢸⡇⢘⡿⢁⣴⡀⣾⣿⣿⣷⣿⣿⣿⣿
                    ⣿⣿⣿⣿⣿⡄⢲⣶⣾⣿⣿⣦⣭⣉⣉⣩⣼⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠏⣸⣿⣦⣙⣛⣉⣴⣿⣷⣈⣠⣾⣿⡀⢿⣿⣿⠛⠛⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣷⣈⣀⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣿⡟⡃⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢹⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠻⣿⣿
                    ⠃⣤⣌⠙⠻⢏⣴⡇⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠉⣴⡍⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢁⣴⣿⣧⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⢠⠙⣿⣿⡿⢋⡴⢋⣾⣿⣿
                    ⣦⠙⢿⣿⣷⣿⣿⢡⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⢰⣿⣿⣦⡈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⣠⣿⣿⣿⣿⣦⠘⣿⣿⣿⣿⣿⣿⣿⣿⣧⠈⣧⡈⠛⢡⠎⣰⣿⣿⣿⣿
                    ⣿⣷⣦⣉⠛⣿⡇⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣾⣿⣿⣿⣿⣦⢸⠻⠿⠿⠿⠿⠿⠿⠇⢰⣿⣿⣿⣿⣿⣿⡄⢻⣿⣿⣿⣿⣿⣿⣿⣿⣦⠙⣷⡾⢃⣾⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣯⣼⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⠇⢸⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣷⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠹⢣⣿⣿⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣿⣿⣿⠟⣛⠻⢋⣵⠀⣿⣿⣿⠇⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡂⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣿⣿⣿⡀⣿⣷⣿⢋⣾⣿⣿⣿⡆⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠻⢿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
                    ⣿⣿⣿⡟⢿⣿⣿⣿⣧⡈⠛⣡⣿⣿⣿⣿⣿⣿⠎⣻⣿⣿⡇⠀⠀⢹⣿⣿⣿⣿⢿⣿⣿⣿⣿⡁⠄⢀⣿⣿⣿⣿⡿⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
                    ⡍⣛⠋⠀⢰⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣏⣉⣉⠀⣹⣿⣿⡿⠷⣶⣿⣿⣿⠟⢀⡉⢿⣿⣿⣿⣿⣿⡿⢿⠟⠛⣻⣇⢠⣬⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
                    ⣿⡄⠟⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⢀⡿⠑⣋⡄⣼⣿⣿⣿⣯⣴⣿⣿⣤⣽⣿⣿⣿⣿⣀⣴⣮⣤⣾⠇⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
                    ⣿⣿⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢁⣠⠈⢷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢀⣍⣙⡉⢹⣿⣿⡿⠿⣿⣿⣿⡿⣡⠂⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣿⣿⣿⡟⢠⠙⡿⠉⠀⣿⣿⣿⣿⣷⣦⡙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⣼⣿⣿⣿⣿⣿⣿⠀⣶⣄⢙⢋⣼⢏⣼⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⠁⣌⠙⠛⠇⠸⠁⠀⣰⢡⣿⣿⣿⣿⣿⣿⣷⣤⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠉⢿⣿⣿⣿⣿⣿⣧⠈⢿⣿⣿⢇⣼⣿⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⡆⢻⡇⠐⠀⠀⠀⢠⠃⣾⣿⣿⣿⣿⠋⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠻⣿⣿⣿⣿⣿⣷⣤⡙⢋⣼⣿⣿⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⣿⡌⠁⢀⡆⠀⠀⡎⣼⣿⣿⣿⠿⢁⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠘⢿⣿⣿⣿⣿⣿⣯⣾⣿⣿⣿⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣿⣦⡘⠃⠀⡸⣰⣿⣿⡟⢋⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿
                    ⣿⣿⣿⣿⣿⣿⠛⢿⣦⣄⢡⣿⡿⠏⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⠘⢿⣿⣿⣿⣿⣿⠿⠻⠿⠿⠟⣡⡆
                    ⣿⣿⣿⣿⣿⣿⣆⠀⡙⠿⠀⡿⢁⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣬⠿⣿⣿⣿⣧⠐⣿⣶⣶⣾⡿⣸
                    ⣿⣿⣿⣿⣿⣿⣿⣧⡊⢷⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡈⠿⣿⣿⣧⡌⠻⠿⢿⢡⣿
                    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⢀⠀⢿⣿⣿⣿⣿⣿⢿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠙⣿⣿⣿⣷⣶⣾⣿⣿
                    ⣿⣿⣿⣿⣿⣿⣿⡿⢁⣼⣃⢿⣿⣿⣿⣿⢉⣠⠆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⢠⣍⡹⠻⣿⣿⣿⣿⣿⣇⠸⣿⣿⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣿⣿⠃⣼⣿⣗⢸⣿⠟⠁⣨⣿⣿⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢺⣿⣿⣦⣉⠻⣿⣿⣿⣿⠞⢉⣿⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣿⣿⢂⠹⢿⣿⡈⢏⣴⣾⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢸⣿⣿⣿⣿⣶⣄⣁⣠⣤⣴⣾⣿⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣿⣿⣶⣶⣬⣩⣥⠾⣿⣿⣿⣿⣿⢘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡗⢺⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
                    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
                `;
                break;
            case "help":
                response =
                    "Available commands: hello, date, mkdir [name], touch [name], clear";
                break;
            default:
                response = `Unknown command: ${command}`;
        }
        TerminalService.emit("response", response);
    };

    onMounted(() => TerminalService.on("command", commandHandler));
    onUnmounted(() => TerminalService.off("command", commandHandler));

    return { key };
}
