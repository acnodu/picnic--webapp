<template>
    <div class="min-h-screen">
        <CoreContainer>
            <NuxtPage />
            <div>Version: {{ $config.public.appVersion }}</div>
        </CoreContainer>
    </div>
</template>
