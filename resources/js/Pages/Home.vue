<script setup>
import Terminal from "primevue/terminal";
import { useTerminal } from "@/Composables/useTerminal";

const { key } = useTerminal();
</script>

<template>
    <div
        class="w-full mx-auto mt-10 rounded-xl shadow-2xl overflow-hidden border border-gray-700"
    >
        <!-- Header controls -->
        <div class="bg-[#2e2e2e] px-3 py-2 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
            <span class="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
            <span class="w-3 h-3 rounded-full bg-[#27c93f]"></span>
            <span class="text-gray-300 text-sm ml-3">shimi@kosmos — shy</span>
        </div>

        <!-- Terminal -->
        <Terminal
            welcomeMessage="Welcome to Shitty Terminal"
            prompt="shimi@shitty:~$"
            :key="key"
            :pt="{
                root: {
                    class: 'bg-[#1e1e1e] text-gray-200 font-mono text-sm p-4 min-h-[400px]',
                },
                welcomeMessage: { class: 'text-gray-400 mb-2 block' },
                content: { class: 'space-y-1' },
                commands: { class: 'space-y-2' },
                prompt: { class: 'text-green-400 mr-2 font-bold ' },
                command: { class: 'text-white' },
                commandText: { class: 'text-white' },
                response: { class: 'text-gray-400 ml-4' },
                container: {
                    class: 'max-h-[500px] overflow-y-auto custom-scrollbar',
                },
            }"
        />
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
</style>
