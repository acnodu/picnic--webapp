<template>
    <div class="min-h-screen bg-[#f6f6f6]">
        <CoreContainer class="p-4">
            <NuxtPage />
            <div>Version: {{ $config.public.appVersion }}</div>
        </CoreContainer>
    </div>
</template>
